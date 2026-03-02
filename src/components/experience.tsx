import { Briefcase, Calendar } from "@phosphor-icons/react";
import { motion, Variants } from "framer-motion"; // Import Variants type
import React from "react";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "Chatlilo",
    duration: "6 months",
    period: "2024",
    description:
      "Developed and maintained responsive web applications using React and TypeScript. Collaborated with the design team to implement pixel-perfect UI components and improved application performance.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
  },
];

export default function Experience() {
  // Animation variants
  const headerVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: "blur(5px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const experienceCardVariants: Variants = {
    hidden: {
      y: 40,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { rotate: -90, scale: 0, opacity: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  const skillTagVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.3,
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden k"
      id="experience"
    >
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Experience
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and growth
          </p>
        </motion.div>

        {/* Animated Experience Cards */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={experienceCardVariants}
              className="glass-strong rounded-3xl p-8 hover:glow-pink hover:-translate-y-1 transition-all duration-500"
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30"
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Briefcase
                      size={28}
                      className="text-primary"
                      weight="duotone"
                    />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-2xl font-bold"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.p
                      className="text-primary text-lg"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.company}
                    </motion.p>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-muted-foreground glass px-4 py-2 rounded-full"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Calendar size={18} weight="duotone" />
                  <span>
                    {exp.duration} • {exp.period}
                  </span>
                </motion.div>
              </div>

              <motion.p
                className="text-muted-foreground mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                viewport={{ once: true }}
              >
                {exp.description}
              </motion.p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={skillTagVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="px-4 py-1.5 text-sm rounded-full glass border border-primary/20 text-foreground/80"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(var(--primary), 0.1)",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
