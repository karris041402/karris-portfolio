// Finds the screenshots you drop into src/assets/project/<folder>/.
// Vite bundles them (hashed filename, long cache) and gives us their URLs here.
const modules = import.meta.glob<string>('../assets/project/**/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// numeric collation: "shot-2" sorts before "shot-10"
const collator = new Intl.Collator(undefined, { numeric: true });

/**
 * All images of a project folder, sorted by filename.
 * `cover` (a filename inside the folder) is moved to the front and used on the card.
 * Folder names are case-sensitive (Vercel runs on Linux).
 */
export function getProjectImages(folder: string, cover?: string): string[] {
  const prefix = `../assets/project/${folder}/`;
  const entries = Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => collator.compare(a, b));
  const urls = entries.map(([, url]) => url);
  const hit = cover ? entries.find(([path]) => path.endsWith(`/${cover}`)) : undefined;
  return hit ? [hit[1], ...urls.filter((u) => u !== hit[1])] : urls;
}
