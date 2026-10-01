"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminGate from "./AdminGate";

const nav = [
  { href: "/admin", label: "Enquiries" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/site", label: "Homepage" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AdminGate>
      {(user) => (
        <div className="mx-auto max-w-4xl px-6 py-8">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="font-display text-2xl font-light text-ink">
                Winnie Wong <span className="text-sm text-muted">Admin</span>
              </Link>
              <nav className="flex gap-5 text-sm">
                {nav.map((n) => {
                  const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={active ? "text-ink underline underline-offset-8" : "text-body hover:text-ink"}
                    >
                      {n.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden text-muted sm:inline">{user.email}</span>
              <Link href="/" target="_blank" className="text-body hover:text-ink">
                View site
              </Link>
              <button type="button" onClick={() => signOut(auth)} className="text-body hover:text-ink">
                Sign out
              </button>
            </div>
          </header>
          <main className="mt-8">{children}</main>
        </div>
      )}
    </AdminGate>
  );
}
