import profilePhoto from "../assets/profile/profile.png";
/* ==========================================================================
   content.ts — THE ONLY FILE YOU NEED TO EDIT.
   Every text, image path, link and visual setting lives here.
   Search for "EDIT:" to find every spot that needs your real details.
   ========================================================================== */

import type { Accent, NavItem, Project, ProjectFilter, Social } from "../types";

/* ------------------------------ PROFILE --------------------------------- */
export const profile = {
  // EDIT: your full name
  name: "Harris",
  // EDIT: brand / business name shown beside the logo
  brand: "Karris",
  // EDIT: 1-3 letters for the logo monogram
  initials: "HA",
  location: "Manila, Philippines",
  role: "Full-Stack Developer · 4th-Year Student",
  // EDIT: shown in the browser tab (also update index.html for crawlers)
  siteTitle: "Karris | Software Developer",
  siteDescription:
    "Harris Angkua (Karris) is a full-stack developer from the Philippines building web, mobile and AI-powered systems, from documentation and database design to deployment.",
  // EDIT: main tagline (typed first in the hero, reused in the footer)
  tagline:
    "Full-stack developer building web, mobile and AI-powered systems",
  // EDIT: one or two sentences under the headline
  valueStatement:
    "I design and build complete systems: full-stack web apps, Flutter mobile apps and machine learning projects, from requirements and database schema all the way to deployment.",
  // EDIT: availability pill in the hero. Set to "" to hide it.
  availability: "Open to opportunities",

  // EDIT (logo): leave "" to use the built-in animated <Logo />.
  // To use your own file, drop it in public/images/logo.svg and set: "/images/logo.svg"
  logoImage: "",

  // EDIT: images. Each is a plain path, replace the file or change the string.
  // profile portrait: 800x1000 px (4:5), face roughly centered
  profileImage: profilePhoto,
  // fallback shown whenever any image fails to load
  fallbackImage: "/images/placeholder.svg",
};

