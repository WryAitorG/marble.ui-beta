"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { loadComponentBySlug } from "@/utils/loadComponents";

export default function LeftSidebar() {
  const categories = ["CTA", "headers", "infinite-scroll", "footers",];
  const pathname = usePathname();
  const router = useRouter();

  const handleHover = (category: string) => {
    router.prefetch(`/components/${category}`);
    loadComponentBySlug(category); // ✅ Precarga el primer componente
  };

  return (
    <aside className="bg-white pr-16 pl-20 border-r border-gray-200 hidden md:flex pt-16">
      <div className="pt-2">
        <h2 className="text-3xl font-bold mb-8">Categorías</h2>
        <nav className="space-y-1.5">
          {categories.map((category) => {
            const isActive = pathname === `/components/${category}`;

            return (
              <Link
                key={category}
                href={`/components/${category}`}
                prefetch={false}
                onMouseEnter={() => handleHover(category)}
                className={`block px-4 py-1.5 rounded-md transition-all ${
                  isActive
                    ? "bg-gray-100 text-gray-500 shadow-md scale-105"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                {category.replace("-", " ")}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
