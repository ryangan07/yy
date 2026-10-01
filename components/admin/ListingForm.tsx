"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { removeImages } from "@/lib/cloudinary";
import type { Photo } from "@/lib/image";
import { toFirestore, type Listing, type OptionField } from "@/lib/listings";
import { useListingOptions } from "@/lib/useListingOptions";
import { CreatableChips, CreatableSelect } from "./CreatableSelect";
import PhotoManager from "./PhotoManager";

const input =
  "rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal";

export default function ListingForm({ id, initial }: { id?: string; initial: Listing }) {
  const router = useRouter();
  const { options, addOption } = useListingOptions();
  const [l, setL] = useState<Listing>(initial);
  const [removed, setRemoved] = useState<Photo[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Listing>(key: K, value: Listing[K]) => setL((prev) => ({ ...prev, [key]: value }));
  const numberField = (key: "price" | "bathrooms" | "carParks" | "builtUp" | "landArea" | "yearBuilt") => ({
    type: "number" as const,
    min: 0,
    value: l[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      set(key, e.target.value === "" ? "" : Number(e.target.value)),
    className: input,
  });

  const select = (key: Exclude<OptionField, "amenities">, label: string) => (
    <CreatableSelect
      label={label}
      value={l[key]}
      options={options[key]}
      onChange={(v) => set(key, v)}
      onAdd={(v) => addOption(key, v)}
    />
  );

  async function save() {
    if (!l.title.trim()) {
      setError("Please enter a property name.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const data = { ...toFirestore(l), title: l.title.trim(), updatedAt: serverTimestamp() };
      if (id) {
        await updateDoc(doc(db, "listings", id), data);
      } else {
        await addDoc(collection(db, "listings"), { ...data, createdAt: serverTimestamp() });
      }
      await removeImages(removed.map((p) => p.publicId)).catch(() => {});
      router.push("/admin/listings");
    } catch {
      setError("Could not save. Please try again.");
      setSaving(false);
    }
  }

  async function destroy() {
    if (!id || !confirm(`Delete "${l.title}" and all its photos? This cannot be undone.`)) return;
    setSaving(true);
    await deleteDoc(doc(db, "listings", id));
    await removeImages([...l.photos, ...removed].map((p) => p.publicId)).catch(() => {});
    router.push("/admin/listings");
  }

  return (
    <div className="space-y-10">
      <section>
        <PhotoManager
          photos={l.photos}
          onChange={(photos) => set("photos", photos)}
          onRemove={(p) => setRemoved((prev) => [...prev, p])}
        />
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span>Property name</span>
          <input
            value={l.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. 8th & Stellar"
            className={input}
          />
        </label>
        {select("listingType", "Listing type")}
        {select("status", "Status")}
        {select("propertyType", "Property type")}
        {select("area", "Area")}
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span>Address</span>
          <input value={l.address} onChange={(e) => set("address", e.target.value)} className={input} />
        </label>
        <label className="flex flex-col gap-1">
          <span>{l.listingType === "For Rent" ? "Rent (RM / month)" : "Price (RM)"}</span>
          <input {...numberField("price")} placeholder="Leave empty for 'Price on request'" />
        </label>
      </section>

      <section className="grid gap-5 sm:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span>Bedrooms</span>
          <input
            value={l.bedrooms}
            onChange={(e) => set("bedrooms", e.target.value)}
            placeholder="e.g. 3, 1+1, Studio"
            className={input}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Bathrooms</span>
          <input {...numberField("bathrooms")} />
        </label>
        <label className="flex flex-col gap-1">
          <span>Car parks</span>
          <input {...numberField("carParks")} />
        </label>
        <label className="flex flex-col gap-1">
          <span>Built-up (sq ft)</span>
          <input {...numberField("builtUp")} />
        </label>
        <label className="flex flex-col gap-1">
          <span>Land area (sq ft)</span>
          <input {...numberField("landArea")} placeholder="Landed only" />
        </label>
        <label className="flex flex-col gap-1">
          <span>Year built</span>
          <input {...numberField("yearBuilt")} />
        </label>
        {select("tenure", "Tenure")}
        {select("furnishing", "Furnishing")}
      </section>

      <section>
        <CreatableChips
          label="Facilities & amenities"
          selected={l.amenities}
          options={options.amenities}
          onChange={(v) => set("amenities", v)}
          onAdd={(v) => addOption("amenities", v)}
        />
      </section>

      <section>
        <label className="flex flex-col gap-1">
          <span>Description</span>
          <textarea
            rows={8}
            value={l.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Highlights, layout, nearby amenities, access…"
            className={input}
          />
        </label>
      </section>

      <section className="flex flex-wrap gap-6 border-t border-line pt-6 text-sm text-ink">
        <label className="flex cursor-pointer items-center gap-2 normal-case tracking-normal text-ink">
          <input type="checkbox" checked={l.published} onChange={(e) => set("published", e.target.checked)} />
          Published (visible on the website)
        </label>
        <label className="flex cursor-pointer items-center gap-2 normal-case tracking-normal text-ink">
          <input type="checkbox" checked={l.featured} onChange={(e) => set("featured", e.target.checked)} />
          Featured (shown on the homepage)
        </label>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded bg-cta px-6 py-3 text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save listing"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/listings")}
            className="rounded border border-line px-6 py-3 text-sm text-ink hover:border-ink"
          >
            Cancel
          </button>
        </div>
        {id && (
          <button type="button" onClick={destroy} disabled={saving} className="text-sm text-red-600 hover:underline">
            Delete listing
          </button>
        )}
      </div>
    </div>
  );
}
