"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ListingForm from "@/components/admin/ListingForm";
import { fromFirestore, type Listing } from "@/lib/listings";

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDocFromServer(doc(db, "listings", id))
      .then((snap) => (snap.exists() ? setListing(fromFirestore(snap.data())) : setError("Listing not found.")))
      .catch(() => setError("Could not load this listing."));
  }, [id]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!listing) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-light text-ink">Edit listing</h1>
      <ListingForm id={id} initial={listing} />
    </>
  );
}
