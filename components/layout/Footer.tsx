import Link from "next/link";
import { business } from "@/lib/constants";
import { areas } from "@/lib/areas";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg py-12">
      <div className="mx-auto grid max-w-content gap-8 px-6 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-light text-ink">{business.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em]">{business.title}</p>
          <p className="mt-4 text-xs">{business.ren}</p>
          <p className="mt-1 text-xs">
            {business.agency} — {business.licence}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ink">Office</p>
          <p className="mt-2">{business.office}</p>
          {/* Both the local and international forms, so a search for either finds this page. */}
          <p className="mt-3">
            Tel / WhatsApp:{" "}
            <a href={business.phoneHref} className="whitespace-nowrap hover:text-ink">
              016-2688885
            </a>{" "}
            · <span className="whitespace-nowrap">{business.phoneDisplay}</span>
          </p>
          <p className="mt-1">
            <a href={`mailto:${business.email}`} className="hover:text-ink">
              {business.email}
            </a>
          </p>
        </div>

        <nav aria-label="Areas served">
          <p className="text-xs uppercase tracking-[0.16em] text-ink">Areas</p>
          <ul className="mt-2 space-y-1">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="hover:text-ink">
                  Property agent in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ink">Agency</p>
          <p className="mt-2">{business.agencyHQ}</p>
          <div className="mt-3 flex flex-col gap-1">
            <a href={business.agencySite} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              theroofrealty.com
            </a>
            <a href={business.agencyFb} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              fb/Theroofrealty
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-content flex-wrap justify-between gap-3 px-6 text-xs text-muted">
        <p>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <Link href="/privacy" className="hover:text-ink">
          Privacy Notice / Notis Privasi
        </Link>
      </div>
    </footer>
  );
}
