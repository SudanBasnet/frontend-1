"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionControls() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/session", {
          signal: controller.signal,
        });
        const data = await response.json();

        if (response.ok && data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsChecking(false);
        }
      }
    }

    checkSession();
    return () => controller.abort();
  }, [pathname]);

  async function signOut() {
    setIsSigningOut(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.replace("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  if (isChecking) {
    return (
      <span className="h-9 w-28 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {user.name?.split(" ")[0] || "Dashboard"}
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={isSigningOut}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
        >
          {isSigningOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
      >
        Register
      </Link>
    </div>
  );
}
