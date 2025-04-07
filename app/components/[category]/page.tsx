import ComponentList from "@/components/ui/container/ComponentList";
import { getComponentData } from "@/utils/getComponentData";
import fs from "fs";
import path from "path";

// Forzamos el renderizado dinámico para manejar APIs asíncronas
export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { category: "CTA" },
    { category: "headers" },
    { category: "infinite-scroll" },
    { category: "footers" },
    // todas tus categorías conocidas
  ];
}

interface Props {
  params: Promise<{ category: string }>;
}

// Lee el código fuente del componente de forma asíncrona
const getComponentCode = async (
  category: string,
  slug: string
): Promise<string> => {
  const filePath = path.join(
    process.cwd(),
    "components",
    "preview",
    category,
    `${slug}.tsx`
  );

  try {
    return await fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
    console.error(`❌ Error leyendo el archivo: ${filePath}`, error);
    return "// Código no disponible";
  }
};

export default async function ComponentPage({ params }: Props) {
  const { category } = await params; // Esperamos a que params se resuelva

  // Carga los datos del contenido MDX
  const componentData = await getComponentData(category);

  // Lee el código fuente `.tsx` de cada componente
  const prepared = await Promise.all(
    componentData.map(async (comp) => ({
      ...comp,
      code: await getComponentCode(category, comp.slug),
    }))
  );

  return (
    <div className="mx-auto max-w-8xl pt-12">
      <h1 className="text-5xl font-bold mb-4">
        Todos los componentes {category}
      </h1>

      {prepared.length === 0 ? (
        <p className="text-red-500 text-center">
          ⚠️ No hay componentes en esta categoría
        </p>
      ) : (
        <ComponentList category={category} components={prepared} />
      )}
    </div>
  );
}
