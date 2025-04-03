"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LeftSidebar() {
  // 📌 Lista de categorías manuales
  const categories = ["infinite-scroll", "headers", "hola"]; // 🔹 Agrega más en el futuro
  const pathname = usePathname(); // 📌 Obtiene la ruta actual

  return (
    <aside className="w-64 bg-white p-6 border-r border-gray-200 hidden md:flex pt-16">
      <div className="w-full pl-4 pt-2"> {/* 🔹 Más espacio a la derecha */}
        <h2 className="text-3xl font-bold mb-8">Categorías</h2>
        <nav className="space-y-1.5">
          {categories.map((category) => {
            const isActive = pathname === `/animations/${category}`;
            return (
              <Link
                key={category}
                href={`/animations/${category}`}
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
