import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import type { Project } from '../types';
import { getProjectImages } from '../lib/projectImages';
import { profile } from '../data/content';
import SmoothImage from './SmoothImage';

/*
  Animated project detail dialog. Esc closes, Tab stays inside, focus returns to the
  card that opened it, and page scroll is locked while open.
*/
export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeFn = useRef(onClose);
  const images = useMemo(() => getProjectImages(project.folder, project.cover), [project.folder, project.cover]);
  const reduced = useReducedMotion();
  // [current index, direction of the last move] - direction drives the slide animation
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const thumbs = useRef<HTMLUListElement>(null);
  const count = Math.max(images.length, 1);
  const step = useCallback((dir: number) => setPage(([i]) => [(i + dir + count) % count, dir]), [count]);
  const goTo = (n: number) => setPage(([i]) => [n, n >= i ? 1 : -1]);

  // swipe: far enough or fast enough flips the slide, otherwise it springs back
  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (count < 2) return;
    if (offset.x < -70 || velocity.x < -450) step(1);
    else if (offset.x > 70 || velocity.x > 450) step(-1);
  };

  // keep the active thumbnail in view
  useEffect(() => {
    thumbs.current?.children[index]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [index, reduced]);
  const stepRef = useRef(step);
  stepRef.current = step;
  closeFn.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFn.current();
      if (e.key === 'ArrowLeft') stepRef.current(-1);
      if (e.key === 'ArrowRight') stepRef.current(1);
      if (e.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, []);

  const { title, longDescription, category, tech, link, featured } = project;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[95] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="glass gradient-border relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-ink-900/95 shadow-glow"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur transition hover:border-primary hover:text-primary"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative aspect-video touch-pan-y select-none overflow-hidden bg-ink-950">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={images[index] ?? 'fallback'}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: reduced ? 0 : d >= 0 ? '100%' : '-100%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: reduced ? 0 : d >= 0 ? '-100%' : '100%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 34 }}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.45}
              onDragEnd={onDragEnd}
              className={`absolute inset-0 ${count > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              <SmoothImage
                src={images[index] ?? profile.fallbackImage}
                alt={`${title} screenshot ${index + 1} of ${count}`}
                eager
                adaptive
              />
            </motion.div>
          </AnimatePresence>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur transition hover:border-primary hover:text-primary sm:grid"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur transition hover:border-primary hover:text-primary sm:grid"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <span
                className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink-950/70 px-3 py-1 font-mono text-xs text-white backdrop-blur"
                aria-hidden="true"
              >
                {index + 1} / {count}
              </span>
              <p className="sr-only">Swipe, drag, or use the left and right arrow keys to change the screenshot.</p>
            </>
          )}
        </div>
        {count > 1 && (
          <ul ref={thumbs} className="flex gap-2 overflow-x-auto bg-ink-950/60 p-3" aria-label="Screenshots">
            {images.map((url, i) => (
              <li key={url} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show screenshot ${i + 1} of ${count}`}
                  aria-current={i === index}
                  className={`block h-14 w-24 overflow-hidden rounded-md border transition ${
                    i === index ? 'border-primary shadow-glow-sm' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <SmoothImage src={url} alt="" adaptive />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
              {category}
            </span>
            {featured && (
              <span className="rounded-full border border-tertiary/40 bg-tertiary/10 px-3 py-1 text-[11px] font-medium text-tertiary">
                Featured
              </span>
            )}
          </div>
          <h3 id="project-modal-title" className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 leading-relaxed text-slate-300">{longDescription}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {tech.map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-200">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neon-gradient px-6 py-3 font-semibold text-ink-950 shadow-glow-sm transition hover:shadow-glow"
              >
                View Project <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                Case study coming soon
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
