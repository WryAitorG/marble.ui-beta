"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

interface PreviewWithIframeProps {
  component: React.ReactElement;
  visible?: boolean;
}

const PreviewWithIframe = ({ component, visible = true }: PreviewWithIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Escribimos el HTML base dentro del iframe
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `);
    doc.close();

    // Cargamos el CSS de estilos (Tailwind o lo que uses)
    fetch("/preview.css")
      .then((res) => res.text())
      .then((css) => {
        const style = doc.createElement("style");
        style.innerHTML = css;
        doc.head.appendChild(style);
        setReady(true); // Una vez el CSS está cargado, ya podemos renderizar
      });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const iframe = iframeRef.current;
    const mountNode = iframe?.contentDocument?.getElementById("root");
    if (mountNode) {
      createRoot(mountNode).render(component);
    }
  }, [ready, component]);

  return (
    <div
      className={`absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        sandbox="allow-scripts allow-same-origin" // 👍 necesario y seguro si controlas el contenido
      />
    </div>
  );
};

export default PreviewWithIframe;
