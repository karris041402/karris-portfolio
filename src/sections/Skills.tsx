import { skills } from '../data/content';
import { getIcon } from '../lib/icons';
import CodeRain from '../components/CodeRain';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import SkillBar from '../components/SkillBar';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <CodeRain />
      <div className="container-x relative">
        <SectionHeading id="skills-title" title={skills.title} subtitle={skills.subtitle} />
        <div className="grid gap-6 lg:grid-cols-3">
          {skills.groups.map((group, g) => {
            const Icon = getIcon(group.icon);
            return (
              <Reveal key={group.id} variant="assemble" delay={g * 0.1}>
                <div className="glass gradient-border h-full rounded-2xl bg-ink-900/60 p-6 sm:p-7">
                  <h3 className="mb-6 flex items-center gap-3 font-display text-lg font-bold text-white">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {group.title}
                  </h3>
                  <div className="space-y-5">
                    {group.items.map((s, i) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
