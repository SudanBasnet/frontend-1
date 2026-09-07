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
      className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10"
    >
      <h2 className="text-lg font-semibold text-white">
        {editingId ? "Edit post" : "Create a post"}
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Save as a draft or publish it to the public blog feed.
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm font-medium text-zinc-300">
          <span className="flex items-center justify-between gap-3">
            Title
            <span className="text-xs font-normal text-zinc-600">
              {editor.title.length}/150
            </span>
          </span>
          <input
            name="title"
            value={editor.title}
            onChange={onChange}
            required
            maxLength={150}
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
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
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </label>
        <label className="block text-sm font-medium text-zinc-300">
          Tags <span className="font-normal text-zinc-600">(comma separated)</span>
          <input
            name="tags"
            value={editor.tags}
            onChange={onChange}
            placeholder="nextjs, express, mongodb"
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none placeholder:text-zinc-700 focus:border-blue-500"
          />
        </label>
        <label className="block text-sm font-medium text-zinc-300">
          Status
          <select
            name="status"
            value={editor.status}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <div className="flex gap-3 pt-2">
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
