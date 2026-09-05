import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  Quote,
} from "lucide-react";

import { Reveal } from "./Reveal";

import { asset, site } from "@/data/content";

const { eyebrow, titleStart, titleHighlight, intro, items } = site.events;

type EventItem = Omit<(typeof items)[number], "image"> & {
  image?: string;
  images?: string[];
};

type EventGalleryProps = {
  event: EventItem;
};

function EventGallery({ event }: EventGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  const images =
    event.images && event.images.length > 0
      ? event.images
      : event.image
        ? [event.image]
        : [];

  const hasMultipleImages = images.length > 1;

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <img
        key={images[activeImage]}
        src={asset(images[activeImage])}
        alt={`${event.place} - imagen ${activeImage + 1}`}
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

      {/* Contador de imágenes */}
      {hasMultipleImages && (
        <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
          <Images className="size-3.5" />

          {activeImage + 1} / {images.length}
        </span>
      )}

      {/* Navegación */}
      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            aria-label="Ver imagen anterior"
            className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-black/60 group-hover:opacity-100 md:left-5"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Ver siguiente imagen"
            className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-black/60 group-hover:opacity-100 md:right-5"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 md:flex">
            {images.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(imageIndex);
                }}
                aria-label={`Ver imagen ${imageIndex + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === imageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Lugar sobre imagen en móvil */}
      <div className="absolute bottom-5 left-5 right-5 md:hidden">
        <div className="flex items-start gap-2 text-white">
          <MapPin className="mt-1 size-4 shrink-0 text-primary" />

          <h3 className="text-xl font-semibold leading-tight">
            {event.place}
          </h3>
        </div>

        {/* Indicadores móvil */}
        {hasMultipleImages && (
          <div className="mt-4 flex items-center gap-1.5">
            {images.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(imageIndex);
                }}
                aria-label={`Ver imagen ${imageIndex + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === imageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function Events() {
  const eventItems = items as readonly EventItem[];

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
          {eventItems.map((event, index) => {
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
                  {/* Galería de imágenes */}
                  <div
                    className={`relative min-h-[270px] overflow-hidden md:col-span-7 md:min-h-[390px] ${
                      isEven ? "" : "md:order-2"
                    }`}
                  >
                    <EventGallery event={event} />
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