/* ------------------------------ NAVIGATION ------------------------------ */
// "id" must match a section id.
export const nav: NavItem[] = [
  { id: "about", label: "About" },
  { id: "services", label: "What I Do" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "process", label: "How I Build" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------ HERO ------------------------------------ */
export const hero = {
  // The first phrase should be your main tagline. Others rotate after it.
  typingPhrases: [
    "I build full-stack web, mobile and AI-powered systems",
    "I design databases and system architecture",
    "I teach machines to recognize faces, speech and patterns",
    "I ship with Vercel, Cloudflared and GitHub Actions",
  ],
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
  // Floating "UI fragments" around the 3D graphic. `icon` must exist in src/lib/icons.js.
  chips: [
    { label: "AI / ML ready", icon: "Brain", position: "top-[8%] left-[-2%]" },
    {
      label: "Web + Mobile",
      icon: "MonitorSmartphone",
      position: "top-[22%] right-[-4%]",
    },
    {
      label: "System design",
      icon: "Zap",
      position: "bottom-[26%] left-[-6%]",
    },
  ],
};

/* ------------------------------ ABOUT ----------------------------------- */
export const about = {
  eyebrow: "About me",
  title: "Always learning, always building",
  // EDIT: your story, 2-3 short paragraphs
  paragraphs: [
    "I'm a fourth-year student working toward becoming a full-stack developer, based in the Philippines. I embrace AI-assisted development and actively study system architecture and system design, using LLMs to move faster while keeping the quality of what I ship high.",
    "I'm a technology enthusiast who loves to learn every day, and I'd love to learn with others. My passions are full-stack development, AI-assisted engineering and turning ideas into real-world applications, from face recognition systems to ML models. I ship with Vercel, Cloudflared and GitHub Actions, and I have basic networking knowledge.",
  ],
  // Banner cards under the profile photo. icon: any name from src/lib/icons.ts
  highlights: [
    {
      icon: "Code2",
      title: "Full-stack: web, mobile and AI",
      description: "From React and Laravel to Flutter apps and machine learning models, end to end.",
    },
    {
      icon: "Sparkles",
      title: "AI-assisted, quality-first engineering",
      description: "I use LLMs to move faster, then review, test and refine everything I ship.",
    },
    {
      icon: "Rocket",
      title: "Always learning, open to opportunities",
      description: "Looking for internships, junior roles and collaborations where I can grow and contribute.",
    },
  ],
  // Shown as chips under the highlights. Set to [] to hide.
  perfectFor: [
    "Institutional management systems",
    "AI/ML-powered apps",
    "Multi-role platforms (student / admin / staff)",
    "Automated workflows & scheduling",
    "Thesis & research projects",
    "Educational technology",
  ],
  // EDIT: numbers shown as animated counters
  stats: [
    { value: 9, suffix: "", label: "Projects built" },
    { value: 3, suffix: "", label: "AI/ML projects" },
    { value: 15, suffix: "+", label: "Technologies" },
    { value: 4, suffix: "th", label: "Year student" },
  ],
};

/* ------------------------------ SERVICES -------------------------------- */
// `icon` names live in src/lib/icons.js.
export const services = {
  eyebrow: "What I do",
  title: "What I can build",
  subtitle: "The areas I work in, from web systems to AI.",
  items: [
    {
      id: "software-web",
      icon: "Code2",
      title: "Software & Web Development",
      description:
        "Full-stack web applications, from the frontend to the database, built around how the organization works.",
      includes: [
        "Full-stack web apps (frontend to database)",
        "Multi-role and multi-interface platforms",
        "Institutional & administrative systems",
        "RESTful APIs and systems integration",
      ],
    },
    {
      id: "mobile",
      icon: "MonitorSmartphone",
      title: "Mobile App Development",
      description:
        "Cross-platform mobile apps with Flutter and Dart, designed mobile-first.",
      includes: [
        "Flutter & Dart apps",
        "Responsive, adaptive UI",
        "Camera, location and device features",
        "Connected to a backend API",
      ],
    },
    {
      id: "ai-ml",
      icon: "Brain",
      title: "AI & Machine Learning",
      description:
        "Smart features and custom models that recognize faces, speech and patterns.",
      includes: [
        "Face recognition & biometric systems",
        "Speech recognition & text-to-speech",
        "Custom ML models in Python",
        "Dataset sourcing and pipeline development",
      ],
    },
    {
      id: "automation",
      icon: "Zap",
      title: "Automation & Real-time Processing",
      description:
        "Systems that take over repetitive work and process data as it happens.",
      includes: [
        "Real-time data processing",
        "Automated scheduling & report generation",
        "Geofencing & location-based services",
        "Compliance automation and cron jobs",
      ],
    },
    {
      id: "ui-ux",
      icon: "PenTool",
      title: "UI/UX Design",
      description:
        "Interfaces that look great and are easy to use, from wireframe to polished prototype.",
      includes: [
        "Wireframes and user flows",
        "Modern visual design in Figma",
        "Clickable prototype",
        "Design handoff for developers",
      ],
    },
    {
      id: "video-editing",
      icon: "Clapperboard",
      title: "Video Editing",
      description:
        "Promo, tutorial and event videos with clean cuts, pacing and captions.",
      includes: [
        "Cuts, transitions and pacing",
        "Color, audio and captions",
        "Social-ready formats",
        "Promos, tutorials and events",
      ],
    },
    {
      id: "documentation",
      icon: "Workflow",
      title: "Document Management & Diagrams",
      description:
        "Clear flowcharts, diagrams and organized documents so processes are easy to follow.",
      includes: [
        "Flowcharts and system diagrams",
        "Process and workflow documentation",
        "Organized file structure",
        "Editable source files",
      ],
    },
  ],
};

/* ------------------------------ SKILLS ---------------------------------- */
// level = 0-100
export const skills = {
  eyebrow: "Skills",
  title: "My tech stack",
  subtitle: "The tools I use to design, build and ship systems.",
  // EDIT: replace with your real stack
  groups: [
    {
      id: "frontend",
      icon: "Code2",
      title: "Frontend & Design",
      // EDIT: levels are rough estimates, adjust to your real confidence
      items: [
        { name: "React + Tailwind CSS", level: 90 },
        { name: "HTML5, CSS3, TypeScript", level: 85 },
        { name: "Flutter & Dart (mobile)", level: 75 },
        { name: "Responsive & adaptive UI/UX", level: 88 },
        { name: "Figma", level: 82 },
        { name: "Canva", level: 85 },
        { name: "Vite / Electron", level: 72 },
      ],
    },
    {
      id: "backend",
      icon: "Server",
      title: "Backend & Databases",
      items: [
        { name: "Laravel (PHP)", level: 82 },
        { name: "Node.js", level: 82 },
        { name: "RESTful API design", level: 88 },
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 75 },
        { name: "SQLite", level: 78 },
      ],
    },
    {
      id: "ai-tools",
      icon: "Brain",
      title: "AI & Tools",
      items: [
        { name: "Python (ML, automation, data)", level: 85 },
        { name: "Face recognition & biometrics", level: 78 },
        { name: "Speech recognition (STT/TTS)", level: 75 },
        { name: "Geofencing & location tracking", level: 78 },
        { name: "Cron jobs & task automation", level: 82 },
        { name: "Git, GitHub, npm, PowerShell", level: 88 },
        { name: "Vercel, Cloudflared, GitHub Actions", level: 80 },
        { name: "Networking (basic)", level: 55 },
      ],
    },
  ],
};

/* ------------------------------ PROJECTS -------------------------------- */
export const projectsSection = {
  eyebrow: "Projects",
  title: "Selected projects",
  subtitle:
    "Systems I have built, from thesis research to real-world tools.",
};

// Filter buttons. `value` must match a project category (or "All").
export const projectFilters: ProjectFilter[] = [
  { label: "All", value: "All" },
  { label: "Web Apps", value: "Web App" },
  { label: "Mobile", value: "Mobile App" },
  { label: "AI/ML", value: "AI/ML" },
  { label: "Business", value: "Business" },
];

// To add a project, copy one block, paste it, and edit the fields.
// Screenshots: drop images in src/assets/project/<folder>/ and set `folder` to that folder's name
// (case-sensitive). Every image in the folder becomes the gallery, sorted by filename.
// `cover` (optional) = filename to use as the card image; otherwise the first file is used.
// link: a full URL, or "" (empty) to hide the "View Project" button.
// category must match one of the filter values above: "Web App" | "Mobile App" | "AI/ML" | "Business"
export const projects: Project[] = [
  {
    id: "leadscout",
    title: "LeadScout: Local Business Lead Finder",
    description:
      "Finds local businesses with no website in OpenStreetMap data and manages them as sales leads.",
    longDescription:
      "A lead-generation platform that helps users find local businesses with no website listed in OpenStreetMap data. Businesses appear on an interactive map and can be managed as potential sales leads. Uses free public APIs: Nominatim for location search and geocoding, Overpass API for business discovery, and OpenStreetMap with Leaflet for mapping. Businesses are categorized as no website, has website, needs verification, or unknown. Built with a Laravel 13 backend and a React/TypeScript frontend.",
    category: "Web App",
    tech: [
      "React",
      "TypeScript",
      "Laravel",
      "Leaflet",
      "OpenStreetMap",
      "Overpass API",
    ],
    folder: "leadscout",
    link: "",
    featured: true,
  },
  {
    id: "saams",
    title: "SAAMS: Student Assistant Attendance Management System",
    description:
      "Attendance, scheduling and payroll validation for student assistants, with face recognition and GPS geofencing.",
    longDescription:
      "An EARIST-focused system for managing student assistant operations. Facial recognition with liveness verification and GPS geofencing confirm attendance, alongside scheduling, Daily Time Records (DTR), announcements, requirements tracking and payroll validation. Supports three roles: Student Assistant, Human Resources and Super Administrator. Built with a React/TypeScript frontend, a Laravel/PHP backend on PostgreSQL, and a Python FastAPI face-recognition service using InsightFace/ArcFace embeddings.",
    category: "Web App",
    tech: [
      "React",
      "TypeScript",
      "Laravel",
      "PostgreSQL",
      "FastAPI",
      "InsightFace",
    ],
    folder: "saams",
    cover: "saams-2.jpg",
    link: "",
    featured: true,
  },
  {
    id: "bras",
    title: "BRAS: Bangsamoro Reading Assessment System",
    description:
      "Web platform that helps teachers assess and monitor students' reading abilities.",
    longDescription:
      "A web-based reading assessment platform for teachers and students. It provides reading materials, live assessments, student management, teacher dashboards, assessment reports and progress tracking, so reading evaluation is more organized, accessible and data-driven. Built with Next.js, React, TypeScript and Tailwind CSS.",
    category: "Web App",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    folder: "bras",
    link: "",
    featured: true,
  },
  {
    id: "gaitassist",
    title: "GaitAssist: Gait Pattern Classification",
    description:
      "Thesis: analyzes patients' gait videos for physical therapists using MediaPipe, CNN and Random Forest.",
    longDescription:
      'Thesis project: "Adaptive Gait Pattern Classification Using MediaPipe, CNN and Random Forest for Gait Deviation Assessment and Rehabilitation Monitoring in Physical Therapy." Helps licensed physical therapists analyze walking patterns from gait videos. MediaPipe extracts pose landmarks, a 1D CNN and Random Forest classify gait, and adaptive recalibration improves monitoring over time. Includes a React frontend for capturing videos and viewing results, a Flask backend serving the trained model and session history, an offline training pipeline and shared gait-feature tools.',
    category: "AI/ML",
    tech: ["React", "Flask", "MediaPipe", "1D CNN", "Random Forest"],
    folder: "gaitassist",
    link: "",
    featured: true,
  },
  {
    id: "inforsure",
    title: "InforSure: Health Claim Verification",
    description:
      "AI-powered Chrome extension that checks whether online health claims may be reliable or misleading.",
    longDescription:
      "Highlight text on a webpage or upload an image for OCR. InforSure checks that the content is health-related, classifies the claim with an XLM-RoBERTa model, retrieves supporting evidence from a validated database and verifies it with natural language inference. Shows separate model-prediction and evidence results with source links. An experimental fact-checking and research tool, not a replacement for medical professionals. Chrome extension with a local FastAPI backend.",
    category: "AI/ML",
    tech: ["Chrome Extension", "FastAPI", "XLM-RoBERTa", "OCR", "NLI"],
    folder: "Inforsure",
    link: "",
    featured: false,
  },
  {
    id: "foodshield",
    title: "FoodShield: Food Allergen Scanner",
    description:
      "Flutter app that scans food products and identifies possible allergens.",
    longDescription:
      "A Flutter-based mobile application that scans food products and identifies possible allergens, helping users check ingredients and see whether a product may be unsafe based on their allergy information. Supports Android, iOS, web, Windows, macOS and Linux.",
    category: "Mobile App",
    tech: ["Flutter", "Dart", "Cross-platform"],
    folder: "foodshield",
    link: "",
    featured: false,
  },
  {
    id: "aura",
    title: "AuRA: Autism Risk Analytics",
    description:
      "Thesis: autism education and pre-screening app powered by an ML ensemble.",
    longDescription:
      "A research-based autism education and pre-screening application developed as a thesis project. React/TypeScript frontend with a FastAPI backend and PostgreSQL database handle authentication, onboarding, questionnaires, chat history and results. Saved Logistic Regression, Random Forest and XGBoost models vote with equal weight to produce provisional, score-based categories. For educational and research purposes only; not a medical diagnosis.",
    category: "AI/ML",
    tech: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "XGBoost",
      "Random Forest",
    ],
    folder: "AuRA",
    link: "",
    featured: true,
  },
  {
    id: "payslip-generator",
    title: "Payslip Generator System",
    description:
      "PHP payroll app that imports Excel data and generates, manages and emails payslips.",
    longDescription:
      "A PHP-based payroll management application for generating and managing employee payslips. Supports employee records, payroll processing, Excel payroll imports, payslip history, manual payslips, email delivery, employee search and remittance tracking, with separate workflows for regular, job-order and special payroll employees. Uses SQLite, PhpSpreadsheet, PHPMailer and a chatbot support feature.",
    category: "Business",
    tech: ["PHP", "SQLite", "PhpSpreadsheet", "PHPMailer"],
    folder: "payslip-generator",
    link: "",
    featured: false,
  },
  {
    id: "furtualcare",
    title: "FurtualCare: Pet-Care & Vet Management",
    description:
      "PHP system for Mt. Zion Animal Clinic: appointments, shop and orders.",
    longDescription:
      "A PHP-based pet-care and veterinary service management system for Mt. Zion Animal Clinic. Users register, book veterinary appointments, manage pet-care services, buy products and track orders. An admin dashboard manages appointments, products, inventory and orders. Includes email OTP verification, Google authentication, user profiles, service-provider accounts and PDF generation.",
    category: "Business",
    tech: ["PHP", "Google Auth", "Email OTP", "PDF"],
    folder: "FurtualCare",
    link: "",
    featured: false,
  },
];

