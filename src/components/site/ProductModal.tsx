import { useEffect, useState } from "react";
import { Check, MessageCircle, X } from "lucide-react";
import { asset, site, waLink } from "@/data/content";

type Product = (typeof site.products.items)[number];

const m = site.products.modal;

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
      style={{ animation: "rise-in 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-border bg-card shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-0 md:grid-cols-2">
          <div className="p-4">
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                key={product.images[active]}
                src={asset(product.images[active])}
                alt={`${product.name} — foto ${active + 1}`}
                className="aspect-square w-full object-cover"
                width={800}
                height={800}
                style={{ animation: "rise-in 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver foto ${i + 1} de ${product.name}`}
                  className={`overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-0.5 ${
                    i === active
                      ? "border-primary ring-1 ring-primary/60"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={asset(img)}
                    alt=""
                    className="aspect-square w-full object-cover"
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
              {m.galleryHint}
            </p>
          </div>

          <div className="flex flex-col p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                {product.tag}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <h3 className="mt-4 text-3xl leading-tight">{product.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.longDesc}</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {m.detailsTitle}
            </p>
            <ul className="mt-3 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
              <span className="display text-3xl text-accent">{product.price}</span>
              <a
                href={waLink(`Hola Nutri Power, me interesa ${product.name} (${product.price}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bolt text-base"
              >
                <MessageCircle className="size-4" />
                {m.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
