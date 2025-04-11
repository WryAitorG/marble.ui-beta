import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sidebarSections, SidebarItem } from "./sidebarSections";

const componentsDir = path.join(process.cwd(), "content");

export interface ComponentData {
  title: string;
  description: string;
  category: string;
  slug: string;
  body: any;
}

export interface ComponentDataResult {
  expectedCount: number | null;
  components: ComponentData[];
}

export async function getComponentData(category: string): Promise<ComponentDataResult> {
  const allItems: SidebarItem[] = sidebarSections.flatMap((section) => section.items);
  const item = allItems.find((i) => i.slug === category);

  if (!item) {
    console.warn(`⚠️ Categoría "${category}" no está en el sidebar.`);
    return { expectedCount: 0, components: [] };
  }

  if (Object.prototype.hasOwnProperty.call(item, "count") && item.count === null) {
    return {
      expectedCount: null,
      components: [
        {
          title: item.slug,
          description: "Componente único en TSX",
          category: item.slug,
          slug: item.slug,
          body: null,
        },
      ],
    };
  }

  const dirPath = path.join(componentsDir, category);
  if (!fs.existsSync(dirPath)) {
    console.info(`ℹ️ No existe la carpeta: content/${category}`);
    return {
      expectedCount: typeof item.count === "number" ? item.count : 0,
      components: [],
    };
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
  const components: ComponentData[] = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    if (!data.slug) {
      console.warn(`⚠️ Archivo sin 'slug': ${file}`);
      continue;
    }

    components.push({
      title: data.title || "Sin título",
      description: data.description || "Sin descripción",
      category,
      slug: data.slug || file.replace(".mdx", ""),
      body: null,
    });
  }

  return {
    expectedCount: typeof item.count === "number" ? item.count : 0,
    components,
  };
}
