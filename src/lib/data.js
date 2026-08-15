export const contact = {
  email: "sabarivasans315@gmail.com",
  phone: "8124589387",
  location: "Coimbatore, India - Remote - Ready to move",
  github: "https://github.com/sabarivasan-sankar",
  linkedin: "https://linkedin.com/in/sabarivasan-sankar",
};

export const experience = [
  {
    role: "Software Engineer (Mid-Level)",
    company: "Rently Software Development",
    location: "Coimbatore",
    period: "March 2026 — Present",
    current: true,
    points: [
      "Architected and implemented a highly granular, role- and permission-based access control (RBAC) authentication system to secure sensitive enterprise workflows.",
      "Optimized full-stack architecture to enhance web application performance, reliability, and security compliance.",
      "Collaborated on cross-functional system design, leveraging a deep understanding of complex business logic and performance tuning.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Rently Software Development",
    location: "Coimbatore",
    period: "July 2024 — March 2026",
    current: false,
    points: [
      "Developed and managed core enterprise modules for invoicing, billing, and automated inventory systems.",
      "Integrated Cybersource payment gateway infrastructure to securely process one-time client payments and reliable, automated scheduled billing cycles.",
      "Engineered robust data pipelines to synchronize and transfer high-volume data across multiple disparate systems using Apache Kafka, REST API, and Celigo.",
    ],
  },
  {
    role: "Intern Developer",
    company: "Rently Software Development",
    location: "Coimbatore",
    period: "March 2023 — July 2024",
    current: false,
    points: [
      "Built and maintained backend RESTful APIs from scratch using Node.js, Express, and PostgreSQL.",
      "Designed and implemented user-friendly frontend UI dashboards in React to perform seamless CRUD operations on internal administration portals.",
      "Collaborated closely with senior engineers to write clean, maintainable code and write foundational database schemas.",
    ],
  },
];

export const experienceStats = [
  { value: "3+", label: "Years of experience" },
  { value: "3", label: "Roles held at Rently" },
  { value: "2", label: "Internal promotions" },
];

export const experienceFocus = [
  "RBAC & Access Control",
  "Full-Stack Architecture",
  "Payment Integrations",
  "Data Pipelines",
];

export const skillGroups = [
  {
    title: "Languages",
    caption: "What I write and think in daily.",
    items: ["TypeScript", "JavaScript", "SQL (PostgreSQL)"],
    familiar: ["Go", "Ruby on Rails"],
  },
  {
    title: "Frontend",
    caption: "Building fast, accessible interfaces.",
    items: ["React", "Redux", "Tailwind CSS"],
    familiar: ["Svelte", "React Native"],
  },
  {
    title: "Backend & Security",
    caption: "APIs, auth, and business logic that scale.",
    items: ["Node.js", "Express", "RESTful APIs", "RBAC"],
    familiar: [],
  },
  {
    title: "Data & Tools",
    caption: "Pipelines, integrations, and the tools that ship them.",
    items: ["Apache Kafka", "CDC", "Celigo", "Git", "Claude Code"],
    familiar: [],
  },
];

export const competence = [
  "Full-Stack Architecture",
  "RESTful API Design",
  "Payment Gateway Integration",
  "Automated Billing Systems",
  "Database Optimization & Indexing",
  "Role-Based Access Control",
  "Data Pipeline Engineering",
  "Change Data Capture (CDC)",
  "Microservices",
  "Security Compliance",
  "Agile Methodologies",
  "Systems Integration",
  "CI/CD Pipelines",
  "Cloud Infrastructure",
  "Performance Tuning",
  "Distributed Systems",
];

export const projects = [
  {
    title: "Granular RBAC Authentication System",
    description:
      "Architected a highly granular, role- and permission-based access control system to secure sensitive enterprise workflows, replacing coarse-grained checks with fine-tuned policy enforcement across the stack.",
    tags: ["Node.js", "Express", "PostgreSQL", "RBAC"],
  },
  {
    title: "Automated Billing & Payment Platform",
    description:
      "Built core invoicing, billing, and inventory modules and integrated Cybersource to securely process one-time payments and automated recurring billing cycles for enterprise clients.",
    tags: ["Cybersource", "Node.js", "PostgreSQL", "REST API"],
  },
  {
    title: "Real-Time Data Synchronization Pipeline",
    description:
      "Engineered robust data pipelines to synchronize high-volume data across disparate systems in real time, combining Kafka event streams, CDC, and Celigo integrations.",
    tags: ["Apache Kafka", "CDC", "Celigo", "REST API"],
  },
];

export const awards = [
  {
    title: "Meta Frontend Development Course",
    org: "Meta · Coursera",
    date: "October 2024",
  },
  {
    title: "Business Champ Award",
    org: "Rently Software Development",
    date: "October 2024",
  },
];