/* ------------------------------ PROCESS --------------------------------- */
// How I build a system, from documentation to deployment. icon: any name from src/lib/icons.ts
export const process = {
  eyebrow: "How I build",
  title: "From documentation to deployment",
  subtitle: "My workflow for turning an idea into a complete, working system.",
  steps: [
    {
      icon: "Search",
      title: "Documentation & Requirements",
      description:
        "I start by writing down the problem: users and roles, features, workflows and constraints, so the scope is clear before any code exists.",
    },
    {
      icon: "Workflow",
      title: "System Design",
      description:
        "Architecture, flowcharts and use-case diagrams that map how every module, role and service fits together.",
    },
    {
      icon: "Server",
      title: "Database Schema",
      description:
        "I design the ERD, tables, relationships and constraints, normalize the data, and plan migrations before building features on top.",
    },
    {
      icon: "PenTool",
      title: "UI/UX Design",
      description:
        "Wireframes and clickable prototypes in Figma, designed mobile-first, so the interface is settled before development.",
    },
    {
      icon: "Code2",
      title: "Backend & API",
      description:
        "Authentication, role-based access, business logic and REST APIs on top of the schema, plus ML models served as services where the system needs them.",
    },
    {
      icon: "LayoutTemplate",
      title: "Frontend",
      description:
        "Responsive React interfaces connected to the API, with validation, loading and error states handled properly.",
    },
    {
      icon: "Gauge",
      title: "Testing & Refinement",
      description:
        "I test each role and workflow, including edge cases, then fix and polish on real devices.",
    },
    {
      icon: "Rocket",
      title: "Deployment",
      description:
        "Ship with Vercel, Cloudflared tunnels and GitHub Actions, with documented setup so the system is easy to run and maintain.",
    },
  ],
};

