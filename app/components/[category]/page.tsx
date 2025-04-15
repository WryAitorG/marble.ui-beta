import ComponentList from "@/components/ui/container/ComponentList";
import { getComponentData } from "@/utils/getComponentData";
import { sidebarSections } from "@/utils/sidebarSections";
import fs from "fs";
import path from "path";

export const dynamicParams = false;

const allCategories = sidebarSections.flatMap((section) =>
  section.items.map((item) => item.slug)
);

export async function generateStaticParams() {
  return allCategories.map((category) => ({ category }));
}

interface Props {
  params: Promise<{ category: string }>;
}

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

const getSingleComponentModule = async (
  slug: string
): Promise<React.ComponentType<Record<string, unknown>> | null> => {
  try {
    const mod = await import(`@/components/preview/${slug}`);
    return mod.default || null;
  } catch (err) {
    console.error(`❌ No se pudo importar ${slug}.tsx`, err);
    return null;
  }
};

const getComponentModule = async (
  category: string,
  slug: string
): Promise<React.ComponentType<Record<string, unknown>> | null> => {
  try {
    const mod = await import(`@/components/preview/${category}/${slug}`);
    return mod.default || null;
  } catch (err) {
    console.error(`❌ No se pudo importar ${category}/${slug}`, err);
    return null;
  }
};

export default async function ComponentPage({ params }: Props) {
  const { category } = await params;

  const { expectedCount, components } = await getComponentData(category);

  if (expectedCount === null) {
    const Component = await getSingleComponentModule(category);

    return (
      <div className="mx-auto pt-12 pb-10 pl-4">
        <h1 className="text-5xl font-bold mb-4">Componente {category}</h1>

        {!Component ? (
          <p className="text-red-500 text-center">
            ⚠️ No se pudo cargar el componente {category}.tsx
          </p>
        ) : (
          <div className="mb-6">
            <Component />
          </div>
        )}
      </div>
    );
  }

  const prepared = await Promise.all(
    components.map(async (comp) => {
      const code = await getComponentCode(category, comp.slug);
      const Component = await getComponentModule(category, comp.slug);

      return {
        ...comp,
        code,
        Component,
      };
    })
  );

  return (
    <div className="mx-auto pt-12 pb-10 pl-4">
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
