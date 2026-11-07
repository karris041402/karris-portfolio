/* ==========================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT.
   Every text, image path, price, link and visual setting lives here.
   Search for "EDIT:" to find every spot that needs your real details.
   ========================================================================== */

/* ------------------------------ PROFILE --------------------------------- */
export const profile = {
  // EDIT: your full name
  name: 'Harris Angkua',
  // EDIT: brand / business name shown beside the logo
  brand: 'Karris',
  // EDIT: 1-3 letters for the logo monogram
  initials: 'HA',
  location: 'Manila, Philippines',
  role: 'Full-Stack Developer · 4th-Year Student',
  // EDIT: shown in the browser tab (also update index.html for crawlers)
  siteTitle: 'Karris | Harris Angkua: Web & Software Developer in Manila',
  siteDescription:
    'Harris Angkua (Karris) builds web, mobile and AI-powered systems, plus automation and UI/UX, for businesses and students in the Philippines.',
  // EDIT: main tagline (typed first in the hero, reused in the footer)
  tagline: 'I build web, mobile and AI-powered software that grows your business',
  // EDIT: one or two sentences under the headline
  valueStatement:
    'Full-stack web apps, Flutter mobile apps and machine learning systems that look sharp, run fast and save you time. From first sketch to launch day, you work with one person who cares about your results.',
  // EDIT: availability pill in the hero. Set to "" to hide it.
  availability: 'Open for new clients',

  // EDIT (logo): leave "" to use the built-in animated <Logo />.
  // To use your own file, drop it in public/images/logo.svg and set: "/images/logo.svg"
  logoImage: '',

  // EDIT: images. Each is a plain path, replace the file or change the string.
  // profile portrait: 800x1000 px (4:5), face roughly centered
  profileImage: '/images/profile.jpg',
  // about banner: 1920x820 px (wide), keep the important part in the middle
  aboutBanner: '/images/about-banner.jpg',
  // fallback shown whenever any image fails to load
  fallbackImage: '/images/placeholder.svg',
};

/* ------------------------------ NAVIGATION ------------------------------ */
// "id" must match a section id. The Pricing link hides itself if pricing.enabled is false.
export const nav = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

/* ------------------------------ HERO ------------------------------------ */
export const hero = {
  // The first phrase should be your main tagline. Others rotate after it.
  typingPhrases: [
    'I build web, mobile and AI-powered software that grows your business',
    'I teach machines to recognize faces, speech and patterns',
    'I automate the boring work so you can focus',
    'I design interfaces people love to use',
  ],
  primaryCta: { label: 'View My Work', href: '#projects' },
  secondaryCta: { label: 'Hire Me', href: '#contact' },
  // Floating "UI fragments" around the 3D graphic. `icon` must exist in src/lib/icons.js.
  chips: [
    { label: 'AI / ML ready', icon: 'Brain', position: 'top-[8%] left-[-2%]' },
    { label: 'Web + Mobile', icon: 'MonitorSmartphone', position: 'top-[22%] right-[-4%]' },
    { label: 'Real-time automation', icon: 'Zap', position: 'bottom-[26%] left-[-6%]' },
  ],
};

/* ------------------------------ ABOUT ----------------------------------- */
export const about = {
  eyebrow: 'About me',
  title: 'Always learning, always building',
  // EDIT: your story, 2-3 short paragraphs
  paragraphs: [
    "I'm a fourth-year student working toward becoming a full-stack developer, based in the Philippines. I embrace AI-assisted development and actively study system architecture and system design, using LLMs to move faster while keeping the quality of what I ship high.",
    "I'm a technology enthusiast who loves to learn every day, and I'd love to learn with others. My passions are full-stack development, AI-assisted engineering and turning ideas into real-world applications, from face recognition systems to ML models. I ship with Vercel, Cloudflared and GitHub Actions, and I have basic networking knowledge.",
  ],
  highlights: ['Full-stack: web, mobile and AI', 'AI-assisted, quality-first engineering', 'Always learning, open to collaborate'],
  // Shown as chips under the highlights. Set to [] to hide.
  perfectFor: [
    'Institutional management systems',
    'AI/ML-powered apps',
    'Multi-role platforms (student / admin / staff)',
    'Automated workflows & scheduling',
    'Capstone, thesis & portfolio projects',
    'Educational technology',
  ],
  // EDIT: numbers shown as animated counters
  stats: [
    { value: 5, suffix: '+', label: 'Featured projects' },
    { value: 7, suffix: '', label: 'Services offered' },
    { value: 15, suffix: '+', label: 'Technologies' },
    { value: 100, suffix: '%', label: 'Client focused' },
  ],
};

