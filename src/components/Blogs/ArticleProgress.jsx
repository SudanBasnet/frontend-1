"use client";

import { useEffect, useRef, useState } from "react";

function ArrowUpIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path
        d="m5 9 5-5 5 5M10 4v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ArticleProgress() {
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let frameId;

    function updateProgress() {
      const article = progressRef.current?.closest("article");

      if (!article) return;

      const articleTop = window.scrollY + article.getBoundingClientRect().top;
      const scrollableHeight = article.scrollHeight - window.innerHeight;
      const distanceIntoArticle = window.scrollY - articleTop;
      const nextProgress = scrollableHeight > 0
        ? Math.min(
            100,
            Math.max(0, ((window.scrollY - articleTop) / scrollableHeight) * 100),
          )
        : 100;

      setProgress(nextProgress);
      setShowBackToTop(
        distanceIntoArticle > Math.min(window.innerHeight * 0.45, 420),
      );
      frameId = undefined;
    }

    function requestProgressUpdate() {
      if (frameId === undefined) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    }

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  function scrollToArticleTop() {
    const article = progressRef.current?.closest("article");

    if (!article) return;

    const heading = article.querySelector("h1");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    article.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }

  return (
    <>
      <div
        ref={progressRef}
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-zinc-200/70 dark:bg-zinc-800/70"
      >
        <span
          className="block h-full origin-left bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <button
        type="button"
        onClick={scrollToArticleTop}
        aria-label="Back to article top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-4 py-3 text-xs font-bold text-zinc-700 shadow-lg shadow-zinc-950/10 backdrop-blur transition duration-200 hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-200 dark:shadow-black/30 dark:hover:border-blue-700 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUpIcon />
        Back to top
      </button>
    </>
  );
}
