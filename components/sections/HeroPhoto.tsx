"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cldUrl } from "@/lib/image";

// Plain photo shown the moment the page loads (fast first paint / LCP), sitting over the WebGL
// ripple canvas. Once the ripple's own copy of the photo is in the browser cache it fades out,
// handing over to the canvas without a black flash.
export default function HeroPhoto({
  cloudinaryUrl,
  localSrc,
  rippleSrc,
}: {
  cloudinaryUrl?: string; // Winnie's uploaded photo — resized by Cloudinary per screen width
  localSrc: string; // built-in default photo
  rippleSrc: string; // exact URL the ripple loads
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer = 0;
    const img = new window.Image();
    img.crossOrigin = "anonymous"; // same request mode as the ripple, so it shares the cached copy
    img.onload = () => {
      timer = window.setTimeout(() => setHidden(true), 400);
    };
    img.src = rippleSrc;
    return () => window.clearTimeout(timer);
  }, [rippleSrc]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      {cloudinaryUrl ? (
        <Image
          loader={({ width }) => cldUrl(cloudinaryUrl, width)}
          src={cldUrl(cloudinaryUrl, 1600)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <Image src={localSrc} alt="" fill priority sizes="100vw" className="object-cover" />
      )}
    </div>
  );
}
