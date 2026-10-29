"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { profile } from "@/data/site";
import Social from "./social";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="grid-backdrop pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="container relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for freelance projects
          </span>

          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m {profile.name.split(" ")[0]}.
            <br />
            <span className="text-gradient">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/65">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
            >
              See my work <ArrowRight size={18} weight="bold" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition hover:border-violet-400/60"
            >
              <DownloadSimple size={18} weight="bold" /> Download CV
            </a>
          </div>

          <div className="mt-8">
            <Social />
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-bold text-white">{stat.value}</dt>
                <dd className="mt-1 text-sm text-white/55">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/40 via-fuchsia-500/20 to-cyan-400/30 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 1024px) 384px, 80vw"
              className="object-cover"
            />
          </div>
          <div className="glass absolute -bottom-5 -left-5 animate-float rounded-2xl px-4 py-3 text-sm">
            <p className="font-semibold text-white">Next.js · NestJS</p>
            <p className="text-white/55">Full-stack</p>
          </div>
          <div className="glass absolute -right-5 top-10 animate-float rounded-2xl px-4 py-3 text-sm [animation-delay:1.5s]">
            <p className="font-semibold text-white">Solidity · RAG</p>
            <p className="text-white/55">Web3 & AI</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
