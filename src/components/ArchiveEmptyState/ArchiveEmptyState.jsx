export default function ArchiveEmptyState({ title, description, actionLabel, onReset }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xl font-black tracking-tight">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
      >
        {actionLabel}
      </button>
    </div>
  );
}
