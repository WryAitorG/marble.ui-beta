"use client";

import { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import ScrollArea from "@/components/ui/animations/scroll-area";

interface ToggleComponentProps {
  component: React.ReactNode;
  code: string;
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({ component, code }) => {
  const [view, setView] = useState<"preview" | "code">("preview");
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (view === "code" && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [view]);

  return (
    <div className="w-full bg-white">
      {/* Botones de selección */}
      <div className="flex justify-start gap-4 border-b pb-0">
        <button
          onClick={() => setView("preview")}
          className={`px-4 py-2 text-sm font-medium relative transition ${
            view === "preview" ? "text-black" : "text-gray-400"
          }`}
        >
          Vista Previa
          {view === "preview" && <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-black"></div>}
        </button>
        <button
          onClick={() => setView("code")}
          className={`px-4 py-2 text-sm font-medium relative transition ${
            view === "code" ? "text-black" : "text-gray-400"
          }`}
        >
          Código
          {view === "code" && <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-black"></div>}
        </button>
      </div>

      {/* Contenedor con elementos superpuestos */}
      <div className="relative w-full h-[350px] mt-4 rounded-xl overflow-hidden">
        {/* Vista Previa (Asegurar bordes redondeados y overflow-hidden) */}
        <div
          className={`absolute inset-0 flex items-center justify-center w-full h-full bg-white border border-gray-200 rounded-xl overflow-hidden ${
            view === "preview" ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">{component}</div> {/* 🔹 Respeta el borde */}
        </div>

        {/* Código con ScrollArea (Bordes menos redondeados) */}
        <div
          className={`absolute inset-0 border rounded-xl overflow-hidden bg-[#0D1117] text-gray-300 shadow-sm ${
            view === "code" ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ScrollArea>
            <pre className="w-max min-w-full h-max min-h-full p-4">
              <code ref={codeRef} className="language-tsx">
                {code}
              </code>
            </pre>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ToggleComponent;
