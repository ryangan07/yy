import type { Metadata } from "next";
import ListingsBrowser from "@/components/listings/ListingsBrowser";
import { getPublishedListings } from "@/lib/listingsServer";
import { business } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Listings — Winnie Wong, Real Estate Negotiator",
  description: `Properties for sale and rent across ${business.areasServedText}, represented by Winnie Wong (${business.ren}).`,
};

export default async function ListingsPage() {
  const listings = await getPublishedListings();

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-section-mobile pt-32 md:pb-section md:pt-40">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">Listings</p>
      <h1 className="mt-3 text-h2 text-ink">Properties for sale &amp; rent</h1>
      <p className="mt-4 max-w-measure text-body">
        Homes, commercial space and investment properties across {business.areasServedText}.
      </p>

      <div className="mt-12">
        {listings.length === 0 ? (
          <p className="text-body">New listings are on the way — WhatsApp me for what&apos;s available now.</p>
        ) : (
          <ListingsBrowser listings={listings} />
        )}
      </div>
    </main>
  );
}
