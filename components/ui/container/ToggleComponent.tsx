"use client";

import { useRef, useState, useEffect } from "react";
import PreviewWithIframe from "@/components/ui/container/PreviewWithIframe";
import CodeView from "@/components/ui/container/CodeView";
import ResizableContainer from "@/components/ui/container/ResizableContainer";
import ResizeMenu from "@/components/ui/container/ResizeMenu";

interface ToggleComponentProps {
  component: React.ReactElement;
  code: string;
}

const ToggleComponent: React.FC<ToggleComponentProps> = ({ component, code }) => {
  const [view, setView] = useState<"preview" | "code">("preview");

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [resizeWidth, setResizeWidth] = useState(0);
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
        setContainerWidth(newWidth);

        if (!isDraggingRef.current && !isManualResize) {
          setResizeWidth(0);
        }
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [isManualResize]);

  useEffect(() => {
    const handleResize = () => setResizeWidth(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="flex justify-between items-center border-b h-10 mb-8">
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
        </div>
      </div>

      <div className="relative pt-2" ref={containerRef}>
        <div className="relative w-full flex justify-start">
          <div
            className="relative"
            style={
              isManualResize && resizeWidth > 0
                ? { width: `${appliedWidth}px` }
                : { width: "100%" }
            }
          >
            <ResizableContainer width={appliedWidth}>
              <div className="w-full h-full flex flex-col items-center justify-center ">
                <PreviewWithIframe
                  component={component}
                  visible={view === "preview"}
                />
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