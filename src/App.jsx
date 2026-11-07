import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { nav, pricing, profile } from './data/content';
import { SettingsProvider } from './context/SettingsContext';
import { ScrollTrigger } from './lib/gsap';
import AuroraBackground from './components/AuroraBackground';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import GridBackground from './components/GridBackground';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import About from './sections/About';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Pricing from './sections/Pricing';
import Process from './sections/Process';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Skills from './sections/Skills';

// three.js background is code-split and loaded lazily.
const ParticlesBackground = lazy(() => import('./components/ParticlesBackground'));

function Shell() {
  const [ready, setReady] = useState(false);
  const onBooted = useCallback(() => setReady(true), []);
  // Drop the Pricing link when pricing is switched off in content.js.
  const navItems = useMemo(() => nav.filter((i) => i.id !== 'pricing' || pricing.enabled), []);

  // Title + description come from content.js
  useEffect(() => {
    document.title = profile.siteTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.siteDescription);
  }, []);

  // Recalculate scroll triggers once the loader is gone and layout has settled.
  useEffect(() => {
    if (!ready) return undefined;
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence>{!ready && <Loader key="loader" onDone={onBooted} />}</AnimatePresence>

      {/* live backgrounds */}
      <AuroraBackground />
      <GridBackground />
      <Suspense fallback={null}>
        <ParticlesBackground />
      </Suspense>

      <Cursor />
      <ScrollProgress />
      <Navbar items={navItems} />

      <main id="main" className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        {pricing.enabled && <Pricing />}
        <Contact />
      </main>

      <Footer items={navItems} />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Shell />
    </SettingsProvider>
  );
}
