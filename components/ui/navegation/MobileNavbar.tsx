"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { sidebarSections } from "@/utils/sidebarSections";

export default function MobileNavbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const [animateSidebar, setAnimateSidebar] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.classList.add("overflow-hidden");
      body.style.paddingRight = `${scrollBarWidth}px`;

      // Activar animación después de montar
      setTimeout(() => setAnimateSidebar(true), 10);
    } else {
      setAnimateSidebar(false);
      body.classList.remove("overflow-hidden");
      body.style.paddingRight = "0px";
    }

    return () => {
      body.classList.remove("overflow-hidden");
      body.style.paddingRight = "0px";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMenuOpen]);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md z-50"
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX className="w-6 h-6" /> : <HiOutlineMenuAlt3 className="w-6 h-6" />}
      </button>

      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 h-screen"
            onClick={() => setMenuOpen(false)}
          />

          {/* Sidebar con animación desde la izquierda */}
          <div
            className={`fixed top-0 left-0 w-72 h-screen z-50 bg-white p-6 overflow-y-auto shadow-lg transition-transform duration-300 transform ${
              animateSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header con borde inferior y enlace a inicio */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-bold hover:opacity-80 transition-opacity"
              >
                MarbleUI
              </Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/components"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-gray-800 hover:bg-gray-100 px-3 py-2 rounded"
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link
                    href="/animations"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-medium text-gray-800 hover:bg-gray-100 px-3 py-2 rounded"
                  >
                    Animations
                  </Link>
                </li>
              </ul>

              {sidebarSections.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/components/${item.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="block text-sm text-gray-700 hover:text-black hover:bg-gray-100 px-3 py-1 rounded"
                        >
                          {item.slug.replace(/-/g, " ")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
