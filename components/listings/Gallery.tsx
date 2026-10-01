"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoLoader, photoUrl, preloadPhoto, type Photo } from "@/lib/image";

// The browser picks a width from these; preloads use the same values so they hit the cache.
const INLINE_SIZES = "(min-width: 1280px) 820px, (min-width: 1024px) 66vw, 100vw";
const FULLSCREEN_SIZES = "92vw";

export default function Gallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = photos.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  // Warm the browser cache with the neighbouring photos so arrows switch instantly
  // instead of waiting on a fresh Cloudinary download after every click.
  useEffect(() => {
    if (count < 2) return;
    const near = [1, -1, 2].map((d) => photos[(index + d + count) % count]);
    near.forEach((p) => {
      preloadPhoto(p, INLINE_SIZES);
      if (open) preloadPhoto(p, FULLSCREEN_SIZES);
    });
  }, [index, open, count, photos]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  if (count === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded bg-line/40 text-sm text-muted">
        Photos coming soon
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded bg-ink/5">
        <button type="button" onClick={() => setOpen(true)} className="absolute inset-0" aria-label="View full screen">
          <Image
            loader={photoLoader(photos[index])}
            src={photoUrl(photos[index], 1600)}
            alt={`${title} — photo ${index + 1}`}
            fill
            sizes={INLINE_SIZES}
            priority
            className="object-cover"
          />
        </button>
        {count > 1 && (
          <>
            <NavBtn side="left" onClick={() => go(-1)} />
            <NavBtn side="right" onClick={() => go(1)} />
            <span className="absolute bottom-3 right-3 rounded bg-ink/70 px-2.5 py-1 text-xs text-white">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button
              key={p.publicId}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded border-2 transition-opacity ${
                i === index ? "border-camel" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={photoUrl(p, 240, { watermark: false })} alt="" fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95" role="dialog" aria-modal>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
          <div className="relative h-[85vh] w-[92vw]">
            {/* The already-cached inline copy shows instantly while the full-screen size loads on top. */}
            <Image
              loader={photoLoader(photos[index])}
              src={photoUrl(photos[index], 1600)}
              alt=""
              fill
              sizes={INLINE_SIZES}
              className="object-contain"
            />
            <Image
              key={index}
              loader={photoLoader(photos[index])}
              src={photoUrl(photos[index], 2400)}
              alt={`${title} — photo ${index + 1}`}
              fill
              sizes={FULLSCREEN_SIZES}
              className="object-contain"
            />
          </div>
          {count > 1 && (
            <>
              <NavBtn side="left" onClick={() => go(-1)} />
              <NavBtn side="right" onClick={() => go(1)} />
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function NavBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow transition-colors hover:bg-white ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <Icon size={20} strokeWidth={1.5} />
    </button>
  );
}
