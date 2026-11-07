import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/content';
import { asset } from '../lib/utils';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
  /** Portrait images (phone screenshots) are shown whole on a blurred backdrop instead of cropped. */
  adaptive?: boolean;
  className?: string;
  imgClassName?: string;
}

/*
  Image with: lazy loading, width/height (no layout shift), skeleton shimmer,
  blur-up fade-in, and automatic fallback to the placeholder if the file is missing.
  The wrapper fills its parent; size the parent (e.g. with aspect-video).
*/
export default function SmoothImage({
  src,
  alt,
  width,
  height,
  eager = false,
  adaptive = false,
  className = '',
  imgClassName = '',
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [current, setCurrent] = useState(asset(src));
  const [loaded, setLoaded] = useState(false);
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    setCurrent(asset(src));
    setLoaded(false);
    setPortrait(false);
  }, [src]);

  const markLoaded = (img: HTMLImageElement) => {
    setLoaded(true);
    if (adaptive) setPortrait(img.naturalHeight > img.naturalWidth * 1.1);
  };

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) markLoaded(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {portrait && (
        <img
          src={current}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-2xl"
        />
      )}
      <img
        ref={imgRef}
        src={current}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onLoad={(e) => markLoaded(e.currentTarget)}
        onError={onError}
        className={`relative h-full w-full transition duration-700 ${portrait ? 'object-contain' : 'object-cover'} ${
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-lg'
        } ${imgClassName}`}
      />
    </div>
  );
}
