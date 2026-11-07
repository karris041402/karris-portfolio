import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SmoothImage from './SmoothImage';

interface Props {
  images: string[];
  alt: string;
  /** true while the card is hovered / focused: the images start crossfading */
  playing: boolean;
  intervalMs?: number;
}

/*
  Card preview that crossfades through a project's screenshots while `playing`.
  Only the cover is mounted at first; the rest load the first time you hover,
  and it snaps back to the cover when you leave. Static under reduced motion.
*/
export default function ImageCycler({ images, alt, playing, intervalMs = 1500 }: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [armed, setArmed] = useState(false);
  const many = images.length > 1 && !reduced;

  useEffect(() => {
    if (!playing || !many) {
      setIndex(0);
      return undefined;
    }
    setArmed(true);
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => window.clearInterval(id);
  }, [playing, many, images.length, intervalMs]);

  const mounted = armed && many ? images : images.slice(0, 1);

  return (
    <>
      {mounted.map((src, i) => (
        <div
          key={src}
          aria-hidden={i === 0 ? undefined : true}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <SmoothImage
            src={src}
            alt={i === 0 ? alt : ''}
            width={1280}
            height={720}
            adaptive
            imgClassName="transition-transform duration-[2500ms] group-hover:scale-105"
          />
        </div>
      ))}

      {many && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-3 left-3 flex gap-1.5 transition-opacity duration-300 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {images.slice(0, 10).map((src, i) => (
            <span
              key={src}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? 'w-5 bg-primary shadow-glow-sm' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
