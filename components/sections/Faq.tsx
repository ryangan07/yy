"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faq";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="flex min-h-screen items-center bg-surface py-section-mobile md:py-section">
      <div className="mx-auto max-w-content px-6">
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">FAQ</p>
          <h2 className="mt-3 text-h2 text-ink">Common questions</h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium text-ink transition-colors duration-300 group-hover:text-camel">
                    {item.q}
                  </span>
                  <ChevronDown
                    strokeWidth={1.5}
                    size={18}
                    className={`shrink-0 text-camel transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-body">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
