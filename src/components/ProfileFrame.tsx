import { profile } from '../data/content';
import SmoothImage from './SmoothImage';

/* Portrait in a glowing hexagon frame with a rotating gradient ring. */
export default function ProfileFrame({ className = '', eager = false }) {
  return (
    <div className={`relative aspect-[4/5] drop-shadow-[0_0_22px_rgb(var(--c1)/0.45)] ${className}`}>
      {/* ring: oversized conic gradient rotates behind a hex mask */}
      <div className="hex-clip absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,rgb(var(--c1)),rgb(var(--c2)),rgb(var(--c3)),rgb(var(--c1)))]" />
      </div>
      <div className="hex-clip absolute inset-[3px] bg-ink-900">
        <SmoothImage src={profile.profileImage} alt={`Portrait of ${profile.name}`} width={800} height={1000} eager={eager} />
      </div>
    </div>
  );
}
