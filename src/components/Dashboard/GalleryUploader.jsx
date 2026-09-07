"use client";

import { useState } from "react";

export default function GalleryUploader({ onError, onStart }) {
  const [upload, setUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasCopiedImageUrl, setHasCopiedImageUrl] = useState(false);

  async function uploadImage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsUploading(true);
    setUpload(null);
    setHasCopiedImageUrl(false);
    onStart();

    try {
      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to upload the image.");
      }

      setUpload(data.image);
      form.reset();
    } catch (uploadError) {
      onError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  }

  async function copyImageUrl() {
    try {
      await navigator.clipboard.writeText(upload.url);
      setHasCopiedImageUrl(true);
    } catch {
      onError("Unable to copy the image URL. Open the image and copy it manually.");
    }
  }

  return (
    <article className="mt-6 rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
      <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            Cloudinary gallery
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">Upload an image</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Backend-1 accepts AVIF, GIF, JPEG, PNG, or WebP files up to 5 MB.
          </p>
        </div>
        <form
          onSubmit={uploadImage}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <label className="flex-1 text-sm font-medium text-zinc-300">
            Image file
            <input
              type="file"
              name="image"
              accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
              required
              className="mt-2 block w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-zinc-200"
            />
          </label>
          <button
            type="submit"
            disabled={isUploading}
            className="rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
          >
            {isUploading ? "Uploading…" : "Upload"}
          </button>
        </form>
      </div>
      {upload ? (
        <div className="mt-5 flex flex-col gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {upload.width} × {upload.height} {upload.format?.toUpperCase()} uploaded
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copyImageUrl}
              className="font-semibold underline underline-offset-4"
            >
              {hasCopiedImageUrl ? "Copied" : "Copy URL"}
            </button>
            <a
              href={upload.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              Open image
            </a>
          </div>
        </div>
      ) : null}
    </article>
  );
}
