import { useState, useEffect } from "react";

export const useReduceMotion = (): boolean => {
  const [reduced, setReduced] = useState(
    () => document.documentElement.classList.contains("a11y-reduce-motion")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setReduced(document.documentElement.classList.contains("a11y-reduce-motion"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return reduced;
};
