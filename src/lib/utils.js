// Small shared helpers.

/** "#22d3ee" -> "34 211 238" (space-separated, for `rgb(var(--c1) / 0.5)`). */
export const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

/** "#22d3ee", 0.4 -> "rgba(34,211,238,0.4)" (for canvas drawing). */
export const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const isSmallScreen = () => window.matchMedia('(max-width: 768px)').matches;
export const hasFinePointer = () => window.matchMedia('(pointer: fine)').matches;

/** Resolves "/images/x.jpg" against Vite's base path so GitHub Pages sub-paths work. */
export const asset = (src) =>
  src && src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src;
