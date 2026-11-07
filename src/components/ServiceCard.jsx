import { Check } from 'lucide-react';
import { getIcon } from '../lib/icons';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

/* Service card: tilt + glow, with a "What you get" checklist. */
export default function ServiceCard({ service, index, className = '' }) {
  const Icon = getIcon(service.icon);
  return (
    <Reveal variant="assemble" delay={(index % 3) * 0.08} as="li" className={`h-full list-none ${className}`}>
      <TiltCard className="flex flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-start justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm text-slate-600" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.description}</p>

        <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-widest text-primary">What you get</p>
        <ul className="space-y-2 text-sm text-slate-300">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </TiltCard>
    </Reveal>
  );
}
