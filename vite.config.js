import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// EDIT (GitHub Pages only): set VITE_BASE to "/your-repo-name/" when building,
// e.g.  VITE_BASE=/my-portfolio/ npm run build
// Vercel / Netlify / custom domain: leave it alone (defaults to "/").
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split heavy libraries so the first paint loads less JS.
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
