"use client";

import React, { useEffect, useRef, useState } from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full relative">
      {/* Invisible div para detectar el scroll */}
      <div ref={triggerRef} className="h-1 w-full absolute top-0" />

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 h-20 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-cyan-200 shadow-lg text-white"
            : "bg-white text-black"
        }`}
      >
        <div className="mx-auto h-full px-6 flex items-center justify-between max-w-7xl">
          <span className="text-xl font-bold sm:text-2xl md:text-3xl">
            Sticky Navbar
          </span>
          <nav className="space-x-2 text-sm font-medium sm:space-x-4 md:text-base">
            <a href="#" className="hover:underline">Inicio</a>
            <a href="#" className="hover:underline">Servicios</a>
            <a href="#" className="hover:underline">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Contenido de prueba con fondo contrastado para que se note el scroll */}
      <div className="bg-gray-100 min-h-[200vh] p-52 text-center text-gray-600">
        <p className="text-xl">Desliza hacia abajo para ver el cambio de color 👇</p>
      </div>
    </div>
  );
};

export default Navbar;
