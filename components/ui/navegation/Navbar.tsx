"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // 📌 Lista de categorías (sin guiones para evitar errores con imports)
  const categories = ["buttons", "headers"];

  // 📌 Manejar búsqueda
  const handleSearch = (query: string) => {
    setSearch(query);
    if (query.length > 0) {
      setFilteredCategories(
        categories.filter((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredCategories([]);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center px-6 justify-between">
        {/* LOGO Y LINKS */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            prefetch={true}
            onMouseEnter={() => router.prefetch("/")}
            className="flex items-center gap-2 text-lg font-semibold transition-transform transform hover:scale-105"
          >
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1 rounded-lg shadow-md">
              MarbleUI
            </span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm text-black">
            <Link
              href="/components"
              prefetch={true}
              onMouseEnter={() => router.prefetch("/components")}
              className="hover:text-gray-600 transition-colors"
            >
              Components
            </Link>
            <Link
              href="/animations"
              prefetch={true}
              onMouseEnter={() => router.prefetch("/animations")}
              className="flex items-center gap-1 hover:text-gray-600 transition-colors"
            >
              Animations
            </Link>
            <Link
              href="/showcase"
              prefetch={true}
              onMouseEnter={() => router.prefetch("/showcase")}
              className="hover:text-gray-600 transition-colors"
            >
              Showcase
            </Link>
          </nav>
        </div>

        {/* 🔎 BUSCADOR */}
        <div className="hidden md:flex relative">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar..."
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {filteredCategories.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
              {filteredCategories.map((category) => (
                <Link
                  key={category}
                  href={`/components/${category}`}
                  prefetch={true}
                  onMouseEnter={() => router.prefetch(`/components/${category}`)}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {category}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
