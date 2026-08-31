import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Quote,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";

import { asset, site } from "@/data/content";

const icons: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
};

const c = site.contact;
const f = site.founders;

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const nombre = form.get("nombre")?.toString().trim() ?? "";
    const disciplina = form.get("disciplina")?.toString().trim() ?? "";
    const mensaje = form.get("mensaje")?.toString().trim() ?? "";

    const whatsappMessage = [
      "Hola Nutri Power 👋",
      "",
      "Quisiera ponerme en contacto con ustedes.",
      "",
      `👤 Nombre: ${nombre}`,
      `🏃 Disciplina: ${disciplina}`,
      "",
      "💬 Mensaje:",
      mensaje,
    ].join("\n");

    const url = `https://wa.me/${site.brand.whatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setSent(true);

    window.open(url, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setSent(false);
    }, 2000);
  };

  return (
    <>
      {/* ACERCA DE NOSOTROS */}
      <section id="nosotros" className="overflow-hidden py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          {/* ENCABEZADO */}
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                {f.eyebrow}
              </span>

              <h2 className="mt-3 text-4xl leading-tight md:text-6xl">
                {f.titleStart}
                <span className="text-gradient-bolt">
                  {f.titleHighlight}
                </span>
              </h2>

              <div className="bolt-line mt-7 w-32" />
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-base leading-7 text-muted-foreground">
                {f.intro}
              </p>
            </div>
          </div>

          {/* FUNDADORES */}
          <div className="mt-14 space-y-8 md:mt-20 md:space-y-12">
            {f.items.map((founder, index) => (
              <FounderCard
                key={`${founder.name}-${index}`}
                founder={founder}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* INFORMACIÓN */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {c.eyebrow}
            </span>

            <h2 className="mt-3 text-5xl md:text-6xl">
              {c.titleStart}
              <span className="text-gradient-bolt">
                {c.titleHighlight}
              </span>
            </h2>

            <div className="bolt-line mt-8 w-32" />

            <p className="mt-6 max-w-md text-muted-foreground">
              {c.intro}
            </p>

            <ul className="mt-10 space-y-5">
              {c.details.map((d) => {
                const Icon = icons[d.icon] ?? Mail;

                return (
                  <li
                    key={d.label}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-card transition-all group-hover:-translate-y-1 group-hover:border-primary">
                      <Icon className="size-5 text-accent" />
                    </span>

                    <span className="text-foreground/90 transition-colors group-hover:text-accent">
                      {d.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* FORMULARIO WHATSAPP */}
          <div className="flex items-start justify-center lg:justify-end">
            <form
              onSubmit={onSubmit}
              className="card-lift w-full max-w-sm rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <MessageCircle className="size-4 text-primary" />
                </span>

                <div>
                  <h3 className="text-sm font-semibold">
                    Escríbenos por WhatsApp
                  </h3>

                  <p className="text-[11px] leading-tight text-muted-foreground">
                    Completa tus datos y continúa en WhatsApp.
                  </p>
                </div>
              </div>

              <Field
                label="Nombre"
                name="nombre"
                placeholder="Tu nombre"
              />

              <div className="mt-3">
                <Field
                  label="Disciplina"
                  name="disciplina"
                  placeholder="Running, ciclismo, trail..."
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="mensaje"
                  className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  Mensaje
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={2}
                  required
                  placeholder="¿Qué producto necesitas?"
                  className="mt-1.5 w-full resize-none rounded-md border border-input bg-background/60 px-3 py-2 text-xs outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/35"
                />
              </div>

              <button
                type="submit"
                className="btn-bolt group mt-4 w-full py-2 text-sm"
              >
                {sent ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Abriendo WhatsApp...
                  </>
                ) : (
                  <>
                    Contactar por WhatsApp
                    <MessageCircle className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function FounderCard({
  founder,
  index,
}: {
  founder: {
    image: string;
    imageAlt: string;
    name: string;
    role: string;
    description: string;
  };
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const isEven = index % 2 === 0;

  const words = founder.description.trim().split(/\s+/);
  const hasMore = words.length > 100;

  const shortDescription = hasMore
    ? `${words.slice(0, 100).join(" ")}...`
    : founder.description;

  return (
    <article
      className={`group relative grid overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-primary/40 md:grid-cols-12 ${
        isEven ? "md:mr-20" : "md:ml-20"
      }`}
    >
      {/* FOTO VERTICAL */}
      <div
        className={`relative flex items-center justify-center overflow-hidden p-5 md:col-span-5 md:p-7 ${
          isEven
            ? ""
            : "md:order-2"
        }`}
      >
        <div className="relative aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-2xl">
          <img
            src={asset(founder.image)}
            alt={founder.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">
            <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {founder.role}
            </span>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN */}
      <div
        className={`relative flex flex-col justify-center p-7 md:col-span-7 md:p-10 lg:p-12 ${
          isEven
            ? ""
            : "md:order-1"
        }`}
      >
        <Quote className="absolute right-7 top-7 size-10 text-primary/10 md:right-10 md:top-10" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
          Fundador {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          {founder.name}
        </h3>

        <div className="mt-5 h-px w-16 bg-primary" />

        <p className="mt-6 text-sm leading-7 text-muted-foreground">
          {expanded ? founder.description : shortDescription}
        </p>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent transition-colors hover:text-primary"
          >
            {expanded ? (
              <>
                Ver menos
                <ChevronUp className="size-4" />
              </>
            ) : (
              <>
                Leer historia completa
                <ChevronDown className="size-4" />
              </>
            )}
          </button>
        )}

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {site.brand.name}
          </span>
        </div>
      </div>
    </article>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-input bg-background/60 px-3 py-2 text-xs outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/35"
      />
    </div>
  );
}

