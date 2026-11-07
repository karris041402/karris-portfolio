import { useScroll, useSpring } from 'framer-motion';

/**
 * Page scroll progress.
 *  progress: raw 0..1 MotionValue, scrollY: pixels, smooth: spring-eased 0..1 (for the progress bar).
 */
export function useScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return { progress: scrollYProgress, smooth, scrollY };
}
