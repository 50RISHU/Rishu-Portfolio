export const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education"  },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

export const personal = {
  name: "Your Name",
  roles: ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Open Source Contributor"],
  tagline: "I craft fast, beautiful web experiences that people love to use.",
  location: "San Francisco, CA",
  available: true,
  socials: {
    github:   "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email:    "you@example.com",
  },
};

export const skillCategories = [
  {
    category: "Frontend",
    icon: "◈",
    skills: [
      { name: "React",       level: 90 },
      { name: "JavaScript",  level: 88 },
      { name: "TypeScript",  level: 78 },
      { name: "Tailwind CSS",level: 85 },
      { name: "HTML / CSS",  level: 95 },
    ],
  },
  {
    category: "Backend",
    icon: "◇",
    skills: [
      { name: "Node.js",     level: 82 },
      { name: "Express",     level: 80 },
      { name: "Python",      level: 75 },
      { name: "REST APIs",   level: 88 },
      { name: "GraphQL",     level: 65 },
    ],
  },
  {
    category: "Database",
    icon: "▣",
    skills: [
      { name: "MongoDB",     level: 78 },
      { name: "PostgreSQL",  level: 72 },
      { name: "MySQL",       level: 70 },
      { name: "Redis",       level: 60 },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "⬡",
    skills: [
      { name: "Git / GitHub",level: 90 },
      { name: "Docker",      level: 68 },
      { name: "Vite",        level: 85 },
      { name: "Figma",       level: 72 },
      { name: "Linux",       level: 70 },
    ],
  },
];


export const experience = [
  {
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    type: "Full-time",
    location: "San Francisco, CA",
    period: "Jan 2023 — Present",
    current: true,
    bullets: [
      "Led redesign of core dashboard, improving load time by 40% and user retention by 25%",
      "Built reusable component library used across 5 product teams with React + TypeScript",
      "Mentored 3 junior developers through code reviews and pair programming sessions",
      "Integrated REST & GraphQL APIs, reducing data-fetch overhead by 30%",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Tailwind"],
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    type: "Full-time",
    location: "Remote",
    period: "Jun 2021 — Dec 2022",
    current: false,
    bullets: [
      "Built and shipped 3 full-stack features end-to-end using Node.js and React",
      "Designed and maintained PostgreSQL database schema for 50k+ users",
      "Implemented JWT authentication and role-based access control",
      "Reduced API response time by 35% through query optimization and Redis caching",
    ],
    stack: ["Node.js", "React", "PostgreSQL", "Redis"],
  },
  {
    role: "Frontend Intern",
    company: "Agency Creative",
    type: "Internship",
    location: "New York, NY",
    period: "Jan 2021 — May 2021",
    current: false,
    bullets: [
      "Developed responsive landing pages for 8 client projects using HTML, CSS, JavaScript",
      "Collaborated with designers to implement pixel-perfect UI from Figma mockups",
      "Improved site accessibility scores from 65 to 94 across all client projects",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of California, Berkeley",
    period: "2017 — 2021",
    grade: "3.8 GPA",
    location: "Berkeley, CA",
    current: false,
    description: "Focused on software engineering, algorithms, and distributed systems. Active member of the ACM student chapter and hackathon organizer.",
    highlights: [
      "Dean's List — 6 consecutive semesters",
      "Senior thesis: Real-time collaborative code editor using WebSockets",
      "Won 1st place at CalHacks 2020 (500+ participants)",
    ],
    courses: ["Data Structures", "OS", "Distributed Systems", "ML", "HCI"],
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    school: "App Academy",
    period: "Jun 2021 — Aug 2021",
    grade: "Top 5%",
    location: "Online",
    current: false,
    description: "Intensive 16-week program covering modern full-stack development with React, Node.js, and PostgreSQL.",
    highlights: [
      "Built 4 full-stack projects from scratch in 16 weeks",
      "Graduated in top 5% of cohort of 120 students",
    ],
    courses: ["React", "Node.js", "PostgreSQL", "Redux", "Docker"],
  },
  {
    degree: "AWS Certified Developer — Associate",
    school: "Amazon Web Services",
    period: "Mar 2023",
    grade: "Score: 891/1000",
    location: "Remote",
    current: false,
    description: "Certification validating proficiency in developing and maintaining applications on the AWS platform.",
    highlights: [
      "Scored in the top 10% of all test takers globally",
      "Covers Lambda, S3, DynamoDB, API Gateway, and CloudFormation",
    ],
    courses: ["Lambda", "S3", "DynamoDB", "API Gateway", "CloudFormation"],
  },
];


export const projects = [
  {
    title: "DevFlow",
    description: "A real-time collaborative code editor with live cursors, syntax highlighting, and voice chat. Built for distributed dev teams.",
    longDesc: "Architected a WebSocket-based collaboration engine supporting 50+ concurrent users with sub-100ms latency. Integrated Monaco Editor with custom language server support.",
    image: null,
    tags: ["React", "Node.js", "WebSocket", "MongoDB"],
    category: "Fullstack",
    live: "https://devflow.app",
    github: "https://github.com/you/devflow",
    featured: true,
    stats: { stars: 240, forks: 38 },
  },
  {
    title: "ShopSense AI",
    description: "AI-powered e-commerce recommendation engine that personalizes product feeds based on browsing behaviour and purchase history.",
    longDesc: "Trained a collaborative filtering model on 1M+ user interactions. Built a FastAPI backend serving real-time recommendations with 95ms p99 latency.",
    image: null,
    tags: ["Python", "FastAPI", "React", "PostgreSQL"],
    category: "AI/ML",
    live: "https://shopsense.ai",
    github: "https://github.com/you/shopsense",
    featured: true,
    stats: { stars: 118, forks: 22 },
  },
  {
    title: "Taskly",
    description: "Minimalist project management app with Kanban boards, time tracking, and team collaboration features.",
    longDesc: "Full-stack SaaS built with Next.js and Supabase. Supports real-time board updates, drag-and-drop, and CSV export.",
    image: null,
    tags: ["Next.js", "Supabase", "TypeScript"],
    category: "Fullstack",
    live: "https://taskly.app",
    github: "https://github.com/you/taskly",
    featured: false,
    stats: { stars: 75, forks: 14 },
  },
  {
    title: "CryptoTrack",
    description: "Real-time cryptocurrency portfolio tracker with price alerts, historical charts, and P&L analysis.",
    longDesc: "Integrates CoinGecko and Binance WebSocket APIs for live price feeds. Charts built with Recharts. PWA-enabled for mobile.",
    image: null,
    tags: ["React", "WebSocket", "Recharts"],
    category: "Frontend",
    live: "https://cryptotrack.app",
    github: "https://github.com/you/cryptotrack",
    featured: false,
    stats: { stars: 92, forks: 17 },
  },
  {
    title: "AuthKit",
    description: "Drop-in authentication library for Node.js supporting JWT, OAuth2, magic links, and MFA out of the box.",
    longDesc: "Zero-dependency core with optional adapters for Express, Fastify, and Koa. 100% test coverage. 2k+ weekly npm downloads.",
    image: null,
    tags: ["Node.js", "TypeScript", "OAuth2"],
    category: "Backend",
    live: null,
    github: "https://github.com/you/authkit",
    featured: false,
    stats: { stars: 310, forks: 51 },
  },
  {
    title: "PortfolioOS",
    description: "macOS-style interactive portfolio built as a desktop OS simulation with draggable windows and a working terminal.",
    longDesc: "Pure React with Framer Motion. Drag, resize, minimize windows. Terminal supports 20+ commands. No canvas — all DOM.",
    image: null,
    tags: ["React", "Framer Motion", "CSS"],
    category: "Frontend",
    live: "https://portfolioos.vercel.app",
    github: "https://github.com/you/portfolioos",
    featured: true,
    stats: { stars: 185, forks: 29 },
  },
];

export const projectCategories = ["All", "Fullstack", "Frontend", "Backend", "AI/ML"];