// All portfolio content lives here, so updating the site means editing this file only.

export const profile = {
  name: "Meryeme Mesbahi",
  role: "Full-Stack & Blockchain Developer",
  tagline:
    "I build full-stack web apps, AI document assistants and smart contracts, from the database to the interface.",
  location: "Casablanca, Morocco",
  photo: "/meryem.png",
  resume: "/resume.pdf",
  links: {
    upwork: "https://www.upwork.com/freelancers/~01d8c6eef66ebc933e",
    github: "https://github.com/mme-sbahi",
    linkedin: "https://www.linkedin.com/in/meryememesbahi/",
  },
  stats: [
    { value: "3+", label: "years building web apps" },
    { value: "10+", label: "projects shipped" },
    { value: "42", label: "Network trained engineer" },
  ],
};

export type Service = {
  title: string;
  description: string;
  stack: string[];
  icon: "web" | "ai" | "chain" | "chart";
};

export const services: Service[] = [
  {
    title: "Full-stack web apps",
    description:
      "SaaS MVPs, dashboards and internal tools with secure login, clean APIs and a responsive interface.",
    stack: ["Next.js", "React", "NestJS", "PostgreSQL", "Docker"],
    icon: "web",
  },
  {
    title: "AI document chatbots",
    description:
      "Assistants that answer questions about your documents and cite the page each answer comes from.",
    stack: ["RAG", "FastAPI", "ChromaDB", "OpenAI / Groq"],
    icon: "ai",
  },
  {
    title: "Smart contracts & NFTs",
    description:
      "Tested ERC-20 tokens and ERC-721 collections on OpenZeppelin, deployed and ready to use.",
    stack: ["Solidity", "Hardhat", "OpenZeppelin", "IPFS"],
    icon: "chain",
  },
  {
    title: "Power BI dashboards",
    description:
      "Interactive reports that turn Excel data into clear KPIs, built during my internship at STMicroelectronics.",
    stack: ["Power BI", "Excel", "Power Query"],
    icon: "chart",
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  stack: string[];
  image: string;
  imageNote?: string;
  video?: string;
  github?: string;
  live?: string;
  liveLabel?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "TaskFlow",
    category: "Full-stack web app",
    description:
      "A team task manager with secure login, project invitations, a Kanban board and a live dashboard.",
    highlights: [
      "JWT auth with refresh tokens",
      "Invite / accept / decline flow",
      "REST API documented with Swagger",
    ],
    stack: ["Next.js 15", "NestJS", "PostgreSQL", "TypeORM", "Docker"],
    image: "/projects/taskflow.webp",
    github: "https://github.com/mme-sbahi/Task-Manager",
  },
  {
    title: "PDFMind",
    category: "AI document chatbot (RAG)",
    description:
      "Upload PDFs and ask questions in plain language. Every answer cites the file and page it came from, and it says \"I don't know\" instead of guessing.",
    highlights: [
      "Semantic search with vector embeddings",
      "Source citations on every answer",
      "One-command Docker deployment",
    ],
    stack: ["Python", "FastAPI", "ChromaDB", "Groq LLM", "React"],
    image: "/projects/pdfmind.webp",
    github: "https://github.com/mme-sbahi/PDF-mind",
  },
  {
    title: "HyperTube",
    category: "Video streaming platform",
    description:
      "Stream videos in the browser while they download, with live transcoding, subtitles and OAuth sign-in.",
    highlights: [
      "Live FFmpeg transcoding (MKV/AVI to MP4)",
      "OAuth 2.0 with 42 and Google",
      "Search, filters and infinite scroll",
    ],
    stack: ["NestJS", "React", "PostgreSQL", "FFmpeg", "Docker"],
    image: "/projects/hypertube.webp",
    github: "https://github.com/mme-sbahi/Reelix",
  },
  {
    title: "Tokenizer & TokenizeArt",
    category: "Smart contracts & NFTs",
    description:
      "An ERC-20 token with owner-only minting and burning, and an ERC-721 NFT collection with metadata on IPFS, both deployed on Ethereum Sepolia.",
    highlights: [
      "OpenZeppelin standards + access control",
      "Automated Hardhat tests",
      "Live contracts on Sepolia Etherscan",
    ],
    stack: ["Solidity", "Hardhat", "OpenZeppelin", "ethers.js", "IPFS"],
    image: "/projects/blockchain.webp",
    imageNote: "Sample NFT artwork",
    github: "https://github.com/mme-sbahi/TokenizerArt",
    live: "https://sepolia.etherscan.io/address/0x9a316393C040cC964639459cce3Dab4c626954fE",
    liveLabel: "View on Etherscan",
  },
  {
    title: "Chatlilo",
    category: "Startup · conversational AI",
    description:
      "The conversational AI platform I co-founded. I built the first version of the product end to end.",
    highlights: ["From prototype to working product", "Frontend, API and database"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    image: "/chatlilo.png",
    video: "/chatlilo.mp4",
  },
  {
    title: "Betahiring AI",
    category: "AI hiring platform",
    description:
      "An AI-assisted hiring platform with candidate analysis, clean dashboards and interactive evaluations.",
    highlights: ["Candidate analysis dashboards", "Interactive evaluations"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    image: "/betahiring.png",
    video: "/betahring.mp4",
  },
];

export const moreProjects = [
  {
    title: "Transcendence",
    description: "Web platform with profiles, chat and a real-time multiplayer Pong game.",
    stack: ["Next.js", "TypeScript", "WebSockets"],
  },
  {
    title: "ft_IRC",
    description: "IRC server from scratch: channels, operators, private messages over TCP sockets.",
    stack: ["C++", "Sockets"],
    github: "https://github.com/mme-sbahi/ft_IRC",
  },
  {
    title: "Inception",
    description: "Multi-service infrastructure (Nginx, WordPress, MariaDB) in isolated containers.",
    stack: ["Docker", "Nginx", "MariaDB"],
    github: "https://github.com/mme-sbahi/inception",
  },
];

export const experience = [
  {
    role: "Data Analyst Intern (Power BI)",
    company: "STMicroelectronics",
    place: "Bouskoura, Morocco",
    period: "Apr 2026 – Oct 2026",
    points: [
      "Designed interactive Power BI dashboards from Excel data sources.",
      "Turned raw operational data into KPIs and visual reports for the team.",
    ],
  },
  {
    role: "Co-Founder & Full-Stack Developer",
    company: "Chatlilo",
    place: "Casablanca, Morocco",
    period: "May 2025 – Nov 2025",
    points: [
      "Co-founded the startup and built its product from first prototype to working version.",
      "Owned the frontend, backend API and database.",
    ],
  },
  {
    role: "Software Engineering Student",
    company: "1337 Coding School · 42 Network",
    place: "Khouribga, Morocco",
    period: "2022 – 2025",
    points: [
      "Peer-to-peer, project-based curriculum: C, C++, networking, DevOps, web and blockchain.",
    ],
  },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["NestJS", "Node.js", "FastAPI", "Python", "REST APIs"] },
  { group: "Data & AI", items: ["PostgreSQL", "ChromaDB", "RAG", "LLM APIs", "Power BI"] },
  { group: "Blockchain", items: ["Solidity", "Hardhat", "OpenZeppelin", "ethers.js", "IPFS"] },
  { group: "DevOps & tools", items: ["Docker", "Docker Compose", "Git", "Linux", "C / C++"] },
];
