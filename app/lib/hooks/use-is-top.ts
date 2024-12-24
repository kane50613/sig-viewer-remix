import { useEffect, useState } from "react";

export function useIsTop() {
  const [isTop, setIsTop] = useState(false);

  const onScroll = () => {
    const scrollY = window.scrollY;
    setIsTop(scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isTop;
}
