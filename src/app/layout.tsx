import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Meryeme Mesbahi · Full-Stack & Blockchain Developer",
  description:
    "Full-stack web apps, AI document chatbots (RAG), smart contracts and Power BI dashboards. Next.js, NestJS, FastAPI, Solidity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} overflow-x-hidden`}>
      <body className="font-sans">
        {children}
        <Toaster position="top-right" theme="dark" richColors closeButton />
      </body>
    </html>
  );
}
