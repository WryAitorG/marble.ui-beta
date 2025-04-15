"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 text-gray-700">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        {/* Grid de columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div>
            <h2 className="text-xl font-semibold mb-2">MarbleUI</h2>
            <p className="text-sm text-gray-600">
              Componentes modernos para proyectos con estilo.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">Navegación</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/components" className="hover:text-black">Componentes</Link>
              </li>
              <li>
                <Link href="/animations" className="hover:text-black">Animaciones</Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">Recursos</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://github.com/WryAitorG/marble.ui-beta" className="hover:text-black" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Documentación</a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">Contacto</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="mailto:hola@marbleui.com" className="hover:text-black">hola@marbleui.com</a>
              </li>
              <li>
                <a href="#" className="hover:text-black">Política de privacidad</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
          MarbleUI.
        </div>
      </div>
    </footer>
  );
}
