import { useEffect, useState } from "react";
import { Menu, X, Home, Package, Trophy, MessageCircle, type LucideIcon } from "lucide-react";
import { asset, site, waLink } from "@/data/content";

const icons: Record<string, LucideIcon> = { Home, Package, Trophy, MessageCircle };

const { links, ctaLabel, ctaMessage } = site.nav;
const logo = asset(site.brand.logo);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ease-out ${
        scrolled
          ? "border-b border-border bg-background/80 py-2 backdrop-blur-xl"
          : "border-b border-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#inicio" className="group relative flex items-center">
          <span
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "color-mix(in oklab, var(--primary) 35%, transparent)" }}
          />
          <span className="animate-float relative block">
            <img
              src={logo}
              alt={`${site.brand.name} — ${site.brand.tagline}`}
              className={`w-auto transition-[height,transform] duration-500 ease-out [transition-duration:500ms,700ms] hover:rotate-3 hover:scale-105 ${
                scrolled ? "h-16 md:h-20" : "h-20 md:h-28"
              }`}
              width={360}
              height={112}
            />
          </span>

        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const Icon = icons[l.icon] ?? Home;
            return (
              <a
                key={l.href}
                href={l.href}
                className="nav-link group flex items-center gap-2 text-base"
              >
                <Icon className="size-5 text-primary transition-transform duration-300 group-hover:scale-125" />
                {l.label}
              </a>
            );
          })}
          <a
            href={waLink(ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bolt !px-5 !py-2 !text-sm"
          >
            <MessageCircle className="size-4" />
            {ctaLabel}
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="animate-rise mx-5 mt-3 rounded-xl border border-border bg-card/95 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => {
              const Icon = icons[l.icon] ?? Home;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="nav-link flex items-center gap-3 text-base"
                >
                  <Icon className="size-4 text-primary" />
                  {l.label}
                </a>
              );
            })}
            <a
              href={waLink(ctaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-bolt !py-2 !text-sm"
            >
              <MessageCircle className="size-4" />
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
