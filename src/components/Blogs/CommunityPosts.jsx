"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function formatDate(value) {
  if (!value) return "Recently";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function CommunityPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const response = await fetch("/api/blogposts", {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load live posts.");
        }

        setPosts(data.posts || []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadPosts();
    return () => controller.abort();
  }, []);

  return (
    <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                Live from Backend-1
              </p>
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Published through the dashboard.
            </h2>
          </div>
          <Link href="/dashboard" className="text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Manage your posts &rarr;
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading published posts">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-64 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="font-bold">The live feed is offline.</p>
            <p className="mt-1">{error}</p>
          </div>
        ) : null}

        {!isLoading && !error && !posts.length ? (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
            <p className="font-bold">No Backend-1 posts are published yet.</p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Publish one from the dashboard and it will appear here automatically.
            </p>
          </div>
        ) : null}

        {!isLoading && !error && posts.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blogs/community/${post._id}`}
                className="group flex min-h-64 flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-800"
              >
                <div className="flex flex-wrap gap-2">
                  {(post.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 text-xl font-bold leading-snug transition group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {post.content}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <span>{post.author?.name || "Frontend One author"}</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
