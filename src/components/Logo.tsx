import { profile } from '../data/content';

/*
  <Logo /> — round profile photo with a gradient ring, plus the brand wordmark.
  Colors come from the CSS variables (--c1/--c2/--c3), so the ring follows the accent switcher.

  Props
    animated      glow pulse (navbar, loader). Static for the footer.
    showWordmark  show the brand name beside the photo.
    size          photo size in px.
*/
export default function Logo({ animated = false, showWordmark = true, size = 44, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`shrink-0 rounded-full bg-gradient-to-br from-primary via-secondary to-tertiary p-[2px] ${animated ? 'animate-glow-pulse' : ''}`}
        style={{ width: size, height: size }}
      >
        <img
          src={profile.profileImage}
          alt={`${profile.name} profile photo`}
          width={size}
          height={size}
          className="h-full w-full rounded-full bg-ink-900 object-cover object-top"
        />
      </span>

      {showWordmark && (
        <span className="font-display text-lg font-bold uppercase tracking-[0.18em] text-white sm:text-xl">
          {profile.brand}
        </span>
      )}
    </span>
  );
}
