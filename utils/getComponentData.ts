// utils/getComponentData.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const componentsDir = path.join(process.cwd(), "content");

export interface ComponentData {
  title: string;
  description: string;
  category: string;
  slug: string;
  body: any;
}

export async function getComponentData(category: string): Promise<ComponentData[]> {
  const dirPath = path.join(componentsDir, category);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);

  const components = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      const mdxSource = await serialize(content);

      return {
        title: data.title || "Sin título",
        description: data.description || "Sin descripción",
        category,
        slug: data.slug || file.replace(".mdx", ""),
        body: mdxSource,
      };
    })
  );

  return components;
}
