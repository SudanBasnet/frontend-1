"use client";

import { useEffect, useRef, useState } from "react";

export default function ArticleProgress() {
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;

    function updateProgress() {
      const article = progressRef.current?.closest("article");

      if (!article) return;

      const articleTop = window.scrollY + article.getBoundingClientRect().top;
      const scrollableHeight = article.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0
        ? Math.min(
            100,
            Math.max(0, ((window.scrollY - articleTop) / scrollableHeight) * 100),
          )
        : 100;

      setProgress(nextProgress);
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

  return (
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
  );
}
