"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Menu, Phone, X } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { business, waMessages, whatsappLink } from "@/lib/constants";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Release the scroll lock before the browser jumps to an in-page anchor.
  function closeMenu() {
    document.body.style.overflow = "";
    setMenuOpen(false);
  }

  return (
    <>
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
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted">
              {business.ren} · {business.agency}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="group relative text-sm text-body hover:text-ink">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-camel transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={business.phoneHref}
              aria-label={`Call ${business.phoneDisplay}`}
              className="flex h-11 items-center gap-2 rounded bg-cta px-4 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              <Phone strokeWidth={1.5} size={16} />
              <span className="hidden sm:inline">{business.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded border border-line text-ink md:hidden"
            >
              <Menu strokeWidth={1.5} size={20} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-bg md:hidden"
        >
          <div className="flex min-h-[72px] items-center justify-between border-b border-line px-6 py-2">
            <Link href="/" onClick={closeMenu} className="flex flex-col leading-tight">
              <span className="font-display text-xl font-light text-ink">Winnie Wong</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">
                Real Estate Negotiator
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted">
                {business.ren} · {business.agency}
              </span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              autoFocus
              className="flex h-11 w-11 items-center justify-center rounded border border-line text-ink"
            >
              <X strokeWidth={1.5} size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="divide-y divide-line">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-4 font-display text-3xl font-light text-ink transition-colors active:text-camel"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-line px-6 py-6">
            <a
              href={whatsappLink(waMessages.mobileCta)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex h-12 items-center justify-center gap-2 rounded bg-[#25D366] text-sm text-white"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              WhatsApp Winnie
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={business.phoneHref}
                className="flex h-12 items-center justify-center gap-2 rounded border border-ink text-sm text-ink"
              >
                <Phone strokeWidth={1.5} size={16} />
                Call
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex h-12 items-center justify-center gap-2 rounded border border-ink text-sm text-ink"
              >
                <Mail strokeWidth={1.5} size={16} />
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
