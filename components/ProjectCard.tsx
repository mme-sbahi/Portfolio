'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Arrow } from './Icons';
import type { Project } from '@/lib/projects';
import { useMotion } from './MotionProvider';

export default function ProjectCard({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const visual = useRef<HTMLButtonElement>(null);
  const { motion, rich } = useMotion();
  const [videoError, setVideoError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened || !dialog.current) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      if (element.open) element.close();
    };
  }, [opened]);

  useEffect(() => {
    if (!opened || !motion) return;
    const animation = gsap.fromTo(dialog.current?.querySelector('.dialog-content') || [], { y: 60, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power3.out', clearProps: 'all' });
    return () => { animation.revert(); };
  }, [opened, motion]);

  useEffect(() => {
    if (!rich || !visual.current || !matchMedia('(pointer:fine)').matches) return;
    const element = visual.current;
    const context = gsap.context(() => {
      gsap.set(element, { transformPerspective: 1200, transformOrigin: '50% 50%' });
      const x = gsap.quickTo(element, 'rotationX', { duration: 0.65, ease: 'power3.out' });
      const y = gsap.quickTo(element, 'rotationY', { duration: 0.65, ease: 'power3.out' });
      const move = (event: PointerEvent) => {
        const r = element.getBoundingClientRect();
        x(-((event.clientY - r.top) / r.height - 0.5) * 6);
        y(((event.clientX - r.left) / r.width - 0.5) * 7);
      };
      const leave = () => { x(0); y(0); };
      element.addEventListener('pointermove', move); element.addEventListener('pointerleave', leave);
      return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); };
    });
    return () => context.revert();
  }, [rich]);

  const close = () => { dialog.current?.close(); };
  return <>
    <article className={`project-card project-${project.number}`} data-reveal>
      <button ref={visual} className="project-visual" onClick={() => setOpened(true)} aria-label={`Explore ${project.title}`}>
        <span className="project-topline mono"><span>{project.category}</span><span>↗</span></span>
        <div className="project-image-wrap"><Image src={project.image} width={1400} height={809} alt={`${project.title} project interface`} className="project-image" sizes="(max-width: 700px) 94vw, (max-width: 1000px) 48vw, 44vw" /></div>
        <span className="project-open"><span>{project.video ? 'Explore & watch' : 'Explore project'}</span><Arrow diagonal /></span>
      </button>
      <div className="project-info"><div className="project-title"><span className="mono project-index">{project.number} /</span><h3><button onClick={() => setOpened(true)}>{project.title}</button></h3></div><span className="project-tags mono">{project.tags.slice(0, 3).join(' / ')}</span></div>
      <p className="project-description">{project.description.split('. ')[0]}.</p>
    </article>
    {opened && createPortal(<dialog className="project-dialog" aria-labelledby={`${project.slug}-dialog-title`} ref={dialog} onClose={() => { setPlaying(false); setOpened(false); }} onClick={event => { if (event.target === dialog.current) close(); }}>
      <div className="dialog-content">
        <div className="dialog-nav"><span className="mono">PROJECT {project.number} / {project.category}</span><button className="close-dialog" onClick={close} aria-label={`Close ${project.title} details`}>Close <span aria-hidden="true">×</span></button></div>
        <h2 id={`${project.slug}-dialog-title`}>{project.title}<span aria-hidden="true">↗</span></h2>
        <div className="dialog-media">
          {playing && project.video ? <><video controls autoPlay playsInline preload="metadata" poster={project.image} onError={() => setVideoError(true)}><source src={project.video} type="video/mp4" />Your browser does not support this video.</video>{videoError && <p className="video-error" role="alert">The video couldn’t load. <a href={project.video} target="_blank" rel="noreferrer">Open the original demo ↗</a></p>}</> : <Image src={project.image} alt={`${project.title} interface preview`} width={1400} height={809} sizes="90vw" />}
        </div>
        <div className="dialog-details"><p>{project.description}</p><div><span className="mono">PROJECT FOCUS</span><ul>{project.focus.map(focus => <li key={focus}>{focus}</li>)}</ul></div></div>
        <div className="dialog-bottom"><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.video && !playing && <button className="pill-button dark-button" onClick={() => { setVideoError(false); setPlaying(true); }}>Watch original demo <span aria-hidden="true">▷</span></button>}</div>
      </div>
    </dialog>, document.body)}
  </>;
}
