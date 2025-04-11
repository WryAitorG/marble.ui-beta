import { sidebarSections } from "./sidebarSections";

// Tipado correcto para flatMap
const allCategories = sidebarSections.flatMap((section: { items: { slug: string; count?: number | null }[] }) =>
  section.items
);

// 🔁 Obtener el objeto de una categoría
function getCategoryItem(slug: string) {
  return allCategories.find((item) => item.slug === slug);
}

// ⚡ Precarga solo el primer componente (para hover)
export async function loadComponentBySlug(category: string): Promise<void> {
  const item = getCategoryItem(category);
  if (!item) {
    console.warn(`⚠️ La categoría "${category}" no está en el sidebar.`);
    return;
  }

  if (item.count === 0 || item.count === null) {
    console.info(`ℹ️ La categoría "${category}" no tiene componentes para precargar.`);
    return;
  }

  const slug = `${category}1`;

  try {
    await import(`@/components/preview/${category}/${slug}`);
    console.log(`✅ Precargado (hover): ${category}/${slug}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error al precargar ${category}/${slug}:`, error.message);
    } else {
      console.error(`❌ Error desconocido al precargar ${category}/${slug}`);
    }
  }
}

// ⚡ Precarga todos los componentes definidos (para click)
export async function loadAllComponentsByCategory(category: string): Promise<void> {
  const item = getCategoryItem(category);
  if (!item) {
    console.warn(`⚠️ Categoría no válida: ${category}`);
    return;
  }

  if (item.count === 0 || item.count === null) {
    console.info(`ℹ️ La categoría "${category}" no tiene componentes para cargar.`);
    return;
  }

  const imports = [];

  if (typeof item.count !== "number") {
    console.info(`ℹ️ La categoría "${category}" no tiene componentes para cargar.`);
    return;
  }
  
  for (let i = 1; i <= item.count; i++) {
    const slug = `${category}${i}`;
    imports.push(
      import(`@/components/preview/${category}/${slug}`)
        .then(() => console.log(`✅ Cargado: ${category}/${slug}`))
        .catch(() => null)
    );
  }
  

  await Promise.all(imports);
}
