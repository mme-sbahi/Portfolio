import { SiGithub, SiLinkedin, SiUpwork } from "react-icons/si";
import { profile } from "@/data/site";

const items = [
  { label: "Upwork", href: profile.links.upwork, Icon: SiUpwork },
  { label: "GitHub", href: profile.links.github, Icon: SiGithub },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: SiLinkedin },
];

export default function Social({ size = 20 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="glass grid h-11 w-11 place-items-center rounded-full text-white/70 transition hover:border-violet-400/60 hover:text-white"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
