"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaReact, FaGithub, FaCss3Alt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiFramer } from "react-icons/si";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/components/CTA");
  }, [router]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 bg-white pt-10 ">
      {/* Fondo gradiente amarillo responsive */}
      <div
        className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 
        w-[200px] h-[400px] sm:w-[700px] sm:h-[500px] md:w-[1000px] md:h-[800px]
        bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 
        rounded-full blur-[100px] opacity-40 pointer-events-none z-0"
      />

      <h1 className="z-10 text-3xl sm:text-4xl md:text-5xl font-bold sm:text-center text-left leading-tight max-w-2xl">
        Componentes UI cuidadosamente diseñados <br /> para Desarrolladores y Diseñadores
      </h1>

      <p className="z-10 mt-6 max-w-2xl text-gray-600 text-lg sm:text-center text-left">
        🧩 Accede a más de <strong>60+</strong> elementos UI responsivos y animados construidos con
        <strong> React</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong> y <strong>Framer Motion</strong>.
        <br /> Integrados perfectamente y listos para desplegar.
      </p>

      <div className="z-10 mt-8 flex flex-wrap gap-4">
        <Link href="/components/CTA">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:scale-105 hover:bg-gray-900 transition shadow-lg">
            🔍 Explorar Componentes
          </button>
        </Link>
        <Link href="/animations">
          <button className="px-6 py-3 bg-white text-black border rounded-lg hover:scale-105 transition shadow-lg">
            🧾 Ver Templates
          </button>
        </Link>
      </div>

      <div className="z-10 mt-10 flex flex-wrap gap-6 text-3xl text-gray-400">
        <FaReact title="React" className="hover:text-blue-500 transition" />
        <SiTypescript title="TypeScript" className="hover:text-blue-600 transition" />
        <SiTailwindcss title="Tailwind CSS" className="hover:text-cyan-500 transition" />
        <SiFramer title="Framer Motion" className="hover:text-pink-500 transition" />
        <FaGithub title="GitHub" className="hover:text-black transition" />
        <FaCss3Alt title="CSS" className="hover:text-blue-600 transition" />
      </div>
    </main>
  );
}
