import { ArrowUpRight, Play, X, Pause } from "@phosphor-icons/react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useState, useRef } from "react";

// Define the Project type
interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  image: string;
  video?: string;
}

const projects: Project[] = [
  {
    title: "Transcendence",
    description:
      "Full-stack web platform with authentication, user profiles, chat system, and a real-time Pong game built for the 42 curriculum.",
    tags: ["Next.js", "React", "Tailwind", "Shadcn", "TypeScript"],
    gradient: "from-primary/40 via-secondary/30 to-primary/20",
    image: "transcendence.png",
  },
  {
    title: "Betahiring AI",
    description:
      "AI-assisted hiring platform featuring smart candidate analysis, clean dashboards, and interactive evaluations.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    gradient: "from-secondary/40 via-accent/20 to-secondary/20",
    image: "betahiring.png",
    video: "betahring.mp4", // Has video
  },
  {
    title: "Chatlilo",
    description:
      "Conversational AI platform where I contributed as a frontend developer, building the first version of the product from scratch.",
    tags: ["Next.js", "React", "Tailwind", "Shadcn", "TypeScript"],
    gradient: "from-accent/30 via-primary/20 to-accent/20",
    image: "chatlilo.png",
    video: "chatlilo.mp4",
  },
  {
    title: "Inception",
    description:
      "Containerized infrastructure built with Docker and Docker Compose, running multiple services in isolated environments following DevOps principles.",
    tags: ["Docker", "Nginx", "MariaDB", "WordPress"],
    gradient: "from-emerald-300/30 via-primary/20 to-secondary/20",
    image: "inception.png",
  },
  {
    title: "ft_IRC",
    description:
      "Custom IRC server implementing RFC-compliant commands, channels, private messaging, and real-time socket communication.",
    tags: ["C", "Sockets", "Networking"],
    gradient: "from-primary/30 via-accent/30 to-secondary/20",
    image: "ft_irc.png",
  },
  {
    title: "Minishell",
    description:
      "Unix-like shell implementing pipes, redirections, environment variables, and built-in commands using system calls.",
    tags: ["C", "Shell", "System Calls"],
    gradient: "from-secondary/30 via-primary/20 to-accent/20",
    image: "minishell.png",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleProjectClick = (project: Project) => {
    if (project.video) {
      setSelectedProject(project);
      setIsPlaying(true);
    }
  };

  const handleCloseModal = () => {
    if (videoRef.current) videoRef.current.pause();
    setSelectedProject(null);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const headerVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
            margin: "-20% 0px -20% 0px",
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Selected Projects
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work and creative experiments
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
            margin: "-10% 0px -20% 0px",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`glass-strong rounded-2xl overflow-hidden group hover:glow-pink hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                project.video ? "hover:border-primary/50" : ""
              }`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              onClick={() => handleProjectClick(project)}
            >
              {/* Preview Area */}
              <div className="h-52 relative overflow-hidden group bg-gray-900">
                {/* Loading placeholder */}
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 to-gray-900" />

                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    e.currentTarget.previousElementSibling?.remove();
                  }}
                  style={{
                    imageRendering: "auto",
                    transform: "translateZ(0)",
                  }}
                />

                {/* Video Demo Indicator (only if project has video) */}
                {project.video && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <Play
                        size={24}
                        className="text-white ml-1"
                        weight="fill"
                      />
                    </div>
                    <span className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium bg-black/50 py-1">
                      Click to watch demo
                    </span>
                  </div>
                )}

                {/* Arrow icon */}
                <motion.div
                  className="absolute top-3 right-3 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="w-8 h-8 rounded-full glass flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <ArrowUpRight
                      size={16}
                      className="text-white"
                      weight="bold"
                    />
                  </div>
                </motion.div>

                {/* Subtle vignette effect */}
                <div className="absolute inset-0 box-border shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <motion.h3
                    className="text-xl font-bold group-hover:text-primary transition-colors text-white"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  {project.video && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                      Has Demo
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/80 backdrop-blur-sm">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedProject.title} Demo
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Muted video playback
                    </p>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X size={20} className="text-white" weight="bold" />
                  </button>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video bg-black">
                  <video
                    ref={videoRef}
                    src={selectedProject.video}
                    className="w-full h-full object-contain"
                    muted
                    autoPlay
                    onEnded={handleVideoEnd}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-4">
                    <button
                      onClick={togglePlayPause}
                      className="px-4 py-2 rounded-lg glass flex items-center gap-2 backdrop-blur-sm border border-white/20 hover:bg-black transition-colors"
                    >
                      {isPlaying ? (
                        <>
                          <Pause size={16} className="text-white" />
                          <span className="text-white text-sm">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} className="text-white" />
                          <span className="text-white text-sm">Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-white/10 bg-gray-900/80 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Counting line */}
        <div className="mt-16 md:mt-20 px-4">
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{
                width: "100%",
                opacity: 1,
                transition: {
                  delay: 0.8,
                  duration: 1,
                  ease: "easeInOut" as const,
                },
              }}
              viewport={{ once: true }}
            />

            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 1.2,
                    duration: 0.5,
                    ease: "easeOut" as const,
                  },
                }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg md:text-xl font-medium"
              >
                {projects.length} projects •{" "}
                {projects.filter((p) => p.video).length} with video demos
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}