"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getReadingListServerSnapshot,
  getReadingListSnapshot,
  subscribeToReadingList,
  writeReadingList,
} from "@/components/Blogs/readingListStore";
import BookmarkIcon from "@/components/Icons/BookmarkIcon";

const CloseIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
    <path d="m6 6 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export default function ReadingList() {
  const readingList = useSyncExternalStore(
    subscribeToReadingList,
    getReadingListSnapshot,
    getReadingListServerSnapshot,
  );

  if (!readingList.length) return null;

  function removeArticle(href) {
    try {
      writeReadingList(readingList.filter((item) => item.href !== href));
    } catch {
      // Leave the current list visible when browser storage is unavailable.
    }
  }

  return (
    <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <BookmarkIcon filled outlined={false} className="size-5" />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Saved for later</p>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Your reading list.</h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Saved in this browser · {readingList.length} {readingList.length === 1 ? "article" : "articles"}
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {readingList.map((article) => (
            <article key={article.href} className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
              <Link
                href={article.href}
                className="min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">{article.source}</span>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-6 transition hover:text-blue-600 dark:hover:text-blue-400">{article.title}</h3>
              </Link>
              <button
                type="button"
                onClick={() => removeArticle(article.href)}
                aria-label={`Remove ${article.title} from saved articles`}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <CloseIcon />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
