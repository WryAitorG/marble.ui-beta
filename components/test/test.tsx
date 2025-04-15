"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedScrollBlockProps {
  children: React.ReactNode;
  root?: HTMLElement | null;
  threshold?: number;
}

const AnimatedScrollBlock: React.FC<AnimatedScrollBlockProps> = ({
  children,
  root = null,
  threshold = 0.3,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      {
        root,
        threshold,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, threshold]);

  return (
    <div
      ref={blockRef}
      className={`transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedScrollBlock;
