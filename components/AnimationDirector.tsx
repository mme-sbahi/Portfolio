'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export default function AnimationDirector() {
  const { motion, rich } = useMotion();
  const introduced = useRef(false);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motion) return;
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 800px) and (min-height: 560px)', allowed: '(prefers-reduced-motion: no-preference)' }, context => {
      if (!context.conditions?.allowed) return;
      const cinematic = rich && context.conditions?.desktop;
      const cleanups: (() => void)[] = [];
      if (!introduced.current) {
        gsap.fromTo('.hero-word', { yPercent: 115, rotate: 5 }, { yPercent: 0, rotate: 0, stagger: 0.12, duration: 1.65, ease: 'power4.out', clearProps: 'all', delay: 0.15 });
        gsap.fromTo('.hero-copy .hero-entrance', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, delay: 0.65, clearProps: 'all' });
        introduced.current = true;
      }

      const hero = document.querySelector<HTMLElement>('.hero');
      if (cinematic && hero) {
        hero.classList.add('is-cinematic');
        const scene = { progress: 0 };
        const updateField = () => {
          hero.dataset.fieldProgress = String(scene.progress);
          hero.dispatchEvent(new CustomEvent('field:progress', { detail: scene.progress }));
        };
        const story = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: () => `+=${innerHeight * 1.45}`, pin: true, scrub: 1.05, anticipatePin: 1, invalidateOnRefresh: true } });
        story.to(scene, { progress: 1, duration: 1, ease: 'none', onUpdate: updateField }, 0)
          .to('.hero-copy', { y: -80, opacity: 0, duration: 0.23, ease: 'power1.in' }, 0)
          .to('.hero-meta, .hero-bottom, .scene-pulse, .field-readout', { opacity: 0, duration: 0.15 }, 0.02)
          .fromTo('.hero-chapter', { autoAlpha: 0, y: 65, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.27, ease: 'power2.out' }, 0.26)
          .to('.hero-chapter', { autoAlpha: 0, scale: 1.07, y: -35, duration: 0.18 }, 0.7)
          .fromTo('.hero-curtain', { clipPath: 'circle(0% at 50% 100%)' }, { clipPath: 'circle(150% at 50% 100%)', duration: 0.24, ease: 'power2.inOut' }, 0.76);
        cleanups.push(() => { hero.classList.remove('is-cinematic'); scene.progress = 0; updateField(); });
      }

      const stage = document.querySelector<HTMLElement>('.work-stage');
      const track = stage?.querySelector<HTMLElement>('.projects-grid');
      if (cinematic && stage && track) {
        stage.classList.add('is-horizontal');
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        const gallery = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: () => `+=${distance() * 1.12}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } });
        gallery.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0)
          .fromTo('.gallery-progress-fill', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
        gsap.utils.toArray<HTMLElement>('.project-card', track).forEach(card => {
          const image = card.querySelector('.project-image-wrap');
          gsap.fromTo(image, { xPercent: -5 }, { xPercent: 5, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: gallery, start: 'left right', end: 'right left', scrub: true } });
        });
        let focusFrame = 0;
        const focus = (event: FocusEvent) => {
          const target = event.target as HTMLElement;
          if (!target.matches(':focus-visible')) return;
          const card = target.closest<HTMLElement>('.project-card');
          if (!card || !gallery.scrollTrigger) return;
          const bounds = card.getBoundingClientRect();
          const gutter = parseFloat(getComputedStyle(stage).paddingLeft) || 0;
          if (bounds.left < gutter - 4 || bounds.right > innerWidth - gutter + 4 || bounds.top < 0 || bounds.bottom > innerHeight) {
            const fraction = Math.min(Math.max(card.offsetLeft, 0) / Math.max(distance(), 1), 1);
            cancelAnimationFrame(focusFrame);
            focusFrame = requestAnimationFrame(() => {
              if (!gallery.scrollTrigger || document.querySelector('dialog:modal')) return;
              stage.scrollLeft = 0;
              window.scrollTo({ top: gallery.scrollTrigger.start + fraction * (gallery.scrollTrigger.end - gallery.scrollTrigger.start), behavior: 'instant' });
              ScrollTrigger.update();
              gallery.scrollTrigger.getTween()?.progress(1);
            });
          }
        };
        stage.addEventListener('focusin', focus);
        cleanups.push(() => { cancelAnimationFrame(focusFrame); stage.classList.remove('is-horizontal'); stage.removeEventListener('focusin', focus); stage.scrollLeft = 0; });
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        if (cinematic && element.closest('.work-stage')) return;
        gsap.fromTo(element, { y: rich ? 55 : 22, opacity: 0, rotateX: rich ? 4 : 0 }, {
          y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: element, start: 'top 95%', once: true },
        });
      });
      if (rich) {
        gsap.fromTo('.about-portrait img', { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about-portrait', start: 'top bottom', end: 'bottom center', scrub: 1 } });
        gsap.utils.toArray<HTMLElement>('.belief-line').forEach((line, index) => {
          gsap.fromTo(line, { opacity: 0.14, x: index % 2 ? 65 : -65 }, { opacity: 1, x: 0, ease: 'none', scrollTrigger: { trigger: line, start: 'top 85%', end: 'top 48%', scrub: 0.6 } });
        });
        gsap.to('.belief-star', { rotation: 270, ease: 'none', scrollTrigger: { trigger: '.belief', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.fromTo('.contact-title>svg', { rotate: -45, scale: 0.4 }, { rotate: 0, scale: 1, scrollTrigger: { trigger: '.contact-title', start: 'top 95%', end: 'top 45%', scrub: 0.8 } });
      }
      if (rich && matchMedia('(pointer:fine)').matches) {
        document.querySelectorAll<HTMLElement>('.pill-button, .contact-link').forEach(element => {
          const x = gsap.quickTo(element, 'x', { duration: 0.55, ease: 'elastic.out(1,0.4)' });
          const y = gsap.quickTo(element, 'y', { duration: 0.55, ease: 'elastic.out(1,0.4)' });
          const move = (event: PointerEvent) => {
            const r = element.getBoundingClientRect();
            x((event.clientX - r.left - r.width / 2) * 0.18);
            y((event.clientY - r.top - r.height / 2) * 0.25);
          };
          const leave = () => { x(0); y(0); };
          element.addEventListener('pointermove', move); element.addEventListener('pointerleave', leave);
          cleanups.push(() => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); });
        });
        if (cursor.current) {
          const ring = cursor.current;
          const x = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
          const y = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });
          const move = (event: PointerEvent) => { x(event.clientX); y(event.clientY); };
          const over = (event: PointerEvent) => {
            const target = event.target as HTMLElement;
            const active = target.closest('.project-visual, .sculpture-canvas');
            ring.querySelector('span')!.textContent = target.closest('.project-visual') ? 'EXPLORE' : 'PLAY';
            gsap.to(ring, { opacity: active ? 1 : 0, scale: active ? 1 : 0.4, duration: 0.25, overwrite: 'auto' });
          };
          const leave = () => gsap.to(ring, { opacity: 0, duration: 0.2 });
          window.addEventListener('pointermove', move, { passive: true });
          document.addEventListener('pointerover', over);
          document.addEventListener('pointerleave', leave);
          cleanups.push(() => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); document.removeEventListener('pointerleave', leave); gsap.killTweensOf(ring); ring.style.opacity = '0'; });
        }
      }
      const refresh = (event: Event) => {
        // A pin refresh temporarily detaches the gallery. Dialog toggles must
        // never refresh it, or the browser removes the modal from its top layer.
        if (event.target instanceof HTMLDetailsElement) ScrollTrigger.refresh();
      };
      document.addEventListener('toggle', refresh, true);
      document.fonts.ready.then(() => { if (document.contains(stage)) ScrollTrigger.refresh(); });
      return () => { cleanups.forEach(cleanup => cleanup()); document.removeEventListener('toggle', refresh, true); };
    });
    return () => mm.revert();
  }, [motion, rich]);
  return <div className="experience-cursor" ref={cursor} aria-hidden="true"><span>PLAY</span><i>↗</i></div>;
}
