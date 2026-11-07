import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { hero, profile } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import GlitchText from '../components/GlitchText';
import HeroGraphic from '../components/HeroGraphic';
import Logo from '../components/Logo';
import MagneticButton from '../components/MagneticButton';
import Parallax from '../components/Parallax';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

// react-type-animation sequence: type each phrase, pause, delete, next.
const sequence = hero.typingPhrases.flatMap((phrase) => [phrase, 2200]);

export default function Hero({ ready }) {
  const reduced = useReducedMotion();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Parallax speed={0.07} start="top top">
          <motion.div variants={container} initial="hidden" animate={ready ? 'show' : 'hidden'}>
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <Logo size={48} showWordmark={false} />
              {profile.availability && (
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  {profile.availability}
                </span>
              )}
            </motion.div>

            <motion.p variants={item} className="mt-8 font-mono text-sm uppercase tracking-[0.3em] text-slate-400">
              {profile.role} · {profile.location}
            </motion.p>

            <motion.h1 variants={item} id="hero-title" className="mt-3 font-display text-4xl font-black leading-tight text-white sm:text-5xl xl:text-6xl">
              Hi, I&apos;m <GlitchText text={profile.name} className="text-gradient" play={ready} />
            </motion.h1>

            <motion.p
              variants={item}
              aria-label={profile.tagline}
              className="mt-5 min-h-[3.5rem] font-display text-xl text-slate-200 sm:min-h-[2rem] sm:text-2xl"
            >
              {reduced || !ready ? (
                <span aria-hidden={!reduced}>{reduced ? profile.tagline : ' '}</span>
              ) : (
                <span aria-hidden="true">
                  <TypeAnimation sequence={sequence} wrapper="span" speed={55} deletionSpeed={70} repeat={Infinity} cursor />
                </span>
              )}
            </motion.p>

            <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {profile.valueStatement}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href={hero.primaryCta.href}>
                {hero.primaryCta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href={hero.secondaryCta.href} variant="ghost">
                <Mail className="h-4 w-4" aria-hidden="true" /> {hero.secondaryCta.label}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </Parallax>

        <Parallax speed={-0.05} start="top top">
          <HeroGraphic ready={ready} />
        </Parallax>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float text-primary sm:block"
      >
        <ArrowDown className="h-6 w-6" aria-hidden="true" />
      </a>
    </section>
  );
}
