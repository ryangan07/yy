import { business } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg py-12">
      <div className="mx-auto grid max-w-content gap-8 px-6 text-sm text-muted md:grid-cols-3">
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
        </div>

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

      <p className="mx-auto mt-10 max-w-content px-6 text-xs text-muted">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </p>
    </footer>
  );
}
