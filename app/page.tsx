import Image from 'next/image';
import Header from '@/components/Header';
import HeroSculpture from '@/components/HeroSculpture';
import AnimationDirector from '@/components/AnimationDirector';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import { Arrow, Asterisk } from '@/components/Icons';
import { projects, foundations, social } from '@/lib/projects';

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-heading">
        <HeroSculpture />
        <div className="hero-meta hero-entrance"><span className="mono"><span className="status-dot" /> SOFTWARE ENGINEER & FRONTEND DEVELOPER</span><span className="mono hero-edition">INDEPENDENT MIND. CONNECTED THINKING.</span></div>
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="hero-heading"><span className="hero-line"><span className="hero-word">Engineering.</span></span><span className="hero-line"><span className="hero-word">With feeling<span className="title-period">.</span></span></span></h1>
            <div className="hero-intro hero-entrance"><span className="intro-rule" /><p>I’m Meryeme Mesbahi. I turn complex ideas into intuitive digital experiences — with thoughtful design and solid code.</p></div>
            <div className="hero-buttons hero-entrance"><a className="pill-button dark-button" href="#work">Explore my work<Arrow diagonal /></a><a href="/resume.pdf" className="text-link" target="_blank" rel="noreferrer">View résumé<span>↗</span></a></div>
          </div>
        </div>
        <div className="hero-chapter" aria-hidden="true"><span className="mono">FROM THE FIRST IDEA TO THE LAST DETAIL</span><p>Complexity,<br /><em>made clear.</em></p><span className="mono">THOUGHTFUL SYSTEMS. INTUITIVE EXPERIENCES.</span></div>
        <div className="hero-curtain" aria-hidden="true"><span className="mono">01 / SELECTED WORK</span><p>Ideas, built<br /><em>into experiences.</em></p><span className="mono">CONTINUE TO EXPLORE ↓</span></div>
        <div className="hero-bottom hero-entrance"><a href="#work" className="scroll-link"><span className="scroll-icon">↓</span><span className="mono">SCROLL TO DISCOVER</span></a><span className="hero-note">A detail-oriented approach.<br />From the interface to the infrastructure.</span><span className="mono hero-year">PORTFOLIO — 2026</span></div>
      </section>

      <section className="work section-pad" id="work" aria-labelledby="work-heading">
        <div className="section-kicker" data-reveal><span className="mono">01 / SELECTED WORK</span><span className="mono">IDEAS, BUILT INTO EXPERIENCES</span></div>
        <div className="section-heading" data-reveal><h2 id="work-heading">Less theory.<br /><span className="muted">More making.</span></h2><p>A selection of product interfaces,<br className="desktop-break" /> real-time experiences, and thoughtful code.</p></div>
        <div className="work-stage"><div className="gallery-top mono"><span>SELECTED PROJECTS / 01—03</span><span>SCROLL TO EXPLORE →</span></div><div className="projects-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}
          <div className="work-aside" data-reveal><Asterisk /><p>Different challenges.<br />The same attention<br />to every detail.</p><a href={social.github} target="_blank" rel="noreferrer" className="text-link">More on GitHub<Arrow diagonal /></a><span className="mono">CURIOUS BY DEFAULT.</span></div>
        </div><div className="gallery-progress" aria-hidden="true"><span className="gallery-progress-fill" /></div></div>
      </section>

      <section className="foundations section-pad" aria-labelledby="foundations-heading">
        <div className="section-kicker" data-reveal><span className="mono">02 / UNDER THE SURFACE</span><span className="mono">A STRONGER FOUNDATION</span></div>
        <div className="foundations-intro" data-reveal><h2 id="foundations-heading">Good interfaces start<br />with deeper understanding.</h2><p>My curiosity goes beyond the browser — into systems, networks, and the infrastructure that holds it all together.</p></div>
        <div className="foundation-list">{foundations.map((item, index) => <details className="foundation-item" key={item.title} data-reveal><summary><span className="mono foundation-number">0{index + 1}</span><div className="foundation-title"><span className="mono">{item.discipline}</span><h3>{item.title}</h3></div><p>{item.text}</p><span className="foundation-plus" aria-hidden="true">+</span></summary><div className="foundation-detail"><Image src={item.image} alt={`${item.title} project illustration`} width={700} height={430} sizes="(max-width: 700px) 90vw, 35vw" /><div><p>{item.description}</p><span className="mono">{item.tags}</span><a className="text-link" href={`${social.github}/${['inception', 'ft_IRC', 'MiniSHell'][index]}`} target="_blank" rel="noreferrer">View source<Arrow diagonal /></a></div></div></details>)}</div>
      </section>

      <section className="about section-pad" id="about" aria-labelledby="about-heading">
        <div className="section-kicker" data-reveal><span className="mono">03 / THE PERSON BEHIND THE CODE</span><span className="mono">ALWAYS A WORK IN PROGRESS.</span></div>
        <div className="about-grid"><div className="about-portrait" data-reveal><Image src="/images/meryem.webp" width={700} height={827} alt="Meryeme Mesbahi" sizes="(max-width: 700px) 90vw, 35vw" /><span className="portrait-label mono">MERYEME MESBAHI <span>↗</span></span></div><div className="about-copy" data-reveal><h2 id="about-heading">An engineer’s mind.<br /><span className="muted">A maker’s curiosity.</span></h2><p>I’m a frontend developer who cares as much about how a product feels as how it works. I build modern applications with Next.js, React, and TypeScript, with a focus on performance, scalability, and user experience.</p><p>Component-driven design helps me turn complexity into clear, adaptable interfaces. Continuous learning keeps me questioning, experimenting, and pushing the work further.</p><a href="/resume.pdf" target="_blank" rel="noreferrer" className="text-link">A closer look at my background<Arrow diagonal /></a><div className="skills"><span className="mono">MY EVERYDAY TOOLKIT</span><div className="tag-list">{['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'Git & GitHub', 'UI / UX'].map(skill => <span key={skill}>{skill}</span>)}</div></div></div></div>
      </section>

      <section className="belief section-pad" aria-label="Engineering approach"><div className="belief-top mono" data-reveal><span>A SIMPLE BELIEF</span><Asterisk className="belief-star" /></div><p><span className="belief-line">Make it work.</span><span className="belief-line">Make it clear.</span><span className="belief-line">Make it feel right.</span></p><div className="belief-bottom mono"><span>LOGIC IN THE FOUNDATION.</span><span>INTENTION IN THE DETAILS.</span></div></section>

      <section className="experience section-pad" id="experience" aria-labelledby="experience-heading"><div className="section-kicker" data-reveal><span className="mono">04 / EXPERIENCE</span><span className="mono">LEARNING THROUGH BUILDING</span></div><div className="experience-grid"><h2 id="experience-heading" data-reveal>Built alongside<br /><span className="muted">good people.</span></h2><article className="experience-entry" data-reveal><div className="experience-top"><span className="mono">2024 — 6 MONTHS</span><span className="mono">INTERNSHIP</span></div><h3>Frontend Developer</h3><span className="experience-company">Chatlilo ↗</span><p>Developed and maintained responsive applications with React and TypeScript. Worked with the design team to bring detailed UI components to life and improve application performance.</p><div className="tag-list">{['React', 'TypeScript', 'Tailwind CSS', 'Git'].map(skill => <span key={skill}>{skill}</span>)}</div></article></div></section>

      <section className="contact section-pad" id="contact" aria-labelledby="contact-heading"><div className="section-kicker" data-reveal><span className="mono">05 / WHAT’S NEXT?</span><span className="mono">LET’S FIND OUT TOGETHER.</span></div><div className="contact-title" data-reveal><h2 id="contact-heading">Something<br />on your mind?</h2><Arrow diagonal /></div><div className="contact-grid" data-reveal><p>A product to build. A challenge to solve.<br />A team to grow with.<br /><span>Let’s start a conversation.</span></p><ContactForm /></div><div className="contact-social"><a href={social.github} target="_blank" rel="noreferrer">GitHub<Arrow diagonal /></a><a href={social.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow diagonal /></a><a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé<Arrow diagonal /></a></div><footer><a href="#top" className="footer-name">Meryeme Mesbahi<span aria-hidden="true">✳</span></a><span className="mono">© 2026 · MADE WITH INTENTION</span><a href="#top" className="back-top mono">BACK TO TOP ↑</a></footer></section>
    </main>
    <AnimationDirector />
  </>;
}
