"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

export default function LoanCalculator() {
  const [price, setPrice] = useState<number | "">("");
  const [downPaymentPct, setDownPaymentPct] = useState<number | "">(10);
  const [ratePct, setRatePct] = useState<number | "">(4);
  const [years, setYears] = useState<number | "">(30);

  const monthly = useMemo(() => {
    if (!price || !downPaymentPct || !ratePct || !years) return null;
    const loanAmount = price * (1 - downPaymentPct / 100);
    const monthlyRate = ratePct / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) return loanAmount / numPayments;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    return payment;
  }, [price, downPaymentPct, ratePct, years]);

  return (
    <div className="rounded border border-line bg-bg p-6">
      <div className="flex items-center gap-2">
        <Calculator strokeWidth={1.5} size={20} className="text-camel" />
        <h3 className="text-lg font-medium text-ink">Loan Affordability Calculator</h3>
      </div>
      <p className="mt-1 text-sm text-muted">
        An estimate only — for exact figures, speak with your bank or with me directly.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span>Property price (RM)</span>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal"
            placeholder="500000"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Down payment (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={downPaymentPct}
            onChange={(e) =>
              setDownPaymentPct(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Interest rate (% p.a.)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={ratePct}
            onChange={(e) => setRatePct(e.target.value === "" ? "" : Number(e.target.value))}
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Loan tenure (years)</span>
          <input
            type="number"
            min={1}
            max={40}
            value={years}
            onChange={(e) => setYears(e.target.value === "" ? "" : Number(e.target.value))}
            className="rounded border border-line bg-surface px-3 py-2 text-sm text-ink normal-case tracking-normal"
          />
        </label>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Estimated monthly payment</p>
        <p className="mt-1 font-display text-3xl font-light text-camel">
          {monthly ? `RM ${monthly.toLocaleString("en-MY", { maximumFractionDigits: 0 })}` : "—"}
        </p>
      </div>
    </div>
  );
}
