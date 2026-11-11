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
  bio: "Third-year Computer Science and Engineering undergraduate (CGPA 8.44) building products across client-side systems, full-stack web development, blockchain verification, and applied AI/ML. Shipped PDFly, CertChain, Tuition Desk, SRM Note Finder, HarvestAI, and CareFlow — actively seeking Software Engineering Internships.",
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
    id: "srm-note-finder",
    title: "SRM Note Finder",
    subtitle: "Academic Resource & Student Platform",
    category: "Full-Stack",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    highlights: [
      "Built a full-stack academic hub organizing semester and unit-wise study notes, previous-year question papers, and SGPA/CGPA calculators.",
      "Integrated JWT authentication, real-time Socket.io community and private chat with moderation, PDF verification, and an admin portal.",
    ],
    liveUrl: "https://srm-note-finder.vercel.app",
    githubUrl: "https://github.com/SSManikandaprabu/srm-note-finder",
    accent: "cyan",
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
];

export const EXPERIENCES: ExperienceItem[] = [
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
      { name: "Python", detail: "AI/ML, Flask APIs, Data Pipelines" },
      { name: "TypeScript / JS", detail: "ES6+, Web Workers, Client-Side" },
      { name: "Solidity", detail: "Polygon Smart Contracts" },
      { name: "SQL", detail: "Relational Modeling & Queries" },
      { name: "C / C++", detail: "DSA & Systems Foundations" },
      { name: "PHP", detail: "Server-Side Web Scripting" },
    ],
  },
  {
    category: "Web & Blockchain",
    accent: "purple",
    items: [
      { name: "React & Next.js", detail: "SSR, App Router, SPA Architecture" },
      { name: "Node.js & Express", detail: "REST APIs & Auth Middleware" },
      { name: "Socket.io", detail: "Real-Time Chat & Queue Events" },
      { name: "Polygon & Merkle Proofs", detail: "Cryptographic Verification" },
      { name: "WebAssembly & Web Crypto", detail: "In-Browser Security & PDF" },
      { name: "Flutter & Flask", detail: "Cross-Platform & Python Web" },
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
      { name: "PostgreSQL / Supabase", detail: "Prisma ORM & Edge REST" },
      { name: "MongoDB & SQLite", detail: "NoSQL & Local WAL Storage" },
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
