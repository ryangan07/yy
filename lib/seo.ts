import type { Metadata } from "next";
import { siteUrl } from "@/lib/constants";

export const SITE_NAME = "Winnie Wong — Real Estate Negotiator";
export const DEFAULT_OG_IMAGE = { url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Winnie Wong, Real Estate Negotiator" };

// Next.js replaces (not merges) a parent's openGraph object, so every page builds its own —
// otherwise a page would inherit the homepage's og:url.
export function pageOpenGraph({
  path,
  title,
  description,
  images,
}: {
  path: string;
  title: string;
  description: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
}): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_MY",
    siteName: SITE_NAME,
    url: `${siteUrl}${path}`,
    title,
    description,
    images: images ?? [DEFAULT_OG_IMAGE],
  };
}

// Collapse whitespace and cut at a word boundary so search snippets never end mid-word.
export function clip(text: string, max = 158) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]+$/, "")}…`;
}
