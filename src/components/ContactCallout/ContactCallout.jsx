import Link from "next/link";

const variants = {
  blue: {
    panel: "bg-blue-600 px-6 py-14 text-center sm:px-12 sm:py-16",
    content: "",
    eyebrow: "text-blue-100",
    title: "mx-auto max-w-2xl sm:text-5xl",
    description: "mx-auto max-w-xl text-blue-100 sm:text-base",
    button:
      "bg-white text-blue-700 shadow-lg hover:bg-blue-50 focus-visible:ring-white focus-visible:ring-offset-blue-600",
  },
  dark: {
    panel: "bg-zinc-950 px-6 py-12 sm:px-10 sm:py-14 dark:bg-black",
    content: "flex flex-col justify-between gap-8 sm:flex-row sm:items-center",
    eyebrow: "text-blue-400",
    title: "",
    description: "max-w-2xl text-zinc-400",
    button:
      "shrink-0 bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-400 focus-visible:ring-offset-zinc-950",
  },
};

export default function ContactCallout({
  eyebrow,
  title,
  description,
  variant = "blue",
}) {
  const styles = variants[variant];

  return (
    <div
      className={`relative mx-auto max-w-6xl overflow-hidden rounded-3xl text-white ${styles.panel}`}
    >
      <div
        className={
          variant === "blue"
            ? "absolute -left-20 -top-28 h-72 w-72 rounded-full border-[50px] border-white/10"
            : "absolute -right-20 -top-24 h-64 w-64 rounded-full border-[45px] border-blue-500/20"
        }
      />
      {variant === "blue" ? (
        <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full border-[50px] border-white/10" />
      ) : null}

      <div className={`relative ${styles.content}`}>
        <div className={variant === "dark" ? "max-w-2xl" : ""}>
          <p
            className={`text-xs font-bold uppercase tracking-[0.2em] ${styles.eyebrow}`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-3 text-3xl font-black tracking-tight ${styles.title}`}
          >
            {title}
          </h2>
          {description ? (
            <p className={`mt-3 leading-7 ${styles.description}`}>
              {description}
            </p>
          ) : null}
        </div>

        <Link
          href="/contact"
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.button} ${
            variant === "blue" ? "mt-8" : ""
          }`}
        >
          Start a conversation
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path
              d="M4 10h12m-5-5 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
