import { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useMousePosition } from '../hooks/useMousePosition';
import { useOnScreen } from '../hooks/useOnScreen';
import { isSmallScreen, rgba } from '../lib/utils';

/*
  Drifting constellation points for the Contact background. Nearby points connect,
  and points near the cursor link to it. Runs only while visible.
*/
export default function Constellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduced, theme } = useSettings();
  const mouse = useMousePosition();
  const visible = useOnScreen(wrapRef);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return undefined;
    let w = 0;
    let h = 0;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / (isSmallScreen() ? 22000 : 14000));
      pts = Array.from({ length: Math.min(n, 90) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const rect = wrap.getBoundingClientRect();
      const mx = mouse.px.get() - rect.left;
      const my = mouse.py.get() - rect.top;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.fillStyle = rgba(theme.c1, 0.8);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.strokeStyle = rgba(theme.c2, (1 - d / 120) * 0.35);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(p.x - mx, p.y - my);
        if (!reduced && dm < 160) {
          ctx.strokeStyle = rgba(theme.c3, (1 - dm / 160) * 0.6);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
    };

    if (reduced || !visible) {
      draw();
      return () => ro.disconnect();
    }
    let raf = 0;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [visible, reduced, theme, mouse]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="fade-edges pointer-events-none absolute inset-0 opacity-70">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
