import React from "react";

import {
  FileHtml,
  FileCss,
  FileTs,
  FramerLogo,
  FigmaLogo,
  GitBranch,
} from "@phosphor-icons/react";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { motion, scale } from "framer-motion";
import {
  item,
  sliceInFromBottom,
  slideInFromLeft,
  sliceInFromRight,
} from "../../utils/motion";
const skills = [
  // { icon: FileHtml, name: "HTML5", color: "text-orange-500" },
  // { icon: FileCss, name: "CSS3", color: "text-blue-500" },
  { icon: FileTs, name: "TypeScript", color: "text-yellow-500" },
  { icon: FramerLogo, name: "React.js", color: "text-cyan-500" },
  { icon: SiNextdotjs, name: "Next.js", color: "text-gray-400" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-sky-500" },
  { icon: FigmaLogo, name: "UI/UX Design", color: "text-pink-500" },
  { icon: GitBranch, name: "Git & GitHub", color: "text-purple-500" },
];

export default function Aboutme() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger delay between each child
        delayChildren: 0.2, // Initial delay before starting
      },
    },
  };

  // Item variants
  const itemVariants = {
    hidden: {
      x: -50,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="about">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-16 text-center gradient-text"
          variants={sliceInFromBottom(0.3)}
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true, amount: 0.3 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20"
          initial="hidden"
          animate="visible"
        >
          {/* Left: Profile Image */}
          <motion.div className="flex justify-center lg:justify-start">
            <motion.div className="relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-pink-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.5 }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              <motion.img
                src={"/meryem.png"}
                alt="Meryeme - Frontend Developer"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                  opacity: { duration: 0.4 },
                }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div className="space-y-6">
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
              variants={slideInFromLeft(0.4)}
              initial="hidden"
              whileInView="visible"
            >
              I specialize in building modern frontend applications with Next.js
              and Tailwind CSS, focusing on performance, scalability, and user
              experience.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
              variants={sliceInFromRight(0.4)}
              initial="hidden"
              whileInView="visible"
            >
              I leverage component-driven design using tools like Shadcn UI and
              Aceternity to create clean, adaptable interfaces that are both
              visually refined and technically solid.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
              variants={slideInFromLeft(0.4)}
              initial="hidden"
              whileInView="visible"
            >
              I’m driven by continuous growth — always learning, experimenting,
              and pushing my frontend skills further to build products that
              don’t just work, but feel exceptional.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-strong rounded-2xl p-6 text-center hover:glow-pink transition-all duration-300 hover:scale-110 group"
              >
                <Icon
                  className={`h-12 w-12 mx-auto mb-3 ${skill.color} group-hover:scale-125 transition-transform duration-300`}
                  weight="light"
                />
                <p className="text-sm font-medium text-primary">{skill.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
