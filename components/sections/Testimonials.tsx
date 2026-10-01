"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";
import { testimonials } from "@/lib/testimonials";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const direction = useRef<1 | -1>(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const go = (dir: 1 | -1) => {
    direction.current = dir;
    setIndex((prev) => (prev + dir + total) % total);
  };

  const goTo = (i: number) => {
    direction.current = i > index ? 1 : -1;
    setIndex(i);
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.fromTo(
      el,
      { opacity: 0, x: 24 * direction.current },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [index]);

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="flex min-h-screen items-center py-section-mobile md:py-section"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Testimonials</p>
          <h2 className="mt-3 text-h2 text-ink">What clients say</h2>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-2xl overflow-hidden">
          <Quote strokeWidth={1.5} size={32} className="mx-auto text-camel" />

          <div ref={cardRef} className="mt-6 min-h-[180px] text-center">
            <p className="mx-auto max-w-measure text-lg leading-relaxed text-ink">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium text-ink">{current.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
              {current.source}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-sm"
            >
              <ChevronLeft strokeWidth={1.5} size={18} />
            </button>

            <div className="flex">
              {testimonials.map((t, i) => (
                // 24px tap area around the small dot, so it is easy to hit on a phone.
                <button
                  key={t.name}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="group flex h-6 min-w-6 items-center justify-center px-1"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-camel" : "w-2 bg-line group-hover:bg-camel/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-sm"
            >
              <ChevronRight strokeWidth={1.5} size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
