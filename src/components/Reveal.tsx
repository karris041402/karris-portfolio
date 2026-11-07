import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Spring-based reveal-on-scroll. `assemble` flies pieces in with a slight 3D tilt.
type Variant = 'up' | 'left' | 'right' | 'assemble';

const variants: Record<Variant, Variants> = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -56 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 56 }, show: { opacity: 1, x: 0 } },
  assemble: {
    hidden: { opacity: 0, y: 56, scale: 0.86, rotateX: -16 },
    show: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  },
};

interface Props {
  variant?: Variant;
  delay?: number;
  as?: 'div' | 'li' | 'p' | 'span';
  className?: string;
  children: ReactNode;
}

export default function Reveal({ variant = 'up', delay = 0, as = 'div', className = '', children }: Props) {
  const reduced = useReducedMotion();
  const Static = as;
  if (reduced) return <Static className={className}>{children}</Static>;

  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 16, delay }}
    >
      {children}
    </Tag>
  );
}
