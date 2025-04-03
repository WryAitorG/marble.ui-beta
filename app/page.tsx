"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/components/CTA");
  }, [router]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 bg-white">
      {/* Background rainbow blur */}
      <div className="absolute top-[-200px] left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-[120px] opacity-40 pointer-events-none z-0" />

      {/* Badge */}
      <div className="z-10 mb-4">
        <Link
          href="#"
          className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium border rounded-full shadow-sm hover:bg-gray-50 transition"
        >
          🚀 Introducing AI Agent Template
        </Link>
      </div>

      {/* Title */}
      <h1 className="z-10 text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight">
        UI library for <br /> Design Engineers
      </h1>

      {/* Subtext */}
      <p className="z-10 mt-6 text-center max-w-2xl text-gray-600 text-lg">
        150+ free and open-source animated components and effects built with{" "}
        <strong>React</strong>, <strong>Typescript</strong>,{" "}
        <strong>Tailwind CSS</strong>, and <strong>Motion</strong>. <br />
        Perfect companion for <strong>shadcn/ui</strong>.
      </p>

      {/* Buttons */}
      <div className="z-10 mt-8 flex flex-wrap gap-4">
        <Link href="/components/CTA">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition shadow-lg">
            Browse Components →
          </button>
        </Link>
        <Link href="#">
          <button className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition">
            Browse Templates →
          </button>
        </Link>
      </div>

      {/* Tech Icons (emojis) */}
      <div className="z-10 mt-8 flex gap-6 text-2xl opacity-60">
        <span title="React">⚛️</span>
        <span title="TypeScript">🅣</span>
        <span title="Tailwind CSS">🌬️</span>
        <span title="Motion">🎞️</span>
        <span title="shadcn/ui">🧱</span>
      </div>
    </main>
  );
}
