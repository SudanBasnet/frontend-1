export default function DashboardStats({ stats }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-xl shadow-black/10"
        >
          <div className={`h-1 w-10 rounded-full ${item.accent}`} />
          <p className="mt-5 text-sm text-zinc-400">{item.label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">
            {item.value}
          </p>
        </article>
      ))}
    </div>
  );
}
