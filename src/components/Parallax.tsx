import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

/*
  GSAP ScrollTrigger parallax layer. Moves its children vertically as you scroll.
  speed 0.1 = drifts up to 10% of its own height. Negative speed reverses direction.
  start="top top" for elements already on screen at page load (hero).
*/
interface Props {
  speed?: number;
  start?: string;
  className?: string;
  children: ReactNode;
}

export default function Parallax({ speed = 0.1, start = 'top bottom', className = '', children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { yPercent: start === 'top top' ? 0 : speed * 100 },
        {
          yPercent: -speed * 100,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start, end: 'bottom top', scrub: 0.6 },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [speed, start, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
