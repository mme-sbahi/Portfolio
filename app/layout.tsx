import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './motion.css';
import MotionProvider from '@/components/MotionProvider';

const origin = 'https://meryeme-engineering-portfolio.risedatalabs-4785.chatgpt.site';
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: 'Meryeme Mesbahi — Software Engineer & Frontend Developer',
  description: 'Thoughtful interfaces. Solid engineering. Explore Meryeme Mesbahi’s work across Next.js, React, TypeScript, real-time systems, and AI product interfaces.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Meryeme Mesbahi — Engineering with feeling.', description: 'Software engineering, thoughtful interfaces, and a little creative curiosity.', type: 'website', url: origin, images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Meryeme Mesbahi — Software Engineer', images: ['/opengraph-image.png'] },
  icons: { icon: '/icon.svg' },
};
export const viewport: Viewport = { themeColor: '#f4f4f0', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider>{children}</MotionProvider></body></html>;
}
