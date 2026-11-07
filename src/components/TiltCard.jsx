import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/*
  Glass card with 3D tilt toward the pointer and a glow spotlight that follows it.
  CSS variables --mx/--my are written straight to the DOM (no React re-renders).
*/
export default function TiltCard({ children, className = '', max = 9 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    if (reduced || e.pointerType === 'touch') return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="h-full [perspective:1000px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className={`glass gradient-border group relative h-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-glow-sm ${className}`}
      >
        <span
          aria-hidden="true"
          className="spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {children}
      </motion.div>
    </div>
  );
}
