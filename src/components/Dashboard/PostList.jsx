import Link from "next/link";
import { formatPostDate } from "@/components/Dashboard/dashboardModel";

export default function PostList({
  posts,
  filteredPosts,
  query,
  statusFilter,
  deletingId,
  onQueryChange,
  onStatusChange,
  onClearFilters,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <article id="posts" className="scroll-mt-6 rounded-3xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl shadow-black/10 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-400">Content library</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Your posts</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Find, edit, and manage every Backend-1 entry.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-zinc-950/50 px-3 py-1.5 text-xs font-medium text-zinc-400">
          {filteredPosts.length} of {posts.length}
        </span>
      </div>

      {posts.length ? (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_150px]">
            <div className="relative">
              <label className="sr-only" htmlFor="post-search">
                Search posts
              </label>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-600">
                <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.6" />
                <path d="m12.75 12.75 3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                id="post-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search title, content, or tags…"
                className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
              />
            </div>
            <label className="sr-only" htmlFor="post-status-filter">
              Filter by status
            </label>
            <select
              id="post-status-filter"
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
              className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          {filteredPosts.length ? (
            <div className="mt-6 space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="group rounded-2xl border border-white/10 bg-zinc-950/60 p-4 transition hover:border-white/15 hover:bg-zinc-950"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            post.status === "published"
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-violet-500/10 text-violet-300"
                          }`}
                        >
                          {post.status}
                        </span>
                        <span className="text-xs text-zinc-600">
                          {formatPostDate(post.publishedAt || post.createdAt)}
                        </span>
                      </div>
                      <h3 className="mt-3 font-semibold leading-6 text-white transition group-hover:text-blue-100">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                        {post.content}
                      </p>
                      {post.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-500">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {post.status === "published" ? (
                        <Link
                          href={`/blogs/community/${post._id}`}
                          aria-label={`View ${post.title}`}
                          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-zinc-400 transition hover:border-emerald-500/40 hover:text-emerald-300"
                        >
                          View
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => onEdit(post)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-blue-500/50 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(post)}
                        disabled={deletingId === post._id}
                        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-wait disabled:opacity-50"
                      >
                        {deletingId === post._id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 px-6 py-10 text-center">
              <h3 className="font-semibold text-white">No matching posts</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Try a different search or status filter.
              </p>
              <button
                type="button"
                onClick={onClearFilters}
                className="mt-4 text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 px-6 py-12 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-500/10 text-2xl text-blue-400" aria-hidden="true">+</span>
          <h3 className="mt-4 font-semibold text-white">No posts yet</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Use the editor to create your first Backend-1 post.
          </p>
          <button type="button" onClick={onCreate} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500">
            Create your first post
          </button>
        </div>
      )}
    </article>
  );
}
