import Link from "next/link";
import { ArrowIcon } from "@/components/Portfolio/PortfolioIcons";
import ProjectArtwork from "@/components/Portfolio/ProjectArtwork";
import ProjectStack from "@/components/Portfolio/ProjectStack";

export default function PortfolioProjectCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-zinc-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950"
    >
      <ProjectArtwork project={project} />
      <article className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          <span className="text-blue-600 dark:text-blue-400">{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black tracking-tight transition group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-200 text-blue-600 transition group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-zinc-700 dark:text-blue-400">
            <ArrowIcon />
          </span>
        </div>
        <ProjectStack items={project.stack} className="mt-5" />
      </article>
    </Link>
  );
}
