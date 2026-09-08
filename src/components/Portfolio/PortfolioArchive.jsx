"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/Portfolio/PortfolioIcons";
import PortfolioProjectCard from "@/components/Portfolio/PortfolioProjectCard";

const DEFAULT_YEAR = "All";
const DEFAULT_SORT = "newest";

const sortOptions = [
  { value: DEFAULT_SORT, label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Project name" },
];

const projectSorters = {
  newest: (a, b) => Number(b.year) - Number(a.year),
  oldest: (a, b) => Number(a.year) - Number(b.year),
  title: (a, b) => a.title.localeCompare(b.title),
};

function getSearchableText(project) {
  return [project.title, project.category, project.description, ...project.stack]
    .join(" ")
    .toLowerCase();
}

function filterAndSortProjects(projects, { query, sort, year }) {
  const normalizedQuery = query.trim().toLowerCase();

  return projects
    .filter(
      (project) =>
        (year === DEFAULT_YEAR || project.year === year) &&
        (!normalizedQuery || getSearchableText(project).includes(normalizedQuery)),
    )
    .sort(projectSorters[sort] ?? projectSorters[DEFAULT_SORT]);
}

export default function PortfolioArchive({ projects }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(DEFAULT_YEAR);
  const [sort, setSort] = useState(DEFAULT_SORT);

  const years = useMemo(
    () =>
      [...new Set(projects.map((project) => project.year))].sort(
        (a, b) => Number(b) - Number(a),
      ),
    [projects],
  );

  const visibleProjects = useMemo(
    () => filterAndSortProjects(projects, { query, sort, year }),
    [projects, query, sort, year],
  );

  const hasFilters = query || year !== DEFAULT_YEAR || sort !== DEFAULT_SORT;

  const resetFilters = () => {
    setQuery("");
    setYear(DEFAULT_YEAR);
    setSort(DEFAULT_SORT);
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
              <option value={DEFAULT_YEAR}>All years</option>
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
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
            <PortfolioProjectCard key={project.slug} project={project} />
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
