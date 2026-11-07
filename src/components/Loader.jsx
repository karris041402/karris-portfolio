import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Logo from './Logo';

const LINES = ['BOOT SEQUENCE', 'LOADING MODULES', 'RENDERING INTERFACE', 'SYSTEM READY'];
const RADIUS = 66;
const CIRC = 2 * Math.PI * RADIUS;

/* Boot-up screen: progress ring, scanning line and logo reveal. Wipes away when done. */
export default function Loader({ onDone }) {
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // lock scroll while booting
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const duration = reduced ? 500 : 2400;
    const t0 = performance.now();
    let raf = 0;
    let timer = 0;
    const tick = (t) => {
      const k = Math.min(Math.max((t - t0) / duration, 0), 1);
      setP(Math.round((1 - (1 - k) ** 3) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(() => doneRef.current(), reduced ? 0 : 400);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink-950"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* scanning line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 h-24 animate-scan bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="cyber-grid-flat absolute inset-0 opacity-70" />
      </div>

      <div className="relative flex flex-col items-center gap-8 px-4 text-center">
        <div className="relative grid h-44 w-44 place-items-center">
          <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="80" cy="80" r={RADIUS} className="fill-none stroke-white/10" strokeWidth="3" />
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              className="fill-none stroke-primary drop-shadow-[0_0_8px_rgb(var(--c1))]"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - p / 100)}
            />
          </svg>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
          >
            <Logo animated showWordmark={false} size={84} />
          </motion.div>
        </div>

        <div>
          <p className="font-display text-3xl font-bold tabular-nums text-white">{p}%</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-primary">
            {LINES[Math.min(LINES.length - 1, Math.floor(p / 26))]}
            <span className="animate-blink">_</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
