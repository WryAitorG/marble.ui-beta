"use client";

import { useRef, useState, useEffect } from "react";
import Preview from "@/components/ui/container/Preview";
import CodeView from "@/components/ui/container/CodeView";
import ResizableContainer from "@/components/ui/container/ResizableContainer";
import ResizeMenu from "@/components/ui/container/ResizeMenu";

interface ToggleComponentProps {
  component: React.ReactNode;
  code: string;
}

const presetWidths = [1440, 340, 640, 768, 1024];

const ToggleComponent: React.FC<ToggleComponentProps> = ({ component, code }) => {
  const [view, setView] = useState<"preview" | "code">("preview");

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [resizeWidth, setResizeWidth] = useState(1440);
  const [isManualResize, setIsManualResize] = useState(false);
  const isDraggingRef = useRef(false);

  const appliedWidth = isManualResize
    ? Math.min(resizeWidth, containerWidth)
    : containerWidth;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.floor(entry.contentRect.width);

        if (!isDraggingRef.current) {
          setIsManualResize(false);
          setResizeWidth(newWidth);
        }

        setContainerWidth(newWidth);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleNextWidth = () => {
    setIsManualResize(true);

    const validWidths = presetWidths.filter((w) => w <= containerWidth);
    if (validWidths.length === 0) return;

    const currentIndex = validWidths.findIndex((w) => w === resizeWidth);
    const nextIndex =
      currentIndex === -1 || currentIndex === validWidths.length - 1
        ? 0
        : currentIndex + 1;

    setResizeWidth(validWidths[nextIndex]);
  };

  const handleManualResize = (newWidth: number) => {
    setIsManualResize(true);
    setResizeWidth(newWidth);
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  return (
    <div className="w-full bg-white relative">
      {/* Tabs + botón de ancho */}
      <div className="flex justify-between items-center border-b  h-10 mb-8">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setView("preview")}
            className={`px-4 py-2 text-sm font-medium relative transition ${
              view === "preview" ? "text-black" : "text-gray-400"
            }`}
          >
            Vista Previa
            {view === "preview" && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-black" />
            )}
          </button>

          <button
            onClick={() => setView("code")}
            className={`px-4 py-2 text-sm font-medium relative transition ${
              view === "code" ? "text-black" : "text-gray-400"
            }`}
          >
            Código
            {view === "code" && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-black" />
            )}
          </button>

          <button
            onClick={handleNextWidth}
            className="text-xs font-mono text-gray-500 hover:text-black px-2 py-1 rounded border border-gray-300"
          >
            📏 {appliedWidth}px
          </button>
        </div>
      </div>

      {/* Contenedor observado */}
      <div className="relative pt-2" ref={containerRef}>
        <div className="relative w-full flex justify-start">
          {/* Contenedor limitado en px solo si es manual */}
          <div
            className="relative"
            style={
              isManualResize
                ? { width: `${appliedWidth}px` }
                : { width: "100%" }
            }
          >
            <ResizableContainer width={appliedWidth}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-4 py-6">
                <Preview component={component} isVisible={view === "preview"} />
                <CodeView code={code} isVisible={view === "code"} />
              </div>
            </ResizableContainer>

            <ResizeMenu
              width={appliedWidth}
              maxWidth={containerWidth}
              onChangeWidth={handleManualResize}
              onStartResize={handleDragStart}
              onEndResize={handleDragEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleComponent;
