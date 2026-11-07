import { useRef, type ComponentPropsWithoutRef, type PointerEvent, type Ref, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-semibold tracking-wide transition-shadow duration-300 focus-visible:outline-offset-4';
const styles = {
  primary: 'bg-neon-gradient text-ink-950 shadow-glow-sm hover:shadow-glow',
  ghost: 'glass gradient-border text-white hover:shadow-glow-sm',
};

type ButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'style'
>;

interface Props extends ButtonProps {
  /** Pass `href` to render a real <a>; otherwise renders a <button>. */
  href?: string;
  variant?: keyof typeof styles;
  strength?: number;
  /** Open the link in a new tab (adds rel="noopener noreferrer"). */
  external?: boolean;
  children: ReactNode;
}

/*
  Button / link that gets pulled toward the cursor (magnetic), with a light sweep on hover.
*/
export default function MagneticButton({
  href,
  variant = 'primary',
  strength = 0.35,
  external = false,
  className = '',
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (reduced || e.pointerType === 'touch' || !el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  // motion.a and motion.button share the props used here; one cast keeps the JSX simple.
  const Tag = (href ? motion.a : motion.button) as typeof motion.button;
  const linkProps = href
    ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: 'button' as const };

  return (
    <Tag
      ref={ref as Ref<HTMLButtonElement>}
      {...linkProps}
      {...rest}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {/* light sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shimmer group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  );
}
