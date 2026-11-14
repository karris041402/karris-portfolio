import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { nav, profile } from './data/content';
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
import Process from './sections/Process';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Skills from './sections/Skills';

// three.js background is code-split and loaded lazily.
const ParticlesBackground = lazy(() => import('./components/ParticlesBackground'));

function Shell() {
  const [ready, setReady] = useState(false);
  const onBooted = useCallback(() => setReady(true), []);

  // Title + description come from content.ts
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
      <Navbar items={nav} />

      <main id="main" className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        <Contact />
      </main>

      <Footer items={nav} />
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
