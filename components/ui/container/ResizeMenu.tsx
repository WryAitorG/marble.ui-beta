"use client";

import React, { useRef } from "react";

interface ResizeMenuProps {
  width: number;
  maxWidth: number;
  onChangeWidth: (newWidth: number) => void;
  onStartResize?: () => void;
  onEndResize?: () => void;
}

const MIN_WIDTH = 300;

const ResizeMenu: React.FC<ResizeMenuProps> = ({
  width,
  maxWidth,
  onChangeWidth,
  onStartResize,
  onEndResize,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const lastClampedWidthRef = useRef<number>(width); // ✅ Control interno del último valor

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onStartResize?.();

    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(() => {
        const delta = e.clientX - startX;
        const newWidth = Math.round(startWidth + delta);
        const clamped = Math.max(MIN_WIDTH, Math.min(maxWidth, newWidth));

        // ✅ Solo actualizar si el valor realmente cambió
        if (clamped !== lastClampedWidthRef.current) {
          lastClampedWidthRef.current = clamped;
          onChangeWidth(clamped);
        }
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      onEndResize?.();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      className="absolute left-4 right-4 -top-[-19px] z-50 cursor-ew-resize group"
      style={{
        height: "40px", // Área de interacción amplia
        transform: "translateY(-50%)",
        pointerEvents: "auto",
      }}
    >
      <div
        className="w-full mx-auto bg-gray-300 group-hover:bg-gray-400 rounded-full transition-all duration-300"
        style={{
          height: "6px",
          marginTop: "7px",
          marginBottom: "7px",
          transform: "scaleY(1)",
        }}
      />
    </div>
  );
};

export default ResizeMenu;
