export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Systems" | "Blockchain" | "Full-Stack" | "AI/ML";
  stack: string[];
  highlights: string[];
  liveUrl: string;
  githubUrl?: string;
  isPrivateRepo?: boolean;
  accent: "cyan" | "purple" | "blue";
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  tag: string;
}

export interface SkillGroup {
  category: string;
  accent: "cyan" | "purple" | "blue";
  items: { name: string; detail: string }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  kind: "Certification" | "Leadership" | "Competition";
}

export const PROFILE = {
  name: "S.S. MANIKANDA PRABU",
  displayName: "S.S. Manikanda Prabu",
  handle: "SSManikandaprabu",
  role: "FULL-STACK DEVELOPER | AI/ML ENGINEER | BLOCKCHAIN DEVELOPER",
  tagline: "Building Intelligent Systems. Engineering the Future.",
  location: "Hosur, Tamil Nadu, India",
  email: "ssmanikandaprabu@gmail.com",
  githubUrl: "https://github.com/SSManikandaprabu",
  linkedinUrl: "https://www.linkedin.com/in/s-s-manikanda-prabu-40070b325/",
  portfolioUrl:
    "https://ssmanikandaprabu.github.io/S.S-MANIKANDA-PRABU/manikanda_portfolio.html",
  bio: "Third-year Computer Science and Engineering undergraduate (CGPA 8.44) building production products across full-stack web development and high-concurrency systems. Built platforms serving 1,000+ active students (SRM Note Finder), client-side privacy tools (PDFly), blockchain registries (CertChain), and hospital workflows (CareFlow). Experience at Titan Company, TEAL, Growfinix, and incoming Java Development Intern (Associate L1) at Infotact Solutions; seeking software engineering internships.",
  education: {
    institution: "SRM Institute of Science and Technology, Ramapuram, Chennai",
    degree: "B.Tech, Computer Science and Engineering",
    period: "2024 – 2028",
    cgpa: "8.44 / 10",
    coursework: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Object-Oriented Programming",
      "Artificial Intelligence",
      "Design & Analysis of Algorithms",
    ],
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "srm-note-finder",
    title: "SRM Note Finder",
    subtitle: "Academic Platform (1,000+ Active Users)",
    category: "Full-Stack",
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "JWT",
      "Vercel Edge CDN",
    ],
    highlights: [
      "Scaled an academic resource hub serving 1,000+ active university students with unit-wise lecture notes, PYQs, and interactive GPA/attendance tools.",
      "Architected HTTP edge caching (stale-while-revalidate) and in-memory query cache for sub-30ms response times; built real-time Socket.io chat and admin portal.",
    ],
    liveUrl: "https://srm-note-finder.vercel.app",
    githubUrl: "https://github.com/SSManikandaprabu/srm-note-finder",
    accent: "cyan",
  },
  {
    id: "mavora",
    title: "MAVORA",
    subtitle: "3D Luxury Chocolate Flagship & Direct UPI Engine",
    category: "Full-Stack",
    stack: [
      "React 19",
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "Tailwind CSS",
      "Node.js",
      "SQLite WAL",
    ],
    highlights: [
      "Architected an immersive 3D digital storefront with interactive Three.js chocolate physics, liquid gold shaders, and 60 FPS animations.",
      "Engineered MAVORA PAY, a 0%-fee Direct UPI engine with dynamic vector QR generation, mobile deep links, and automated SSE bank alert reconciliation.",
    ],
    liveUrl: "https://mavora-luxury-chocolate.vercel.app",
    githubUrl: "https://github.com/SSManikandaprabu/mavora-luxury-chocolate",
    isPrivateRepo: true,
    accent: "purple",
  },
  {
    id: "pdfly",
    title: "PDFly",
    subtitle: "Privacy-First Local PDF Workspace Platform",
    category: "Systems",
    stack: [
      "JavaScript (ES6+)",
      "WebAssembly",
      "pdf-lib",
      "PDF.js",
      "Web Workers",
      "Canvas API",
      "Tailwind CSS",
    ],
    highlights: [
      "Architected a 100% in-browser PDF suite (merge, split, rotate, watermark, page numbering) with zero server uploads and zero data retention.",
      "Engineered 128-bit RC4 password protection, digital signature stamping, and iterative raster compression targeting 50KB–1MB strict govt limits.",
    ],
    liveUrl: "https://pdfly-five.vercel.app",
    githubUrl: "https://github.com/SSManikandaprabu/pdfly",
    accent: "cyan",
  },
  {
    id: "certchain",
    title: "CertChain",
    subtitle: "Blockchain Certificate Verification Platform",
    category: "Blockchain",
    stack: [
      "Solidity",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth",
      "Polygon",
      "Web Crypto API",
    ],
    highlights: [
      "Built a credentialing platform using SHA-256 hashes, per-batch Merkle trees, and a Solidity registry contract on Polygon.",
      "Browser-side PDF verification flags forged, modified, or revoked certificates; includes revocation, audit log, admin dashboard, and QR wallet.",
    ],
    liveUrl: "https://certchain-six.vercel.app/",
    githubUrl: "https://github.com/SSManikandaprabu/certchain",
    accent: "purple",
  },
  {
    id: "tuition-desk",
    title: "Tuition Desk",
    subtitle: "Home Tuition Management System (PWA)",
    category: "Full-Stack",
    stack: [
      "React 18",
      "Vite",
      "Node.js",
      "Express",
      "SQLite / Supabase",
      "Chart.js",
      "PWA",
    ],
    highlights: [
      "Built a 12-module full-stack tuition manager covering batches, daily attendance, monthly fee ledgers, atomic receipts, and parent reports.",
      "Engineered a dual-mode data layer (SQLite WAL / Supabase REST + offline browser storage) with one-tap WhatsApp reminders and receipts.",
    ],
    liveUrl: "https://tuition-desk-mom.vercel.app",
    isPrivateRepo: true,
    accent: "blue",
  },
  {
    id: "careflow",
    title: "CareFlow",
    subtitle: "Hospital Booking & Patient Queue System",
    category: "Full-Stack",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
    ],
    highlights: [
      "Built a clinical appointment and real-time patient queue platform with role-based workspaces for Patients, Doctors, and Admins.",
      "Implemented department token issuance, live wait-time estimation, WebSocket room-call alerts, and digital prescription/EHR entry.",
    ],
    liveUrl: "https://ssmanikandaprabu.github.io/careflow-hospital/",
    githubUrl: "https://github.com/SSManikandaprabu/careflow-hospital",
    accent: "blue",
  },
  {
    id: "harvestai",
    title: "HarvestAI",
    subtitle: "Fruit Maturity Classification (96.0% Accuracy)",
    category: "AI/ML",
    stack: ["Python", "TensorFlow/Keras", "MobileNetV2", "Flask"],
    highlights: [
      "Built a web app classifying fruit as Unripe, Ripe, or Overripe, with image validation and Flask-based predictions.",
      "Reported 96.0% test accuracy (macro F1 0.959) on 450 held-out images.",
    ],
    liveUrl: "https://harvestai-fruit-maturity-classification.onrender.com",
    githubUrl:
      "https://github.com/SSManikandaprabu/HarvestAI-Fruit-Maturity-Classification",
    accent: "purple",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Java Development Intern (Associate L1)",
    company: "Infotact Solutions",
    location: "Remote",
    period: "Nov 2026 – Feb 2027",
    tag: "Enterprise Backend",
    highlights: [
      "Selected for Java Development internship building enterprise backend services using Core Java, OOP, JDBC, and Spring Boot REST APIs.",
      "Working with MySQL/PostgreSQL persistence, debugging, code reviews, and industry software development practices.",
    ],
  },
  {
    role: "Digital & Automation Intern",
    company: "Titan Engineering & Automation Limited (TEAL)",
    location: "Hosur",
    period: "1 – 15 Jul 2026",
    tag: "Industrial Automation",
    highlights: [
      "Worked with the Digital & Automation team on HDL/HMI programming and industrial automation workflows.",
      "Worked on HMI-to-shop-floor hardware interfaces and documentation review under mentor guidance.",
    ],
  },
  {
    role: "Digital Domain Intern, ISCM",
    company: "Titan Company Limited (Watches Division)",
    location: "Hosur",
    period: "15 – 27 Jun 2026",
    tag: "Supply-Chain Systems",
    highlights: [
      "Assisted with data organisation and reporting for integrated supply-chain processes covering inventory, planning, and coordination.",
    ],
  },
  {
    role: "Full-Stack Development Intern (Virtual)",
    company: "Growfinix Technology",
    location: "Remote",
    period: "17 May – 17 Jun 2026",
    tag: "Full-Stack Engineering",
    highlights: [
      "Applied frontend and backend development concepts to project-based tasks during a one-month virtual internship.",
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    accent: "cyan",
    items: [
      { name: "Java", detail: "Core Java, OOP, JDBC & Spring Boot" },
      { name: "Python", detail: "AI/ML, Flask APIs, Data Pipelines" },
      { name: "TypeScript / JS", detail: "ES6+, Web Workers, Client-Side" },
      { name: "Solidity", detail: "Polygon Smart Contracts" },
      { name: "SQL", detail: "Relational Modeling & Queries" },
      { name: "C / C++", detail: "DSA & Systems Foundations" },
      { name: "PHP", detail: "Server-Side Web Scripting" },
    ],
  },
  {
    category: "Web & Backend",
    accent: "purple",
    items: [
      { name: "Spring Boot", detail: "Enterprise REST APIs & MVC" },
      { name: "React & Next.js", detail: "SSR, App Router, SPA Architecture" },
      { name: "Node.js & Express", detail: "REST APIs & Auth Middleware" },
      { name: "Socket.io", detail: "Real-Time Chat & Queue Events" },
      { name: "Polygon & Merkle Proofs", detail: "Cryptographic Verification" },
      { name: "Web Crypto & Web Workers", detail: "In-Browser Security & PDF" },
    ],
  },
  {
    category: "AI / ML",
    accent: "blue",
    items: [
      { name: "TensorFlow / Keras", detail: "MobileNetV2 Transfer Learning" },
      { name: "Scikit-learn", detail: "Model Evaluation & Pipelines" },
      { name: "Pandas & NumPy", detail: "Vectorized Data Processing" },
      { name: "NLTK", detail: "Natural Language Processing" },
    ],
  },
  {
    category: "Data, Cloud & Tools",
    accent: "cyan",
    items: [
      { name: "MySQL & PostgreSQL", detail: "Persistence, Indexing & Schemas" },
      { name: "MongoDB & SQLite", detail: "NoSQL & Local WAL Storage" },
      { name: "Supabase & Prisma", detail: "Postgres BaaS & ORM" },
      { name: "AWS (Developer Prep)", detail: "Cloud Deployment Patterns" },
      { name: "Git, Vercel & Render", detail: "CI/CD & Production Hosting" },
    ],
  },
];

