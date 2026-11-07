import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

/* Glowing scroll-progress line pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { smooth } = useScrollProgress();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]" aria-hidden="true">
      <motion.div
        style={{ scaleX: smooth }}
        className="h-full origin-left bg-neon-gradient shadow-[0_0_14px_2px_rgb(var(--c1)/0.8)]"
      />
    </div>
  );
}
