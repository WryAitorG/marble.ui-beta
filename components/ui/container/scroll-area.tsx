'use client';

import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  return (
    <div
      className="relative w-full h-full overflow-scroll"
      style={{
        scrollbarWidth: 'thin', // Soporte para Firefox
        scrollbarColor: 'white transparent', // Color del scrollbar en Firefox
      }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
