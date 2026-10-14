"use client";

function PrintIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4"
    >
      <path
        d="M6 7V3.5h8V7M6 14v2.5h8V14M5 13H3.5V8.5h13V13H15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.5h8V16H6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14.25" cy="10" r="0.75" fill="currentColor" />
    </svg>
  );
}

export default function ArticlePrint() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Print article or save it as a PDF"
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-zinc-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 print:hidden dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950"
    >
      <PrintIcon />
      Print article
    </button>
  );
}
