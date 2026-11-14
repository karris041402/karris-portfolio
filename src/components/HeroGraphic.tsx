import { lazy, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { hero } from '../data/content';
import { useSettings } from '../context/SettingsContext';
import { useMousePosition } from '../hooks/useMousePosition';
import { useOnScreen } from '../hooks/useOnScreen';
import { getIcon } from '../lib/icons';
import ErrorBoundary from './ErrorBoundary';
import ProfileFrame from './ProfileFrame';

// three.js is split into its own chunk and loaded lazily.
const HeroScene = lazy(() => import('./HeroScene'));

// Shown if WebGL is unavailable.
function StaticFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="h-3/5 w-3/5 animate-spin-slow rounded-full border border-primary/40" />
      <div className="absolute h-2/5 w-2/5 rounded-full border border-secondary/50 shadow-glow" />
    </div>
  );
}

/* 3D hero object + floating UI chips + portrait slot. Pauses when off-screen / tab hidden. */
export default function HeroGraphic({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useOnScreen(ref);
  const mouse = useMousePosition();
  const { reduced, theme, lite } = useSettings();

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-primary/15 blur-3xl" />

      <ErrorBoundary fallback={<StaticFallback />}>
        <Suspense fallback={null}>
          <div className="pointer-events-none absolute -inset-[20%]" aria-hidden="true">
            <HeroScene colors={[theme.c1, theme.c2, theme.c3]} mouse={mouse} reduced={reduced} active={active} lite={lite} />
          </div>
        </Suspense>
      </ErrorBoundary>

      {/* floating UI fragments */}
      {hero.chips.map((chip, i) => {
        const Icon = getIcon(chip.icon);
        return (
          <motion.div
            key={chip.label}
            className={`absolute ${chip.position} z-10`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.8 + i * 0.15 }}
          >
            <div
              className="glass gradient-border flex animate-float items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-white shadow-glow-sm sm:text-sm"
              style={{ animationDelay: `${i * 1.3}s` }}
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {chip.label}
            </div>
          </motion.div>
        );
      })}

      {/* portrait in hex frame */}
      <motion.div
        className="absolute -bottom-2 right-0 z-10 w-28 sm:w-36"
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.6 }}
      >
        <ProfileFrame eager />
      </motion.div>
    </div>
  );
}
