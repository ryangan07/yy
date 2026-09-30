"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/constants";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/listings", label: "Listings" },
  { href: "/#c2r2", label: "C2R2" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bg/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-line shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-[72px] max-w-content items-center justify-between px-6 py-2">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl font-light text-ink">Winnie Wong</span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">
            Real Estate Negotiator
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-camel">
            {business.ren} · {business.agency}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-body hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-camel transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={business.phoneHref}
          className="flex items-center gap-2 rounded bg-cta px-4 py-2 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-90"
        >
          <Phone strokeWidth={1.5} size={16} />
          <span className="hidden sm:inline">{business.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}
