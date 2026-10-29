import { profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container flex flex-col items-center justify-between gap-3 text-sm text-white/45 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <a href="#top" className="hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