export const ACHIEVEMENTS: CertificationItem[] = [
  {
    title: "AWS Certified Developer – Associate (Cert Prep)",
    issuer: "LinkedIn Learning",
    date: "Jun 2026",
    kind: "Certification",
  },
  {
    title: "Getting Started with AI on Jetson Nano",
    issuer: "NVIDIA",
    date: "Jul 2026",
    kind: "Certification",
  },
  {
    title: "Python for Data Science and ML, Part 1",
    issuer: "LinkedIn Learning",
    date: "Jun 2026",
    kind: "Certification",
  },
  {
    title: "Data Analysis with Python",
    issuer: "Cognitive Class",
    date: "May 2026",
    kind: "Certification",
  },
  {
    title: "Building with Artificial Intelligence",
    issuer: "Saylor Academy",
    date: "Mar 2026",
    kind: "Certification",
  },
  {
    title: "Introduction to Operating Systems",
    issuer: "NPTEL, IIT Madras",
    date: "Jul 2025",
    kind: "Certification",
  },
  {
    title: "Campus Delegate, HEST 2025",
    issuer: "Ministry of IT, Govt. of India / Digital India",
    date: "2025",
    kind: "Leadership",
  },
  {
    title: "Tata Crucible Campus Quiz 2025 (Prelims Level 1)",
    issuer: "Tata Group",
    date: "2025",
    kind: "Competition",
  },
];
