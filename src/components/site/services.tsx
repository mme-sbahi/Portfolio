import { Browser, Robot, CurrencyEth, ChartBar } from "@phosphor-icons/react/dist/ssr";
import { services, profile, type Service } from "@/data/site";
import { Reveal, SectionHeading } from "./section";

const icons: Record<Service["icon"], typeof Browser> = {
  web: Browser,
  ai: Robot,
  chain: CurrencyEth,
  chart: ChartBar,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="What I do"
          title="Services"
          intro="Four things I build for clients, from web apps to AI and blockchain."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={i * 0.08}>
                <article className="glass group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-violet-400/50">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-violet-500/15 text-violet-300 transition group-hover:bg-violet-500 group-hover:text-white">
                    <Icon size={26} weight="duotone" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{service.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <li key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={profile.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-violet-300 underline-offset-4 hover:underline"
          >
            See packages and prices on Upwork →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
