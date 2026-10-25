import { collection, getDocsFromServer, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { testimonials as builtIn, type Testimonial } from "@/lib/testimonials";

// Published reviews from Firestore (edited in Admin → Reviews), in the admin's order.
// Until the built-in reviews have been imported — or if Firestore is unreachable — the built-in list
// is shown, so the section never goes empty.
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    // The `published` filter is required by the security rules; sorting happens here so no
    // composite index is needed.
    const snap = await getDocsFromServer(query(collection(db, "testimonials"), where("published", "==", true)));
    if (snap.empty) return builtIn;
    return snap.docs
      .map((d) => d.data())
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))
      .map((d) => ({ name: String(d.name ?? ""), quote: String(d.quote ?? ""), source: String(d.source ?? "") }))
      .filter((t) => t.name && t.quote);
  } catch {
    return builtIn;
  }
}
