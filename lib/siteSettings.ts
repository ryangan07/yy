import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Photo } from "@/lib/image";

// Editable from /admin/site. Stored at settings/site (publicly readable, admin-writable).
export type SiteSettings = { heroImage: Photo | null };

export const DEFAULT_HERO = "/images/accent-2.webp";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDocFromServer(doc(db, "settings", "site"));
    const heroImage = (snap.data()?.heroImage as Photo | undefined) ?? null;
    return { heroImage: heroImage?.url ? heroImage : null };
  } catch {
    return { heroImage: null };
  }
}
