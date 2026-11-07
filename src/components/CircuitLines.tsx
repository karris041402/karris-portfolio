import { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

// Right-angle circuit traces on a 1200x800 canvas, each with a node at the end.
const TRACES = [
  { d: 'M0 140 H220 L280 200 H520 L560 160 H900', node: [900, 160], delay: '0s' },
  { d: 'M1200 260 H980 L930 310 H700 L650 360 H420', node: [420, 360], delay: '-1.2s' },
  { d: 'M0 520 H180 L240 580 H460 L520 520 H820', node: [820, 520], delay: '-2.4s' },
  { d: 'M1200 660 H1000 L950 610 H740 L690 660 H520', node: [520, 660], delay: '-3.6s' },
  { d: 'M300 0 V120 L340 160 V320 L300 360 V520', node: [300, 520], delay: '-0.6s' },
  { d: 'M880 800 V690 L920 650 V500 L880 460 V320', node: [880, 320], delay: '-1.8s' },
];

/* Pulsing circuit lines for the Services background. Animation pauses off-screen. */
export default function CircuitLines() {
  const ref = useRef(null);
  const visible = useOnScreen(ref);

  return (
    <div ref={ref} aria-hidden="true" className="fade-edges pointer-events-none absolute inset-0 overflow-hidden opacity-50">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {TRACES.map((t) => (
          <g key={t.d} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={t.d} className="stroke-primary/15" strokeWidth="1.5" />
            <path
              d={t.d}
              className="animate-circuit-pulse stroke-primary"
              strokeWidth="2.2"
              strokeDasharray="70 390"
              pathLength="460"
              style={{ animationDelay: t.delay, animationPlayState: visible ? 'running' : 'paused' }}
            />
            <circle cx={t.node[0]} cy={t.node[1]} r="5" className="fill-ink-950 stroke-primary/70" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
