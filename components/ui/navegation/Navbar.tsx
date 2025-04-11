"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { sidebarSections } from "@/utils/sidebarSections";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isOnComponentsPage = pathname.startsWith("/components");
  const [menuOpen, setMenuOpen] = useState(false);

  const allCategories = sidebarSections.flatMap((s) => s.items.map((i) => i.slug));

  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearch(query);
    if (query.length > 0) {
      setFilteredCategories(
        allCategories.filter((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredCategories([]);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 @sm:px-6 @md:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          {isOnComponentsPage ? (
            <>
              <div className="md:hidden relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-sm font-medium bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Componentes
                </button>

                {menuOpen && (
                  <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-50 w-64 max-h-[70vh] overflow-y-auto">
                    {sidebarSections.map((section) => (
                      <div key={section.title} className="mb-4">
                        <h3 className="text-xs uppercase font-bold text-gray-500 mb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/components/${item.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="block text-sm text-gray-700 hover:text-black hover:bg-gray-100 px-2 py-1 rounded"
                              >
                                {item.slug.replace(/-/g, " ")}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:flex">
                <Link
                  href="/"
                  prefetch
                  onMouseEnter={() => router.prefetch("/")}
                  className="flex items-center gap-2 text-lg font-semibold transition-transform transform hover:scale-105"
                >
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1 rounded-lg shadow-md">
                    MarbleUI
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <Link
              href="/"
              prefetch
              onMouseEnter={() => router.prefetch("/")}
              className="flex items-center gap-2 text-lg font-semibold transition-transform transform hover:scale-105"
            >
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1 rounded-lg shadow-md">
                MarbleUI
              </span>
            </Link>
          )}

          <nav className="hidden md:flex gap-6 text-sm text-black">
            <Link
              href="/components"
              onMouseEnter={() => router.prefetch("/components")}
              className="hover:text-gray-600 transition-colors"
            >
              Components
            </Link>
            <Link
              href="/animations"
              onMouseEnter={() => router.prefetch("/animations")}
              className="hover:text-gray-600 transition-colors"
            >
              Animations
            </Link>
            <Link
              href="/showcase"
              onMouseEnter={() => router.prefetch("/showcase")}
              className="hover:text-gray-600 transition-colors"
            >
              Showcase
            </Link>
          </nav>
        </div>

        {/* Buscador */}
        <div className="hidden md:flex relative pr-6">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {filteredCategories.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
              {filteredCategories.map((category) => (
                <Link
                  key={category}
                  href={`/components/${category}`}
                  prefetch
                  onMouseEnter={() => router.prefetch(`/components/${category}`)}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {category.replace(/-/g, " ")}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
