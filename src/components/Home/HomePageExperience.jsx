"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/page.module.css";

export default function HomePageExperience() {
  const progressRef = useRef(null);

  useEffect(() => {
    const page = document.querySelector("[data-home-page]");
    const progress = progressRef.current;
    const revealItems = document.querySelectorAll("[data-home-reveal]");

    if (!page || !progress) return undefined;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progress.style.transform = `scaleX(${amount})`;
    };

    page.dataset.motionReady = "true";
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => {
        item.dataset.visible = "true";
      });

      return () => {
        delete page.dataset.motionReady;
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      delete page.dataset.motionReady;
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div ref={progressRef} className={styles.scrollProgress} aria-hidden="true" />;
}
