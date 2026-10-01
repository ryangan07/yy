"use client";

import { useState } from "react";
import { BarChart3, Info } from "lucide-react";
import { business } from "@/lib/constants";

// NAPIC (JPPH) publishes its open transaction data as a public Tableau dashboard; there is no API.
// It is heavy, so it only loads when the visitor asks for it.
const NAPIC_VIEW =
  "https://public.tableau.com/views/NewPublishOpenDataMei2024/Dashboard1?:showVizHome=no&:embed=true&:language=en-US";
const NAPIC_PAGE = "https://napic.jpph.gov.my/en/open-sales-data";

export default function NapicData({ area }: { area?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-light text-ink">Market transaction data</h2>

      <div className="mt-4 flex gap-3 rounded border border-line bg-surface p-4 text-sm text-body">
        <Info size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-camel" />
        <p>
          <strong className="font-medium text-ink">For reference only.</strong> Published by the National
          Property Information Centre (NAPIC), JPPH. It may not include the latest transactions or reflect this
          particular unit. Please confirm prices and details with {business.name} ({business.ren}) before making
          any decision.
        </p>
      </div>

      {open ? (
        <>
          <p className="mt-4 text-sm text-muted">
            Use the filters in the dashboard to select the state, district{area ? ` (e.g. ${area})` : ""} and
            property type.
          </p>
          <div className="mt-3 h-[640px] overflow-hidden rounded border border-line bg-surface md:h-[820px]">
            <iframe
              src={NAPIC_VIEW}
              title="NAPIC open property transaction data"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            Source:{" "}
            <a href={NAPIC_PAGE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
              NAPIC Open Sales Data, JPPH
            </a>
          </p>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 flex items-center gap-2 rounded border border-ink px-5 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
        >
          <BarChart3 size={16} strokeWidth={1.5} />
          View NAPIC transaction data
        </button>
      )}
    </section>
  );
}
