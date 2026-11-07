import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Counter from './Counter';

/* Animated skill bar: fills with a spring when scrolled into view. */
export default function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-200">{name}</span>
        <span className="font-mono text-xs text-primary">
          <Counter value={level} suffix="%" />
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        className="h-2 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          className="h-full origin-left rounded-full bg-neon-gradient shadow-glow-sm"
          initial={{ scaleX: reduced ? level / 100 : 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 55, damping: 18, delay }}
        />
      </div>
    </div>
  );
}
