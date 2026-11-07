import { motion } from 'framer-motion';
import GlitchText from './GlitchText';
import Reveal from './Reveal';

/** Eyebrow + glitch/scramble title + animated underline + subtitle. */
interface Props {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({ id, eyebrow, title, subtitle, align = 'center' }: Props) {
  const center = align === 'center';
  return (
    <div className={`mb-14 max-w-3xl md:mb-20 ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{`// ${eyebrow}`}</p>
      </Reveal>
      <h2 id={id} className="mt-3 break-words font-display text-[1.6rem] font-bold leading-tight text-white min-[400px]:text-3xl sm:text-4xl md:text-5xl">
        <GlitchText text={title} />
      </h2>
      <motion.span
        aria-hidden="true"
        className={`mt-5 block h-px w-28 bg-neon-gradient ${center ? 'mx-auto origin-center' : 'origin-left'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.2 }}
      />
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base text-slate-400 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
