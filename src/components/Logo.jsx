import { useId } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { asset } from '../lib/utils';

/*
  <Logo /> — original hexagon + circuit monogram, drawn as inline SVG.
  All colors come from the CSS variables (--c1/--c2/--c3), so it follows the accent switcher.

  Props
    animated      line-draw on mount + glow pulse (navbar, loader). Static for the footer.
    showWordmark  show the brand name beside the mark.
    size          mark size in px.

  EDIT: to use your own logo file instead, put it at public/images/logo.svg
  and set `logoImage: "/images/logo.svg"` in src/data/content.js.
*/

const HEX = 'M32 3 L58 18 L58 46 L32 61 L6 46 L6 18 Z';
const INNER = 'M32 11 L51 22 L51 42 L32 53 L13 42 L13 22 Z';
// Circuit traces from the outer hexagon corners into the inner one, plus two inner "chip" traces.
const TRACES = ['M32 3 V11', 'M58 18 L51 22', 'M58 46 L51 42', 'M32 61 V53', 'M6 46 L13 42', 'M6 18 L13 22', 'M13 33 H19 L22 36', 'M51 33 H45 L42 36'];
const NODES = [[22, 36], [42, 36]];

export default function Logo({ animated = false, showWordmark = true, size = 44, className = '' }) {
  const gradientId = useId().replace(/:/g, '');
  const reduced = useReducedMotion();
  const draw = animated && !reduced;

  if (profile.logoImage) {
    return (
      <img
        src={asset(profile.logoImage)}
        alt={`${profile.brand} logo`}
        height={size}
        className={`w-auto ${className}`}
        style={{ height: size }}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label={`${profile.brand} logo`}
        className={draw ? 'animate-glow-pulse' : ''}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="[stop-color:rgb(var(--c1))]" />
            <stop offset="0.55" className="[stop-color:rgb(var(--c2))]" />
            <stop offset="1" className="[stop-color:rgb(var(--c3))]" />
          </linearGradient>
        </defs>
        <path d={HEX} className="fill-ink-900/80" />
        {/* gradient stroke applied through attribute (url() is valid here) */}
        <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {draw ? (
            <motion.path d={HEX} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
          ) : (
            <path d={HEX} />
          )}
          <g strokeWidth="1.2" opacity="0.7">
            {draw ? (
              <motion.path d={INNER} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }} />
            ) : (
              <path d={INNER} />
            )}
            {TRACES.map((d, i) =>
              draw ? (
                <motion.path key={d} d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6 + i * 0.07 }} />
              ) : (
                <path key={d} d={d} />
              ),
            )}
          </g>
        </g>
        {NODES.map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="1.6" fill={`url(#${gradientId})`} />
        ))}
        <text
          x="32"
          y="38.5"
          textAnchor="middle"
          fontSize={profile.initials.length > 2 ? 14 : 19}
          letterSpacing="1"
          fill={`url(#${gradientId})`}
          className="font-display font-black"
        >
          {profile.initials}
        </text>
      </svg>

      {showWordmark && (
        <span className="font-display text-lg font-bold uppercase tracking-[0.18em] text-white sm:text-xl">
          {profile.brand}
        </span>
      )}
    </span>
  );
}
