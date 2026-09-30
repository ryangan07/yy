export type Photo = { url: string; publicId: string };

// Serve a resized, auto-format copy instead of the original upload.
export function cldUrl(url: string, width = 1600) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}
