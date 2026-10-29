"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { profile } from "@/data/site";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-bold text-white">
          meryeme<span className="text-violet-400">.</span>dev
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.links.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-violet-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 md:inline-block"
        >
          Hire me on Upwork
        </a>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </nav>

      {open && (
        <div className="container flex flex-col gap-1 pb-6 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-white/80 hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-violet-500 px-5 py-3 text-center font-semibold text-white"
          >
            Hire me on Upwork
          </a>
        </div>
      )}
    </header>
  );
}
