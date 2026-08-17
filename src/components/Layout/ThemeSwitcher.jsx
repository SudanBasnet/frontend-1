"use client";

import { useEffect } from "react";

const themes = [
  {
    value: "light",
    label: "Light theme",
    icon: (
      <path
        d="M10 2.5v1.25M10 16.25v1.25M2.5 10h1.25M16.25 10h1.25M4.7 4.7l.88.88M14.42 14.42l.88.88M15.3 4.7l-.88.88M5.58 14.42l-.88.88M13.25 10A3.25 3.25 0 1 1 6.75 10a3.25 3.25 0 0 1 6.5 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    ),
  },
  {
    value: "dark",
    label: "Dark theme",
    icon: (
      <path
        d="M16.5 12.28A6.75 6.75 0 0 1 7.72 3.5 6.75 6.75 0 1 0 16.5 12.28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    value: "system",
    label: "Use system theme",
    icon: (
      <>
        <rect
          x="2.75"
          y="3.75"
          width="14.5"
          height="10"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7.5 16.25h5M10 13.75v2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

function applyTheme(theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = theme === "dark" || (theme === "system" && prefersDark);

  root.classList.toggle("dark", useDark);
  root.dataset.theme = theme;
  root.style.colorScheme = useDark ? "dark" : "light";

  document.querySelectorAll("[data-theme-option]").forEach((option) => {
    option.setAttribute(
      "aria-pressed",
      String(option.dataset.themeOption === theme),
    );
  });
}

export default function ThemeSwitcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(document.documentElement.dataset.theme || "system");

    const handleSystemChange = () => {
      if (document.documentElement.dataset.theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const handleThemeChange = (theme) => {
    applyTheme(theme);

    try {
      localStorage.setItem("frontend-one-theme", theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  };

  return (
    <div
      className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800"
      role="group"
      aria-label="Choose colour theme"
    >
      {themes.map((theme) => (
        <button
          key={theme.value}
          type="button"
          data-theme-option={theme.value}
          onClick={() => handleThemeChange(theme.value)}
          className="theme-option grid h-7 w-7 place-items-center rounded-md text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-zinc-400 dark:hover:text-white"
          aria-label={theme.label}
          aria-pressed="false"
          title={theme.label}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            {theme.icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
