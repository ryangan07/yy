"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, documentId, getDocsFromServer, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { areaBySlug } from "@/lib/areas";
import { visitDay } from "@/lib/visits";

type Day = { id: string; views: number; visitors: number; pages: Record<string, number> };

const DAY_MS = 86_400_000;

// The last n Malaysian calendar days, oldest first, e.g. ["2026-09-17", …, "2026-10-16"].
function lastDays(n: number) {
  return Array.from({ length: n }, (_, i) => visitDay(new Date(Date.now() - (n - 1 - i) * DAY_MS)));
}

const shortDate = (id: string) =>
  new Date(`${id}T00:00:00`).toLocaleDateString("en-MY", { day: "numeric", month: "short" });

export default function VisitorsPage() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDocsFromServer(query(collection(db, "visits"), orderBy(documentId())))
      .then((snap) =>
        setDays(
          snap.docs.map((d) => {
            const x = d.data();
            return { id: d.id, views: x.views ?? 0, visitors: x.visitors ?? 0, pages: x.pages ?? {} };
          })
        )
      )
      .catch(() => setError("Could not load visitor numbers."));
    // Listing titles for the "top pages" list (admins can read drafts too).
    getDocsFromServer(collection(db, "listings"))
      .then((snap) => setTitles(Object.fromEntries(snap.docs.map((d) => [d.id, String(d.data().title ?? d.id)]))))
      .catch(() => {});
  }, []);

  const stats = useMemo(() => {
    if (!days) return null;
    const byId = new Map(days.map((d) => [d.id, d]));
    const sum = (ids: string[]) =>
      ids.reduce((acc, id) => {
        const d = byId.get(id);
        return { visitors: acc.visitors + (d?.visitors ?? 0), views: acc.views + (d?.views ?? 0) };
      }, { visitors: 0, views: 0 });
    const last30 = lastDays(30);
    const pages = new Map<string, number>();
    last30.forEach((id) => Object.entries(byId.get(id)?.pages ?? {}).forEach(([k, v]) => pages.set(k, (pages.get(k) ?? 0) + v)));
    return {
      tiles: [
        { label: "Today", ...sum(lastDays(1)) },
        { label: "Last 7 days", ...sum(lastDays(7)) },
        { label: "Last 30 days", ...sum(last30) },
        { label: "All time", ...sum(days.map((d) => d.id)) },
      ],
      chart: last30.map((id) => ({ id, visitors: byId.get(id)?.visitors ?? 0, views: byId.get(id)?.views ?? 0 })),
      topPages: Array.from(pages.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10),
    };
  }, [days]);

  const pageLabel = (key: string) => {
    if (key === "home") return "Homepage";
    if (key === "listings") return "All listings page";
    if (key === "privacy") return "Privacy notice";
    if (key.startsWith("area_")) return `Area: ${areaBySlug(key.slice(5))?.name ?? key.slice(5)}`;
    if (key.startsWith("listing_")) return `Listing: ${titles[key.slice(8)] ?? "(removed listing)"}`;
    return key;
  };

  return (
    <>
      <h1 className="font-display text-3xl font-light text-ink">Visitors</h1>
      <p className="mt-2 text-sm text-body">
        Anonymous counts — <strong className="font-medium text-ink">visitors</strong> are different people (browsers)
        per day, <strong className="font-medium text-ink">views</strong> are pages opened. Search engines and bots are
        not counted. Days are in Malaysia time.
      </p>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {!stats && !error && <p className="mt-6 text-sm text-muted">Loading…</p>}

      {stats && (
        <>
          <section className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-4">
            {stats.tiles.map((t) => (
              <div key={t.label} className="bg-surface p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{t.label}</p>
                <p className="mt-2 font-display text-4xl font-light lining-nums text-ink">{t.visitors.toLocaleString("en-MY")}</p>
                <p className="text-xs text-muted">visitors · {t.views.toLocaleString("en-MY")} views</p>
              </div>
            ))}
          </section>

          <DailyChart data={stats.chart} />

          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-[0.16em] text-muted">Most viewed pages — last 30 days</h2>
            {stats.topPages.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No visits recorded yet.</p>
            ) : (
              <ol className="mt-3 space-y-3">
                {stats.topPages.map(([key, count]) => (
                  <li key={key}>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="truncate text-ink">{pageLabel(key)}</span>
                      <span className="shrink-0 tabular-nums text-body">{count.toLocaleString("en-MY")}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-camel"
                        style={{ width: `${(count / stats.topPages[0][1]) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </>
      )}
    </>
  );
}

// 30 thin columns from one baseline; hover or focus a day for its numbers. A table copy is
// available to screen readers.
function DailyChart({ data }: { data: { id: string; visitors: number; views: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.visitors));
  const [active, setActive] = useState<number | null>(null);
  const shown = active === null ? null : data[active];

  return (
    <section className="mt-10 rounded border border-line bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xs uppercase tracking-[0.16em] text-muted">Visitors per day — last 30 days</h2>
        <p className="h-5 text-sm tabular-nums text-ink" aria-live="polite">
          {shown ? `${shortDate(shown.id)}: ${shown.visitors} visitors · ${shown.views} views` : ""}
        </p>
      </div>

      <div className="relative mt-4">
        <span className="absolute -top-1 left-0 text-[11px] tabular-nums text-muted">{max}</span>
        <div className="absolute inset-x-0 top-1 border-t border-dashed border-line" aria-hidden="true" />
        <div className="flex h-40 items-end gap-[2px] border-b border-line pt-1" aria-hidden="true">
          {data.map((d, i) => (
            <button
              key={d.id}
              type="button"
              tabIndex={-1}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(i)}
              className="flex h-full flex-1 items-end justify-center"
            >
              <span
                className={`w-full max-w-[24px] rounded-t-[4px] transition-opacity ${
                  d.visitors === 0 ? "bg-transparent" : "bg-camel"
                } ${active !== null && active !== i ? "opacity-40" : ""}`}
                style={{ height: `${(d.visitors / max) * 100}%` }}
              />
            </button>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-muted" aria-hidden="true">
          <span>{shortDate(data[0].id)}</span>
          <span>{shortDate(data[data.length - 1].id)}</span>
        </div>
      </div>

      <table className="sr-only">
        <caption>Visitors and views per day, last 30 days</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Visitors</th>
            <th scope="col">Views</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.visitors}</td>
              <td>{d.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
