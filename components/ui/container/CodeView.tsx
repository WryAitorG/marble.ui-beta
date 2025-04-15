"use client";

import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface CodeViewProps {
  code: string;
  isVisible: boolean;
}

const CodeView: React.FC<CodeViewProps> = ({ code, isVisible }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isVisible && codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [isVisible]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Error al copiar el código:", err);
    }
  };

  return (
    <div
      className={`absolute inset-0 border rounded-xl overflow-hidden bg-[#0D1117] text-gray-300 shadow-sm transition-opacity pt-4 ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Botón copiar */}
      <div className="absolute top-2 left-2 z-10">
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm font-medium bg-gray-800 hover:bg-gray-700 text-white rounded-md border border-gray-600 transition"
        >
          {copied ? "¡Copiado!" : "Copiar código"}
        </button>
      </div>

      {/* Scroll integrado */}
      <div
        className="relative w-full h-full overflow-scroll"
        style={{
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "white transparent",
        }}
      >
        <pre className="w-max min-w-full h-max min-h-full p-4">
          <code ref={codeRef} className="language-tsx">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeView;
