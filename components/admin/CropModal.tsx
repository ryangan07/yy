"use client";

import { useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { X } from "lucide-react";
import { cldUrl, type Crop, type Photo } from "@/lib/image";

const ASPECTS = [
  { label: "Original", value: 0 },
  { label: "4 : 3", value: 4 / 3 },
  { label: "16 : 10", value: 16 / 10 },
  { label: "1 : 1", value: 1 },
  { label: "3 : 4", value: 3 / 4 },
];

// Only the crop box is saved (see Crop in lib/image); Cloudinary applies it on delivery,
// so "Reset" simply drops the crop and the full photo comes back.
export default function CropModal({
  photo,
  onSave,
  onClose,
}: {
  photo: Photo;
  onSave: (crop: Crop | undefined) => void;
  onClose: () => void;
}) {
  const [aspectChoice, setAspectChoice] = useState(photo.crop ? -1 : 1);
  const [natural, setNatural] = useState<number | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);

  // Re-opening a cropped photo keeps its previous framing and aspect.
  const savedAspect = photo.crop && natural ? (photo.crop.w / photo.crop.h) * natural : null;
  const aspect =
    aspectChoice === -1 ? savedAspect ?? 4 / 3 : aspectChoice === 0 ? natural ?? 4 / 3 : ASPECTS[aspectChoice].value;

  const src = cldUrl(photo.url, 2000);

  // Know the photo's shape before mounting the cropper, so a saved crop reopens with the right aspect.
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setSize({ w: img.naturalWidth, h: img.naturalHeight });
      setNatural(img.naturalWidth / img.naturalHeight);
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function save() {
    if (!area) return;
    const crop = {
      x: area.x / 100,
      y: area.y / 100,
      w: area.width / 100,
      h: area.height / 100,
      bw: size.w,
      bh: size.h,
    };
    const isFull = crop.x < 0.001 && crop.y < 0.001 && crop.w > 0.999 && crop.h > 0.999;
    onSave(isFull ? undefined : crop);
  }

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-black" role="dialog" aria-modal aria-label="Crop photo">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-sm">Crop photo — drag to move, scroll or use the slider to zoom</p>
        <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded hover:bg-white/10">
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex-1">
        {natural === null ? (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-white/70">Loading photo…</p>
        ) : (
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(a) => setArea(a)}
            initialCroppedAreaPercentages={
              photo.crop
                ? { x: photo.crop.x * 100, y: photo.crop.y * 100, width: photo.crop.w * 100, height: photo.crop.h * 100 }
                : undefined
            }
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-black px-4 py-4 text-white">
        <div className="flex flex-wrap gap-2">
          {ASPECTS.map((a, i) => (
            <button
              key={a.label}
              type="button"
              onClick={() => setAspectChoice(i)}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                aspect === (i === 0 ? natural : a.value) ? "border-white bg-white text-ink" : "border-white/40 hover:border-white"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-xs normal-case tracking-normal text-white/80">
          Zoom
          <input type="range" min={1} max={4} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
        </label>
        <div className="flex gap-2">
          {photo.crop && (
            <button type="button" onClick={() => onSave(undefined)} className="rounded border border-white/40 px-4 py-2 text-sm hover:border-white">
              Reset to original
            </button>
          )}
          <button type="button" onClick={save} disabled={!area} className="rounded bg-white px-5 py-2 text-sm text-ink disabled:opacity-50">
            Apply crop
          </button>
        </div>
      </div>
    </div>
  );
}
