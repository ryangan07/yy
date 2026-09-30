"use client";

import { useMemo, useState } from "react";
import ListingCard from "./ListingCard";
import type { PublicListing } from "@/lib/listingsServer";

const ALL = "All";

export default function ListingsBrowser({ listings }: { listings: PublicListing[] }) {
  const [listingType, setListingType] = useState(ALL);
  const [propertyType, setPropertyType] = useState(ALL);
  const [area, setArea] = useState(ALL);

  const uniq = (key: "listingType" | "propertyType" | "area") =>
    [ALL, ...Array.from(new Set(listings.map((l) => l[key]).filter(Boolean)))];

  const types = uniq("listingType");
  const propertyTypes = uniq("propertyType");
  const areas = uniq("area");

  const visible = useMemo(
    () =>
      listings.filter(
        (l) =>
          (listingType === ALL || l.listingType === listingType) &&
          (propertyType === ALL || l.propertyType === propertyType) &&
          (area === ALL || l.area === area)
      ),
    [listings, listingType, propertyType, area]
  );

  const selectClass =
    "rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal";

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 border-b border-line pb-6">
        <div className="flex gap-2">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setListingType(t)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                listingType === t ? "border-ink bg-ink text-white" : "border-line text-body hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-1">
          <span>Property type</span>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={selectClass}>
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span>Area</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} className={selectClass}>
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <p className="ml-auto text-sm text-muted">
          {visible.length} {visible.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-center text-body">No properties match these filters.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
