"use client";

import React, { useEffect, useRef, useState } from "react";

// Componente reutilizable que se anima al entrar en viewport
const AnimatedScrollBlock: React.FC<{
  children: React.ReactNode;
  root?: HTMLElement | null;
  threshold?: number;
}> = ({ children, root = null, threshold = 0.3 }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      {
        root,
        threshold,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, threshold]);

  return (
    <div
      ref={blockRef}
      className={`transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

// Ejemplo visual
const AnimatedScrollExample = () => {
  return (
    <div className="space-y-64 p-6">
      <div className="text-center text-gray-400 pt-72">Desliza hacia abajo 👇</div>

      <AnimatedScrollBlock>
        <div className="bg-emerald-100 p-8 rounded-xl shadow text-center">
          👋 ¡Hola! Aparezco con animación cuando entro en el viewport.
        </div>
      </AnimatedScrollBlock>

      <AnimatedScrollBlock>
        <div className="bg-sky-100 p-8 rounded-xl shadow text-center">
          🎉 Y yo también aparezco más abajo.
        </div>
      </AnimatedScrollBlock>
    </div>
  );
};

export default AnimatedScrollExample;
