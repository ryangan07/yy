"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocsFromServer,
  orderBy,
  query,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  propertyType?: string;
  budget?: string;
  message?: string;
  status?: "new" | "replied";
  createdAt?: Timestamp;
};

function waLink(phone: string, name: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "6" + digits;
  const text = `Hi ${name}, this is Winnie Wong from The Roof Realty — thanks for your enquiry.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function formatDate(ts?: Timestamp) {
  if (!ts) return "—";
  return ts.toDate().toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "short" });
}

export default function EnquiriesInbox() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "replied">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocsFromServer(query(collection(db, "enquiries"), orderBy("createdAt", "desc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enquiry, "id">) })));
    } catch {
      setError("Could not load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleStatus(item: Enquiry) {
    const next = item.status === "replied" ? "new" : "replied";
    await updateDoc(doc(db, "enquiries", item.id), { status: next });
    setItems((prev) => prev.map((e) => (e.id === item.id ? { ...e, status: next } : e)));
  }

  async function remove(item: Enquiry) {
    if (!confirm(`Delete the enquiry from ${item.name}? This cannot be undone.`)) return;
    await deleteDoc(doc(db, "enquiries", item.id));
    setItems((prev) => prev.filter((e) => e.id !== item.id));
  }

  const newCount = items.filter((e) => e.status !== "replied").length;
  const visible = items.filter((e) =>
    filter === "all" ? true : filter === "new" ? e.status !== "replied" : e.status === "replied"
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["all", "new", "replied"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                filter === f ? "border-ink bg-ink text-white" : "border-line text-body hover:border-ink"
              }`}
            >
              {f}
              {f === "new" && newCount > 0 ? ` (${newCount})` : ""}
            </button>
          ))}
        </div>
        <button type="button" onClick={load} className="text-sm text-body underline-offset-4 hover:underline">
          Refresh
        </button>
      </div>

      {loading && <p className="mt-10 text-sm text-muted">Loading…</p>}
      {error && <p className="mt-10 text-sm text-red-600">{error}</p>}
      {!loading && !error && visible.length === 0 && (
        <p className="mt-10 text-sm text-muted">No enquiries here yet.</p>
      )}

      <ul className="mt-6 space-y-4">
        {visible.map((e) => (
          <li key={e.id} className="rounded border border-line bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">
                  {e.name}
                  {e.status !== "replied" && (
                    <span className="ml-2 rounded-full bg-camel/15 px-2 py-0.5 text-xs text-ink">New</span>
                  )}
                </p>
                <a href={`tel:${e.phone}`} className="text-sm text-body hover:text-ink">
                  {e.phone}
                </a>
              </div>
              <p className="text-xs text-muted">{formatDate(e.createdAt)}</p>
            </div>

            {(e.propertyType || e.budget) && (
              <p className="mt-3 text-sm text-body">
                {[e.propertyType, e.budget].filter(Boolean).join(" · ")}
              </p>
            )}
            {e.message && <p className="mt-2 whitespace-pre-line text-sm text-ink">{e.message}</p>}

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={waLink(e.phone, e.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded bg-[#25D366] px-4 py-2 text-sm text-white hover:opacity-90"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Reply on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => toggleStatus(e)}
                className="rounded border border-line px-4 py-2 text-sm text-ink hover:border-ink"
              >
                {e.status === "replied" ? "Mark as new" : "Mark as replied"}
              </button>
              <button
                type="button"
                onClick={() => remove(e)}
                className="rounded px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
