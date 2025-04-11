import { createContext, useContext, RefObject } from "react";

interface ScrollContextType {
  scrollRef: RefObject<HTMLDivElement | null>; // ✅ Acepta null
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollRef: { current: null },
});

export const useScrollContainer = () => useContext(ScrollContext);
