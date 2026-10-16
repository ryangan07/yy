// Shared by the /api/visit counter, the tracker and the admin Visitors page.

// Calendar day in Malaysia time, e.g. "2026-10-16" — the visits/{day} document id.
export function visitDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur" }).format(date);
}

// Groups URLs into a small, fixed set of map keys (Firestore map keys stay simple and bounded).
export function visitPageKey(path: string): string | null {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  if (clean.length > 120 || clean.startsWith("/admin") || clean.startsWith("/api")) return null;
  if (clean === "/") return "home";
  if (clean === "/listings") return "listings";
  if (clean === "/privacy") return "privacy";
  const listing = clean.match(/^\/listings\/([A-Za-z0-9]{10,40})$/);
  if (listing) return `listing_${listing[1]}`;
  const area = clean.match(/^\/areas\/([a-z-]{2,40})$/);
  if (area) return `area_${area[1]}`;
  return null; // 404s and anything unexpected are not counted
}
