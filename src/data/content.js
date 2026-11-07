/* ==========================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT.
   Every text, image path, price, link and visual setting lives here.
   Search for "EDIT:" to find every spot that needs your real details.
   ========================================================================== */

/* ------------------------------ PROFILE --------------------------------- */
export const profile = {
  // EDIT: your full name
  name: 'Harris M. Angkua',
  // EDIT: brand / business name shown beside the logo
  brand: 'Karris',
  // EDIT: 1-3 letters for the logo monogram
  initials: 'HA',
  location: 'Manila, Philippines',
  role: 'Developer & Digital Creator',
  // EDIT: shown in the browser tab (also update index.html for crawlers)
  siteTitle: 'Karris | Harris Angkua: Web & Software Developer in Manila',
  siteDescription:
    'Harris Angkua (Karris) builds websites, software, automation and UI/UX for businesses in Manila, Philippines.',
  // EDIT: main tagline (typed first in the hero, reused in the footer)
  tagline: 'I build smart websites and software that grow your business',
  // EDIT: one or two sentences under the headline
  valueStatement:
    'Websites, apps and automations designed to look sharp, run fast and save you time. From first sketch to launch day, you work with one person who cares about your results.',
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
    'I build smart websites and software that grow your business',
    'I automate the boring work so you can focus',
    'I design interfaces people love to use',
  ],
  primaryCta: { label: 'View My Work', href: '#projects' },
  secondaryCta: { label: 'Hire Me', href: '#contact' },
  // Floating "UI fragments" around the 3D graphic. `icon` must exist in src/lib/icons.js.
  chips: [
    { label: 'Lighthouse 98', icon: 'Gauge', position: 'top-[8%] left-[-2%]' },
    { label: 'Mobile ready', icon: 'MonitorSmartphone', position: 'top-[22%] right-[-4%]' },
    { label: 'SEO optimized', icon: 'Search', position: 'bottom-[26%] left-[-6%]' },
  ],
};

