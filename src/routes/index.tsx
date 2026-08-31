import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { Events } from "@/components/site/Events";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { waLink } from "@/components/site/Reveal";
import { MessageCircle } from "lucide-react";

const title = "Nutri Power | Suplementos para running y ciclismo";
const description =
  "Geles energéticos, galletas de proteína y electrolitos para runners y ciclistas. Mejorando tu performance en cada kilómetro.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Events />
        <Contact />
      </main>
      <Footer />
      <a
        href={waLink("Hola Nutri Power, quiero información de sus productos.")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp-float"
        aria-label="Escribir por WhatsApp"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
