"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  width: number;
  height?: number;
  resizeMenu?: React.ReactNode;
}

const ResizableContainer = React.forwardRef<HTMLDivElement, Props>(
  ({ children, width, height, resizeMenu }, ref) => {
    const clampedHeight = height ? Math.min(height, 500) : undefined;

    return (
      <div className="relative flex items-start pt-2">
        <div className="w-full max-w-[1440px] relative overflow-visible">
          {resizeMenu && resizeMenu}

          <div
            ref={ref}
            className="relative flex flex-col bg-white overflow-hidden container-box @container"
            style={{
            containerType: "inline-size",
            width: "100%",
            maxWidth: width > 0 ? `${width}px` : "100%",
            minWidth: "300px",
            height: clampedHeight ? `${clampedHeight}px` : "auto",
            overflowY:
              clampedHeight && clampedHeight >= 500 ? "auto" : "hidden",
            transition: "height 300ms ease-in-out", // ← agrega esto
          }}
          >
            <div className="w-full flex flex-col items-center justify-start overflow-x-hidden">
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
