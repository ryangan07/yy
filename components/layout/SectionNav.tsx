"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "c2r2", label: "C2R2" },
  { id: "why-choose-me", label: "Why Choose Me" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={isActive}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`rounded-full border transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 border-camel bg-camel"
                  : "h-1.5 w-1.5 border-muted/60 bg-transparent group-hover:border-camel"
              }`}
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
