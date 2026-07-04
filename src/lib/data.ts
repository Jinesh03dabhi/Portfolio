export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  technologies: string[];
  category: 'All' | 'React' | 'Next' | 'Full-Stack';
  featured: boolean;
  year: string;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  splitDistance: string; // Athletic lane marker analogy e.g., "100m Marker"
  description: string[];
  liveUrl?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Core' | 'Framework' | 'Backend' | 'Tooling';
  projectsCount: number;
  lastUsedProject: string;
  lastUsedYear: string;
  coUsedWith: string[]; // IDs of connected skill nodes
}

export const PERSONAL_INFO = {
  name: "Jinesh Dabhi",
  title: "Frontend Developer",
  taglines: [
    "Frontend Developer @ Bigscal",
    "Track & Field Motion Architect",
    "Full-Stack Web Craftsman",
    "Sub-100ms UI Engineer"
  ],
  location: "Navsari, Gujarat, India",
  email: "jinesh03dabhi@gmail.com",
  phone: "+91 94271 42807",
  whatsappNumber: "9427142807",
  whatsappDefaultMsg: "Hi Jinesh, I saw your Split Second portfolio and would love to discuss a project!",
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/Jinesh03dabhi",
    linkedin: "https://linkedin.com/in/jinesh-dabhi-baab84302",
    upwork: "https://www.upwork.com/freelancers/~0104bb4ad51cda6b7c",
    instagram: "https://www.instagram.com/mr__j__d_",
    facebook: "https://www.facebook.com/profile.php?id=61575101451773"
  },
  bio: "I build high-velocity web applications where athletic precision meets full-stack architecture. Currently shipping enterprise HRMS dashboards at Bigscal Technologies and architecting WorkoutWala—an AI-powered fitness platform for Track & Field athletes. I reject arbitrary animation curves and inflated skill percentages; every interaction I build resolves under the 100ms IAAF false-start reaction ceiling and is backed by verified production repositories."
};

