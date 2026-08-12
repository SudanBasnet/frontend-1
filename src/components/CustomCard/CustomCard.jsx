import Link from "next/link";

export default function CustomCard({
  title,
  description,
  eyebrow,
  metadata,
  media,
  children,
  footer,
  href,
  actionLabel = "Learn more",
  className = "",
}) {
  const isInteractive = Boolean(href);

  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition duration-200 dark:border-zinc-800 dark:bg-zinc-900 ${
        isInteractive
          ? "hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-700"
          : ""
      } ${className}`}
    >
      {media ? (
        <div className="aspect-video overflow-hidden bg-zinc-100 [&>*]:h-full [&>*]:w-full [&>*]:object-cover dark:bg-zinc-800">
          {media}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        {eyebrow ? (
          <div className="mb-2 text-xs font-semibold uppercase text-blue-700 dark:text-blue-400">
            {eyebrow}
          </div>
        ) : null}

        <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
          {title}
        </h2>

        {metadata ? (
          <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {metadata}
          </div>
        ) : null}

        {description ? (
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-4">{children}</div> : null}

        {footer || isInteractive ? (
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
            {footer ? (
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {footer}
              </div>
            ) : (
              <span />
            )}

            {isInteractive ? (
              <Link
                href={href}
                className="font-semibold text-blue-700 transition hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-900"
              >
                {actionLabel}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
