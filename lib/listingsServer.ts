import { collection, doc, getDocFromServer, getDocsFromServer, query, where, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fromFirestore, type Listing } from "@/lib/listings";

export type PublicListing = Omit<Listing, "createdAt" | "updatedAt"> & { id: string; updatedAtMs: number };

function toPublic(id: string, data: Record<string, unknown>): PublicListing {
  const { createdAt: _c, updatedAt, ...rest } = fromFirestore(data);
  void _c;
  return { ...rest, id, updatedAtMs: (updatedAt as Timestamp | undefined)?.toMillis() ?? 0 };
}

// Filtering on `published` is required: the security rules reject any
// public query that could return drafts.
export async function getPublishedListings(): Promise<PublicListing[]> {
  try {
    const snap = await getDocsFromServer(query(collection(db, "listings"), where("published", "==", true)));
    return snap.docs
      .map((d) => toPublic(d.id, d.data()))
      .sort((a, b) => Number(b.featured) - Number(a.featured) || b.updatedAtMs - a.updatedAtMs);
  } catch {
    return [];
  }
}

export async function getPublishedListing(id: string): Promise<PublicListing | null> {
  try {
    const snap = await getDocFromServer(doc(db, "listings", id));
    if (!snap.exists() || snap.data().published !== true) return null;
    return toPublic(snap.id, snap.data());
  } catch {
    return null;
  }
}
