# Cyber Portfolio

React 18 + Vite + Tailwind + Framer Motion + GSAP + Three.js. Static site: no backend.
**All content is in `src/data/content.ts`.** Search for `EDIT:`.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs dist/
npm run preview   # serve the build locally
```

## Structure

```
public/            favicon.svg, og-image.png, images/ (profile, about-banner, logo.svg, placeholder.svg, projects/)
src/data/content.ts  EVERYTHING you edit
src/context/       accent color + reduce-motion state
src/hooks/         useActiveSection, useMousePosition, useReducedMotion, useScrollProgress, useOnScreen
src/components/    Logo, Navbar, Loader, Cursor, backgrounds, cards, modal, form, ...
src/sections/      Hero, About, Services, Skills, Projects, Process, Contact
src/lib/           icons map, gsap setup, helpers
```

## How to

**Add a project** — in `content.ts`, copy one block in `projects`, paste, edit fields. `link: ""` shows "Case study coming soon". Category must be `"Web App"`, `"Mobile App"`, `"AI/ML"` or `"Business"` (the type checker will flag typos).

**Replace images** — overwrite the files in `public/images/` (same names) or change the path strings in `content.ts`.
Sizes: profile 800x1000, about banner 1920x820, og-image 1200x630. Project screenshots: put them in `src/assets/project/<folder>/` and set `folder` in the project block (every image in it becomes the gallery).
Missing/broken images fall back to `placeholder.svg` automatically.

**Replace the logo** — default is the animated SVG `<Logo />` built from `profile.initials` + `profile.brand`.
To use your own file: put it at `public/images/logo.svg`, then set `logoImage: "/images/logo.svg"` in `content.ts`.
Also replace `public/favicon.svg`.

**Colors** — edit the `accents` array in `content.ts` (visitors can switch via the palette button). Defaults: `--c1/--c2/--c3` in `src/index.css`.

**Animation intensity** — `effects` in `content.ts`: particle counts, aurora strength, cursor on/off, code rain on/off.
Visitors get a "Reduce motion" switch; the OS setting is honored too.

**Contact form** — create a free form at https://formspree.io, copy its URL, paste into
`contact.formspreeEndpoint` in `content.ts`. Until then the form opens the visitor's email app.

**SEO / share image** — edit `<title>` and meta tags in `index.html`; replace `https://your-domain.com` with your real domain.

## Deploy (free)

**Vercel**: push to GitHub → vercel.com → Import project → Framework "Vite" → Deploy.
**Netlify**: push to GitHub → Add new site → build `npm run build`, publish `dist`.
**GitHub Pages**: build with the repo base path, then publish `dist` (e.g. `gh-pages` branch or Actions):
```bash
VITE_BASE=/your-repo-name/ npm run build      # PowerShell: $env:VITE_BASE="/your-repo-name/"; npm run build
```

**Custom domain**: buy one from any registrar, then add it in Vercel (Settings → Domains) / Netlify (Domain management) / GitHub Pages (Settings → Pages). Add the DNS records they show (A / CNAME). HTTPS is automatic. Then update the `og:` URLs in `index.html`.
