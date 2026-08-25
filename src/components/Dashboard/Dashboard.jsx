"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const emptyEditor = {
  title: "",
  content: "",
  tags: "",
  status: "draft",
};

function formatDate(value) {
  if (!value) return "Not published";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editor, setEditor] = useState(emptyEditor);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [upload, setUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const sessionResponse = await fetch("/api/auth/session");
        const session = await sessionResponse.json();

        if (sessionResponse.status === 401) {
          router.replace("/login");
          return;
        }

        if (!sessionResponse.ok) {
          throw new Error(session.message || "Unable to verify your session.");
        }

        if (!session.authenticated) {
          router.replace("/login");
          return;
        }

        if (active) setUser(session.user);

        const postsResponse = await fetch("/api/blogposts?mine=true");
        const data = await postsResponse.json();

        if (!postsResponse.ok) {
          throw new Error(data.message || "Unable to load your posts.");
        }

        if (active) setPosts(data.posts || []);
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadDashboard();
    return () => {
      active = false;
    };
  }, [router]);

  const stats = useMemo(() => {
    const published = posts.filter((post) => post.status === "published").length;
    const tags = new Set(posts.flatMap((post) => post.tags || [])).size;

    return [
      { label: "All posts", value: posts.length, accent: "bg-blue-500" },
      { label: "Published", value: published, accent: "bg-emerald-500" },
      {
        label: "Drafts",
        value: posts.length - published,
        accent: "bg-violet-500",
      },
      { label: "Unique tags", value: tags, accent: "bg-amber-500" },
    ];
  }, [posts]);

  function updateEditor(event) {
    setEditor((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function editPost(post) {
    setEditingId(post._id);
    setEditor({
      title: post.title,
      content: post.content,
      tags: (post.tags || []).join(", "),
      status: post.status,
    });
    setMessage("");
    setError("");
    document.getElementById("post-editor")?.scrollIntoView({ behavior: "smooth" });
  }

  function resetEditor() {
    setEditingId(null);
    setEditor(emptyEditor);
  }

  async function savePost(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    const payload = {
      ...editor,
      tags: editor.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch(
        editingId ? `/api/blogposts/${editingId}` : "/api/blogposts",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save the post.");
      }

      setPosts((current) =>
        editingId
          ? current.map((post) => (post._id === editingId ? data.post : post))
          : [data.post, ...current],
      );
      setMessage(editingId ? "Post updated." : "Post created.");
      resetEditor();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePost(post) {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/blogposts/${post._id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete the post.");
      }

      setPosts((current) => current.filter((item) => item._id !== post._id));
      if (editingId === post._id) resetEditor();
      setMessage("Post deleted.");
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  async function uploadImage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsUploading(true);
    setUpload(null);
    setError("");

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
      setError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  }

  if (isLoading) {
    return (
      <section className="grid min-h-[65vh] flex-1 place-items-center bg-zinc-950 px-4 text-zinc-300">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-2 border-zinc-700 border-t-blue-500" />
          <p className="mt-4 text-sm">Loading your Backend-1 workspace…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-400">Backend-1 dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Create, publish, and manage the posts stored in your MongoDB API.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View published posts <span aria-hidden="true">&rarr;</span>
          </Link>
        </header>

        {error ? (
          <p role="alert" className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
        {message ? (
          <p role="status" className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {message}
          </p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-xl shadow-black/10">
              <div className={`h-1 w-10 rounded-full ${item.accent}`} />
              <p className="mt-5 text-sm text-zinc-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <article className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Your posts</h2>
                <p className="mt-1 text-sm text-zinc-500">Drafts and published entries from Backend-1.</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">{posts.length} total</span>
            </div>

            {posts.length ? (
              <div className="mt-6 space-y-3">
                {posts.map((post) => (
                  <div key={post._id} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${post.status === "published" ? "bg-emerald-500/10 text-emerald-300" : "bg-violet-500/10 text-violet-300"}`}>
                            {post.status}
                          </span>
                          <span className="text-xs text-zinc-600">{formatDate(post.publishedAt || post.createdAt)}</span>
                        </div>
                        <h3 className="mt-3 font-semibold text-white">{post.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">{post.content}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => editPost(post)} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-blue-500/50 hover:text-white">
                          Edit
                        </button>
                        <button type="button" onClick={() => deletePost(post)} className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 px-6 py-12 text-center">
                <h3 className="font-semibold text-white">No posts yet</h3>
                <p className="mt-2 text-sm text-zinc-500">Use the editor to create your first Backend-1 post.</p>
              </div>
            )}
          </article>

          <aside id="post-editor" className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
            <h2 className="text-lg font-semibold text-white">{editingId ? "Edit post" : "Create a post"}</h2>
            <p className="mt-1 text-sm text-zinc-500">Save as a draft or publish it to the public blog feed.</p>

            <form className="mt-6 space-y-4" onSubmit={savePost}>
              <label className="block text-sm font-medium text-zinc-300">
                Title
                <input name="title" value={editor.title} onChange={updateEditor} required maxLength={150} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500" />
              </label>
              <label className="block text-sm font-medium text-zinc-300">
                Content
                <textarea name="content" value={editor.content} onChange={updateEditor} required rows={8} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500" />
              </label>
              <label className="block text-sm font-medium text-zinc-300">
                Tags <span className="font-normal text-zinc-600">(comma separated)</span>
                <input name="tags" value={editor.tags} onChange={updateEditor} placeholder="nextjs, express, mongodb" className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-700 focus:border-blue-500" />
              </label>
              <label className="block text-sm font-medium text-zinc-300">
                Status
                <select name="status" value={editor.status} onChange={updateEditor} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isSaving} className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60">
                  {isSaving ? "Saving…" : editingId ? "Update post" : "Create post"}
                </button>
                {editingId ? (
                  <button type="button" onClick={resetEditor} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/5">
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </aside>
        </div>

        <article className="mt-6 rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
          <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">Cloudinary gallery</p>
              <h2 className="mt-2 text-lg font-semibold text-white">Upload an image</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">Backend-1 accepts AVIF, GIF, JPEG, PNG, or WebP files up to 5 MB.</p>
            </div>
            <form onSubmit={uploadImage} className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex-1 text-sm font-medium text-zinc-300">
                Image file
                <input type="file" name="image" accept="image/avif,image/gif,image/jpeg,image/png,image/webp" required className="mt-2 block w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-zinc-200" />
              </label>
              <button type="submit" disabled={isUploading} className="rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-wait disabled:opacity-60">
                {isUploading ? "Uploading…" : "Upload"}
              </button>
            </form>
          </div>
          {upload ? (
            <div className="mt-5 flex flex-col gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
              <span>{upload.width} × {upload.height} {upload.format?.toUpperCase()} uploaded</span>
              <a href={upload.url} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">Open image</a>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
