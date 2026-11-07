import { useEffect, useRef } from 'react';
import { effects } from '../data/content';
import { useSettings } from '../context/SettingsContext';
import { useOnScreen } from '../hooks/useOnScreen';
import { isSmallScreen, rgba } from '../lib/utils';

const GLYPHS = '01{}[]()<>/=;:+-*&|$#_ABCDEFxyz'.split('');

/*
  Matrix-style code rain behind the Skills section. Fills its (relative) parent.
  Runs only while visible, throttled to ~24fps; draws one static frame under reduced motion.
*/
export default function CodeRain() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const { reduced, theme } = useSettings();
  const visible = useOnScreen(wrapRef);

  useEffect(() => {
    if (!effects.codeRain) return undefined;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = isSmallScreen() ? 16 : 18;
    let cols = 0;
    let drops = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / size);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const step = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.09)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = `${size - 3}px ui-monospace, Menlo, Consolas, monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * size;
        ctx.fillStyle = rgba(theme.c1, 0.85);
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * size, y);
        if (y > h && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 1;
      }
    };

    if (reduced || !visible) {
      if (reduced) for (let k = 0; k < 40; k++) step(); // one static frame
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 42) return;
      last = t;
      step();
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [visible, reduced, theme]);

  if (!effects.codeRain) return null;
  return (
    <div ref={wrapRef} aria-hidden="true" className="fade-edges pointer-events-none absolute inset-0 opacity-30">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
