import Link from "next/link";
import DashboardSidebar from "./DashboardSidebar";

const overviewItems = [
  { label: "Published posts", accent: "bg-blue-500" },
  { label: "Draft posts", accent: "bg-violet-500" },
  { label: "Total views", accent: "bg-emerald-500" },
  { label: "Comments", accent: "bg-amber-500" },
];

const quickLinks = [
  {
    href: "/blogs",
    title: "Manage blogs",
    description: "View and organize your blog content.",
  },
  {
    href: "/portfolio",
    title: "View portfolio",
    description: "Review your public portfolio page.",
  },
  {
    href: "/contact",
    title: "Contact page",
    description: "Open the contact area of your website.",
  },
];

export default function Dashboard() {
  return (
    <section className="flex flex-1 bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <DashboardSidebar />

        <div className="min-w-0">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-400">Dashboard</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Here is the home for your content, activity, and account tools.
              </p>
            </div>

            <Link
              href="/blogs"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Browse blogs
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewItems.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-xl shadow-black/10"
              >
                <div className={`h-1 w-10 rounded-full ${item.accent}`} />
                <p className="mt-5 text-sm text-zinc-400">{item.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                  &mdash;
                </p>
                <p className="mt-2 text-xs text-zinc-600">
                  Available after data integration
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
            <article className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Recent activity
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Your latest account updates will appear here.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
                  Live data pending
                </span>
              </div>

              <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/50 px-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-800 text-xl text-zinc-400">
                  +
                </div>
                <h3 className="mt-4 font-semibold text-white">
                  No activity to display yet
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                  Once the dashboard is connected to your API, recent posts and
                  account activity will show up here.
                </p>
              </div>
            </article>

            <aside className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl shadow-black/10">
              <h2 className="text-lg font-semibold text-white">Quick access</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Jump to an existing section.
              </p>

              <div className="mt-6 space-y-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block rounded-2xl border border-white/10 bg-zinc-950/50 p-4 transition hover:border-blue-500/40 hover:bg-blue-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-200 transition group-hover:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          {item.description}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-blue-400"
                      >
                        &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
