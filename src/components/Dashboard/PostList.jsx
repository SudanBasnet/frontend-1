import { formatPostDate } from "@/components/Dashboard/dashboardModel";

export default function PostList({
  posts,
  filteredPosts,
  query,
  statusFilter,
  onQueryChange,
  onStatusChange,
  onClearFilters,
  onEdit,
  onDelete,
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Your posts</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Drafts and published entries from Backend-1.
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
          {filteredPosts.length} of {posts.length}
        </span>
      </div>

      {posts.length ? (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_150px]">
            <label className="sr-only" htmlFor="post-search">
              Search posts
            </label>
            <input
              id="post-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search title, content, or tags…"
              className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-blue-500"
            />
            <label className="sr-only" htmlFor="post-status-filter">
              Filter by status
            </label>
            <select
              id="post-status-filter"
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
              className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
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
                  className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4"
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
                      <h3 className="mt-3 font-semibold text-white">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                        {post.content}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
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
                        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10"
                      >
                        Delete
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
          <h3 className="font-semibold text-white">No posts yet</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Use the editor to create your first Backend-1 post.
          </p>
        </div>
      )}
    </article>
  );
}
