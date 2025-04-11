"use client";

import React, { useEffect, useState } from "react";
import { useScrollContainer } from "@/components/ui/container/ScrollContext";

const Navbar: React.FC = () => {
  const { scrollRef } = useScrollContainer();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      setScrolled(container.scrollTop > 20);
    };

    container.addEventListener("scroll", onScroll);
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  return (
    <div className="w-full">
      <header
        className={`sticky top-0 z-60 h-20 transition-colors duration-300 ${
          scrolled ? "bg-cyan-100 shadow-sm text-black" : "bg-transparent text-black"
        }`}
      >
        <div className="mx-auto h-full px-6 flex items-center justify-between max-w-7xl">
          <span className="text-xl font-bold @sm:text-2xl @md:text-3xl">Simple Navbar</span>
          <nav className="space-x-2 text-sm font-medium @sm:space-x-4 @md:text-base">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      <div className="p-24 @sm:p-32 @lg:p-52 text-center text-gray-600">
        <p>
          Este es un texto de prueba debajo del navbar. Hacé scroll dentro del contenedor artificial
          para probar el efecto de cambio de color. Si ves que el navbar cambia de color después de
          bajar 20px, ¡todo está funcionando correctamente!
        </p>
      </div>
    </div>
  );
};

export default Navbar;
