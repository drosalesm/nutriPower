import { useState } from "react";
import { Images } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProductModal } from "./ProductModal";
import { asset, site } from "@/data/content";

const { eyebrow, titleStart, titleHighlight, intro, items } = site.products;

type Product = (typeof items)[number];

export function Products() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="productos" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-5xl md:text-6xl">
              {titleStart}
              <span className="text-gradient-bolt">{titleHighlight}</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">{intro}</p>
        </Reveal>
        <div className="bolt-line mt-8 w-32" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.name} as="article" delay={(i % 4) * 80} className="h-full">
              <article
                role="button"
                tabIndex={0}
                onClick={() => setSelected(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
                aria-label={`Ver detalles de ${p.name}`}
                className="card-lift group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={asset(p.images[0])}
                    alt={p.name}
                    className="aspect-square w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.08]"
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent backdrop-blur">
                    {p.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <Images className="size-3" />
                    {p.images.length} fotos
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg leading-tight transition-colors duration-300 group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 min-h-10 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="display text-xl text-accent">{p.price}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
