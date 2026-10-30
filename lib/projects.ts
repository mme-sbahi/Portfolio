export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  focus: string[];
  video?: string;
};

export const projects: Project[] = [
  {
    slug: 'taskflow', number: '01', title: 'TaskFlow', category: 'FULL-STACK WEB APP',
    description: 'Teamwork, organized end to end. A full-stack task manager with secure login, project invitations, a Kanban board, and a live dashboard, shipped with one-command Docker setup.',
    image: '/images/taskflow.webp', tags: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'Docker'],
    focus: ['JWT authentication with refresh tokens', 'Invite / accept / decline project flow', 'REST API documented with Swagger'],
  },
  {
    slug: 'pdfmind', number: '02', title: 'PDFMind', category: 'AI · DOCUMENT CHATBOT (RAG)',
    description: 'Ask your documents anything. Upload PDFs and get answers that cite the exact file and page, and an honest “I don’t know” when the documents don’t cover the question.',
    image: '/images/pdfmind.webp', tags: ['Python', 'FastAPI', 'ChromaDB', 'React', 'Docker'],
    focus: ['Semantic search over vector embeddings', 'Source citations on every answer', 'LLM answers grounded in your documents'],
  },
  {
    slug: 'hypertube', number: '03', title: 'HyperTube', category: 'VIDEO STREAMING PLATFORM',
    description: 'Watch while it downloads. A streaming platform with live video transcoding, multi-language subtitles, and OAuth sign-in with 42 and Google.',
    image: '/images/hypertube.webp', tags: ['NestJS', 'React', 'PostgreSQL', 'FFmpeg', 'OAuth 2.0'],
    focus: ['Live FFmpeg transcoding (MKV/AVI to MP4)', 'HTTP range streaming with seeking', 'Search, filters, and infinite scroll'],
  },
  {
    slug: 'tokenizer', number: '04', title: 'Tokenizer & TokenizeArt', category: 'BLOCKCHAIN · SMART CONTRACTS',
    description: 'Tokens and NFTs, on-chain. An ERC-20 token with owner-only minting and burning, and an ERC-721 NFT collection with metadata on IPFS, both deployed on Ethereum Sepolia.',
    image: '/images/tokenizer.webp', tags: ['Solidity', 'Hardhat', 'OpenZeppelin', 'ethers.js', 'IPFS'],
    focus: ['OpenZeppelin standards with access control', 'Automated Hardhat tests', 'Live contracts on Sepolia Etherscan'],
  },
  {
    slug: 'pipo', number: '05', title: 'PiPo', category: 'REAL-TIME GAMING PLATFORM',
    description: 'A real-time playground. A full-stack platform bringing authentication, user profiles, live chat, and multiplayer ping pong into one experience.',
    image: '/images/pipo.webp', tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn UI'],
    focus: ['Real-time Pong game', 'Authentication & user profiles', 'Integrated chat system'],
  },
  {
    slug: 'betahiring', number: '06', title: 'Betahiring AI', category: 'AI · PRODUCT INTERFACE',
    description: 'Making complex hiring decisions easier to navigate. An AI-assisted platform with candidate analysis, clear dashboards, and interactive evaluations.',
    image: '/images/betahiring.webp', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    focus: ['Candidate analysis interfaces', 'Hiring dashboards', 'Interactive evaluations'],
    video: '/demos/betahiring.mp4',
  },
  {
    slug: 'chatlilo', number: '07', title: 'Chatlilo', category: 'CONVERSATIONAL AI',
    description: 'From a blank canvas to a working product. I co-founded this conversational AI startup and built the first version of the product from scratch.',
    image: '/images/chatlilo.webp', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
    focus: ['First version built end to end', 'Conversational product interface', 'Reusable UI components'],
    video: '/demos/chatlilo.mp4',
  },
];

export const foundations = [
  { title: 'Stackship', discipline: 'CLOUD & AUTOMATION', text: 'One command. A secured server, fully deployed.', description: 'Automated deployment of a multi-container web stack (Nginx, WordPress, MariaDB) to a cloud server with Ansible: system setup, UFW firewall, Docker install, and persistent volumes, all repeatable from one playbook.', tags: 'Ansible / Docker / AWS / UFW', image: '/images/stackship.webp', repo: 'Cloud-1' },
  { title: 'RelayChat', discipline: 'NETWORKING', text: 'Real-time communication, from the socket up.', description: 'An IRC chat server written from scratch in C++. It serves many clients at once over non-blocking TCP sockets, with channels, private messages, and operator commands (KICK, INVITE, TOPIC, MODE), and works with standard IRC clients.', tags: 'C++ / TCP sockets / IRC protocol', image: '/images/relaychat.webp', repo: 'ft_IRC' },
  { title: 'FileScope', discipline: 'SYSTEMS', text: 'Reading the file system, one call at a time.', description: 'My own version of the Unix ls command, written in C: recursive listing, sorting by name or time down to the nanosecond, and a long format with permissions and owners, built directly on system calls.', tags: 'C / File system / System calls', image: '/images/filescope.webp', repo: 'ft_ls' },
];

export const experience = [
  {
    period: 'APR 2026 — OCT 2026', type: 'INTERNSHIP', role: 'Data Analyst (Power BI)', company: 'STMicroelectronics · Bouskoura',
    summary: 'Designed interactive Power BI dashboards from Excel data sources, turning raw operational data into KPIs and visual reports for the team.',
    tags: ['Power BI', 'Excel', 'Power Query', 'Data visualization'],
  },
  {
    period: 'MAY 2025 — NOV 2025', type: 'CO-FOUNDER', role: 'Full-Stack Developer', company: 'Chatlilo · Casablanca',
    summary: 'Co-founded a conversational AI startup and built its product from the first prototype to a working version, owning the frontend, backend API, and database.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
];

export const social = {
  github: 'https://github.com/mme-sbahi',
  linkedin: 'https://www.linkedin.com/in/meryememesbahi/',
};
