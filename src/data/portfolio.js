export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const personal = {
  name: "Rishu Sheth",
  roles: [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Open Source Contributor",
  ],
  tagline: "I craft fast, beautiful web experiences that people love to use.",
  location: "Gujarat, India",
  available: true,
  socials: {
    github: "https://github.com/50RISHU",
    linkedin: "https://linkedin.com/in/rishu-s-30b929377",
    email: "sheth.rishu50@gmail.com",
  },
};

export const skillCategories = [
  {
    category: "Frontend",
    icon: "◈",
    skills: [
      { name: "React", level: 78 },
      { name: "JavaScript", level: 75 },
      { name: "TypeScript", level: 78 },
      { name: "Tailwind CSS", level: 75 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    category: "Backend",
    icon: "◇",
    skills: [
      { name: "Node.js", level: 79 },
      { name: "Flask", level: 79 },
      { name: "Python", level: 75 },
      { name: "REST APIs", level: 70 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    category: "Database",
    icon: "▣",
    skills: [
      { name: "MongoDB", level: 78 },
      { name: "PostgreSQL", level: 72 },
      { name: "MySQL", level: 70 },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "⬡",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Vite", level: 85 },
      { name: "Figma", level: 72 },
      { name: "AI", level: 70 },
    ],
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "SHIVAI DIGITAL MEDIA",
    type: "Internship",
    location: "Remote",
    period: "June 2025",
    current: false,
    bullets: [
      "Developed multiple projects such as Resume Builder, Meme Hub, Student Result Management System, and Green Spoon.",
      "Gained hands-on experience in frontend, backend, database management, API integration, and deployment.",
      "Implemented AI features using ChatGPT, Gemini API, and OpenRouter APIs.",
      "Worked with authentication systems, JWT security, file uploads, and cloud storage integration.",
      "Deployed applications using Render and Vercel with production-ready workflows.",
    ],
    stack: [
      "Svelte-kit",
      "JavaScript",
      "SQLite",
      "Bootstrap",
      "Rest API",
      "Flask",
    ],
  },
];

export const education = [
  {
    degree: "Computer Engineering in Diploma",
    school: "Government Polytechnic, Bhuj",
    period: "2023 - 2026",
    grade: "9.22 CGPA",
    location: "Bhuj, India",
    current: false,
    description:
      "Focused on software engineering, algorithms, and Web development. ",
    highlights: [
      "Government engineering diploma institute in Kutch region",
      "AICTE-approved and GTU-affiliated technical college",
      "Strong focus on practical and industry-oriented learning",
      "Active participation in technical events, seminars, and project exhibitions",
    ],
    courses: [
      "Data Structures & Algorithms",
      "OS",
      "Cloud Computing",
      "AI/ML",
      "Python Programming",
      "SQL",
      "MongoDB",
      "Android",
    ],
  },
];

export const projects = [
  {
    title: "Stego.Image",
    description:
      "Stego.Image is a browser-based tool that secretly hides files inside ordinary images using a three-layer approach: GZIP compression, AES-256 encryption, and LSB steganography.",
    longDesc:
      "Stego.Image is a browser-based tool that secretly hides files inside ordinary images using a three-layer approach: GZIP compression, AES-256 encryption, and LSB steganography. The result is an image that looks completely normal but contains concealed, password-protected data. Everything runs entirely client-side — no uploads, no servers, full privacy.",
    image: null,
    tags: ["React", "Node.js", "crypto-js", "pako (GZIP)"],
    category: "Frontend",
    live: "https://stegoimage.pages.dev/",
    github: "https://github.com/50RISHU/Stego.Image",
    featured: true,
    stats: { stars: 1, forks: 0 },
  },
  {
    title: "VL.RAG",
    description:
      "VL.RAG is an open-source document intelligence system that lets you ask questions about large documents — books, research papers, technical manuals, PDFs — without ever generating a single embedding or spinning up a vector database.",
    longDesc: "",
    image: null,
    tags: ["React", "TypeScript", "pdf2json", "openai"],
    category: "AI/ML",
    live: "",
    github: "https://github.com/50RISHU/VL.RAG",
    featured: true,
    stats: { stars: 1, forks: 0 },
  },
  {
    title: "E-Sport Calc",
    description:
      "An E-Sport platform that manages gaming tournaments, player registrations, match scheduling, and results, providing an organized environment for competitive gaming events.",
    longDesc: "",
    image: null,
    tags: ["Svelte-Kit", "Supabase", "TypeScript", "Capacitor"],
    category: "Fullstack",
    live: "https://esportcalc.vercel.app/",
    github: "https://github.com/50RISHU/E-Sport_Calc",
    featured: true,
    stats: { stars: 1, forks: 0 },
  },
  {
    title: "Green Spoon Frontend",
    description:
      "A modern, community-driven vegetarian recipe sharing platform powered by AI recommendations. Built with Svelte Kit and hosted on a robust backend infrastructure.",
    longDesc: "",
    image: null,
    tags: ["Svelte-Kit", "JavaScript", "axios"],
    category: "Frontend",
    live: "https://green-spoon.vercel.app/",
    github: "https://github.com/50RISHU/Green-Spoon-Frontend",
    featured: false,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "Green Spoon Backend",
    description:
      "A robust backend infrastructure for the Green Spoon recipe sharing platform, handling user management, recipe storage, and AI recommendation logic.",
    longDesc: "",
    image: null,
    tags: ["Python", "Supabase Auth", "Supabase Storage", "Rest API"],
    category: "Backend",
    live: null,
    github: "https://github.com/50RISHU/Green-Spoon-Backend",
    featured: true,
    stats: { stars: 0, forks: 0 },
  },
  {
    title: "AI Notbook",
    description:
      "AI-powered notebook application for organize notes with intelligent assistance, task management, and seamless mobile deployment.",
    longDesc:
      "",
    image: null,
    tags: ["React", "TypeScript", "AI Integration"],
    category: "AI/ML",
    live: "https://ainotebook-alpha.vercel.app/",
    github: "https://github.com/50RISHU/AI-NoteBook",
    featured: true,
    stats: { stars: 0, forks: 0 },
  },
];

export const projectCategories = [
  "All",
  "Fullstack",
  "Frontend",
  "Backend",
  "AI/ML",
];
