// app/components/[category]/page.tsx
import ToggleComponent from '@/components/ui/container/ToggleComponent';
import { loadComponents } from '@/utils/loadComponents';
import { getComponentData } from '@/utils/getComponentData';
import fs from 'fs';
import path from 'path';

interface Props {
  params: Promise<{ category: string }>; // 🔥 Ahora `params` es una promesa
}

// 🔥 Función para obtener el código fuente del componente
const getComponentCode = (category: string, slug: string) => {
  const filePath = path.join(process.cwd(), 'components', 'preview', category, `${slug}.tsx`);
  
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Error al leer el archivo ${filePath}:`, error);
    return '// No se encontró el código del componente';
  }
};

export default async function ComponentPage({ params }: Props) {
  const { category } = await params; // ✅ Se usa `await` correctamente antes de acceder a `category`

  if (!category) {
    return <p className="text-red-500 text-center">⚠️ Categoría no encontrada</p>;
  }

  const components = loadComponents();
  const componentData = await getComponentData(category);

  return (
    <div className="mx-auto max-w-8xl pt-12">
      <h1 className="text-5xl font-bold mb-4">Todos los componentes {category}</h1>

      {componentData.length === 0 ? (
        <p className="text-red-500 text-center">⚠️ No hay componentes en esta categoría</p>
      ) : (
        <div className="flex flex-col gap-6">
          {componentData.map((comp) => {
            const Component = components[comp.slug] || (() => <p className="text-red-500">❌ Componente no encontrado</p>);
            const componentCode = getComponentCode(category, comp.slug); // 🔥 Obtiene el código fuente

            return (
              <div key={comp.slug} className="pt-4 w-full">
                <h2 className="text-xl font-bold mb-2 pt-8">{comp.title}</h2>
                <p className="mb-4 text-gray-400">{comp.description}</p>
                <ToggleComponent component={<Component />} code={componentCode} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
