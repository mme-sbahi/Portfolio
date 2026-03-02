"use client";
import Aboutme from "@/components/aboutme";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import LoadingAnimation from "@/components/loadingAnimatio";
import Projects from "@/components/projects";
import Hero from "@/components/hero";
import Sparkles from "@/components/sparkles";
import { useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="size-full">
      {loading && <LoadingAnimation onComplete={() => setLoading(false)} />}
      {!loading && (
        <div className="relative">
          <Sparkles />
          <div className="flex flex-col gap-10 min-h-screen bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
            <Hero />
            <Aboutme />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </div>
      )}
    </main>
  );
}
