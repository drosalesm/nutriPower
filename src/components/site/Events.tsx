import { MapPin, Quote } from "lucide-react";

import { Reveal } from "./Reveal";

import { asset, site } from "@/data/content";

const { eyebrow, titleStart, titleHighlight, intro, items } = site.events;

export function Events() {
  return (
    <section
      id="eventos"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="surface-warm absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-20 bg-card/40" />

      <div className="mx-auto max-w-7xl px-5">
        {/* Header editorial */}
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                {eyebrow}
              </span>

              <h2 className="mt-3 text-4xl leading-tight md:text-6xl">
                {titleStart}

                <span className="text-gradient-bolt">
                  {titleHighlight}
                </span>
              </h2>

              <div className="bolt-line mt-7 w-32" />
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                {intro}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Eventos */}
        <div className="mt-14 space-y-10 md:mt-20 md:space-y-16">
          {items.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <Reveal
                key={event.place}
                delay={(index % 4) * 80}
              >
                <article
                  className={`group relative grid overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-primary/40 md:grid-cols-12 ${
                    isEven ? "md:mr-20" : "md:ml-20"
                  }`}
                >
                  {/* Imagen */}
                  <div
                    className={`relative min-h-[270px] overflow-hidden md:col-span-7 md:min-h-[390px] ${
                      isEven ? "" : "md:order-2"
                    }`}
                  >
                    <img
                      src={asset(event.image)}
                      alt={event.place}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      width={1200}
                      height={912}
                      loading="lazy"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Fecha */}
                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      {event.date}
                    </span>

                    {/* Lugar sobre imagen */}
                    <div className="absolute bottom-5 left-5 right-5 md:hidden">
                      <div className="flex items-start gap-2 text-white">
                        <MapPin className="mt-1 size-4 shrink-0 text-primary" />

                        <h3 className="text-xl font-semibold leading-tight">
                          {event.place}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Información */}
                  <div
                    className={`relative flex flex-col justify-center p-7 md:col-span-5 md:p-10 lg:p-12 ${
                      isEven ? "" : "md:order-1"
                    }`}
                  >
                    <Quote className="absolute right-7 top-7 size-12 text-primary/10 md:right-10 md:top-10" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                      Evento {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="mt-4 hidden items-start gap-3 md:flex">
                      <MapPin className="mt-1 size-5 shrink-0 text-primary" />

                      <h3 className="text-2xl font-semibold leading-tight text-foreground lg:text-3xl">
                        {event.place}
                      </h3>
                    </div>

                    <div className="mt-5 h-px w-16 bg-primary" />

                    <p className="mt-6 text-sm leading-7 text-muted-foreground">
                      “{event.quote}”
                    </p>

                    <div className="mt-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                        {event.person}
                      </p>
                    </div>

                    <div className="mt-7 border-t border-border pt-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Producto utilizado
                      </span>

                      <p className="mt-1 text-sm font-semibold text-accent">
                        {event.product}
                      </p>
                    </div>
                  </div>

                  {/* Número decorativo */}
                  <span
                    className={`pointer-events-none absolute bottom-[-20px] hidden text-[110px] font-bold leading-none text-foreground/[0.025] lg:block ${
                      isEven ? "right-5" : "left-5"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}