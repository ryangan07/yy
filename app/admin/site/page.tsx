"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { doc, getDocFromServer, serverTimestamp, setDoc } from "firebase/firestore";
import { Upload } from "lucide-react";
import { db } from "@/lib/firebase";
import { removeImages, uploadImage } from "@/lib/cloudinary";
import { cldUrl, type Photo } from "@/lib/image";
import { DEFAULT_HERO } from "@/lib/siteSettings";

export default function SiteSettingsPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hero, setHero] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    getDocFromServer(doc(db, "settings", "site"))
      .then((snap) => setHero((snap.data()?.heroImage as Photo | undefined) ?? null))
      .catch(() => setMessage({ ok: false, text: "Could not load settings." }))
      .finally(() => setLoading(false));
  }, []);

  // Saves straight away; the previous custom photo is removed from Cloudinary afterwards.
  async function apply(next: Photo | null, successText: string) {
    const previous = hero;
    await setDoc(doc(db, "settings", "site"), { heroImage: next, updatedAt: serverTimestamp() }, { merge: true });
    setHero(next);
    if (previous) await removeImages([previous.publicId]).catch(() => {});
    setMessage({ ok: true, text: successText });
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setMessage(null);
    try {
      const photo = await uploadImage(file, "site");
      await apply(photo, "Homepage photo updated — it is live now.");
    } catch (e) {
      setMessage({ ok: false, text: (e as Error).message || "Upload failed. Please try again." });
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function restoreDefault() {
    if (!confirm("Go back to the original homepage photo?")) return;
    setBusy(true);
    try {
      await apply(null, "Original homepage photo restored.");
    } catch {
      setMessage({ ok: false, text: "Could not save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const src = hero ? cldUrl(hero.url, 1600) : DEFAULT_HERO;

  return (
    <>
      <h1 className="font-display text-3xl font-light text-ink">Homepage</h1>
      <p className="mt-2 text-sm text-body">
        The large photo behind the water-ripple effect at the top of the homepage.
      </p>

      <section className="mt-8">
        <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
          Current photo {hero ? "(custom)" : "(original)"}
        </span>
        <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded border border-line bg-ink">
          {!loading && (
            <>
              <Image src={src} alt="" fill unoptimized className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/50" />
              <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-3xl font-light text-bg">
                Property decisions, negotiated with care.
              </p>
            </>
          )}
        </div>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-body">
          <li>Use a landscape (wide) photo, at least 2000 pixels across, so it stays sharp on large screens.</li>
          <li>The website shows it in full colour with a light dark overlay so the headline stays readable.</li>
          <li>The centre of the photo sits behind the headline — avoid photos with important details there.</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy || loading}
            className="flex items-center gap-2 rounded bg-cta px-5 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            <Upload size={16} strokeWidth={1.5} />
            {busy ? "Saving…" : "Upload new photo"}
          </button>
          {hero && (
            <button
              type="button"
              onClick={restoreDefault}
              disabled={busy}
              className="rounded border border-line px-5 py-2.5 text-sm text-ink hover:border-ink disabled:opacity-60"
            >
              Restore original photo
            </button>
          )}
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
        </div>

        {message && <p className={`mt-4 text-sm ${message.ok ? "text-ink" : "text-red-600"}`}>{message.text}</p>}
      </section>
    </>
  );
}