/* ------------------------------ SERVICES -------------------------------- */
// `icon` names live in src/lib/icons.js.
export const services = {
  eyebrow: 'Services',
  title: 'Everything your business needs online',
  subtitle: 'Pick one service or combine them. Every project is built around your goals.',
items: [
    {
      id: 'software-web',
      icon: 'Code2',
      title: 'Software & Web Development',
      description: 'Full-stack web applications, from the frontend to the database, built around how your organization works.',
      includes: ['Full-stack web apps (frontend to database)', 'Multi-role and multi-interface platforms', 'Institutional & administrative systems', 'RESTful APIs and systems integration'],
    },
    {
      id: 'mobile',
      icon: 'MonitorSmartphone',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile apps with Flutter and Dart, designed mobile-first.',
      includes: ['Flutter & Dart apps', 'Responsive, adaptive UI', 'Camera, location and device features', 'Connected to your backend'],
    },
    {
      id: 'ai-ml',
      icon: 'Brain',
      title: 'AI & Machine Learning',
      description: 'Smart features and custom models that recognize faces, speech and patterns.',
      includes: ['Face recognition & biometric systems', 'Speech recognition & text-to-speech', 'Custom ML models in Python', 'Dataset sourcing and pipeline development'],
    },
    {
      id: 'automation',
      icon: 'Zap',
      title: 'Automation & Real-time Processing',
      description: 'Systems that take over repetitive work and process data as it happens.',
      includes: ['Real-time data processing', 'Automated scheduling & report generation', 'Geofencing & location-based services', 'Compliance automation and cron jobs'],
    },
    {
      id: 'ui-ux',
      icon: 'PenTool',
      title: 'UI/UX Design',
      description: 'Interfaces that look great and are easy to use, from wireframe to polished prototype.',
      includes: ['Wireframes and user flows', 'Modern visual design in Figma', 'Clickable prototype', 'Design handoff for developers'],
    },
    {
      id: 'video-editing',
      icon: 'Clapperboard',
      title: 'Video Editing',
      description: 'Polished videos for promos, social media, tutorials and events that hold attention.',
      includes: ['Cuts, transitions and pacing', 'Color, audio and captions', 'Social-ready formats', 'Revisions until you are happy'],
    },
    {
      id: 'documentation',
      icon: 'Workflow',
      title: 'Document Management & Diagrams',
      description: 'Clear flowcharts, diagrams and organized documents so your processes are easy to follow.',
      includes: ['Flowcharts and system diagrams', 'Process and workflow documentation', 'Organized file structure', 'Editable source files'],
    },
  ],
};

/* ------------------------------ SKILLS ---------------------------------- */
// level = 0-100
export const skills = {
  eyebrow: 'Skills',
  title: 'The stack behind your site',
  subtitle: 'Modern, proven tools chosen for speed, reliability and easy maintenance.',
  // EDIT: replace with your real stack
groups: [
    {
      id: 'frontend',
      icon: 'Code2',
      title: 'Frontend & Design',
      // EDIT: levels are rough estimates, adjust to your real confidence
      items: [
        { name: 'React + Tailwind CSS', level: 90 },
        { name: 'HTML5, CSS3, TypeScript', level: 85 },
        { name: 'Flutter & Dart (mobile)', level: 75 },
        { name: 'Responsive & adaptive UI/UX', level: 88 },
        { name: 'Figma', level: 82 },
        { name: 'Canva', level: 85 },
        { name: 'Vite / Electron', level: 72 },
      ],
    },
    {
      id: 'backend',
      icon: 'Server',
      title: 'Backend & Databases',
      items: [
        { name: 'Laravel (PHP)', level: 82 },
        { name: 'Node.js', level: 82 },
        { name: 'RESTful API design', level: 88 },
        { name: 'MySQL', level: 85 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'SQLite', level: 78 },
      ],
    },
    {
      id: 'ai-tools',
      icon: 'Brain',
      title: 'AI & Tools',
      items: [
        { name: 'Python (ML, automation, data)', level: 85 },
        { name: 'Face recognition & biometrics', level: 78 },
        { name: 'Speech recognition (STT/TTS)', level: 75 },
        { name: 'Geofencing & location tracking', level: 78 },
        { name: 'Cron jobs & task automation', level: 82 },
        { name: 'Git, GitHub, npm, PowerShell', level: 88 },
        { name: 'Vercel, Cloudflared, GitHub Actions', level: 80 },
        { name: 'Networking (basic)', level: 55 },
      ],
    },
  ],
};

