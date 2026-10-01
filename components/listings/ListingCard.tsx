"use client";

import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, Maximize2 } from "lucide-react";
import { photoLoader, photoUrl } from "@/lib/image";
import { formatPrice } from "@/lib/listings";
import type { PublicListing } from "@/lib/listingsServer";
import ListingTypeBadge from "./ListingTypeBadge";

export default function ListingCard({ listing: l }: { listing: PublicListing }) {
  const cover = l.photos[0];

  return (
    <Link
      href={`/listings/${l.id}`}
      className="group block overflow-hidden rounded border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line/40">
        {cover ? (
          <Image
            loader={photoLoader(cover)}
            src={photoUrl(cover, 800)}
            alt={l.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">Photos coming soon</div>
        )}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <ListingTypeBadge type={l.listingType} />
          {l.status !== "Available" && (
            <span className="rounded bg-camel px-2.5 py-1 text-xs text-ink">{l.status}</span>
          )}
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {l.area} · {l.propertyType}
        </p>
        <h3 className="mt-2 font-display text-2xl font-light leading-tight text-ink">{l.title}</h3>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-body">
          {l.bedrooms && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} strokeWidth={1.5} className="text-camel" />
              {l.bedrooms} BD
            </span>
          )}
          {l.bathrooms !== "" && (
            <span className="flex items-center gap-1.5">
              <Bath size={16} strokeWidth={1.5} className="text-camel" />
              {l.bathrooms} BA
            </span>
          )}
          {l.builtUp !== "" && (
            <span className="flex items-center gap-1.5">
              <Maximize2 size={16} strokeWidth={1.5} className="text-camel" />
              {Number(l.builtUp).toLocaleString("en-MY")} SqFt
            </span>
          )}
        </div>

        <p className="mt-4 border-t border-line pt-4 font-medium text-ink">{formatPrice(l)}</p>
      </div>
    </Link>
  );
}
