// utils/loadComponentBySlug.ts

// Primer slug por categoría — puedes actualizarlo dinámicamente en build si quieres
const firstComponents: Record<string, string> = {
  CTA: "CTA1",
  headers: "header1",
  "infinite-scroll": "infinite-scroll1",
  footers: "footer1",
};

export async function loadComponentBySlug(category: string): Promise<void> {
  const slug = firstComponents[category];
  if (!slug) {
    console.warn(`⚠️ No se encontró slug para la categoría ${category}`);
    return;
  }

  try {
    await import(`@/components/preview/${category}/${slug}`);
    console.log(`✅ Precargado: ${category}/${slug}`);
  } catch (error) {
    console.error(`❌ Error al precargar ${category}/${slug}:`, error);
  }
}
