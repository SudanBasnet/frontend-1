import Link from "next/link";
import ProjectArtwork from "@/components/Portfolio/ProjectArtwork";
import { portfolioProjects } from "@/data/projects";

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const process = [
  { number: "01", title: "Understand", text: "Clarify the people, constraints, and outcome before choosing a solution." },
  { number: "02", title: "Shape", text: "Turn the problem into focused flows, prototypes, and a dependable system." },
  { number: "03", title: "Build", text: "Develop responsively, test real states, and refine the details that create trust." },
];

export const metadata = {
  title: "Portfolio | Frontend One",
  description: "Selected full-stack, frontend, and product design projects built with clarity, care, and measurable outcomes.",
};

export default function PortfolioPage() {
  const [featuredProject, ...projects] = portfolioProjects;

  return (
    <div className="overflow-hidden bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="relative isolate border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(37,99,235,0.14),transparent_29%),radial-gradient(circle_at_88%_75%,rgba(124,58,237,0.12),transparent_27%)] dark:bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.17),transparent_29%),radial-gradient(circle_at_88%_75%,rgba(139,92,246,0.15),transparent_27%)]" />
        <div className="mx-auto grid w-full max-w-6xl items-end gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Selected work · 2024—2026</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.97] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Digital products shaped around <span className="text-blue-600 dark:text-blue-400">real needs.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              A collection of full-stack builds, focused interfaces, and practical product decisions—from the first sketch to the final responsive detail.
            </p>
          </div>
          <div className="hidden pb-2 text-right lg:block">
            <p className="text-5xl font-black tracking-tight">06</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Case studies</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Featured project</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Support work, made clear.</h2>
          </div>
          <span className="hidden text-sm text-zinc-500 sm:block dark:text-zinc-400">Full-stack · 2026</span>
        </div>

        <Link href={`/portfolio/${featuredProject.slug}`} className="group grid overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-2xl hover:shadow-zinc-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:grid-cols-[1.1fr_0.9fr] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950">
          <ProjectArtwork project={featuredProject} featured />
          <article className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2">
              {featuredProject.stack.map((item) => <span key={item} className="rounded-full border border-zinc-300 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">{item}</span>)}
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">{featuredProject.category}</p>
            <h3 className="mt-2 text-4xl font-black tracking-tight transition group-hover:text-blue-600 sm:text-5xl dark:group-hover:text-blue-400">{featuredProject.title}</h3>
            <p className="mt-5 leading-7 text-zinc-600 dark:text-zinc-300">{featuredProject.summary}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">View case study <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </article>
        </Link>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Project archive</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">More things I&apos;ve made.</h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Design · Development · Direction</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-zinc-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950">
                <ProjectArtwork project={project} />
                <article className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    <span className="text-blue-600 dark:text-blue-400">{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight transition group-hover:text-blue-600 dark:group-hover:text-blue-400">{project.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-200 text-blue-600 transition group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-zinc-700 dark:text-blue-400"><ArrowIcon /></span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => <span key={item} className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{item}</span>)}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">How I work</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A practical path from ambiguity to useful.</h2>
          </div>
          <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {process.map((step) => (
              <div key={step.number} className="grid gap-3 py-6 sm:grid-cols-[56px_150px_1fr] sm:items-start">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{step.number}</span>
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div className="absolute -left-20 -top-28 h-72 w-72 rounded-full border-[50px] border-white/10" />
          <div className="absolute -bottom-32 -right-16 h-72 w-72 rounded-full border-[50px] border-white/10" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Have a project in mind?</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">Let&apos;s turn the rough idea into something real.</h2>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600">Start a conversation <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
