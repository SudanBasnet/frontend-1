"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProjectArtwork from "@/components/Portfolio/ProjectArtwork";

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
    <path
      d="M4 10h12m-5-5 5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
    <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.7" />
    <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export default function PortfolioArchive({ projects }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [sort, setSort] = useState("newest");

  const years = useMemo(
    () => [...new Set(projects.map((project) => project.year))].sort((a, b) => Number(b) - Number(a)),
    [projects],
  );

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects
      .filter((project) => {
        const searchableText = [
          project.title,
          project.category,
          project.description,
          ...project.stack,
        ]
          .join(" ")
          .toLowerCase();

        return (
          (year === "All" || project.year === year) &&
          (!normalizedQuery || searchableText.includes(normalizedQuery))
        );
      })
      .sort((a, b) => {
        if (sort === "oldest") return Number(a.year) - Number(b.year);
        if (sort === "title") return a.title.localeCompare(b.title);
        return Number(b.year) - Number(a.year);
      });
  }, [projects, query, sort, year]);

  const hasFilters = query || year !== "All" || sort !== "newest";

  const resetFilters = () => {
    setQuery("");
    setYear("All");
    setSort("newest");
  };

  return (
    <div className="mt-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Search projects
            </span>
            <span className="relative block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try React, dashboard, or API"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 pl-11 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-blue-400"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Year
            </span>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="min-w-32 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-blue-400"
            >
              <option value="All">All years</option>
              {years.map((projectYear) => (
                <option key={projectYear} value={projectYear}>{projectYear}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Sort by
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-40 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-blue-400"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Project name</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex min-h-7 flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
            Showing <strong className="text-zinc-900 dark:text-white">{visibleProjects.length}</strong> of {projects.length} projects
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-bold text-blue-600 transition hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-blue-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {visibleProjects.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {visibleProjects.map((project) => (
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
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xl font-black tracking-tight">No projects match those filters.</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            Try a broader search term or reset the archive to see every project.
          </p>
          <button type="button" onClick={resetFilters} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900">
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
