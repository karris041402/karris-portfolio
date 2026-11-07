/** @type {import('tailwindcss').Config} */
// Accent colors are CSS variables (--c1/--c2/--c3, set at runtime by the accent
// switcher in SettingsContext), so every `primary` / `secondary` / `tertiary`
// utility, glow and gradient re-colors instantly.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--c1) / <alpha-value>)',
        secondary: 'rgb(var(--c2) / <alpha-value>)',
        tertiary: 'rgb(var(--c3) / <alpha-value>)',
        ink: { 950: '#05060f', 900: '#080a17', 800: '#0d1024', 700: '#141833' },
      },
      fontFamily: {
        display: ['Orbitron', 'Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 14px rgb(var(--c1) / 0.35)',
        glow: '0 0 30px rgb(var(--c1) / 0.45)',
        'glow-lg': '0 0 70px rgb(var(--c1) / 0.5)',
        'glow-violet': '0 0 30px rgb(var(--c2) / 0.5)',
        'glow-magenta': '0 0 30px rgb(var(--c3) / 0.5)',
      },
      backgroundImage: {
        'neon-gradient':
          'linear-gradient(120deg, rgb(var(--c1)), rgb(var(--c2)) 55%, rgb(var(--c3)))',
      },
      keyframes: {
        shimmer: { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(120%)' } },
        'glow-pulse': {
          '0%,100%': { filter: 'drop-shadow(0 0 3px rgb(var(--c1) / 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 11px rgb(var(--c1) / 0.95))' },
        },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        scan: { '0%': { top: '0%' }, '100%': { top: '100%' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        'grid-move': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '0 60px' } },
        'gradient-x': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'blob-1': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(120px,60px) scale(1.15)' },
          '66%': { transform: 'translate(-60px,140px) scale(0.95)' },
        },
        'blob-2': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-160px,-80px) scale(1.2)' },
        },
        'blob-3': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '40%': { transform: 'translate(90px,-120px) scale(1.1)' },
          '75%': { transform: 'translate(-110px,40px) scale(0.9)' },
        },
        'circuit-pulse': { from: { strokeDashoffset: 460 }, to: { strokeDashoffset: 0 } },
      },
      animation: {
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        scan: 'scan 1.8s linear infinite',
        blink: 'blink 1s step-end infinite',
        'grid-move': 'grid-move 3s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'blob-1': 'blob-1 26s ease-in-out infinite',
        'blob-2': 'blob-2 32s ease-in-out infinite',
        'blob-3': 'blob-3 38s ease-in-out infinite',
        'circuit-pulse': 'circuit-pulse 5s linear infinite',
      },
    },
  },
  plugins: [],
};
