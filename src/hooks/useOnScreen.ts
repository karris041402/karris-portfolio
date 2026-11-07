import { useEffect, useState, type RefObject } from "react";

/** true while the browser tab is visible. */
export function usePageVisible() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

/**
 * true only while `ref`'s element is near the viewport AND the tab is visible.
 * Used to pause canvases / WebGL / animation loops that nobody can see.
 */
export function useOnScreen(ref: RefObject<Element>, { rootMargin = "120px" }: { rootMargin?: string } = {}) {
  const [inView, setInView] = useState(false);
  const pageVisible = usePageVisible();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return inView && pageVisible;
}
