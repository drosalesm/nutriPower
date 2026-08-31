import { MapPin, Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { asset, site } from "@/data/content";


const { eyebrow, titleStart, titleHighlight, intro, items } = site.events;

export function Events() {
  return (
    <section id="eventos" className="relative overflow-hidden py-20 md:py-28">
      <div className="surface-warm absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-20 bg-card/40" />

      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </span>
          <h2 className="mt-3 max-w-3xl text-4xl md:text-5xl">
            {titleStart}
            <span className="text-gradient-bolt">{titleHighlight}</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">{intro}</p>
        </Reveal>
        <div className="bolt-line mt-6 w-24" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((e, i) => (
            <Reveal key={e.place} delay={(i % 4) * 90} className="h-full">
              <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative overflow-hidden">
                  <img
                    src={asset(e.image)}
                    alt={e.place}
                    className="h-36 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                    width={1200}
                    height={912}
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent backdrop-blur">
                    {e.date}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="flex items-start gap-2 text-base leading-tight transition-colors duration-300 group-hover:text-accent">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    {e.place}
                  </h3>
                  <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                    <Quote className="mr-1.5 inline size-3 -translate-y-0.5 text-primary" />
                    {e.quote}
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-widest text-foreground/80">
                    {e.person}
                  </p>
                  <div className="mt-3 border-t border-border pt-3">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Con <span className="text-accent">{e.product}</span>
                    </span>
                  </div>

                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
