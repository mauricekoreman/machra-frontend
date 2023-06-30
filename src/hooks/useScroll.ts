import { useCallback, useState } from "react";

export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const scrollToTop = (behavior: ScrollOptions["behavior"]) => {
    window.scrollTo({ top: 0, behavior: behavior });
  };

  window.onscroll = () => handleScroll();

  return { scrollY, scrollToTop };
};

