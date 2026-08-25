"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function formatDate(value) {
  if (!value) return "Recently";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function CommunityPost({ id }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      try {
        const response = await fetch(`/api/blogposts/${id}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load this post.");
        }

        setPost(data.post);
      } catch (loadError) {
        if (loadError.name !== "AbortError") setError(loadError.message);
      }
    }

    loadPost();
    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <section className="grid min-h-[60vh] place-items-center bg-white px-4 dark:bg-zinc-950">
        <div className="max-w-md text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600 dark:text-red-400">Unable to open article</p>
          <h1 className="mt-3 text-3xl font-black">{error}</h1>
          <Link href="/blogs" className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Back to all articles</Link>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="grid min-h-[60vh] place-items-center bg-white dark:bg-zinc-950">
        <div className="size-10 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-700 dark:border-t-blue-400" />
      </section>
    );
  }

  return (
    <article className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <header className="relative isolate overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_15%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_88%_76%,rgba(37,99,235,0.12),transparent_27%)]" />
        <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link href="/blogs" className="text-sm font-bold text-zinc-500 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
            &larr; All articles
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Live from Backend-1</span>
            {(post.tags || []).map((tag) => (
              <span key={tag} className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">#{tag}</span>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] sm:text-6xl">{post.title}</h1>
          <div className="mt-10 flex items-center gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 text-sm font-black text-white">
              {(post.author?.name || "A").slice(0, 1).toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-bold">{post.author?.name || "Frontend One author"}</p>
              <time dateTime={post.publishedAt} className="text-xs text-zinc-500 dark:text-zinc-400">Published {formatDate(post.publishedAt)}</time>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto min-h-96 w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="whitespace-pre-wrap text-lg leading-9 text-zinc-700 dark:text-zinc-300">{post.content}</div>
      </div>
    </article>
  );
}
