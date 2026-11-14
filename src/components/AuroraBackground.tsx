import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { effects } from '../data/content';
import { useMousePosition } from '../hooks/useMousePosition';

/* Flowing aurora blobs. They drift on their own, lean toward the mouse and slide with scroll. */
export default function AuroraBackground() {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const mx = useSpring(useTransform(mouse.x, [-1, 1], [-50, 50]), { stiffness: 40, damping: 20 });
  const my = useSpring(useTransform(mouse.y, [-1, 1], [-35, 35]), { stiffness: 40, damping: 20 });
  const sy = useTransform(scrollY, (v) => -v * 0.07);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: effects.auroraIntensity }}
    >
      <motion.div style={{ x: mx, y: my }} className="absolute inset-0">
        <motion.div style={{ y: sy }} className="absolute inset-0">
          <div className="absolute -left-40 -top-20 h-[34rem] w-[34rem] aurora-blob animate-blob-1 rounded-full bg-primary/25 blur-[120px]" />
          <div className="absolute -right-40 top-1/4 h-[38rem] w-[38rem] aurora-blob animate-blob-2 rounded-full bg-secondary/25 blur-[130px]" />
          <div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] aurora-blob animate-blob-3 rounded-full bg-tertiary/15 blur-[120px]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
