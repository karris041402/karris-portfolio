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
          <div className="gradient-border relative aspect-[21/9] min-h-[10rem] overflow-hidden rounded-3xl">
            <Parallax speed={0.12} className="absolute -inset-y-[12%] inset-x-0">
              <SmoothImage src={profile.aboutBanner} alt="" width={1920} height={820} />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="relative z-10 -mt-16 grid gap-10 px-2 sm:-mt-24 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-14">
          <Reveal variant="left" className="mx-auto w-56 sm:w-64 lg:w-full">
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
