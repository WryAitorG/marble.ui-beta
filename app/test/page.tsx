"use client";

import React from "react";
import { FaPython, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaDatabase } from "react-icons/fa";
import { SiDjango, SiJavascript, SiNextdotjs, SiTypescript, SiPostgresql } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

// Tipado correcto para TypeScript
const techIcons: Record<string, React.ReactNode> = {
  Python: <FaPython className="text-gray-300 text-5xl" />,
  Django: <SiDjango className="text-gray-300 text-5xl" />,
  Javascript: <SiJavascript className="text-gray-300 text-5xl" />,
  HTML: <FaHtml5 className="text-gray-300 text-5xl" />,
  CSS: <FaCss3Alt className="text-gray-300 text-5xl" />,
  React: <FaReact className="text-gray-300 text-5xl" />,
  "Next.js": <SiNextdotjs className="text-gray-300 text-5xl" />,
  Typescript: <SiTypescript className="text-gray-300 text-5xl" />,
  git: <FaGitAlt className="text-gray-300 text-5xl" />,
  github: <FaGithub className="text-gray-300 text-5xl" />,
  MySQL: <GrMysql className="text-gray-300 text-5xl" />,
  PostgreSQL: <SiPostgresql className="text-gray-300 text-5xl" />,
};

const InfiniteScroll: React.FC = () => {
  const names = Object.keys(techIcons);
  const numItems = names.length;
  const itemWidth = 200; // Tamaño de cada elemento
  const animationDuration = numItems * 3; // Velocidad de animación ajustada

  // Dividimos los elementos en dos mitades
  const firstHalf = names.slice(0, Math.ceil(numItems / 2));
  const secondHalf = names.slice(Math.ceil(numItems / 2));

  return (
    <>
      <div className=" flex flex-col justify-center items-center space-y-10 p-10">
        {/* Primera fila (hacia la izquierda) */}
        <div
          className="relative w-full max-w-screen-lg h-[100px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
          }}
        >
          <div
            className="flex space-x-8 animate-scrollLeft"
            style={{ width: `${itemWidth * firstHalf.length * 2}px` }} // Duplicamos el ancho para un bucle perfecto
          >
            {[...firstHalf, ...firstHalf].map((name, index) => (
              <div
                key={`left-${index}`}
                className="w-[200px] h-[100px] flex justify-center items-center text-gray-300 text-lg font-semibold space-x-3"
              >
                {techIcons[name] ?? <FaDatabase />} <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Segunda fila (hacia la derecha) */}
        <div
          className="relative w-full max-w-screen-lg h-[100px] overflow-hidden mt-8"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
          }}
        >
          <div
            className="flex space-x-8 animate-scrollRight"
            style={{ width: `${itemWidth * secondHalf.length * 2}px` }} // Duplicamos el ancho para un bucle perfecto
          >
            {[...secondHalf, ...secondHalf].map((name, index) => (
              <div
                key={`right-${index}`}
                className="w-[200px] h-[100px] flex justify-center items-center text-gray-300 text-lg font-semibold space-x-3"
              >
                {techIcons[name] ?? <FaDatabase />} <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Definimos la animación mejorada */}
        <style>
          {`
            @keyframes scrollLeft {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            @keyframes scrollRight {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }

            .animate-scrollLeft {
              animation: scrollLeft ${animationDuration}s linear infinite;
            }

            .animate-scrollRight {
              animation: scrollRight ${animationDuration}s linear infinite;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default InfiniteScroll;