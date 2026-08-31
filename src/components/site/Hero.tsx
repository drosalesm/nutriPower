import { ArrowRight, Zap } from "lucide-react";
import { asset, site } from "@/data/content";

const h = site.hero;
const heroImg = asset(h.image);
const iso = asset(site.brand.isotipo);

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-36 md:pt-44">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <span className="animate-float block size-full">
          <img
            src={heroImg}
            alt={h.imageAlt}
            className="size-full object-cover object-center transition-transform duration-700 hover:rotate-1 hover:scale-[1.03]"
            width={1600}
            height={1104}
          />
        </span>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      <div className="surface-warm absolute inset-0 -z-10" />
      <div
        className="animate-glow absolute -right-24 top-10 -z-10 size-[420px] rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--primary) 22%, transparent)" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
        <div>
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <Zap className="size-3.5" /> {h.badge}
          </span>

          <p
            className="animate-rise display mt-6 text-5xl tracking-wide text-primary sm:text-6xl md:text-7xl"
            style={{ animationDelay: "40ms" }}
          >
            {h.brandLine}
          </p>

          <h1
            className="animate-rise mt-3 text-3xl text-foreground sm:text-4xl md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            {h.titleParts.map((part, i) => (
              <span
                key={i}
                className={
                  part.tone === "lime"
                    ? "text-[var(--lime)]"
                    : part.tone === "primary"
                      ? "text-primary"
                      : "text-foreground"
                }
              >
                {part.text}
              </span>
            ))}
          </h1>


          <p
            className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            {h.subtitle}
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <a href={h.primaryCta.href} className="btn-bolt group">
              {h.primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={h.secondaryCta.href} className="btn-ghost-bolt">
              {h.secondaryCta.label}
            </a>
          </div>

          <dl
            className="animate-rise mt-14 grid max-w-lg grid-cols-3 gap-6"
            style={{ animationDelay: "320ms" }}
          >
            {h.stats.map((s) => (
              <div key={s.label} className="border-l-2 border-primary/60 pl-4">
                <dt className="display text-3xl text-accent">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden justify-self-center md:block">
          <div
            className="animate-glow absolute inset-0 rounded-full blur-3xl"
            style={{ background: "color-mix(in oklab, var(--lime) 25%, transparent)" }}
          />
          <span className="animate-float relative block">
            <img
              src={iso}
              alt={`Isotipo ${site.brand.name}`}
              className="w-[340px] transition-transform duration-700 hover:rotate-3 hover:scale-105"
              width={340}
              height={340}
              loading="lazy"
            />
          </span>

        </div>
      </div>

      <div className="overflow-hidden border-y border-border bg-card/60 py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10">
              {h.marquee.map((t) => (
                <span
                  key={t}
                  className="display text-xl text-muted-foreground transition-colors hover:text-accent"
                >
                  ⚡ {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
