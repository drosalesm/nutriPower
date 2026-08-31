import { useMemo, useState } from "react";
import { Images } from "lucide-react";
import { Reveal } from "./Reveal";
import { ProductModal } from "./ProductModal";
import { asset, site } from "@/data/content";

const { eyebrow, titleStart, titleHighlight, intro, items } = site.products;

type Product = (typeof items)[number];

const ALL_TAB = "Todos";

export function Products() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeTag, setActiveTag] = useState<string>(ALL_TAB);

  const tags = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const p of items) {
      if (!seen.has(p.tag)) {
        seen.add(p.tag);
        ordered.push(p.tag);
      }
    }
    return [ALL_TAB, ...ordered];
  }, []);

  const visibleItems = useMemo(
    () => (activeTag === ALL_TAB ? items : items.filter((p) => p.tag === activeTag)),
    [activeTag]
  );

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

        {/* Category tabs */}
        <Reveal className="mt-10">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
            {tags.map((tag) => {
              const isActive = tag === activeTag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={isActive}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-accent"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visibleItems.map((p, i) => (
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
                  <span className="absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-accent backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {p.tag}
                  </span>
                  <span className="absolute bottom-2 right-2 hidden items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 sm:right-3 sm:bottom-3 sm:inline-flex">
                    <Images className="size-3" />
                    {p.images.length} fotos
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-2.5 sm:p-4">
                  <h3 className="text-sm leading-tight transition-colors duration-300 group-hover:text-accent sm:text-lg">
                    {p.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-muted-foreground sm:mt-1.5 sm:min-h-10 sm:text-xs">
                    {p.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-2 sm:mt-4 sm:gap-3">
                    <span className="display text-base text-accent sm:text-xl">{p.price}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-accent sm:text-[10px]">
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