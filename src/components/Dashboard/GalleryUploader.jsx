"use client";

import { useState } from "react";

export default function GalleryUploader({ onError, onStart }) {
  const [upload, setUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasCopiedImageUrl, setHasCopiedImageUrl] = useState(false);
  const [fileName, setFileName] = useState("");

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
      setFileName("");
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
    <article id="media" className="mt-6 scroll-mt-6 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-xl shadow-black/10">
      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            Media studio
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">Upload an image</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Send an asset to your Cloudinary gallery, then copy its ready-to-use URL.
          </p>
          <p className="mt-3 text-xs text-zinc-600">AVIF, GIF, JPEG, PNG or WebP · 5 MB max</p>
        </div>
        <form
          onSubmit={uploadImage}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <label className="group flex min-h-28 flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-zinc-950/60 px-4 py-5 text-center transition hover:border-blue-500/40 hover:bg-blue-500/5">
            <span className="grid size-9 place-items-center rounded-xl bg-white/5 text-lg text-zinc-400 transition group-hover:bg-blue-500/10 group-hover:text-blue-300" aria-hidden="true">&uarr;</span>
            <span className="mt-2 text-sm font-semibold text-zinc-300">{fileName || "Choose an image"}</span>
            <span className="mt-1 text-xs text-zinc-600">Browse from your device</span>
            <input
              type="file"
              name="image"
              accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
              required
              className="sr-only"
            />
          </label>
          <button
            type="submit"
            disabled={isUploading}
            className="rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-60 sm:self-end"
          >
            {isUploading ? "Uploading…" : "Upload"}
          </button>
        </form>
      </div>
      {upload ? (
        <div className="flex flex-col gap-2 border-t border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
