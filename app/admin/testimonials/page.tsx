"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocsFromServer,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { TESTIMONIAL_SOURCES, testimonials as builtIn } from "@/lib/testimonials";

type Review = { id: string; name: string; quote: string; source: string; published: boolean; order: number };
type Draft = Omit<Review, "id" | "order">;

const MAX_QUOTE = 800;
const input = "rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal";
const emptyDraft: Draft = { name: "", quote: "", source: "Google Review", published: true };

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Review[] | null>(null);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    try {
      const snap = await getDocsFromServer(query(collection(db, "testimonials"), orderBy("order")));
      setItems(
        snap.docs.map((d) => {
          const x = d.data();
          return {
            id: d.id,
            name: String(x.name ?? ""),
            quote: String(x.quote ?? ""),
            source: String(x.source ?? ""),
            published: x.published === true,
            order: Number(x.order ?? 0),
          };
        })
      );
    } catch {
      setMessage({ ok: false, text: "Could not load reviews." });
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Each step wraps a Firestore write; errors surface as a message instead of failing silently.
  async function run(action: () => Promise<void>, okText: string) {
    setBusy(true);
    setMessage(null);
    try {
      await action();
      await load();
      setMessage({ ok: true, text: okText });
    } catch {
      setMessage({ ok: false, text: "Could not save. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  // First use: copy the reviews currently built into the website into Firestore, in the same order.
  function importBuiltIn() {
    run(async () => {
      const batch = writeBatch(db);
      builtIn.forEach((t, i) =>
        batch.set(doc(collection(db, "testimonials")), {
          ...t,
          published: true,
          order: (i + 1) * 10,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      );
      await batch.commit();
    }, `Imported ${builtIn.length} reviews. You can now edit them.`);
  }

  function startEdit(r: Review | null) {
    setMessage(null);
    setEditing(r ? r.id : "new");
    setDraft(r ? { name: r.name, quote: r.quote, source: r.source, published: r.published } : emptyDraft);
  }

  function save() {
    const clean = { ...draft, name: draft.name.trim(), quote: draft.quote.trim() };
    if (!clean.name || !clean.quote) {
      setMessage({ ok: false, text: "Please fill in the name and the review." });
      return;
    }
    const id = editing;
    run(async () => {
      if (id === "new") {
        const last = items?.length ? Math.max(...items.map((r) => r.order)) : 0;
        await addDoc(collection(db, "testimonials"), {
          ...clean,
          order: last + 10,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else if (id) {
        await updateDoc(doc(db, "testimonials", id), { ...clean, updatedAt: serverTimestamp() });
      }
      setEditing(null);
    }, id === "new" ? "Review added — it is live now." : "Review saved — it is live now.");
  }

  function move(i: number, dir: -1 | 1) {
    if (!items) return;
    const a = items[i];
    const b = items[i + dir];
    if (!b) return;
    run(async () => {
      const batch = writeBatch(db);
      batch.update(doc(db, "testimonials", a.id), { order: b.order, updatedAt: serverTimestamp() });
      batch.update(doc(db, "testimonials", b.id), { order: a.order, updatedAt: serverTimestamp() });
      await batch.commit();
    }, "Order updated.");
  }

  function togglePublished(r: Review) {
    run(
      () => updateDoc(doc(db, "testimonials", r.id), { published: !r.published, updatedAt: serverTimestamp() }),
      r.published ? `"${r.name}" is hidden from the website.` : `"${r.name}" is shown on the website.`
    );
  }

  function remove(r: Review) {
    if (!confirm(`Delete the review by "${r.name}"? This cannot be undone.`)) return;
    run(() => deleteDoc(doc(db, "testimonials", r.id)), "Review deleted.");
  }

  const form = (
    <div className="space-y-4 rounded border border-ink/20 bg-surface p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>Client name</span>
          <input
            value={draft.name}
            maxLength={80}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="e.g. Tim Kan"
            className={input}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Where the review came from</span>
          <select value={draft.source} onChange={(e) => setDraft({ ...draft, source: e.target.value })} className={input}>
            {TESTIMONIAL_SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span>Review</span>
        <textarea
          rows={5}
          value={draft.quote}
          maxLength={MAX_QUOTE}
          onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
          placeholder="Paste the client's words. Shorter reviews (2–4 sentences) read best on the website."
          className={input}
        />
        <span className="self-end text-xs normal-case tracking-normal text-muted">
          {draft.quote.length} / {MAX_QUOTE}
        </span>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm normal-case tracking-normal text-ink">
        <input
          type="checkbox"
          checked={draft.published}
          onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
        />
        Show on the website
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded bg-cta px-5 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save review"}
        </button>
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="rounded border border-line px-5 py-2.5 text-sm text-ink hover:border-ink"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-light text-ink">Reviews</h1>
          <p className="mt-1 text-sm text-body">Client reviews in the &ldquo;What clients say&rdquo; section of the homepage.</p>
        </div>
        {items && items.length > 0 && editing !== "new" && (
          <button
            type="button"
            onClick={() => startEdit(null)}
            className="flex items-center gap-2 rounded bg-cta px-5 py-2.5 text-sm text-white hover:opacity-90"
          >
            <Plus size={16} strokeWidth={1.5} />
            Add review
          </button>
        )}
      </div>

      {message && <p className={`mt-4 text-sm ${message.ok ? "text-ink" : "text-red-600"}`}>{message.text}</p>}
      {!items && !message && <p className="mt-6 text-sm text-muted">Loading…</p>}

      {items && items.length === 0 && (
        <div className="mt-6 rounded border border-line bg-surface p-6">
          <p className="text-ink">The website is currently showing {builtIn.length} built-in reviews.</p>
          <p className="mt-1 text-sm text-body">Import them once to start editing, reordering or adding new ones.</p>
          <button
            type="button"
            onClick={importBuiltIn}
            disabled={busy}
            className="mt-4 rounded bg-cta px-5 py-2.5 text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Importing…" : `Import ${builtIn.length} reviews`}
          </button>
        </div>
      )}

      {editing === "new" && <div className="mt-6">{form}</div>}

      {items && items.length > 0 && (
        <ol className="mt-6 space-y-3">
          {items.map((r, i) =>
            editing === r.id ? (
              <li key={r.id}>{form}</li>
            ) : (
              <li
                key={r.id}
                className={`flex gap-4 rounded border border-line bg-surface p-4 ${r.published ? "" : "opacity-60"}`}
              >
                <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">
                    {r.name}
                    <span className="ml-2 text-xs font-normal uppercase tracking-[0.12em] text-muted">{r.source}</span>
                    {!r.published && (
                      <span className="ml-2 rounded bg-line px-2 py-0.5 text-xs font-normal text-ink">Hidden</span>
                    )}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-body">&ldquo;{r.quote}&rdquo;</p>
                </div>
                <div className="flex shrink-0 items-start gap-1">
                  <IconBtn label="Move up" onClick={() => move(i, -1)} disabled={busy || i === 0}>
                    <ArrowUp size={16} strokeWidth={1.5} />
                  </IconBtn>
                  <IconBtn label="Move down" onClick={() => move(i, 1)} disabled={busy || i === items.length - 1}>
                    <ArrowDown size={16} strokeWidth={1.5} />
                  </IconBtn>
                  <IconBtn label="Edit" onClick={() => startEdit(r)} disabled={busy}>
                    <Pencil size={16} strokeWidth={1.5} />
                  </IconBtn>
                  <IconBtn label={r.published ? "Hide from website" : "Show on website"} onClick={() => togglePublished(r)} disabled={busy}>
                    {r.published ? <Eye size={16} strokeWidth={1.5} /> : <EyeOff size={16} strokeWidth={1.5} />}
                  </IconBtn>
                  <IconBtn label="Delete" onClick={() => remove(r)} disabled={busy}>
                    <Trash2 size={16} strokeWidth={1.5} />
                  </IconBtn>
                </div>
              </li>
            )
          )}
        </ol>
      )}

      {items && items.length > 0 && (
        <p className="mt-6 text-xs text-muted">
          The first review in the list is shown first on the website. Changes are live as soon as you save.
        </p>
      )}
    </>
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
      className="flex h-9 w-9 items-center justify-center rounded text-ink hover:bg-line disabled:opacity-30"
    >
      {children}
    </button>
  );
}
