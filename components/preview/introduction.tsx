"use client";

import React from "react";

const Introduction: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 md:py-16 mx-auto mt-10">
      <div className="space-y-6 text-gray-800">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Introducción
          </h1>
          <p className="text-lg text-gray-500">
            Explora una galería de componentes listos para copiar y pegar directamente en tus proyectos — sin instalaciones, sin configuración.
          </p>
        </header>

        <p>
          <span className="font-medium text-gray-700">MarbleUI</span> es una colección de componentes reutilizables diseñados para acelerar el desarrollo de tus aplicaciones web.
        </p>

        <p>
          Está enfocada principalmente en bloques, secciones y plantillas pensadas para construir páginas de destino y materiales visuales orientados al usuario.
        </p>

        <hr className="my-8 border-gray-200" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filosofía</h2>

          <p className="font-semibold text-gray-800">
            Personalmente creo que un buen diseño aporta un valor significativo al software. Es uno de los principales métodos para generar confianza entre tú y un desconocido en internet.
          </p>

          <p className="text-gray-600 mt-2">
            La confianza es crucial para cualquier negocio digital, ya que es lo primero que evalúa un visitante antes de convertirse en cliente.
          </p>

          <div className="mt-4">
            <p className="text-gray-700 font-medium">Algunas preguntas que podría hacerse un visitante:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>“¿Es esta plataforma de confianza?”</li>
              <li>“¿Quién más la está utilizando?”</li>
              <li>“¿Puedo confiarles mis datos personales?”</li>
            </ul>
          </div>

          <p className="mt-6 font-semibold text-gray-800">
            Un diseño pobre transmite una imagen negativa de tu equipo.
            <span className="font-normal text-gray-600">
              {" "}
              Parece descuidado, incompleto e inestable. Da la sensación de que no se preocupan por la experiencia del usuario.
            </span>
          </p>

          <p className="mt-4 font-semibold text-gray-800">
            Un buen diseño comunica que el equipo detrás sabe lo que hace.
            <span className="font-normal text-gray-600">
              {" "}
              Y eso nos da confianza en que ofrecerán cosas de calidad también en el futuro.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
