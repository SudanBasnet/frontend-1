"use client";

import { useEffect, useState } from "react";

function ShareIcon({ confirmed }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4"
    >
      {confirmed ? (
        <path
          d="m4.5 10 3.25 3.25L15.5 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="m6.8 9.1 6.4-3.2M6.8 10.9l6.4 3.2" stroke="currentColor" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );
}

export default function ArticleShare({ title }) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!feedback) return undefined;

    const timeout = window.setTimeout(() => setFeedback(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setFeedback("Link copied");
  }

  async function shareArticle() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
        setFeedback("Shared");
        return;
      }

      await copyLink();
    } catch (error) {
      if (error.name === "AbortError") return;

      try {
        await copyLink();
      } catch {
        setFeedback("Unable to copy");
      }
    }
  }

  const confirmed = feedback === "Shared" || feedback === "Link copied";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={shareArticle}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-zinc-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950"
      >
        <ShareIcon confirmed={confirmed} />
        {feedback || "Share article"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback}
      </span>
    </div>
  );
}
