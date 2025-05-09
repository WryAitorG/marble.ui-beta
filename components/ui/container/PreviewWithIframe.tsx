"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

interface PreviewWithIframeProps {
  component: React.ReactElement;
  visible?: boolean;
  id: string;
}

const PreviewWithIframe = ({
  component,
  visible = true,
  id,
}: PreviewWithIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              background: white;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `);
    doc.close();

    fetch("/preview.css")
      .then((res) => res.text())
      .then((css) => {
        const style = doc.createElement("style");
        style.innerHTML = css;
        doc.head.appendChild(style);
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (!ready) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    const mountNode = doc.getElementById("root");
    if (!mountNode) return;

    createRoot(mountNode).render(component);

    // ⬇ Script con debounce para altura estable
    const resizeScript = `
  const root = document.getElementById("root");
  if (root) {
    let hasSetInitialHeight = false;
    let timeout;
    const observer = new ResizeObserver(() => {
      const sendHeight = () => {
        const rect = root.getBoundingClientRect();
        const height = rect.height + root.offsetTop + 2;
        parent.postMessage({ type: "iframe-height", height, id: "${id}" }, "*");
      };

      if (!hasSetInitialHeight) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          hasSetInitialHeight = true;
          sendHeight();
        }, 120);
      } else {
        sendHeight(); // tiempo real después del primer valor estable
      }
    });
    observer.observe(root);
  }
`;

    const script = doc.createElement("script");
    script.type = "text/javascript";
    script.text = resizeScript;
    doc.body.appendChild(script);
  }, [ready, component, id]);

  return (
    <div
      className={`absolute inset-0 w-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <iframe
        ref={iframeRef}
        className="w-full"
        style={{ height: "100%" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default PreviewWithIframe;
