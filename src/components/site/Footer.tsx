import { Instagram, Facebook, Youtube, type LucideIcon } from "lucide-react";
import { site } from "@/data/content";

const icons: Record<string, LucideIcon> = { Instagram, Facebook, Youtube };

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-8 md:flex-row">
        <p className="text-sm font-semibold tracking-wide text-foreground">{site.brand.name}</p>

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} · {site.brand.tagline}
        </p>

        <div className="flex gap-3">
          {site.footer.socials.map((s) => {
            const Icon = icons[s.icon] ?? Instagram;
            return (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary/15 hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
