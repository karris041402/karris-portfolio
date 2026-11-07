import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { effects } from '../data/content';
import { useSettings } from '../context/SettingsContext';
import { useMousePosition } from '../hooks/useMousePosition';
import { hasFinePointer } from '../lib/utils';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor]';

/*
  Glowing cursor follower (dot + ring) with a particle trail drawn on a canvas.
  Only for mouse users (fine pointer); disabled by "Reduce motion".
  The native cursor stays visible for accessibility.
*/
export default function Cursor() {
  const { reduced, theme } = useSettings();
  const mouse = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  const dotX = useSpring(mouse.px, { stiffness: 900, damping: 45, mass: 0.2 });
  const dotY = useSpring(mouse.py, { stiffness: 900, damping: 45, mass: 0.2 });
  const ringX = useSpring(mouse.px, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouse.py, { stiffness: 220, damping: 22, mass: 0.5 });

  useEffect(() => {
    setEnabled(effects.cursor && !reduced && hasFinePointer());
  }, [reduced]);

  // Hover state: grow the ring over links/buttons
  useEffect(() => {
    if (!enabled) return undefined;
    const over = (e: PointerEvent) => setHover(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    window.addEventListener('pointerover', over, { passive: true });
    return () => window.removeEventListener('pointerover', over);
  }, [enabled]);

  // Particle trail. The rAF loop only runs while particles exist.
  useEffect(() => {
    if (!enabled) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const parts: { x: number; y: number; vx: number; vy: number; r: number; life: number; color: string }[] = [];
    const colors = [theme.c1, theme.c2, theme.c3];
    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= 0.03;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = parts.length ? requestAnimationFrame(loop) : 0;
      if (!raf) ctx.clearRect(0, 0, w, h);
    };

    const onMove = (e: PointerEvent) => {
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 7) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (parts.length < 60) {
        parts.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 2 + Math.random() * 2.5,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [enabled, theme]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0 -ml-[18px] -mt-[18px] h-9 w-9">
        <div
          className={`h-full w-full rounded-full border border-primary/70 transition-transform duration-200 ${
            hover ? 'scale-150 bg-primary/10' : 'scale-100'
          }`}
        />
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_3px_rgb(var(--c1)/0.8)]"
      />
    </div>
  );
}
