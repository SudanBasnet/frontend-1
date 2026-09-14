export default function PostEditor({
  editor,
  editingId,
  isSaving,
  onChange,
  onSubmit,
  onReset,
}) {
  return (
    <aside
      id="post-editor"
      className="scroll-mt-6 rounded-3xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl shadow-black/10 sm:p-6 xl:sticky xl:top-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-400">Writing desk</p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            {editingId ? "Edit post" : "Create a post"}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Save a draft or publish it to the public feed.
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${editingId ? "bg-amber-500/10 text-amber-300" : "bg-blue-500/10 text-blue-300"}`}>
          {editingId ? "Editing" : "New"}
        </span>
      </div>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-zinc-300">
          <span className="flex items-center justify-between gap-3">
            Title
            <span className="text-xs font-normal text-zinc-600">
              {editor.title.length}/150
            </span>
          </span>
          <input
            id="post-title"
            name="title"
            value={editor.title}
            onChange={onChange}
            required
            maxLength={150}
            placeholder="Give your story a clear title"
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </label>
        <label className="block text-sm font-medium text-zinc-300">
          <span className="flex items-center justify-between gap-3">
            Content
            <span className="text-xs font-normal text-zinc-600">
              {editor.content.length} characters
            </span>
          </span>
          <textarea
            name="content"
            value={editor.content}
            onChange={onChange}
            required
            rows={8}
            placeholder="Write the story you want to share…"
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </label>
        <label className="block text-sm font-medium text-zinc-300">
          Tags <span className="font-normal text-zinc-600">(comma separated)</span>
          <input
            name="tags"
            value={editor.tags}
            onChange={onChange}
            placeholder="nextjs, express, mongodb"
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </label>
        <label className="block text-sm font-medium text-zinc-300">
          Status
          <select
            name="status"
            value={editor.status}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <div className="flex gap-3 border-t border-white/10 pt-5">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
          >
            {isSaving ? "Saving…" : editingId ? "Update post" : "Create post"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={onReset}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/5"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </aside>
  );
}
