import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CHARS = '!<>-_\\/[]{}=+*^?#01';

/*
  Scramble-in heading. Runs once when scrolled into view (and `play` is true),
  and again on hover. Screen readers get the real text via aria-label.
*/
export default function GlitchText({ text, as: Tag = 'span', className = '', play = true }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reduced) {
      setOut(text);
      return;
    }
    const queue = [...text].map((ch, i) => ({ ch, end: 14 + Math.floor(Math.random() * 14) + i * 0.7 }));
    let frame = 0;
    const tick = () => {
      let done = 0;
      const next = queue.map((q) => {
        if (frame >= q.end || q.ch === ' ') {
          done++;
          return q.ch;
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setOut(next.join(''));
      frame++;
      if (done < queue.length) raf.current = requestAnimationFrame(tick);
    };
    tick();
  }, [text, reduced]);

  useEffect(() => {
    if (inView && play && !started) {
      setStarted(true);
      scramble();
    }
    return undefined;
  }, [inView, play, started, scramble]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Hidden until the scramble starts so there's no flash of final text.
  const visible = started || reduced;

  return (
    <Tag
      ref={ref}
      aria-label={text}
      onPointerEnter={visible ? scramble : undefined}
      className={`${className} ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
    >
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
