"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-white/20";

export default function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  footerText,
  footerLink,
  endpoint,
  children,
  aside,
  eyebrow,
  submitNote,
  validate,
  transformValues,
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  function togglePassword(name) {
    setVisiblePasswords((current) => ({
      ...current,
      [name]: !current[name],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const values = Object.fromEntries(new FormData(event.currentTarget));
    if ("remember" in values) {
      values.remember = values.remember === "on";
    }

    const validationMessage = validate?.(values);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const requestValues = transformValues ? transformValues(values) : values;
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestValues),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to complete your request.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the application server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-zinc-950">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-12 size-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 size-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15"
      />

      <div
        className={`relative grid w-full items-center gap-10 ${
          aside
            ? "max-w-6xl lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.78fr)] lg:gap-16"
            : "max-w-md"
        }`}
      >
        {aside ? <div className="hidden lg:block">{aside}</div> : null}

        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 shadow-2xl shadow-zinc-950/10 backdrop-blur sm:p-8 dark:border-white/10 dark:bg-zinc-900/90 dark:shadow-black/40">
          <div className={aside ? "mb-8" : "mb-8 text-center"}>
            <div
              className={`mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-violet-600 text-sm font-black tracking-tight text-white shadow-lg shadow-blue-600/20 ${
                aside ? "" : "mx-auto"
              }`}
            >
              F1
            </div>

            {eyebrow ? (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {fields.map(({ label, labelAction, hint, ...inputProps }) => (
              <div key={inputProps.name}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor={inputProps.id}
                    className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    {label}
                  </label>

                  {labelAction}
                </div>

                <div className="relative">
                  <input
                    {...inputProps}
                    type={
                      inputProps.type === "password" && visiblePasswords[inputProps.name]
                        ? "text"
                        : inputProps.type
                    }
                    aria-describedby={hint ? `${inputProps.id}-hint` : undefined}
                    className={`${inputClassName} ${inputProps.type === "password" ? "pr-20" : ""}`}
                  />
                  {inputProps.type === "password" ? (
                    <button
                      type="button"
                      onClick={() => togglePassword(inputProps.name)}
                      aria-label={`${visiblePasswords[inputProps.name] ? "Hide" : "Show"} ${label.toLowerCase()}`}
                      aria-pressed={Boolean(visiblePasswords[inputProps.name])}
                      className="absolute inset-y-0 right-0 px-4 text-xs font-bold text-zinc-500 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {visiblePasswords[inputProps.name] ? "Hide" : "Show"}
                    </button>
                  ) : null}
                </div>

                {hint ? (
                  <p
                    id={`${inputProps.id}-hint`}
                    className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400"
                  >
                    {hint}
                  </p>
                ) : null}
              </div>
            ))}

            {children}

            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-700 dark:text-red-300"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? "Please wait…" : submitLabel}
            </button>

            {submitNote ? (
              <p className="text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                {submitNote}
              </p>
            ) : null}
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {footerText}{" "}
            <Link
              href={footerLink.href}
              className="font-bold text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {footerLink.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
