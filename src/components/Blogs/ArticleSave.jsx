"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getReadingListServerSnapshot,
  getReadingListSnapshot,
  subscribeToReadingList,
  writeReadingList,
} from "@/components/Blogs/readingListStore";

function BookmarkIcon({ saved }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill={saved ? "currentColor" : "none"} className="size-4">
      <path
        d="M5 3.5h10v13l-5-3-5 3v-13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ArticleSave({ href, title, source }) {
  const readingList = useSyncExternalStore(
    subscribeToReadingList,
    getReadingListSnapshot,
    getReadingListServerSnapshot,
  );
  const [feedback, setFeedback] = useState("");
  const isSaved = readingList.some((item) => item.href === href);

  useEffect(() => {
    if (!feedback) return undefined;

    const timeout = window.setTimeout(() => setFeedback(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  function toggleSavedArticle() {
    try {
      if (isSaved) {
        writeReadingList(readingList.filter((item) => item.href !== href));
        setFeedback("Removed from saved articles");
        return;
      }

      writeReadingList([{ href, title, source }, ...readingList]);
      setFeedback("Saved for later");
    } catch {
      setFeedback("Unable to update saved articles");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggleSavedArticle}
        aria-pressed={isSaved}
        className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
          isSaved
            ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500"
            : "border-zinc-200 bg-white/70 text-zinc-700 hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:text-blue-400"
        }`}
      >
        <BookmarkIcon saved={isSaved} />
        {isSaved ? "Saved" : "Save for later"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback}
      </span>
    </div>
  );
}
