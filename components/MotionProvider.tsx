'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type MotionState = { motion: boolean; rich: boolean; toggle: () => void };
const MotionContext = createContext<MotionState>({ motion: false, rich: false, toggle: () => {} });
export const useMotion = () => useContext(MotionContext);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const viewport = window.matchMedia('(min-width: 700px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; addEventListener?: (event: string, callback: () => void) => void; removeEventListener?: (event: string, callback: () => void) => void }; deviceMemory?: number });
    const update = () => {
      setReduced(preference.matches);
      setCapable(viewport.matches && !connection.connection?.saveData && connection.connection?.effectiveType !== '2g' && (navigator.hardwareConcurrency || 4) >= 4 && (connection.deviceMemory || 4) >= 4);
    };
    try { setEnabled(localStorage.getItem('meryeme-motion') !== 'off'); } catch { /* Storage is optional. */ }
    update();
    preference.addEventListener('change', update);
    viewport.addEventListener('change', update);
    connection.connection?.addEventListener?.('change', update);
    return () => {
      preference.removeEventListener('change', update);
      viewport.removeEventListener('change', update);
      connection.connection?.removeEventListener?.('change', update);
    };
  }, []);

  const motion = enabled && !reduced;
  return <MotionContext.Provider value={{ motion, rich: motion && capable, toggle: () => {
    setEnabled(value => {
      try { localStorage.setItem('meryeme-motion', value ? 'off' : 'on'); } catch { /* Storage is optional. */ }
      return !value;
    });
  } }}>{children}</MotionContext.Provider>;
}
