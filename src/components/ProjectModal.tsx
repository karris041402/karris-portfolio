import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../types';
import SmoothImage from './SmoothImage';

/*
  Animated project detail dialog. Esc closes, Tab stays inside, focus returns to the
  card that opened it, and page scroll is locked while open.
*/
export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeFn = useRef(onClose);
  closeFn.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFn.current();
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

  const { title, longDescription, category, tech, image, link, featured } = project;

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

        <div className="aspect-video">
          <SmoothImage src={image} alt={`${title} preview`} width={1280} height={720} eager />
        </div>

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
