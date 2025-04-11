"use client";

import React, { useRef } from "react";
import { ScrollContext } from "@/components/ui/container/ScrollContext";

interface PreviewProps {
  component: React.ReactNode;
  isVisible: boolean;
}

const Preview: React.FC<PreviewProps> = ({ component, isVisible }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={{ scrollRef }}>
      <div
        className={`absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl overflow-hidden ${
          isVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={scrollRef}
          className="w-full h-full overflow-auto preview-scroll"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "grey transparent",
          }}
        >
          <div className="min-h-full flex justify-center">
            <div className="w-full max-w-full">{component}</div>
          </div>
        </div>
      </div>
    </ScrollContext.Provider>
  );
};

export default Preview;
