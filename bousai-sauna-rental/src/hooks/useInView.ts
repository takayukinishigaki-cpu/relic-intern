import { useEffect, useRef, useState } from "react";

/** 要素が画面内に入っているかを返す。once=true なら一度入ったら true のまま */
export function useInView<T extends Element>({
  once = false,
  rootMargin = "0px",
  threshold = 0,
  initial = false,
}: { once?: boolean; rootMargin?: string; threshold?: number; initial?: boolean } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView] as const;
}
