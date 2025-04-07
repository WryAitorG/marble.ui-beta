import fs from "fs";
import path from "path";
import matter from "gray-matter";

const componentsDir = path.join(process.cwd(), "content");

export interface ComponentData {
  title: string;
  description: string;
  category: string;
  slug: string;
  body: any; // ← lo dejamos para compatibilidad futura
}

export async function getComponentData(category: string): Promise<ComponentData[]> {
  const dirPath = path.join(componentsDir, category);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);

  const components = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent); // ❌ No usamos `content` ni `serialize`

    return {
      title: data.title || "Sin título",
      description: data.description || "Sin descripción",
      category,
      slug: data.slug || file.replace(".mdx", ""),
      body: null, // ⚠️ Solo si se necesita más adelante
    };
  });

  return components;
}
