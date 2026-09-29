"use client";

import { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const propertyTypes = ["Residential", "Commercial", "Investment"];
const budgetRanges = [
  "Under RM 300,000",
  "RM 300,000 – 600,000",
  "RM 600,000 – 1,000,000",
  "RM 1,000,000+",
];

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const mountedAt = useRef(Date.now());

  const [error, setError] = useState<string | null>(null);

  // A caught bot submission still resolves to the success state so it
  // learns nothing (per CLAUDE.md §6).
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const honeypot = data.get("website");
    const elapsedMs = Date.now() - mountedAt.current;
    const isBot = Boolean(honeypot) || elapsedMs < 1500;

    setStatus("submitting");
    setError(null);

    if (isBot) {
      setTimeout(() => setStatus("success"), 400);
      return;
    }

    try {
      await addDoc(collection(db, "enquiries"), {
        name: String(data.get("name") || ""),
        phone: String(data.get("phone") || ""),
        propertyType: String(data.get("propertyType") || ""),
        budget: String(data.get("budget") || ""),
        message: String(data.get("message") || ""),
        createdAt: serverTimestamp(),
        status: "new",
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("Something went wrong — please try WhatsApp or call instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded border border-line bg-surface p-8 text-center">
        <p className="text-lg font-medium text-ink">Thank you — your enquiry is in.</p>
        <p className="mt-2 text-sm text-body">
          I aim to reply within the hour during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border border-line bg-surface p-6">
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            required
            type="text"
            name="name"
            maxLength={100}
            className="rounded border border-line bg-bg px-3 py-2 text-sm text-ink normal-case tracking-normal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Phone</span>
          <input
            required
            type="tel"
            name="phone"
            maxLength={30}
            className="rounded border border-line bg-bg px-3 py-2 text-sm text-ink normal-case tracking-normal"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>Property type</span>
          <select
            name="propertyType"
            className="rounded border border-line bg-bg px-3 py-2 text-sm text-ink normal-case tracking-normal"
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span>Budget range</span>
          <select
            name="budget"
            className="rounded border border-line bg-bg px-3 py-2 text-sm text-ink normal-case tracking-normal"
          >
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span>Message</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          className="rounded border border-line bg-bg px-3 py-2 text-sm text-ink normal-case tracking-normal"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded bg-cta px-6 py-3 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
