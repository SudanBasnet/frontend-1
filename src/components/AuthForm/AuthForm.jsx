"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export default function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  footerText,
  footerLink,
  endpoint,
  children,
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const values = Object.fromEntries(new FormData(event.currentTarget));
    values.remember = values.remember === "on";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
    <section className="flex flex-1 items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl shadow-black/40">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
            B
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-2 text-sm text-zinc-400">{description}</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {fields.map(({ label, labelAction, ...inputProps }) => (
            <div key={inputProps.name}>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor={inputProps.id}
                  className="text-sm font-medium text-zinc-200"
                >
                  {label}
                </label>

                {labelAction}
              </div>

              <input {...inputProps} className={inputClassName} />
            </div>
          ))}

          {children}

          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Please wait…" : submitLabel}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-400">
          {footerText}{" "}
          <Link
            href={footerLink.href}
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {footerLink.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
