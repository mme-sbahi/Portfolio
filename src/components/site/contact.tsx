"use client";

import { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { toast } from "sonner";
import { profile } from "@/data/site";
import { Reveal, SectionHeading } from "./section";
import Social from "./social";

// Messages are delivered by the existing Formspree form.
const FORMSPREE_URL = "https://formspree.io/f/mdalvnpr";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/70 focus:bg-white/[0.06]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _replyto: form.email, _subject: `New message from ${form.name}` }),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-violet-700/20 to-transparent" />
      <div className="container relative max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          intro="Tell me about your project. I usually reply within a day."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="glass flex flex-col rounded-3xl p-8">
            <h3 className="font-display text-xl font-semibold text-white">Prefer Upwork?</h3>
            <p className="mt-3 text-white/60">
              Hire me with fixed-price packages and Upwork&apos;s payment protection.
            </p>
            <a
              href={profile.links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
            >
              View my Upwork profile
            </a>
            <div className="mt-auto pt-10">
              <p className="mb-3 text-sm text-white/50">Or find me on</p>
              <Social />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass flex flex-col gap-4 rounded-3xl p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  Name
                  <input required value={form.name} onChange={update("name")} className={fieldClass} placeholder="Your name" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Project details
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  className={`${fieldClass} resize-none`}
                  placeholder="What would you like to build?"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"} <PaperPlaneTilt size={18} weight="bold" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
