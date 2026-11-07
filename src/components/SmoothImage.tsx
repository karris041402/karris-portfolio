import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/content';
import { asset } from '../lib/utils';

/*
  Image with: lazy loading, width/height (no layout shift), skeleton shimmer,
  blur-up fade-in, and automatic fallback to the placeholder if the file is missing.
  The wrapper fills its parent; size the parent (e.g. with aspect-video).
*/
interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
}

export default function SmoothImage({ src, alt, width, height, eager = false, className = '', imgClassName = '' }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [current, setCurrent] = useState(asset(src));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrent(asset(src));
    setLoaded(false);
  }, [src]);

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
  }, [current]);

  const onError = () => {
    const fallback = asset(profile.fallbackImage);
    if (current !== fallback) setCurrent(fallback);
    else setLoaded(true); // even the fallback failed: stop the skeleton
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-800 ${className}`}>
      {!loaded && (
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/2 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </span>
      )}
      <img
        ref={imgRef}
        src={current}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={onError}
        className={`h-full w-full object-cover transition duration-700 ${
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-lg'
        } ${imgClassName}`}
      />
    </div>
  );
}