/* ------------------------------ ABOUT ----------------------------------- */
export const about = {
  eyebrow: 'About me',
  title: 'A developer who speaks business',
  // EDIT: your story, 2-3 short paragraphs
  paragraphs: [
    "I'm Harris Angkua, a developer based in Manila, Philippines, building websites, apps and automation tools for businesses and individuals. I pair clean UI/UX design with solid code in React, Node.js, Python and PHP.",
    'I also edit videos and document workflows with clear flowcharts and diagrams, so every part of your project is easy to understand. Expect plain-language communication, honest timelines and support after launch.',
  ],
  highlights: ['Clear, jargon-free communication', 'Design + code from one person', 'Support after launch'],
  // EDIT: numbers shown as animated counters
  stats: [
    { value: 30, suffix: '+', label: 'Websites launched' },
    { value: 25, suffix: '+', label: 'Happy clients' },
    { value: 4, suffix: '+', label: 'Years experience' },
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
      description: 'Websites, web apps and desktop or mobile software built to fit how your business works.',
      includes: ['Custom website or app', 'Mobile-friendly, fast and secure', 'Database and admin tools', 'Deployment and handover'],
    },
    {
      id: 'video-editing',
      icon: 'Clapperboard',
      title: 'Video Editing',
      description: 'Polished videos for promos, social media, tutorials and events that hold attention.',
      includes: ['Cuts, transitions and pacing', 'Color, audio and captions', 'Social-ready formats', 'Revisions until you are happy'],
    },
    {
      id: 'automation',
      icon: 'Zap',
      title: 'Automation',
      description: 'Scripts and workflows that take over repetitive tasks and save hours every week.',
      includes: ['Process review', 'Custom scripts and integrations', 'Reports and data handling', 'Documentation and training'],
    },
    {
      id: 'documentation',
      icon: 'Workflow',
      title: 'Document Management & Diagrams',
      description: 'Clear flowcharts, diagrams and organized documents so your processes are easy to follow.',
      includes: ['Flowcharts and system diagrams', 'Process and workflow documentation', 'Organized file structure', 'Editable source files'],
    },
    {
      id: 'ui-ux',
      icon: 'PenTool',
      title: 'UI/UX Design',
      description: 'Interfaces that look great and are easy to use, from wireframe to polished prototype.',
      includes: ['Wireframes and user flows', 'Modern visual design in Figma', 'Clickable prototype', 'Design handoff for developers'],
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
      title: 'Frontend',
      // EDIT: levels are rough estimates, adjust to your real confidence
      items: [
        { name: 'React.js', level: 88 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Vite', level: 85 },
        { name: 'Figma', level: 82 },
        { name: 'Canva', level: 85 },
        { name: 'Electron', level: 70 },
        { name: 'Flutter', level: 65 },
      ],
    },
    {
      id: 'backend',
      icon: 'Server',
      title: 'Backend',
      items: [
        { name: 'Node.js', level: 82 },
        { name: 'Python', level: 80 },
        { name: 'PHP', level: 78 },
        { name: 'PostgreSQL', level: 72 },
        { name: 'MySQL', level: 80 },
        { name: 'SQLite', level: 75 },
      ],
    },
    {
      id: 'tools',
      icon: 'Wrench',
      title: 'Tools',
      items: [
        { name: 'Git', level: 85 },
        { name: 'GitHub', level: 88 },
        { name: 'npm', level: 88 },
        { name: 'PowerShell', level: 75 },
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
  { label: 'AI/ML', value: 'AI/ML' },
  { label: 'Business', value: 'Business' },
];

// To add a project, copy one block, paste it, and edit the fields.
// Image size: 1280x720 (16:9). Put the file in public/images/projects/.
// link: a full URL, or "" (empty) to show a "Case study coming soon" badge.
// category must be one of: "Web App" | "AI/ML" | "Business"
export const projects = [
  {
    id: 'project-1',
    // EDIT: project name
    title: 'BrewBox Online Ordering',
    description: 'Online menu and pre-order system for a local coffee shop.',
    longDescription:
      'A fast ordering site where customers browse the menu, customize drinks and schedule pickup. Staff get a simple dashboard for incoming orders. Result: shorter queues and more repeat customers. EDIT: replace with your real case study.',
    category: 'Web App',
    tech: ['React', 'Tailwind', 'Node.js'],
    image: '/images/projects/project-1.jpg',
    link: 'https://example.com',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'SmartReply Assistant',
    description: 'An AI assistant that answers common customer questions 24/7.',
    longDescription:
      'A chatbot trained on a clinic\'s FAQs and services. It answers questions, collects booking requests and hands tricky cases to a human. EDIT: replace with your real case study.',
    category: 'AI/ML',
    tech: ['Python', 'OpenAI API', 'React'],
    image: '/images/projects/project-2.jpg',
    link: '',
    featured: false,
  },
  {
    id: 'project-3',
    title: 'Bright Dental Clinic Website',
    description: 'A clean, trustworthy website that fills the appointment calendar.',
    longDescription:
      'A complete redesign for a family dental clinic: clear services, team profiles, reviews and online appointment requests. Page speed and local SEO were improved so more nearby patients find the clinic. EDIT: replace with your real case study.',
    category: 'Business',
    tech: ['React', 'Tailwind', 'SEO'],
    image: '/images/projects/project-3.jpg',
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
  subtitle: 'Starting prices. Every project is quoted after a free discovery call.',
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
      description: 'Web apps, booking systems and custom features for unique needs.',
      features: ['Custom web app or system', 'Database and admin panel', 'Third-party integrations', 'Priority support'],
      popular: false,
      cta: "Let's Talk",
    },
  ],
};

/* ------------------------------ CONTACT --------------------------------- */
export const contact = {
  eyebrow: 'Contact',
  title: "Let's build something great",
  subtitle: 'Tell me about your project. I reply within 24 hours.',
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
