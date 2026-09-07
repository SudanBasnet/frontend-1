"use client";

import Link from "next/link";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import GalleryUploader from "@/components/Dashboard/GalleryUploader";
import PostEditor from "@/components/Dashboard/PostEditor";
import PostList from "@/components/Dashboard/PostList";
import useDashboard from "@/components/Dashboard/useDashboard";

export default function Dashboard() {
  const dashboard = useDashboard();

  if (dashboard.isLoading) {
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
            <p className="text-sm font-semibold text-blue-400">
              Backend-1 dashboard
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back
              {dashboard.user?.name
                ? `, ${dashboard.user.name.split(" ")[0]}`
                : ""}
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

        {dashboard.error ? (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {dashboard.error}
          </p>
        ) : null}
        {dashboard.message ? (
          <p
            role="status"
            className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          >
            {dashboard.message}
          </p>
        ) : null}

        <DashboardStats stats={dashboard.stats} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <PostList
            posts={dashboard.posts}
            filteredPosts={dashboard.filteredPosts}
            query={dashboard.query}
            statusFilter={dashboard.statusFilter}
            onQueryChange={dashboard.setQuery}
            onStatusChange={dashboard.setStatusFilter}
            onClearFilters={dashboard.clearFilters}
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
    </section>
  );
}
