import { forwardRef, useMemo, useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import type { Project } from '../types';
import { getProjectImages } from '../lib/projectImages';
import { profile } from '../data/content';
import ImageCycler from './ImageCycler';
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
  const { title, description, category, tech, folder, cover, link, featured } = project;
  const images = useMemo(() => {
    const found = getProjectImages(folder, cover);
    return found.length ? found : [profile.fallbackImage];
  }, [folder, cover]);
  // hover (mouse only) or keyboard focus starts the preview slideshow
  const [playing, setPlaying] = useState(false);
  const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && setPlaying(true);

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
      onPointerEnter={onEnter}
      onPointerLeave={() => setPlaying(false)}
      onFocus={() => setPlaying(true)}
      onBlur={() => setPlaying(false)}
      className="cursor-pointer"
    >
      <TiltCard max={6} className="flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <ImageCycler images={images} alt={`${title} preview`} playing={playing} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
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
            className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-primary/60 bg-ink-950/70 px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-glow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
          >
            View details
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
