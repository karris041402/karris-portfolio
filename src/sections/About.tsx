import { getIcon } from '../lib/icons';
import { about } from '../data/content';
import Counter from '../components/Counter';
import ProfileFrame from '../components/ProfileFrame';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

/* Layout: [photo | bio + perfect-for] on top, then a row of highlight cards, then a row of stats. */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-x">
        <SectionHeading id="about-title" title={about.title} />

        <div className="grid items-center gap-8 md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <Reveal variant="left" className="mx-auto w-44 sm:w-56 md:w-full">
            <ProfileFrame />
          </Reveal>

          <Reveal>
            <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {about.perfectFor?.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-primary">Perfect for</p>
                <ul className="flex flex-wrap gap-2">
                  {about.perfectFor.map((p) => (
                    <li key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {about.highlights.map((h, i) => {
            const Icon = getIcon(h.icon);
            return (
              <Reveal key={h.title} as="li" delay={i * 0.08} className="glass gradient-border flex gap-3 rounded-2xl p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{h.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{h.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} variant="assemble" delay={i * 0.08}>
              <div className="glass gradient-border rounded-2xl p-4 text-center">
                <dd className="font-display text-3xl font-black text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs text-slate-400">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
