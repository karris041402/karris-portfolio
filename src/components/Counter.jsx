import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Animated number that counts up once when scrolled into view. */
export default function Counter({ value, prefix = '', suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setN(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
