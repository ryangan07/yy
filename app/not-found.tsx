import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">404</p>
      <h1 className="mt-4 text-h2 text-ink">This page could not be found.</h1>
      <p className="mt-4 max-w-measure text-body">
        The listing may have been sold, rented or taken down.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded bg-cta px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to home
        </Link>
        <Link
          href="/listings"
          className="rounded border border-ink px-6 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
        >
          View listings
        </Link>
      </div>
    </main>
  );
}
