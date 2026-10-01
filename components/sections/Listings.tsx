import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ListingCard from "@/components/listings/ListingCard";
import { getPublishedListings } from "@/lib/listingsServer";

export default async function Listings() {
  const all = await getPublishedListings();
  if (all.length === 0) return null;
  // The homepage shows only Featured listings; with none featured it falls back to the newest.
  const featured = all.filter((l) => l.featured);
  const shown = (featured.length > 0 ? featured : all).slice(0, 6);

  // e.g. "3 for sale · 1 for rent" — follows whatever listing types are in use, custom ones included.
  const counts = new Map<string, number>();
  all.forEach((l) => l.listingType && counts.set(l.listingType, (counts.get(l.listingType) ?? 0) + 1));
  const breakdown = Array.from(counts, ([type, n]) => `${n} ${type.toLowerCase()}`).join(" · ");

  return (
    <section id="listings" className="flex min-h-screen items-center py-section-mobile md:py-section">
      <div className="mx-auto w-full max-w-content px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Listings</p>
            <h2 className="mt-3 text-h2 text-ink">Properties I&apos;m representing</h2>
            {breakdown && <p className="mt-2 text-sm tabular-nums text-muted">{breakdown}</p>}
          </div>
          {all.length > shown.length && (
            <Link href="/listings" className="group flex items-center gap-2 text-sm text-ink">
              View all {all.length} listings
              <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.08}>
              <ListingCard listing={l} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/listings" className="text-sm text-body underline-offset-4 hover:text-ink hover:underline">
            View all {all.length} listings
          </Link>
        </div>
      </div>
    </section>
  );
}
