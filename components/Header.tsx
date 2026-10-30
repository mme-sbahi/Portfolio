'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Arrow } from './Icons';
import { useMotion } from './MotionProvider';

const links = [['Work', '#work'], ['About', '#about'], ['Experience', '#experience']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);
  const { motion, toggle } = useMotion();

  useEffect(() => {
    if (!open || !motion || !menu.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(menu.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut', clearProps: 'clipPath' });
      gsap.fromTo(menu.current!.querySelectorAll('a'), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, delay: 0.13, ease: 'power3.out', clearProps: 'all' });
    });
    return () => context.revert();
  }, [open, motion]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !toggleButton.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [open]);

  return <header className="header">
    <a className="wordmark" href="#top" aria-label="Meryeme Mesbahi, back to top"><span className="monogram">m<span>m</span><i /></span><span className="wordmark-name">Meryeme<br />Mesbahi<span className="wordmark-dot" aria-hidden="true">✳</span></span></a>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(([label, href]) => <a key={href} href={href}>{label}<span className="nav-dot" /></a>)}</nav>
    <div className="header-actions">
      <button className="motion-toggle" type="button" onClick={toggle} aria-pressed={motion} aria-label={motion ? 'Pause animations' : 'Enable animations when motion preferences allow'}><span className={`motion-bars ${motion ? 'active' : ''}`} aria-hidden="true"><i /><i /><i /></span><span>Motion {motion ? 'on' : 'off'}</span></button>
      <a href="#contact" className="contact-link">Let’s talk <Arrow diagonal /></a>
      <button ref={toggleButton} className={`menu-toggle ${open ? 'is-open' : ''}`} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <nav id="mobile-menu" ref={menu} className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{[...links, ['Contact', '#contact']].map(([label, href], index) => <a href={href} key={href} onClick={() => setOpen(false)}><span className="mono">0{index + 1}</span>{label}<Arrow diagonal /></a>)}</nav>
  </header>;
}
