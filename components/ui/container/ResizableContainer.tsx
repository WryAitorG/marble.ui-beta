"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  width: number;
  resizeMenu?: React.ReactNode; // ✅ Nuevo prop para incluir el drag
}

const ResizableContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ children, width, resizeMenu }, ref) => {
    return (
      <div className="relative flex items-start pt-2">
        <div className="w-full max-w-[1440px] relative overflow-visible">
          {/* Drag visual fuera del contenedor */}
          {resizeMenu && resizeMenu}

          <div
            ref={ref}
            className="relative flex flex-col overflow-hidden container-box bg-white @container"
            style={{
              containerType: "inline-size",
              width: "100%",
              maxWidth: width > 0 ? `${width}px` : "100%",
              minWidth: "300px",
              minHeight: "500px",
              maxHeight: "100vh",
            }}
            
          >
            <div className="w-full h-full flex flex-col items-center justify-start overflow-x-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ResizableContainer.displayName = "ResizableContainer";
export default ResizableContainer;
