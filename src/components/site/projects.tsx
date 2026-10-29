"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, Play, X } from "@phosphor-icons/react";
import { SiGithub } from "react-icons/si";
import { featuredProjects, moreProjects, type Project } from "@/data/site";
import { Reveal, SectionHeading } from "./section";

function ProjectCard({ project, index, onPlay }: { project: Project; index: number; onPlay: (p: Project) => void }) {
  // Alternate image side on large screens for a magazine-style layout.
  const reversed = index % 2 === 1;

  return (
    <Reveal>
      <article className="glass grid overflow-hidden rounded-3xl lg:grid-cols-2">
        <div
          className={`relative aspect-[16/10] overflow-hidden bg-black/40 lg:aspect-auto lg:min-h-[420px] ${
            reversed ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover object-top transition duration-700 hover:scale-[1.03]"
          />
          {project.imageNote && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur">
              {project.imageNote}
            </span>
          )}
          {project.video && (
            <button
              type="button"
              onClick={() => onPlay(project)}
              className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 transition hover:opacity-100 focus-visible:opacity-100"
              aria-label={`Play ${project.title} demo`}
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-violet-500 text-white shadow-xl">
                <Play size={28} weight="fill" />
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-col p-7 md:p-10">
          <p className="text-sm font-medium text-violet-300">{project.category}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-white/65">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-white/75">
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-violet-400" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <SiGithub size={16} /> Source code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/30"
              >
                {project.liveLabel ?? "Live"} <ArrowUpRight size={16} />
              </a>
            )}
            {project.video && (
              <button
                type="button"
                onClick={() => onPlay(project)}
                className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/30"
              >
                <Play size={16} weight="fill" /> Watch demo
              </button>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} demo video`}
    >
      <motion.div
        className="relative w-full max-w-5xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white"
          aria-label="Close video"
        >
          <X size={28} />
        </button>
        <video src={project.video} controls autoPlay playsInline className="w-full rounded-2xl" />
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [playing, setPlaying] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects"
          intro="Real projects with real code. Click through to the source on GitHub."
        />

        <div className="flex flex-col gap-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} onPlay={setPlaying} />
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="mb-6 font-display text-xl font-semibold text-white">More from the 42 curriculum</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {moreProjects.map((p) => (
              <div key={p.title} className="glass flex flex-col rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-white">{p.title}</h4>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} source code`}
                      className="text-white/50 hover:text-white"
                    >
                      <SiGithub size={18} />
                    </a>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm text-white/60">{p.description}</p>
                <p className="mt-4 text-xs text-violet-300">{p.stack.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {playing && <VideoModal project={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </section>
  );
}
