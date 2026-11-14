import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

/* Accent-color switcher + "Reduce motion" toggle in a small popover. Choices persist. */
export default function SettingsMenu() {
  const { accents, accentId, setAccentId, reduced, setReduceMotion, lite, setLite } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Display settings: accent color and motion"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-primary transition hover:border-primary/60 hover:shadow-glow-sm"
      >
        <Palette className="h-5 w-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="group"
            aria-label="Display settings"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="glass gradient-border absolute right-0 top-14 z-50 w-[min(16rem,calc(100vw-2rem))] rounded-2xl bg-ink-900/90 p-4 shadow-glow-sm"
          >
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-slate-400">Accent color</p>
            <div role="radiogroup" aria-label="Accent color" className="flex gap-3">
              {accents.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="radio"
                  aria-checked={a.id === accentId}
                  aria-label={a.name}
                  title={a.name}
                  onClick={() => setAccentId(a.id)}
                  style={{ backgroundImage: `linear-gradient(135deg, ${a.c1}, ${a.c2} 60%, ${a.c3})` }}
                  className={`h-9 w-9 rounded-full transition ${
                    a.id === accentId ? 'ring-2 ring-white ring-offset-2 ring-offset-ink-900' : 'opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span id="reduce-label" className="text-sm text-white">
                Reduce motion
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={reduced}
                aria-labelledby="reduce-label"
                onClick={() => setReduceMotion(!reduced)}
                className={`relative h-6 w-11 rounded-full transition-colors ${reduced ? 'bg-primary' : 'bg-white/15'}`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    reduced ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span id="lite-label" className="text-sm text-white">
                Lite mode <span className="text-xs text-white/50">(smoother on weak GPUs)</span>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={lite}
                aria-labelledby="lite-label"
                onClick={() => setLite(!lite)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${lite ? 'bg-primary' : 'bg-white/15'}`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    lite ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
