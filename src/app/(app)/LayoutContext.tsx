import React, { useContext, useEffect, useRef, useState } from "react";

type LayoutContextValue = {
  isScrollUp: boolean;
  headerRef: React.RefObject<HTMLElement>;
};

export const LayoutContext = React.createContext<LayoutContextValue>({
  isScrollUp: false,
  headerRef: React.createRef<HTMLElement>(),
});
export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrollUp, setIsScrollUp] = useState(false);

  useEffect(() => {
    let lastPositionY = 0;

    const handleScroll = () => {
      const header = headerRef.current;
      if (!header) return;

      const currentPositionY = window.scrollY;
      setIsScrollUp(currentPositionY > lastPositionY);

      lastPositionY = currentPositionY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ isScrollUp, headerRef }}>
      {children}
    </LayoutContext.Provider>
  );
};
