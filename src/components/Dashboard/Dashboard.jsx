"use client";

import Link from "next/link";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import GalleryUploader from "@/components/Dashboard/GalleryUploader";
import PostEditor from "@/components/Dashboard/PostEditor";
import PostList from "@/components/Dashboard/PostList";
import useDashboard from "@/components/Dashboard/useDashboard";

export default function Dashboard() {
  const dashboard = useDashboard();
  const syncLabel = dashboard.lastSyncedAt
    ? new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
      }).format(dashboard.lastSyncedAt)
    : "Not synced";

  if (dashboard.isLoading) {
    return (
      <section className="relative grid min-h-[70vh] flex-1 place-items-center overflow-hidden bg-zinc-950 px-4 text-zinc-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.16),transparent_32%)]" />
        <div className="relative text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-blue-500/20 bg-blue-500/10 shadow-2xl shadow-blue-950/40">
            <div className="size-6 animate-spin rounded-full border-2 border-zinc-700 border-t-blue-400" />
          </div>
          <p className="mt-5 text-sm font-medium">Loading your Backend-1 workspace…</p>
          <p className="mt-1 text-xs text-zinc-600">Checking your session and content</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate flex flex-1 overflow-hidden bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_12%,rgba(37,99,235,0.14),transparent_26%),radial-gradient(circle_at_92%_38%,rgba(124,58,237,0.1),transparent_23%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <DashboardSidebar
          user={dashboard.user}
          postCount={dashboard.posts.length}
          onCreatePost={dashboard.startNewPost}
        />

        <div className="min-w-0">
          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/75 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-blue-600/15 blur-3xl" />
            <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                    Content command center
                  </p>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${dashboard.error ? "border-amber-500/20 bg-amber-500/10 text-amber-300" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"}`}>
                    <span className={`size-1.5 rounded-full ${dashboard.error ? "bg-amber-400" : "bg-emerald-400"}`} aria-hidden="true" />
                    {dashboard.error ? "Workspace needs attention" : "Backend-1 connected"}
                  </span>
                </div>
                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                  Welcome back
                  {dashboard.user?.name
                    ? `, ${dashboard.user.name.split(" ")[0]}`
                    : ""}
                  .
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Shape ideas, publish stories, and keep your content library moving from one focused workspace.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={dashboard.refreshPosts}
                  disabled={dashboard.isRefreshing}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-wait disabled:opacity-60"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`size-4 ${dashboard.isRefreshing ? "animate-spin" : ""}`}>
                    <path d="M16.5 6.5A7 7 0 1 0 17 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path d="M16.5 3v3.5H13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {dashboard.isRefreshing ? "Refreshing…" : "Refresh"}
                </button>
                <button
                  type="button"
                  onClick={dashboard.startNewPost}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
                >
                  <span aria-hidden="true" className="text-lg leading-none">+</span>
                  New post
                </button>
              </div>
            </div>

            <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-zinc-500">
              <span>Last synced {syncLabel}</span>
              <span className="hidden size-1 rounded-full bg-zinc-700 sm:block" aria-hidden="true" />
              <span>{dashboard.posts.length} {dashboard.posts.length === 1 ? "entry" : "entries"} in your library</span>
              <Link href="/blogs" className="ml-auto font-semibold text-blue-400 transition hover:text-blue-300">
                Open public feed <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </header>

          {dashboard.error ? (
            <div role="alert" className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              <span>{dashboard.error}</span>
              <button type="button" onClick={dashboard.dismissError} aria-label="Dismiss error" className="grid size-7 shrink-0 place-items-center rounded-lg text-red-300 hover:bg-red-500/10 hover:text-white">&times;</button>
            </div>
          ) : null}
          {dashboard.message ? (
            <div role="status" className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              <span>{dashboard.message}</span>
              <button type="button" onClick={dashboard.dismissMessage} aria-label="Dismiss message" className="grid size-7 shrink-0 place-items-center rounded-lg text-emerald-300 hover:bg-emerald-500/10 hover:text-white">&times;</button>
            </div>
          ) : null}

          <DashboardStats stats={dashboard.stats} />

          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
            <PostList
              posts={dashboard.posts}
              filteredPosts={dashboard.filteredPosts}
              query={dashboard.query}
              statusFilter={dashboard.statusFilter}
              deletingId={dashboard.deletingId}
              onQueryChange={dashboard.setQuery}
              onStatusChange={dashboard.setStatusFilter}
              onClearFilters={dashboard.clearFilters}
              onCreate={dashboard.startNewPost}
              onEdit={dashboard.editPost}
              onDelete={dashboard.deletePost}
            />
            <PostEditor
              editor={dashboard.editor}
              editingId={dashboard.editingId}
              isSaving={dashboard.isSaving}
              onChange={dashboard.updateEditor}
              onSubmit={dashboard.savePost}
              onReset={dashboard.resetEditor}
            />
          </div>

          <GalleryUploader
            onStart={() => dashboard.setError("")}
            onError={dashboard.setError}
          />
        </div>
      </div>
    </section>
  );
}
