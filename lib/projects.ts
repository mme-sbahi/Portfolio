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
    slug: 'transcendence', number: '01', title: 'Transcendence', category: 'FULL-STACK PLATFORM',
    description: 'A real-time playground. A full-stack platform bringing authentication, user profiles, live chat, and multiplayer Pong into one experience, built for the 42 curriculum.',
    image: '/images/transcendence.webp', tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn UI'],
    focus: ['Real-time Pong game', 'Authentication & user profiles', 'Integrated chat system'],
  },
  {
    slug: 'betahiring', number: '02', title: 'Betahiring AI', category: 'AI · PRODUCT INTERFACE',
    description: 'Making complex hiring decisions easier to navigate. An AI-assisted platform with candidate analysis, clear dashboards, and interactive evaluations.',
    image: '/images/betahiring.webp', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    focus: ['Candidate analysis interfaces', 'Hiring dashboards', 'Interactive evaluations'],
    video: '/demos/betahiring.mp4',
  },
  {
    slug: 'chatlilo', number: '03', title: 'Chatlilo', category: 'CONVERSATIONAL AI',
    description: 'From a blank canvas to a working product. I contributed as a frontend developer, building the first version of this conversational AI platform from scratch.',
    image: '/images/chatlilo.webp', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
    focus: ['First-version frontend development', 'Conversational product interface', 'Reusable UI components'],
    video: '/demos/chatlilo.mp4',
  },
];

export const foundations = [
  { title: 'Inception', discipline: 'INFRASTRUCTURE', text: 'Isolated services. One connected system.', description: 'Containerized infrastructure using Docker and Docker Compose, with Nginx, MariaDB, and WordPress.', tags: 'Docker / Nginx / MariaDB', image: '/images/inception.webp' },
  { title: 'ft_IRC', discipline: 'NETWORKING', text: 'Real-time communication, from the socket up.', description: 'A custom IRC server with channels, private messaging, RFC-compliant commands, and real-time socket communication.', tags: 'C / Sockets / Networking', image: '/images/ft_irc.webp' },
  { title: 'Minishell', discipline: 'SYSTEMS', text: 'Understanding what happens behind the prompt.', description: 'A Unix-like shell implementing pipes, redirections, environment variables, and built-in commands through system calls.', tags: 'C / Shell / System calls', image: '/images/minishell.webp' },
];

export const social = {
  github: 'https://github.com/mme-sbahi',
  linkedin: 'https://www.linkedin.com/in/meryememesbahi/',
};
