import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projectFilters, projects, projectsSection } from '../data/content';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="container-x">
        <SectionHeading id="projects-title" title={projectsSection.title} subtitle={projectsSection.subtitle} />

        <Reveal>
          <div role="group" aria-label="Filter projects by category" className="mb-12 flex flex-wrap justify-center gap-3">
            {projectFilters.map((f) => {
              const on = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.value)}
                  className={`relative rounded-full border px-5 py-2 text-sm font-medium transition ${
                    on ? 'border-primary/60 text-white' : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 shadow-glow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-12 text-center text-slate-400" role="status">
            No projects in this category yet. More coming soon.
          </p>
        )}
      </div>

      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
}
