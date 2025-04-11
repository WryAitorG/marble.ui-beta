"use client";

import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // check inicial

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full">
      <header
        className={`sticky top-0 z-50 h-20 transition-colors duration-300 ${
          scrolled ? "bg-cyan-100 shadow-md text-black" : "bg-transparent text-black"
        }`}
      >
        <div className="mx-auto max-w-7xl h-full px-6 flex items-center justify-between">
          <span className="text-xl font-bold sm:text-2xl md:text-3xl">Simple Navbar</span>
          <nav className="space-x-2 text-sm font-medium sm:space-x-4 md:text-base">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      <div className="p-24 sm:p-32 lg:p-52 text-center text-gray-600">
        <p>
          Este es un texto de prueba debajo del navbar. Hacé scroll en la página normalmente
          para probar el efecto. Si el navbar cambia de color después de bajar 20px, ¡funciona!
        </p>
      </div>
    </div>
  );
};

export default Navbar;
