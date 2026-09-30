"use client";

import ListingForm from "@/components/admin/ListingForm";
import { emptyListing } from "@/lib/listings";

export default function NewListingPage() {
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-light text-ink">New listing</h1>
      <ListingForm initial={emptyListing} />
    </>
  );
}
