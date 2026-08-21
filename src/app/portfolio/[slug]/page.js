import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectArtwork from "@/components/Portfolio/ProjectArtwork";
import { getPortfolioProject, portfolioProjects } from "@/data/projects";

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) return { title: "Project not found | Frontend One" };

  return {
    title: `${project.title} case study | Frontend One`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  const currentIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  return (
    <article className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <header className="relative isolate overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_18%,rgba(37,99,235,0.14),transparent_27%),radial-gradient(circle_at_90%_76%,rgba(124,58,237,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_10%_18%,rgba(59,130,246,0.17),transparent_27%),radial-gradient(circle_at_90%_76%,rgba(139,92,246,0.14),transparent_28%)]" />
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"><ArrowIcon className="h-4 w-4 rotate-180" />All projects</Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{project.category} · {project.year}</p>
              <h1 className="mt-4 text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl">{project.title}</h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((item) => <span key={item} className="rounded-full border border-zinc-300 bg-white/60 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">{item}</span>)}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-zinc-900/15"><ProjectArtwork project={project} featured /></div>
          </div>
        </div>
      </header>

      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <dl className="mx-auto grid w-full max-w-6xl gap-px bg-zinc-200 px-4 sm:grid-cols-3 sm:px-6 lg:px-8 dark:bg-zinc-800">
          {[
            ["Role", project.role],
            ["Timeline", project.duration],
            ["Year", project.year],
          ].map(([label, value]) => (
            <div key={label} className="bg-white py-6 sm:px-6 dark:bg-zinc-950">
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">{label}</dt>
              <dd className="mt-2 text-sm font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section className="grid gap-5 sm:grid-cols-[100px_1fr]">
          <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">01 / Challenge</p>
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Finding the useful problem.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{project.challenge}</p>
          </div>
        </section>

        <section className="mt-16 grid gap-5 sm:grid-cols-[100px_1fr]">
          <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">02 / Approach</p>
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Making complexity feel calm.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{project.approach}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-medium leading-6 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />{highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 grid gap-5 sm:grid-cols-[100px_1fr]">
          <p className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">03 / Outcome</p>
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">A clearer way forward.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label} className="rounded-2xl bg-zinc-950 p-5 text-white dark:bg-black">
                  <p className="text-3xl font-black tracking-tight text-blue-400">{outcome.value}</p>
                  <p className="mt-2 text-xs font-medium leading-5 text-zinc-400">{outcome.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Next project</p>
          <Link href={`/portfolio/${nextProject.slug}`} className="group mt-4 flex items-start justify-between gap-6 rounded-2xl border border-zinc-200 p-6 transition hover:border-blue-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-blue-800 dark:hover:bg-zinc-900/60">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{nextProject.category} · {nextProject.year}</span>
              <h2 className="mt-2 text-2xl font-black tracking-tight transition group-hover:text-blue-600 sm:text-3xl dark:group-hover:text-blue-400">{nextProject.title}</h2>
            </div>
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition group-hover:translate-x-1"><ArrowIcon /></span>
          </Link>
        </div>
      </div>
    </article>
  );
}
