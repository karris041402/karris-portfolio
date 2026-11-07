import { Check } from 'lucide-react';
import { about, profile } from '../data/content';
import Counter from '../components/Counter';
import Parallax from '../components/Parallax';
import ProfileFrame from '../components/ProfileFrame';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SmoothImage from '../components/SmoothImage';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-x">
        <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />

        {/* banner with parallax image */}
        <Reveal>
          <div className="gradient-border relative aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[21/9]">
            <Parallax speed={0.12} className="absolute -inset-y-[12%] inset-x-0">
              <SmoothImage src={profile.aboutBanner} alt="" width={1920} height={820} />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="relative z-10 -mt-14 grid gap-8 px-0 sm:-mt-24 sm:gap-10 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-14">
          <Reveal variant="left" className="mx-auto w-40 sm:w-64 lg:w-full">
            <ProfileFrame />
          </Reveal>

          <div className="pt-4 lg:pt-28">
            <Reveal>
              <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                {about.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" aria-hidden="true" /> {h}
                  </li>
                ))}
              </ul>
              {about.perfectFor?.length > 0 && (
                <div className="mt-8">
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

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((s, i) => (
                <Reveal key={s.label} variant="assemble" delay={i * 0.08}>
                  <div className="glass gradient-border rounded-2xl p-5 text-center">
                    <dd className="font-display text-3xl font-black text-gradient">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="mt-1 text-xs text-slate-400">{s.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
