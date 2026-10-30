'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMotion } from './MotionProvider';

export default function HeroSculpture({ still = false }: { still?: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const pulse = useRef<(() => void) | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const { rich } = useMotion();

  useEffect(() => {
    if (!rich || !mount.current) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import('./kineticScene').then(({ createKineticScene }) => {
      if (disposed || !mount.current) return;
      const scene = createKineticScene(mount.current, still, () => setReady(false));
      if (!scene) return;
      pulse.current = scene.pulse;
      cleanup = scene.dispose;
      setReady(true);
    }).catch(() => { /* The static composition remains if 3D is unavailable. */ });
    return () => { disposed = true; cleanup?.(); pulse.current = undefined; setReady(false); };
  }, [rich, still]);

  return <div className={`sculpture kinetic-field ${ready ? 'is-ready' : ''}`}>
    <div className="field-grid" aria-hidden="true" />
    <div className="sculpture-fallback" aria-hidden="true"><div className="field-poster-frame"><Image src="/images/field-poster.webp" fill alt="" priority sizes="(max-width: 700px) 100vw, 80vw" style={{ objectFit: 'contain' }} /></div></div>
    <div className="sculpture-canvas" ref={mount} aria-hidden="true" />
    <div className="field-vignette" aria-hidden="true" />
    <div className="field-coordinate mono" aria-hidden="true"><span>FIG. 02</span><span>KINETIC INTELLIGENCE</span></div>
    <div className="field-readout mono" aria-hidden="true"><span className="field-dot" /> AN OPEN FIELD OF POSSIBILITIES</div>
    {ready && <button className="scene-pulse mono" type="button" onClick={() => pulse.current?.()} aria-label="Send a ripple through the 3D field"><span className="pulse-symbol" aria-hidden="true">◎</span><span>RELEASE ENERGY</span><span aria-hidden="true">↗</span></button>}
  </div>;
}
