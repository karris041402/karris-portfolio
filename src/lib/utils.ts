// Small shared helpers.

/** "#22d3ee" -> "34 211 238" (space-separated, for `rgb(var(--c1) / 0.5)`). */
export const hexToRgb = (hex: string): string => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

/** "#22d3ee", 0.4 -> "rgba(34,211,238,0.4)" (for canvas drawing). */
export const rgba = (hex: string, a: number): string => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const isSmallScreen = (): boolean => window.matchMedia('(max-width: 768px)').matches;
export const hasFinePointer = (): boolean => window.matchMedia('(pointer: fine)').matches;

/** Resolves "/images/x.jpg" against Vite's base path so GitHub Pages sub-paths work. */
export const asset = (src: string): string => {
  const base = import.meta.env.BASE_URL;
  // URLs produced by Vite imports already include the base path; plain "/images/x" paths don't.
  if (!src || !src.startsWith('/') || src.startsWith(base)) return src;
  return base + src.slice(1);
};
