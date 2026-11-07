import { useEffect, useRef } from 'react';
import { process } from '../data/content';
import { gsap } from '../lib/gsap';
import { getIcon } from '../lib/icons';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Reveal from './Reveal';

/*
  Self-drawing timeline. A GSAP ScrollTrigger scrubs the glowing spine from top to bottom
  as you scroll, and each step "ignites" (adds .is-active) when the line reaches it.
*/
export default function Timeline() {
  const root = useRef(null);
  const line = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const nodes = root.current.querySelectorAll('[data-node]');
    if (reduced) {
      gsap.set(line.current, { scaleY: 1 });
      nodes.forEach((n) => n.classList.add('is-active'));
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 65%', end: 'bottom 70%', scrub: 0.5 },
        },
      );
      nodes.forEach((node) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 65%',
            onEnter: () => node.classList.add('is-active'),
            onLeaveBack: () => node.classList.remove('is-active'),
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={root} className="relative mx-auto max-w-4xl">
      {/* spine */}
      <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
        <div
          ref={line}
          className="h-full w-full origin-top bg-gradient-to-b from-primary via-secondary to-tertiary shadow-[0_0_14px_2px_rgb(var(--c1)/0.7)]"
        />
      </div>

      <ol className="space-y-12 md:space-y-20">
        {process.steps.map((step, i) => {
          const Icon = getIcon(step.icon);
          const left = i % 2 === 0;
          return (
            <li key={step.title} data-node className="group/step relative pl-16 md:pl-0">
              {/* node on the spine */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-6 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-ink-900 text-slate-500 transition-all duration-500 group-[.is-active]/step:border-primary group-[.is-active]/step:text-primary group-[.is-active]/step:shadow-glow md:left-1/2"
              >
                <Icon className="h-5 w-5" />
              </span>

              <Reveal variant={left ? 'left' : 'right'} className={`md:w-1/2 ${left ? 'md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                <div className="glass gradient-border rounded-2xl p-6 transition-shadow duration-500 group-[.is-active]/step:shadow-glow-sm">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
