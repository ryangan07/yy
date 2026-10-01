"use server";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { siteUrl } from "@/lib/constants";

export type EnquiryInput = {
  name: string;
  phone: string;
  propertyType: string;
  budget: string;
  message: string;
  website: string; // honeypot
  elapsedMs: number;
};

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

// Public endpoint (every server action is). It does only what the form could already do —
// write one enquiry, which the Firestore rules validate — plus notify Winnie by email.
export async function submitEnquiry(input: EnquiryInput): Promise<{ ok: boolean }> {
  // Bots get a fake success so they learn nothing (CLAUDE.md §6).
  if (input.website || !(input.elapsedMs >= 1500)) return { ok: true };

  const enquiry = {
    name: clip(input.name, 100),
    phone: clip(input.phone, 30),
    propertyType: clip(input.propertyType, 40),
    budget: clip(input.budget, 60),
    message: clip(input.message, 1000),
  };
  if (!enquiry.name || !enquiry.phone) return { ok: false };

  try {
    await addDoc(collection(db, "enquiries"), { ...enquiry, status: "new", createdAt: serverTimestamp() });
  } catch {
    return { ok: false };
  }

  // The enquiry is already saved; a failed email must never fail the submission.
  await notify(enquiry).catch((e) => console.error("Enquiry email failed:", e));
  return { ok: true };
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function notify(e: Omit<EnquiryInput, "website" | "elapsedMs">) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const digits = e.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${digits.startsWith("0") ? `6${digits}` : digits}`;
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Phone", e.phone],
    ["Property type", e.propertyType],
    ["Budget", e.budget],
    ["Message", e.message || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1C1917;max-width:560px">
      <h2 style="font-weight:normal">New website enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#78716C;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${escape(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:24px">
        <a href="${wa}" style="background:#25D366;color:#fff;padding:10px 18px;text-decoration:none;border-radius:2px">Reply on WhatsApp</a>
        &nbsp;
        <a href="${siteUrl}/admin" style="color:#1C1917">Open admin inbox</a>
      </p>
    </div>`;
  const text = `New website enquiry\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nWhatsApp: ${wa}\nAdmin: ${siteUrl}/admin`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL || "Winnie Wong Website <onboarding@resend.dev>",
      to: [to],
      subject: `New enquiry: ${e.name} (${e.propertyType})`,
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
