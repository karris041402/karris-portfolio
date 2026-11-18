import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Animated number that counts up once when scrolled into view. */
interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function Counter({ value, prefix = '', suffix = '', duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);
  const from = useRef(reduced ? value : 0); // when value changes later, count on from the shown number

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setN(value);
      from.current = value;
      return undefined;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        from.current = v;
        setN(Math.round(v));
      },
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
