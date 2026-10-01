import type { MetadataRoute } from "next";
import { getPublishedListings } from "@/lib/listingsServer";
import { siteUrl } from "@/lib/constants";

// Listings come from Firestore — build the sitemap per request so new ones appear immediately.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getPublishedListings();
  const latest = Math.max(0, ...listings.map((l) => l.updatedAtMs));

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/listings`,
      lastModified: latest ? new Date(latest) : undefined,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...listings.map((l) => ({
      url: `${siteUrl}/listings/${l.id}`,
      lastModified: l.updatedAtMs ? new Date(l.updatedAtMs) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
