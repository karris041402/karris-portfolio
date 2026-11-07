import { Check } from 'lucide-react';
import type { Plan } from '../types';
import MagneticButton from './MagneticButton';
import Reveal from './Reveal';

/* Glass pricing card. The popular plan gets an animated gradient border and a badge. */
export default function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const { name, price, period, description, features, popular, cta } = plan;
  return (
    <Reveal variant="assemble" delay={index * 0.1} as="li" className="list-none">
      <div
        className={`relative h-full rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-2 ${
          popular ? 'bg-neon-gradient bg-[length:200%_200%] animate-gradient-x shadow-glow md:scale-105' : 'bg-white/10'
        }`}
      >
        {popular && (
          <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-neon-gradient px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink-950 shadow-glow-sm">
            Most Popular
          </span>
        )}
        <div className="glass flex h-full flex-col rounded-[calc(1.5rem-1.5px)] bg-ink-900/90 p-7">
          <h3 className="font-display text-lg font-bold uppercase tracking-widest text-white">{name}</h3>
          <p className="mt-4">
            {period && <span className="block text-xs uppercase tracking-wider text-slate-500">{period}</span>}
            <span className={`font-display font-black text-gradient ${price.length > 10 ? 'text-2xl' : 'text-4xl'}`}>
              {price}
            </span>
          </p>
          <p className="mt-3 text-sm text-slate-400">{description}</p>

          <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <MagneticButton href="#contact" variant={popular ? 'primary' : 'ghost'} className="mt-8 w-full">
            {cta}
          </MagneticButton>
        </div>
      </div>
    </Reveal>
  );
}
