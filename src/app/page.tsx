import Nav from "@/components/site/nav";
import Hero from "@/components/site/hero";
import Services from "@/components/site/services";
import Projects from "@/components/site/projects";
import { Experience, Skills } from "@/components/site/experience";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