/* ------------------------------ CONTACT --------------------------------- */
export const contact = {
  eyebrow: "Contact",
  title: "Let's connect",
  subtitle:
    "Open to internships, junior developer roles, freelance work and collaborations. Send me a message and I will reply as soon as I can.",
  // ★ EDIT: PASTE YOUR FORMSPREE ENDPOINT HERE ★
  // 1. Create a free form at https://formspree.io  2. Copy its URL, e.g.
  //    "https://formspree.io/f/abcdwxyz"  3. Paste it between the quotes below.
  // (Empty = the form opens the visitor's email app instead, so nothing breaks.)
  formspreeEndpoint: "",
};

/* ------------------------------ SOCIALS --------------------------------- */
// EDIT: replace `value` (text shown) and `href` (the link). `icon` lives in src/lib/icons.js.
export const socials: Social[] = [
  {
    id: "email",
    label: "Email",
    value: "harrisangkua22@gmail.com",
    href: "mailto:harrisangkua22@gmail.com",
    icon: "Mail",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Harris Angkua",
    href: "https://www.facebook.com/share/1FMBWHgYke/",
    icon: "Facebook",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Harris Angkua",
    href: "https://www.linkedin.com/in/harris-angkua-90a16b40a",
    icon: "Linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/karris041402",
    href: "https://github.com/karris041402",
    icon: "Github",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "0954 147 7179",
    href: "https://wa.me/639541477179",
    icon: "MessageCircle",
  },
  {
    id: "phone",
    label: "Phone",
    value: "0954 147 7179",
    href: "tel:+639541477179",
    icon: "Phone",
  },
];