export const PROJECTS: Project[] = [
  {
    id: "workoutwala",
    title: "WorkoutWala",
    subtitle: "AI-Powered Fitness & Training Platform",
    description: "Full-stack training platform for Track & Field and gym athletes featuring an 'AI Mode' coaching engine powered by the Anthropic API. Includes tiered subscription billing via Razorpay and a custom Spotify-style music widget on YouTube IFrame API.",
    liveUrl: "https://workoutwala.com",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Anthropic API", "Tailwind CSS"],
    category: "Full-Stack",
    featured: true,
    year: "2026",
    metrics: "Sub-100ms AI coaching prompt routing & custom media sync"
  },
  {
    id: "hrms-bigscal",
    title: "Enterprise HRMS Dashboard",
    subtitle: "Bigscal Technologies Production System",
    description: "Contributing full-time to an enterprise Human Resource Management System dashboard. Architected structured admin data grids, employee lifecycle tracking workflows, and real-time personnel analytics views.",
    liveUrl: "https://hrms.bigscal.com/dashboard",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
    category: "Next",
    featured: true,
    year: "2026",
    metrics: "High-density admin UI serving enterprise HR teams"
  },
  {
    id: "jds-ipl",
    title: "JD's IPL Cricket Platform",
    subtitle: "Real-Time Match Score Application",
    description: "Dynamic cricket tracking web app delivering real-time Indian Premier League match telemetry, team standings, and deep player statistics with a highly modular, zero-layout-shift UI architecture.",
    liveUrl: "https://jds-ipl.vercel.app",
    technologies: ["React", "Next.js", "REST API", "Tailwind CSS"],
    category: "React",
    featured: true,
    year: "2025",
    metrics: "Live score polling with sub-second DOM delta updates"
  },
  {
    id: "day-vibes",
    title: "Day Vibes",
    subtitle: "Daily Productivity & Task Manager",
    description: "Full-stack productivity web application designed around hyper-fast daily workflow execution, task scheduling, and minimal visual noise.",
    liveUrl: "https://day-vibes-seven.vercel.app",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    category: "React",
    featured: false,
    year: "2025"
  },
  {
    id: "fifa-world-cup",
    title: "FIFA World Cup Hub",
    subtitle: "Football Tournament Data Center",
    description: "Comprehensive football tournament tracking platform delivering responsive match schedules, national team rosters, and real-time statistics.",
    liveUrl: "https://fifa-world-cup-eta.vercel.app",
    technologies: ["React", "Next.js", "REST API"],
    category: "React",
    featured: false,
    year: "2024"
  },
  {
    id: "f1-score",
    title: "F1 Live Telemetry",
    subtitle: "Formula 1 Score & Standings Tracker",
    description: "Formula 1 race telemetry interface engineered with reusable React components to display driver championship splits, constructor standings, and lap times.",
    liveUrl: "https://f1-score-psi.vercel.app",
    technologies: ["React", "REST API", "Tailwind CSS"],
    category: "React",
    featured: false,
    year: "2024"
  },
  {
    id: "permit-rockstar",
    title: "Permit Rockstar",
    subtitle: "Commercial Client Web Application",
    description: "Responsive commercial web platform engineered during internship at Bigscal Technologies, translating complex client design requirements into production React components.",
    liveUrl: "https://permitrockstar.com",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    category: "Next",
    featured: false,
    year: "2026"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bigscal-fulltime",
    role: "Frontend Developer",
    company: "Bigscal Technologies Pvt. Ltd.",
    period: "June 2026 – Present",
    splitDistance: "100m Sprint Phase (Max Velocity)",
    description: [
      "Working full-time building and maintaining production-grade web applications for enterprise clients.",
      "Contributing to frontend development of a Human Resource Management System (HRMS) dashboard, building admin-facing UI and structured data views.",
      "Collaborating on complex dashboard workflows to support HR data presentation, performance optimization, and strict UX accessibility."
    ],
    liveUrl: "https://hrms.bigscal.com/dashboard"
  },
  {
    id: "bigscal-intern",
    role: "Frontend Developer Intern",
    company: "Bigscal Technologies Pvt. Ltd.",
    period: "January 2026 – June 2026",
    splitDistance: "50m Acceleration Phase",
    description: [
      "Completed intensive 6-month software engineering internship building production frontend features.",
      "Engineered responsive UI components for real-world client applications (including Permit Rockstar) under strict code review standards.",
      "Demonstrated rapid problem-solving and architectural discipline, resulting in an early full-time offer as Frontend Developer."
    ],
    liveUrl: "https://permitrockstar.com"
  },
  {
    id: "workoutwala-founding",
    role: "Lead Full-Stack Architect",
    company: "WorkoutWala Platform",
    period: "2025 – Present",
    splitDistance: "0m Block Start (Drive Phase)",
    description: [
      "Conceived, built, and shipped an AI-powered Track & Field and fitness platform from ground up.",
      "Integrated Node.js/TypeScript backend with Anthropic API for real-time AI workout generation and coaching feedback.",
      "Designed and deployed 4 subscription tiers integrated with Razorpay and custom YouTube Data API v3 media widgets."
    ],
    liveUrl: "https://workoutwala.com"
  }
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: "react",
    name: "React.js",
    category: "Core",
    projectsCount: 7,
    lastUsedProject: "WorkoutWala",
    lastUsedYear: "2026",
    coUsedWith: ["nextjs", "typescript", "tailwindcss"]
  },
  {
    id: "nextjs",
    name: "Next.js 16",
    category: "Framework",
    projectsCount: 6,
    lastUsedProject: "HRMS Dashboard",
    lastUsedYear: "2026",
    coUsedWith: ["react", "typescript", "tailwindcss"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Core",
    projectsCount: 3,
    lastUsedProject: "WorkoutWala",
    lastUsedYear: "2026",
    coUsedWith: ["react", "nextjs", "nodejs"]
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Tooling",
    projectsCount: 6,
    lastUsedProject: "HRMS Dashboard",
    lastUsedYear: "2026",
    coUsedWith: ["react", "nextjs"]
  },
  {
    id: "nodejs",
    name: "Node.js & Express",
    category: "Backend",
    projectsCount: 2,
    lastUsedProject: "WorkoutWala",
    lastUsedYear: "2026",
    coUsedWith: ["typescript", "restapi"]
  },
  {
    id: "restapi",
    name: "REST APIs & Anthropic AI",
    category: "Backend",
    projectsCount: 5,
    lastUsedProject: "WorkoutWala",
    lastUsedYear: "2026",
    coUsedWith: ["react", "nextjs", "nodejs"]
  }
];

export const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "S.S. Agrawal College",
    period: "2024 – 2026",
    highlight: "Advanced Software Engineering & System Architecture"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "S.S. Agrawal Commerce College",
    period: "2021 – 2024",
    highlight: "Core Computer Science & Web Development Foundations"
  }
];
