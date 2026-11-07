import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import type { Project } from '../types';
import SmoothImage from './SmoothImage';
import TiltCard from './TiltCard';

/*
  Project card. Clicking anywhere opens the detail modal (keyboard users use the title button).
  The "View Project" link is a real <a target="_blank" rel="noopener noreferrer">.
  forwardRef is required so AnimatePresence "popLayout" can measure the card.
*/
const ProjectCard = forwardRef<HTMLElement, { project: Project; onOpen: (project: Project) => void }>(function ProjectCard(
  { project, onOpen },
  ref,
) {
  const { title, description, category, tech, image, link, featured } = project;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('a')) onOpen(project);
      }}
      className="cursor-pointer"
    >
      <TiltCard max={6} className="flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <SmoothImage
            src={image}
            alt={`${title} preview`}
            width={1280}
            height={720}
            imgClassName="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary backdrop-blur">
            {category}
          </span>
          {featured && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-tertiary/40 bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-tertiary backdrop-blur">
              <Star className="h-3 w-3" aria-hidden="true" /> Featured
            </span>
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-primary/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="rounded-full border border-primary/60 bg-ink-950/70 px-4 py-2 text-sm font-semibold text-white shadow-glow-sm">
              View details
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold text-white">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="text-left transition-colors hover:text-primary"
              aria-label={`${title}: open project details`}
            >
              {title}
            </button>
          </h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {tech.map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-5">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3 hover:text-white"
              >
                View Project <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                Case study coming soon
              </span>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
});

export default ProjectCard;
