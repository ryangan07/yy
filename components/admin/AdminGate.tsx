"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isAdminEmail } from "@/lib/admin";

type State =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "denied"; user: User }
  | { status: "admin"; user: User };

const EMAIL_KEY = "adminSignInEmail";

export default function AdminGate({ children }: { children: (user: User) => React.ReactNode }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (!user) setState({ status: "signed-out" });
        else if (user.emailVerified && isAdminEmail(user.email)) setState({ status: "admin", user });
        else setState({ status: "denied", user });
      }),
    []
  );

  // Complete sign-in when arriving from the emailed link.
  useEffect(() => {
    const href = window.location.href;
    if (!isSignInWithEmailLink(auth, href)) return;
    const stored = window.localStorage.getItem(EMAIL_KEY) || window.prompt("Please confirm your email address");
    if (!stored) return;
    signInWithEmailLink(auth, stored, href)
      .then(() => window.localStorage.removeItem(EMAIL_KEY))
      .catch(() => setError("This sign-in link has expired or was already used. Request a new one."))
      .finally(() => window.history.replaceState(null, "", window.location.pathname));
  }, []);

  async function signInGoogle() {
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        setError("Sign-in failed. Please try again.");
      }
    }
  }

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const addr = email.trim().toLowerCase();
    if (!isAdminEmail(addr)) {
      setError("This email is not authorised for the admin panel.");
      return;
    }
    try {
      await sendSignInLinkToEmail(auth, addr, {
        url: `${window.location.origin}/admin`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem(EMAIL_KEY, addr);
      setLinkSent(true);
    } catch {
      setError("Could not send the sign-in email. Please try again.");
    }
  }

  if (state.status === "loading") {
    return (
      <Centered>
        <p className="text-sm text-muted">Loading…</p>
      </Centered>
    );
  }

  if (state.status === "signed-out") {
    return (
      <Centered>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Admin</p>
        <h1 className="mt-3 text-h2 text-ink">Winnie Wong</h1>

        {linkSent ? (
          <p className="mt-8 max-w-sm text-body">
            Check <strong className="text-ink">{email}</strong> — we&apos;ve sent you a sign-in link. Open it on this
            device to continue. (Check your spam folder if it doesn&apos;t arrive.)
          </p>
        ) : (
          <div className="mt-8 w-full max-w-sm">
            <form onSubmit={sendLink} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded border border-line bg-surface px-3 py-3 text-sm text-ink"
              />
              <button type="submit" className="rounded bg-cta px-6 py-3 text-sm text-white hover:opacity-90">
                Email me a sign-in link
              </button>
            </form>
            <div className="my-6 flex items-center gap-3 text-xs text-muted">
              <span className="h-px flex-1 bg-line" />
              or
              <span className="h-px flex-1 bg-line" />
            </div>
            <button
              type="button"
              onClick={signInGoogle}
              className="w-full rounded border border-ink px-6 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Sign in with Google
            </button>
          </div>
        )}
        {error && <p className="mt-4 max-w-sm text-sm text-red-600">{error}</p>}
      </Centered>
    );
  }

  if (state.status === "denied") {
    return (
      <Centered>
        <p className="text-ink">{state.user.email} is not authorised for this admin panel.</p>
        <button
          type="button"
          onClick={() => signOut(auth)}
          className="mt-6 rounded border border-ink px-6 py-3 text-sm text-ink hover:bg-ink hover:text-white"
        >
          Sign out
        </button>
      </Centered>
    );
  }

  return <>{children(state.user)}</>;
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">{children}</div>;
}
