// Crop box as fractions (0–1) of the photo, plus the pixel size (bw × bh) the crop was drawn on.
export type Crop = { x: number; y: number; w: number; h: number; bw: number; bh: number };
export type Photo = { url: string; publicId: string; crop?: Crop };

// Serve a resized, auto-format copy instead of the original upload.
export function cldUrl(url: string, width = 1600) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

// Watermark image lives in Cloudinary at wennie/site/watermark; scaled to 60% of the photo width.
const WATERMARK = "l_wennie:site:watermark/fl_layer_apply,fl_relative,w_0.6,o_55,g_center";

// Listing photo URL: the saved crop and the watermark are applied by Cloudinary on delivery,
// so the original stays untouched and can be re-cropped at any time.
// Cloudinary rounds relative crop values to 2 decimals (0.2833 → 0.28, several pixels off), so the
// original is first scaled to the exact size the crop was drawn on, then cropped in whole pixels.
export function photoUrl(photo: Photo, width = 1600, { watermark = true } = {}) {
  const steps: string[] = [];
  const c = photo.crop;
  if (c) {
    const px = (f: number, size: number) => Math.round(Math.min(1, Math.max(0, f)) * size);
    steps.push(`c_scale,w_${c.bw},h_${c.bh}`);
    steps.push(`c_crop,x_${px(c.x, c.bw)},y_${px(c.y, c.bh)},w_${px(c.w, c.bw)},h_${px(c.h, c.bh)}`);
  }
  if (watermark) steps.push(WATERMARK);
  steps.push(`f_auto,q_auto,c_limit,w_${width}`);
  return photo.url.replace("/upload/", `/upload/${steps.join("/")}/`);
}

// next/image loader: lets the browser pick a width from srcset instead of every phone downloading
// the 1600px copy. Cloudinary does the resizing, so /_next/image is never involved (CLAUDE.md §7).
// Must be used from client components (a loader is a function prop).
export const photoLoader =
  (photo: Photo, opts?: { watermark?: boolean }) =>
  ({ width }: { width: number }) =>
    photoUrl(photo, width, opts);

// The widths next/image puts in srcset for a `sizes` value in vw (its default deviceSizes).
const DEVICE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

// Same srcset next/image generates, so a preload hits the exact URL the <img> will later choose.
export function preloadPhoto(photo: Photo, sizes: string) {
  const img = new window.Image();
  img.sizes = sizes;
  img.srcset = DEVICE_WIDTHS.map((w) => `${photoUrl(photo, w)} ${w}w`).join(", ");
}
