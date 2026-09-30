"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star, X, Upload } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import { cldUrl, type Photo } from "@/lib/image";

export default function PhotoManager({
  photos,
  onChange,
  onRemove,
}: {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  onRemove: (photo: Photo) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const latest = useRef(photos);
  latest.current = photos;

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErrors([]);
    const list = Array.from(files);
    setPending((n) => n + list.length);

    // Upload in parallel but append in the order the files were picked.
    const results = await Promise.allSettled(list.map((f) => uploadImage(f)));
    const uploaded: Photo[] = [];
    const failed: string[] = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") uploaded.push(r.value);
      else failed.push(`${list[i].name}: ${(r.reason as Error).message}`);
    });

    onChange([...latest.current, ...uploaded]);
    setErrors(failed);
    setPending((n) => n - list.length);
    if (inputRef.current) inputRef.current.value = "";
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= photos.length) return;
    const next = [...photos];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  function makeCover(i: number) {
    const next = [...photos];
    const [p] = next.splice(i, 1);
    onChange([p, ...next]);
  }

  function remove(i: number) {
    onRemove(photos[i]);
    onChange(photos.filter((_, k) => k !== i));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs uppercase tracking-[0.16em] text-muted">
          Photos ({photos.length}) — first photo is the cover
        </span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending > 0}
          className="flex items-center gap-2 rounded bg-cta px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          <Upload size={16} strokeWidth={1.5} />
          {pending > 0 ? `Uploading ${pending}…` : "Upload photos"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {errors.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-red-600">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      {photos.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex h-40 w-full items-center justify-center rounded border border-dashed border-line text-sm text-muted hover:border-ink"
        >
          Click to upload property photos
        </button>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((p, i) => (
            <div key={p.publicId} className="group relative aspect-[4/3] overflow-hidden rounded border border-line">
              <Image src={cldUrl(p.url, 400)} alt="" fill unoptimized className="object-cover" />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded bg-ink px-2 py-0.5 text-xs text-white">Cover</span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 p-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                <div className="flex">
                  <IconBtn label="Move left" onClick={() => move(i, -1)} disabled={i === 0}>
                    <ArrowLeft size={14} />
                  </IconBtn>
                  <IconBtn label="Move right" onClick={() => move(i, 1)} disabled={i === photos.length - 1}>
                    <ArrowRight size={14} />
                  </IconBtn>
                  <IconBtn label="Make cover" onClick={() => makeCover(i)} disabled={i === 0}>
                    <Star size={14} />
                  </IconBtn>
                </div>
                <IconBtn label="Remove photo" onClick={() => remove(i)}>
                  <X size={14} />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded text-white hover:bg-white/20 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
