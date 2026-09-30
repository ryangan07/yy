import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ListingCard from "@/components/listings/ListingCard";
import { getPublishedListings } from "@/lib/listingsServer";

export default async function Listings() {
  const all = await getPublishedListings();
  if (all.length === 0) return null;
  const shown = all.slice(0, 6);

  return (
    <section id="listings" className="flex min-h-screen items-center py-section-mobile md:py-section">
      <div className="mx-auto w-full max-w-content px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Listings</p>
            <h2 className="mt-3 text-h2 text-ink">Properties I&apos;m representing</h2>
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

        {all.length <= shown.length && (
          <div className="mt-10 text-center">
            <Link href="/listings" className="text-sm text-body underline-offset-4 hover:text-ink hover:underline">
              Browse all listings
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
