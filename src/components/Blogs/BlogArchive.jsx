"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ArticleVisual from "@/components/Blogs/ArticleVisual";

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
    <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
    <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.7" />
    <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const readTimeInMinutes = (post) => Number.parseInt(post.readTime, 10);

export default function BlogArchive({ posts }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))].sort(),
    [posts],
  );

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts
      .filter((post) => {
        const searchableText = [post.title, post.category, post.excerpt].join(" ").toLowerCase();
        return (
          (category === "All" || post.category === category) &&
          (!normalizedQuery || searchableText.includes(normalizedQuery))
        );
      })
      .sort((a, b) => {
        if (sort === "quickest") return readTimeInMinutes(a) - readTimeInMinutes(b);
        if (sort === "title") return a.title.localeCompare(b.title);
        return new Date(b.isoDate) - new Date(a.isoDate);
      });
  }, [category, posts, query, sort]);

  const hasFilters = query || category !== "All" || sort !== "newest";

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setSort("newest");
  };

  return (
    <div className="mt-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Search articles
            </span>
            <span className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400"><SearchIcon /></span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try React, accessibility, or APIs"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 pl-11 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-blue-400"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Sort by
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-44 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-blue-400"
            >
              <option value="newest">Newest first</option>
              <option value="quickest">Quickest reads</option>
              <option value="title">Article title</option>
            </select>
          </label>
        </div>

        <fieldset className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <legend className="sr-only">Filter articles by topic</legend>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                  }`}
                >
                  {item === "All" ? "All topics" : item}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 flex min-h-7 flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
            Showing <strong className="text-zinc-900 dark:text-white">{visiblePosts.length}</strong> of {posts.length} articles
          </p>
          {hasFilters ? (
            <button type="button" onClick={resetFilters} className="text-sm font-bold text-blue-600 transition hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-blue-400 dark:focus-visible:ring-offset-zinc-900">
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {visiblePosts.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-zinc-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950">
              <ArticleVisual post={post} />
              <article className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  <span className="uppercase tracking-wider text-blue-600 dark:text-blue-400">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-snug transition group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                  <time dateTime={post.isoDate} className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</time>
                  <span className="text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400"><ArrowIcon /></span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xl font-black tracking-tight">No articles match that search.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Try another topic or clear the filters to browse the complete archive.
          </p>
          <button type="button" onClick={resetFilters} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900">
            Show all articles
          </button>
        </div>
      )}
    </div>
  );
}
