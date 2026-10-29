import { experience, skills } from "@/data/site";
import { Reveal, SectionHeading } from "./section";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container max-w-4xl">
        <SectionHeading eyebrow="Background" title="Experience" />

        <ol className="relative border-l border-white/10 pl-8">
          {experience.map((item, i) => (
            <li key={item.company} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-ink bg-violet-400 shadow-[0_0_0_4px_rgba(139,92,246,0.25)]" />
              <Reveal delay={i * 0.08}>
                <p className="text-sm text-violet-300">{item.period}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-white">{item.role}</h3>
                <p className="text-white/60">
                  {item.company} · {item.place}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-white/65">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow="Toolbox" title="Skills & stack" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-4 font-display font-semibold text-white">{group.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white/75">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
