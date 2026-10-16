"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { visitDay } from "@/lib/visits";

const LAST_DAY_KEY = "ww_last_visit_day";

// Sends one anonymous beacon per page view. "New visitor" = first visit from this browser today
// (a date in localStorage — not a cookie, nothing personal). Skips automated browsers and local dev.
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (navigator.webdriver || ["localhost", "127.0.0.1"].includes(location.hostname)) return;

    const today = visitDay();
    let newVisitor = false;
    try {
      newVisitor = localStorage.getItem(LAST_DAY_KEY) !== today;
      localStorage.setItem(LAST_DAY_KEY, today);
    } catch {
      // Private mode / storage blocked: still count the view.
    }

    const payload = JSON.stringify({ path: pathname, newVisitor });
    const blob = new Blob([payload], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/visit", blob)) {
      fetch("/api/visit", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
