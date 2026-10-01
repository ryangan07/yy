"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { collection, getDocsFromServer, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { photoUrl } from "@/lib/image";
import { formatPrice, fromFirestore, type Listing } from "@/lib/listings";

export default function AdminListingsPage() {
  const [items, setItems] = useState<(Listing & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDocsFromServer(query(collection(db, "listings"), orderBy("updatedAt", "desc")))
      .then((snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...fromFirestore(d.data()) }))))
      .catch(() => setError("Could not load listings."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-light text-ink">Listings</h1>
        <Link href="/admin/listings/new" className="rounded bg-cta px-5 py-2.5 text-sm text-white hover:opacity-90">
          + New listing
        </Link>
      </div>

      {loading && <p className="text-sm text-muted">Loading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-sm text-muted">No listings yet — add your first property.</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((l) => (
          <li key={l.id}>
            <Link
              href={`/admin/listings/${l.id}`}
              className="block overflow-hidden rounded border border-line bg-surface transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-line/40">
                {l.photos[0] ? (
                  <Image src={photoUrl(l.photos[0], 600, { watermark: false })} alt="" fill unoptimized className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted">No photo</div>
                )}
                <div className="absolute left-2 top-2 flex gap-1">
                  <span className="rounded bg-ink px-2 py-0.5 text-xs text-white">{l.listingType}</span>
                  {!l.published && <span className="rounded bg-white px-2 py-0.5 text-xs text-ink">Draft</span>}
                  {l.featured && (
                    <span className="flex items-center gap-1 rounded bg-white px-2 py-0.5 text-xs text-ink">
                      <Star size={12} strokeWidth={1.5} className="fill-camel text-camel" />
                      Featured
                    </span>
                  )}
                  {l.status !== "Available" && (
                    <span className="rounded bg-camel px-2 py-0.5 text-xs text-ink">{l.status}</span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium text-ink">{l.title}</p>
                <p className="mt-1 text-sm text-body">
                  {l.propertyType} · {l.area}
                </p>
                <p className="mt-2 text-sm font-medium text-ink">{formatPrice(l)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
