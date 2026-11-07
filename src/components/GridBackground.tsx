import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

/*
  Cyber grid: a flat grid that shifts opposite the mouse (depth), plus a perspective
  "floor" grid that streams toward the viewer and slides slightly with scroll.
*/
export default function GridBackground() {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const gx = useSpring(useTransform(mouse.x, [-1, 1], [14, -14]), { stiffness: 50, damping: 20 });
  const gy = useSpring(useTransform(mouse.y, [-1, 1], [10, -10]), { stiffness: 50, damping: 20 });
  const floorY = useTransform(scrollY, (v) => Math.min(v * 0.06, 120));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div style={{ x: gx, y: gy }} className="cyber-grid-flat absolute -inset-10" />
      <motion.div
        style={{ y: floorY }}
        className="absolute inset-x-0 bottom-0 h-[50vh] [mask-image:linear-gradient(to_top,#000,transparent)] [perspective:520px]"
      >
        <div className="cyber-grid-floor absolute -inset-x-1/2 bottom-0 h-[220%] origin-bottom animate-grid-move opacity-40 [transform:rotateX(64deg)]" />
      </motion.div>
    </div>
  );
}