/* ------------------------------ THEME & EFFECTS ------------------------- */
// Accent palettes for the color switcher. c1 = main, c2 = secondary, c3 = hint color.
export const accents: Accent[] = [
  {
    id: "cyber",
    name: "Cyber Cyan",
    c1: "#22d3ee",
    c2: "#8b5cf6",
    c3: "#ec4899",
  },
  {
    id: "violet",
    name: "Electric Violet",
    c1: "#a78bfa",
    c2: "#22d3ee",
    c3: "#f472b6",
  },
  {
    id: "matrix",
    name: "Matrix Green",
    c1: "#34d399",
    c2: "#22d3ee",
    c3: "#a3e635",
  },
  {
    id: "sunset",
    name: "Neon Sunset",
    c1: "#fb7185",
    c2: "#fbbf24",
    c3: "#8b5cf6",
  },
];
export const defaultAccent = "cyber";

// Animation intensity. Lower numbers = calmer and faster on weak devices.
export const effects = {
  particles: { desktop: 130, mobile: 50 }, // 3D network point count
  auroraIntensity: 0.9, // 0 (off) - 1 (strong)
  cursor: true, // glowing cursor with particle trail (desktop only)
  codeRain: true, // matrix code in the Skills section
};

export const footer = {
  // EDIT: shown next to the copyright
  note: "Built with care in the Philippines.",
};