/* ------------------------------ PROJECTS -------------------------------- */
export const projectsSection = {
  eyebrow: 'Projects',
  title: 'Recent work',
  subtitle: 'A few projects that show how design and development turn into results.',
};

// Filter buttons. `value` must match a project category (or "All").
export const projectFilters = [
  { label: 'All', value: 'All' },
  { label: 'Web Apps', value: 'Web App' },
  { label: 'Mobile', value: 'Mobile App' },
  { label: 'AI/ML', value: 'AI/ML' },
  { label: 'Business', value: 'Business' },
];

// To add a project, copy one block, paste it, and edit the fields.
// Image size: 1280x720 (16:9). Put the file in public/images/projects/.
// link: a full URL, or "" (empty) to show a "Case study coming soon" badge.
// category must match one of the filter values above: "Web App" | "Mobile App" | "AI/ML" | "Business"
export const projects = [
  {
    id: 'project-1',
    title: 'SAAMS: Attendance Management System',
    description: 'Face-recognition attendance with geofencing and automated payroll.',
    longDescription:
      'A dual-interface platform: a mobile-first UI for employees and a web-first UI for HR. Employees check in through the camera using face recognition, and geofencing verifies they are at the right location. HR gets real-time tracking and reporting, and monthly payroll is generated automatically. EDIT: add screenshots, results or a live link.',
    category: 'Web App',
    tech: ['React', 'Laravel', 'Face Recognition', 'Geofencing'],
    image: '/images/projects/project-1.jpg',
    link: '',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Reading Assessment System',
    description: 'Educational platform with speech recognition and text-to-speech.',
    longDescription:
      'Text-to-speech guides students as they read, while speech-to-text evaluates how they read aloud. The system detects and analyzes reading errors automatically, so teachers get clear results without manual checking. EDIT: add screenshots, results or a live link.',
    category: 'AI/ML',
    tech: ['Speech-to-Text', 'Text-to-Speech', 'Python'],
    image: '/images/projects/project-2.jpg',
    link: '',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Payslip Generation System',
    description: 'HR automation for payslip processing and distribution.',
    longDescription:
      'Automates payslip processing, then generates and distributes the documents, replacing hours of repetitive HR work with a reliable, repeatable workflow. EDIT: add screenshots, results or a live link.',
    category: 'Business',
    tech: ['Automation', 'Document Generation'],
    image: '/images/projects/project-3.jpg',
    link: '',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Allergen Scanner',
    description: 'Mobile-first health and safety app with real-time allergen detection.',
    longDescription:
      'A mobile-first app that detects allergens in real time so users can make safer choices quickly. EDIT: add screenshots, results or a live link.',
    category: 'Mobile App',
    tech: ['Mobile', 'Real-time Detection'],
    image: '/images/projects/project-4.jpg',
    link: '',
    featured: false,
  },
  {
    id: 'project-5',
    title: 'Gait Classification ML Model',
    description: 'Machine learning model that classifies gait types for medical research.',
    longDescription:
      'An ML model that classifies gait types for medical and research use. The work covered dataset sourcing, model development and the full data pipeline, implemented in Python. EDIT: add accuracy results, a paper or a live link.',
    category: 'AI/ML',
    tech: ['Python', 'Machine Learning', 'Data Pipeline'],
    image: '/images/projects/project-5.jpg',
    link: '',
    featured: true,
  },
];

/* ------------------------------ PROCESS --------------------------------- */
export const process = {
  eyebrow: 'Process',
  title: 'From idea to launch, step by step',
  subtitle: 'A simple, transparent workflow so you always know what happens next.',
  steps: [
    { icon: 'Search', title: 'Discovery', description: 'We talk about your business, your customers and your goals. You get a clear plan and quote.' },
    { icon: 'PenTool', title: 'Design', description: 'I design the look and layout. You review it and request changes before any code is written.' },
    { icon: 'Code2', title: 'Development', description: 'I build your site: fast, secure and mobile-friendly, with progress updates along the way.' },
    { icon: 'Rocket', title: 'Launch', description: 'We test everything, connect your domain and go live. I make sure it all works.' },
    { icon: 'LifeBuoy', title: 'Support', description: 'After launch I stay available for updates, fixes and improvements as your business grows.' },
  ],
};

