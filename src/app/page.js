import Link from "next/link";
import HomeHeroScene from "@/components/Home/HomeHeroScene";
import FloatingPortfolioSpheres from "@/components/Portfolio/FloatingPortfolioSpheres";
import { blogPosts } from "@/data/blogPosts";
import { portfolioProjects } from "@/data/projects";
import { siteSeed } from "@/data/siteSeed";
import styles from "./page.module.css";

const projects = portfolioProjects.slice(0, 3);
const posts = blogPosts.slice(0, 3);
const featuredProject = portfolioProjects[0];
const technologies = new Set(
  portfolioProjects.flatMap((project) => project.stack),
);
const projectYears = portfolioProjects.map((project) => Number(project.year));
const projectTimeline = `${Math.min(...projectYears)}—${Math.max(...projectYears)}`;
const projectInitials = projects.map((project) =>
  project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2),
);
const stats = [
  { value: String(portfolioProjects.length), label: "Seeded case studies" },
  { value: String(blogPosts.length), label: "Seeded articles" },
  { value: String(technologies.size), label: "Technologies represented" },
  { value: projectTimeline, label: "Project timeline" },
];
const { profile, services, currentFocus } = siteSeed;

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
    <div className={`${styles.page} overflow-hidden text-zinc-950 dark:text-white`}>
      <FloatingPortfolioSpheres />

      <section className={styles.hero}>
        <div className={`${styles.heroInner} mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:px-8 lg:py-24`}>
          <div className={styles.heroCopy}>
            <div className={`${styles.availability} mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 backdrop-blur dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300`}>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {profile.availability}
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              Developer · Designer · Problem solver
            </p>
            <h1 className={`${styles.heroTitle} max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.06em] text-zinc-950 sm:text-6xl lg:text-7xl dark:text-white`}>
              I build useful web experiences that feel
              <span> effortless.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Hi, I&apos;m {profile.firstName} — a full-stack developer turning thoughtful
              ideas into fast, accessible, and human-friendly digital products.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className={`${styles.primaryButton} inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950`}
              >
                Explore my work
                <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className={`${styles.secondaryButton} inline-flex items-center rounded-xl border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-bold text-zinc-800 backdrop-blur transition hover:border-zinc-400 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950`}
              >
                Let&apos;s work together
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex -space-x-2" aria-hidden="true">
                {projectInitials.map((initials, index) => (
                  <span
                    key={initials}
                    className={`${styles.avatar} grid h-9 w-9 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white dark:border-zinc-950 ${
                      ["bg-violet-500", "bg-emerald-500", "bg-orange-500"][index]
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p>
                Built from <strong className="text-zinc-800 dark:text-zinc-200">{portfolioProjects.length} seeded case studies</strong>
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:justify-self-end">
            <HomeHeroScene project={featuredProject} />
          </div>
        </div>
      </section>

      <section aria-label="Experience highlights" className={styles.statsSection}>
        <div className={`${styles.statsGrid} mx-auto grid w-full max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8`}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${styles.statCard} border-zinc-200 px-3 py-8 text-center odd:border-r lg:border-r lg:last:border-r-0 dark:border-zinc-800`}
            >
              <p className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.sectionDepth} mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8`}>
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
          <div className={styles.services}>
            {services.map((service) => (
              <article key={service.number} className={`${styles.serviceCard} group grid gap-3 sm:grid-cols-[56px_1fr_auto] sm:items-start`}>
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

      <section className={styles.focusSection}>
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Now
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                A snapshot of what has my attention.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-600 lg:justify-self-end dark:text-zinc-300">
              Good work comes from staying curious. Here&apos;s what I&apos;m
              making, studying, and experimenting with between projects.
            </p>
          </div>

          <div className={`${styles.cardGrid} mt-10 grid gap-5 md:grid-cols-3`}>
            {currentFocus.map((item, index) => (
              <article
                key={item.label}
                className={`${styles.depthCard} group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${item.accent}`}
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-zinc-300 dark:text-zinc-700">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
                <div className="mt-7 flex items-center gap-2 border-t border-zinc-100 pt-4 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.accent}`} />
                  {item.detail}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.workSection} py-20 text-white sm:py-24`}>
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
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
            {projects.map((project) => (
              <Link href={`/portfolio/${project.slug}`} key={project.title} className={`${styles.projectCard} group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`}>
                <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient} p-5`}>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
                  <div className="absolute -right-2 top-8 h-24 w-24 rounded-full border border-white/20" />
                  <div className={`${styles.projectArtwork} relative flex h-full flex-col justify-between rounded-xl border border-white/20 bg-black/15 p-5 backdrop-blur-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]`}>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold backdrop-blur">{project.number}</span>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.blogSection} mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">From the blog</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Notes from the journey.</h2>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500">
            Browse all articles <ArrowIcon />
          </Link>
        </div>

        <div className={`${styles.cardGrid} mt-10 grid gap-5 md:grid-cols-3`}>
          {posts.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.title} className={`${styles.depthCard} ${styles.blogCard} group flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950`}>
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-700 dark:bg-blue-950 dark:text-blue-300">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold leading-snug transition group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <time dateTime={post.isoDate} className="text-xs text-zinc-500">{post.date}</time>
                <span className="text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400"><ArrowIcon /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className={`${styles.cta} relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-14 text-center text-white sm:px-12 sm:py-16`}>
          <div className={`${styles.ctaOrb} absolute -left-20 -top-28 h-72 w-72 rounded-full border-[50px] border-white/10`} />
          <div className={`${styles.ctaOrb} absolute -bottom-32 -right-16 h-72 w-72 rounded-full border-[50px] border-white/10`} />
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
