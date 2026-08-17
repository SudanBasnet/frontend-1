import Link from "next/link";

const stats = [
  { value: "12+", label: "Projects completed" },
  { value: "3+", label: "Years learning & building" },
  { value: "8", label: "Technologies used" },
  { value: "100%", label: "Built with curiosity" },
];

const services = [
  {
    number: "01",
    title: "Frontend development",
    description:
      "Responsive, accessible interfaces built with React, Next.js, and modern CSS.",
  },
  {
    number: "02",
    title: "Backend development",
    description:
      "Practical REST APIs, authentication flows, and database-backed applications.",
  },
  {
    number: "03",
    title: "UI implementation",
    description:
      "Clean, thoughtful layouts translated from an idea into polished web experiences.",
  },
];

const projects = [
  {
    title: "ClearQueue",
    category: "Full-stack platform",
    description:
      "A modern support-ticket workspace that helps teams organise, assign, and resolve requests.",
    stack: ["React", "Node.js", "MongoDB"],
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    metric: "48",
    metricLabel: "open tickets",
  },
  {
    title: "Learning Library",
    category: "Web application",
    description:
      "A digital library experience for discovering titles, managing loans, and tracking reading.",
    stack: ["Next.js", "Express", "Redux"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    metric: "1.2k",
    metricLabel: "books explored",
  },
  {
    title: "Finance Flow",
    category: "Dashboard",
    description:
      "A clear personal-finance dashboard for recording expenses and understanding monthly habits.",
    stack: ["React", "Bootstrap", "API"],
    gradient: "from-orange-400 via-rose-500 to-pink-600",
    metric: "$4.8k",
    metricLabel: "monthly tracked",
  },
];

const posts = [
  {
    date: "Aug 12, 2026",
    readTime: "6 min read",
    title: "What I learned building my first full-stack dashboard",
    excerpt:
      "A practical reflection on component structure, API boundaries, and the small decisions that improved the final product.",
    tag: "Development",
  },
  {
    date: "Aug 04, 2026",
    readTime: "4 min read",
    title: "Making a simple interface feel more intentional",
    excerpt:
      "Spacing, hierarchy, colour, and feedback are often all a design needs to move from functional to polished.",
    tag: "Design",
  },
  {
    date: "Jul 28, 2026",
    readTime: "8 min read",
    title: "A beginner-friendly way to trace an API request",
    excerpt:
      "Follow one request from the button click to the database and back without getting lost between application layers.",
    tag: "Learning",
  },
];

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M4 10h12m-5-5 5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const metadata = {
  title: "Home | Frontend One",
  description:
    "A developer portfolio featuring selected projects, skills, and writing.",
};

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="relative isolate border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(124,58,237,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(139,92,246,0.16),transparent_30%)]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available for new projects
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              Developer · Designer · Problem solver
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white">
              I build useful web experiences that feel
              <span className="text-blue-600 dark:text-blue-400"> effortless.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Hi, I&apos;m Alex — a full-stack developer turning thoughtful
              ideas into fast, accessible, and human-friendly digital products.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              >
                Explore my work
                <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-bold text-zinc-800 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950"
              >
                Let&apos;s work together
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex -space-x-2" aria-hidden="true">
                {["AM", "SK", "JR"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white dark:border-zinc-950 ${
                      ["bg-violet-500", "bg-emerald-500", "bg-orange-500"][index]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p>
                Trusted on <strong className="text-zinc-800 dark:text-zinc-200">12+ projects</strong>
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-2xl" />
            <div className="rotate-1 rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-900/15 transition hover:rotate-0 dark:border-zinc-700 dark:bg-zinc-900">
              <div className="overflow-hidden rounded-[1.35rem] border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="rounded-full bg-zinc-200 px-3 py-1 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    overview.app
                  </span>
                </div>
                <div className="grid grid-cols-[74px_1fr]">
                  <div className="border-r border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="mb-7 h-7 w-7 rounded-lg bg-blue-600" />
                    <div className="space-y-3">
                      {["w-10 bg-blue-200 dark:bg-blue-900", "w-8", "w-11", "w-7"].map(
                        (width, index) => (
                          <div
                            key={index}
                            className={`h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 ${width}`}
                          />
                        ),
                      )}
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Project performance
                        </p>
                        <p className="mt-1 text-2xl font-black tracking-tight">Good morning, Alex</p>
                      </div>
                      <div className="hidden h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 sm:block" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-[10px] text-zinc-400">Active projects</p>
                        <p className="mt-2 text-2xl font-black">08</p>
                        <p className="mt-1 text-[10px] font-semibold text-emerald-500">+18% this month</p>
                      </div>
                      <div className="rounded-xl bg-blue-600 p-4 text-white">
                        <p className="text-[10px] text-blue-100">Tasks completed</p>
                        <p className="mt-2 text-2xl font-black">124</p>
                        <p className="mt-1 text-[10px] font-semibold text-blue-100">24 this week</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="mb-5 flex items-center justify-between">
                        <p className="text-[11px] font-bold">Weekly activity</p>
                        <span className="text-[9px] text-zinc-400">Last 7 days</span>
                      </div>
                      <div className="flex h-24 items-end gap-2" aria-hidden="true">
                        {[38, 62, 48, 76, 58, 92, 72].map((height, index) => (
                          <div
                            key={index}
                            className={`flex-1 rounded-t-sm ${index === 5 ? "bg-blue-600" : "bg-blue-100 dark:bg-blue-950"}`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Experience highlights" className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-zinc-200 px-3 py-8 text-center odd:border-r lg:border-r lg:last:border-r-0 dark:border-zinc-800"
            >
              <p className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">What I do</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Building from both sides of the stack.</h2>
            <p className="mt-5 max-w-md leading-7 text-zinc-600 dark:text-zinc-300">
              I combine technical thinking with an eye for clear design, creating products that work well and make sense to the people using them.
            </p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500">
              More about me <ArrowIcon />
            </Link>
          </div>
          <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {services.map((service) => (
              <article key={service.number} className="group grid gap-3 py-6 sm:grid-cols-[56px_1fr_auto] sm:items-start">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{service.number}</span>
                <div>
                  <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">{service.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">{service.description}</p>
                </div>
                <span className="hidden rounded-full border border-zinc-200 p-2 text-zinc-400 transition group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white sm:block dark:border-zinc-700">
                  <ArrowIcon />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-20 text-white sm:py-24 dark:bg-black">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Selected work</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Projects with a purpose.</h2>
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-200 hover:text-blue-400">
              View all projects <ArrowIcon />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.title} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient} p-5`}>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
                  <div className="absolute -right-2 top-8 h-24 w-24 rounded-full border border-white/20" />
                  <div className="relative flex h-full flex-col justify-between rounded-xl border border-white/20 bg-black/15 p-5 backdrop-blur-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold backdrop-blur">0{index + 1}</span>
                      <div className="flex gap-1"><span className="h-2 w-2 rounded-full bg-white/50" /><span className="h-2 w-2 rounded-full bg-white/25" /></div>
                    </div>
                    <div>
                      <p className="text-3xl font-black tracking-tight">{project.metric}</p>
                      <p className="text-xs text-white/75">{project.metricLabel}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-400">{project.category}</p>
                  <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-zinc-700 px-2.5 py-1 text-[11px] font-medium text-zinc-300">{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">From the blog</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Notes from the journey.</h2>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500">
            Browse all articles <ArrowIcon />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="group flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-800">
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-700 dark:bg-blue-950 dark:text-blue-300">{post.tag}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold leading-snug transition group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <span className="text-xs text-zinc-500">{post.date}</span>
                <span className="text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400"><ArrowIcon /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -left-20 -top-28 h-72 w-72 rounded-full border-[50px] border-white/10" />
          <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full border-[50px] border-white/10" />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">Have an idea?</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">Let&apos;s build something people enjoy using.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">I&apos;m always happy to discuss a new project, collaboration, or interesting problem.</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600">
              Start a conversation <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
