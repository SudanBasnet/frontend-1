import Link from "next/link";

const navigationGroups = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: "overview", active: true },
      { href: "/blogs", label: "Blogs", icon: "blogs" },
      { href: "/portfolio", label: "Portfolio", icon: "portfolio" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/contact", label: "Messages", icon: "messages" },
      { href: "/", label: "View site", icon: "site" },
    ],
  },
];

function NavigationIcon({ name }) {
  const paths = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    blogs: (
      <>
        <path d="M6 3.75h9.5L19 7.25v13H6a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z" />
        <path d="M15 3.75v4h4" />
        <path d="M8 12h7M8 16h7" />
      </>
    ),
    portfolio: (
      <>
        <rect x="3" y="6.5" width="18" height="13" rx="2" />
        <path d="M8 6.5V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 11.5h18" />
        <path d="M10 11.5v2h4v-2" />
      </>
    ),
    messages: (
      <>
        <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-5a2 2 0 0 1-1-1.73V6a2 2 0 0 1 2-2Z" />
        <path d="m7 8 5 4 5-4" />
      </>
    ),
    site: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.2 2.47 3.33 5.47 3.4 9-.07 3.53-1.2 6.53-3.4 9-2.2-2.47-3.33-5.47-3.4-9C8.67 8.47 9.8 5.47 12 3Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export default function DashboardSidebar() {
  return (
    <aside className="h-fit overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/20 lg:sticky lg:top-6">
      <div className="border-b border-white/10 p-5">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-blue-600 text-base font-bold text-white shadow-lg shadow-blue-950/40 transition group-hover:bg-blue-500">
            F1
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold text-white">
              Frontend One
            </span>
            <span className="block text-xs text-zinc-500">Content workspace</span>
          </span>
        </Link>
      </div>

      <nav className="space-y-5 p-4" aria-label="Dashboard navigation">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              {group.label}
            </p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      item.active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-950/30"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <NavigationIcon name={item.icon} />
                    <span className="flex-1">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`text-base transition group-hover:translate-x-0.5 ${
                        item.active ? "text-blue-200" : "text-zinc-700"
                      }`}
                    >
                      &rsaquo;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-950/60 p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-300">
            U
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-zinc-200">
              Your account
            </span>
            <span className="block truncate text-xs text-zinc-600">
              Profile pending
            </span>
          </span>
        </div>
      </div>
    </aside>
  );
}