/* ------------------------------ PRICING --------------------------------- */
export const pricing = {
  // EDIT: set to false to hide the whole pricing section and its nav link
  enabled: true,
  eyebrow: 'Pricing',
  title: 'Simple, honest pricing',
  subtitle: 'Budget-friendly rates. Every project is quoted after a free chat about your needs.',
  // EDIT: replace with your own rates (or "Contact for quote")
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Contact for quote',
      period: '',
      description: 'A polished one-page website to get your business online fast.',
      features: ['1-page landing site', 'Mobile responsive', 'Contact form', 'Basic SEO', '1 round of revisions'],
      popular: false,
      cta: 'Get Started',
    },
    {
      id: 'business',
      name: 'Business',
      price: 'Contact for quote',
      period: '',
      description: 'A complete multi-page website built to attract and convert customers.',
      features: ['Up to 6 pages', 'Custom design and animations', 'Domain and hosting setup', 'SEO and analytics', '3 rounds of revisions', '30 days free support'],
      popular: true,
      cta: 'Choose Business',
    },
    {
      id: 'custom',
      name: 'Custom',
      price: 'Contact for quote',
      period: '',
      description: 'Web or mobile systems, AI/ML features and automation built for your exact needs.',
      features: ['Full-stack web app or Flutter mobile app', 'AI / machine learning integration', 'Database, admin panel and automation', 'Capstone, thesis and portfolio projects', 'Priority support'],
      popular: false,
      cta: "Let's Talk",
    },
  ],
};

/* ------------------------------ CONTACT --------------------------------- */
export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something great",
  subtitle: 'Message me to discuss your project. I reply within 24 hours.',
  // ★ EDIT: PASTE YOUR FORMSPREE ENDPOINT HERE ★
  // 1. Create a free form at https://formspree.io  2. Copy its URL, e.g.
  //    "https://formspree.io/f/abcdwxyz"  3. Paste it between the quotes below.
  // (Empty = the form opens the visitor's email app instead, so nothing breaks.)
  formspreeEndpoint: '',
};

/* ------------------------------ SOCIALS --------------------------------- */
// EDIT: replace `value` (text shown) and `href` (the link). `icon` lives in src/lib/icons.js.
export const socials = [
  { id: 'email', label: 'Email', value: 'harrisangkua22@gmail.com', href: 'mailto:harrisangkua22@gmail.com', icon: 'Mail' },
  { id: 'facebook', label: 'Facebook', value: 'Harris Angkua', href: 'https://www.facebook.com/share/1FMBWHgYke/', icon: 'Facebook' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Harris Angkua',
    href: 'https://www.linkedin.com/in/harris-angkua-90a16b40a',
    icon: 'Linkedin',
  },
  { id: 'github', label: 'GitHub', value: 'github.com/karris041402', href: 'https://github.com/karris041402', icon: 'Github' },
  { id: 'whatsapp', label: 'WhatsApp', value: '0954 147 7179', href: 'https://wa.me/639541477179', icon: 'MessageCircle' },
  { id: 'phone', label: 'Phone', value: '0954 147 7179', href: 'tel:+639541477179', icon: 'Phone' },
];

/* ------------------------------ THEME & EFFECTS ------------------------- */
// Accent palettes for the color switcher. c1 = main, c2 = secondary, c3 = hint color.
export const accents = [
  { id: 'cyber', name: 'Cyber Cyan', c1: '#22d3ee', c2: '#8b5cf6', c3: '#ec4899' },
  { id: 'violet', name: 'Electric Violet', c1: '#a78bfa', c2: '#22d3ee', c3: '#f472b6' },
  { id: 'matrix', name: 'Matrix Green', c1: '#34d399', c2: '#22d3ee', c3: '#a3e635' },
  { id: 'sunset', name: 'Neon Sunset', c1: '#fb7185', c2: '#fbbf24', c3: '#8b5cf6' },
];
export const defaultAccent = 'cyber';

// Animation intensity. Lower numbers = calmer and faster on weak devices.
export const effects = {
  particles: { desktop: 130, mobile: 50 }, // 3D network point count
  auroraIntensity: 0.9, // 0 (off) - 1 (strong)
  cursor: true, // glowing cursor with particle trail (desktop only)
  codeRain: true, // matrix code in the Skills section
};

export const footer = {
  // EDIT: shown next to the copyright
  note: 'Built with care in the Philippines.',
};
