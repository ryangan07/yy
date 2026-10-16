import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { visitDay, visitPageKey } from "@/lib/visits";

// Anonymous visit counter: one Firestore doc per Malaysian calendar day (visits/YYYY-MM-DD) holding
// total page views, unique visitors and per-page counts. No cookies, IPs or personal data are stored.
// firestore.rules only allows +1 increments here, so the worst abuse is inflated numbers.
export const dynamic = "force-dynamic";

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview|lighthouse|headless|curl|wget|python|monitor/i;

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua)) return new Response(null, { status: 204 });

  let body: { path?: unknown; newVisitor?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const key = typeof body.path === "string" ? visitPageKey(body.path) : null;
  if (!key) return new Response(null, { status: 204 });

  try {
    await setDoc(
      doc(db, "visits", visitDay()),
      {
        views: increment(1),
        visitors: increment(body.newVisitor === true ? 1 : 0),
        pages: { [key]: increment(1) },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("visit count failed", e);
  }
  return new Response(null, { status: 204 });
}
