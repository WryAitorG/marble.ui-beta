"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import MobileNavbar from "@/components/ui/navegation/MobileNavbar";
import { sidebarSections } from "@/utils/sidebarSections";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Detectar ruta actual

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const allCategories = sidebarSections.flatMap((s) => s.items.map((i) => i.slug));
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
        {/* IZQUIERDA */}
        <div className="flex items-center gap-4">
          <MobileNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

          {/* Desktop Navbar */}
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

          <nav className="hidden md:flex gap-4 text-sm text-black">
            {[
              { href: "/components", label: "Components" },
              { href: "/animations", label: "Animations" },
            ].map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  onMouseEnter={!isActive ? () => router.prefetch(href) : undefined}
                  onClick={(e) => {
                    if (isActive) e.preventDefault();
                  }}
                  className={`transition-colors ${
                    isActive
                      ? "text-gray-800 cursor-default"
                      : "hover:text-gray-600"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CENTRO: GitHub */}
        <div className="hidden md:flex justify-center flex-1">
          <a
            href="https://github.com/WryAitorG/marble.ui-beta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
          >
            <FaGithub className="w-5 h-5" /> GitHub
          </a>
        </div>

        {/* DERECHA: Buscador */}
        <div className="flex relative">
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
