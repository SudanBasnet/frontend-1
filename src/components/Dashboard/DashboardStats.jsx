function StatIcon({ name }) {
  const paths = {
    posts: <path d="M7 3.5h7l3 3V17a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Zm7 0V7h3M8 11h6M8 14.5h4" />,
    published: <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-3.5-8 2.25 2.25 4.75-5" />,
    drafts: <path d="M5 18.5h3.5L18 9l-3-3-9.5 9.5v3ZM13.5 7.5l3 3M5 21h14" />,
    tags: <path d="M4 4h7.5L20 12.5 12.5 20 4 11.5V4Zm4 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {paths[name]}
    </svg>
  );
}

export default function DashboardStats({ stats }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article
          key={item.label}
          className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
        >
          <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${item.accent}`} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-zinc-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                {item.value}
              </p>
            </div>
            <span className={`grid size-10 place-items-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-lg shadow-black/20`}>
              <StatIcon name={item.icon} />
            </span>
          </div>
          <p className="mt-4 text-xs leading-5 text-zinc-600 transition group-hover:text-zinc-500">
            {item.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
