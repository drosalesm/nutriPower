import content from "./site-content.json";

/** Every file in src/assets, resolved at build time. */
const assets = import.meta.glob("../assets/*", { eager: true, import: "default" }) as Record<
  string,
  unknown
>;

/**
 * Resolves an image key from site-content.json (e.g. "prod-gel.jpg")
 * to its final bundled URL. Managed assets (*.asset.json) expose { url }.
 */
export function asset(key: string | undefined): string {
  if (!key) return "";
  const mod = assets[`../assets/${key}`];
  if (!mod) return "";

  if (typeof mod === "string") return mod;
  if (typeof mod === "object" && mod !== null && "url" in mod) {
    return String((mod as { url: string }).url);
  }
  return "";
}

export const site = content;

export const WHATSAPP_NUMBER = content.brand.whatsapp;

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
