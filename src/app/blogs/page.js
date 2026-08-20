import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

const accentStyles = {
  blue: "from-blue-600 to-indigo-500 text-blue-100",
  violet: "from-violet-600 to-fuchsia-500 text-violet-100",
  emerald: "from-emerald-600 to-teal-500 text-emerald-100",
  orange: "from-orange-500 to-amber-400 text-orange-50",
  cyan: "from-cyan-600 to-blue-500 text-cyan-50",
  rose: "from-rose-600 to-pink-500 text-rose-50",
};

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M4 10h12m-5-5 5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ArticleVisual({ post, featured = false }) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br ${accentStyles[post.accent]} ${
        featured ? "min-h-72 lg:min-h-full" : "h-48"
      }`}
      aria-hidden="true"
    >
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[28px] border-white/10" />
      <div className="absolute -bottom-16 -left-12 h-52 w-52 rounded-full border-[38px] border-white/10" />
      <div className="absolute inset-x-7 top-7 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
        <span>Frontend One</span>
        <span>{post.category}</span>
      </div>
      <div className="absolute bottom-6 left-7 right-7 flex items-end justify-between">
        <span className={`${featured ? "text-8xl" : "text-6xl"} font-black leading-none tracking-[-0.08em] text-white/90`}>
          {post.number}
        </span>
        <span className="mb-1 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm">
          <ArrowIcon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Blog | Frontend One",
  description:
    "Practical notes on web development, interface design, accessibility, and learning in public.",
};

export default function BlogPage() {
  const [featuredPost, ...posts] = blogPosts;

  return (
    <div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <section className="relative isolate overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_20%,rgba(37,99,235,0.13),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(124,58,237,0.11),transparent_27%)] dark:bg-[radial-gradient(circle_at_8%_20%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(139,92,246,0.14),transparent_27%)]" />
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Ideas, notes &amp; lessons
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Learning out loud, one article at a time.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Practical notes from building for the web—from React and API design to accessible interfaces and better ways of working.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Featured</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Latest thinking</h2>
          </div>
          <span className="hidden text-sm text-zinc-500 sm:block dark:text-zinc-400">Updated twice a month</span>
        </div>

        <Link
          href={`/blogs/${featuredPost.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-2xl hover:shadow-zinc-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:grid-cols-[0.95fr_1.05fr] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950"
        >
          <ArticleVisual post={featuredPost} featured />
          <article className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {featuredPost.category}
              </span>
              <time dateTime={featuredPost.isoDate}>{featuredPost.date}</time>
              <span aria-hidden="true">·</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <h3 className="mt-6 text-3xl font-black leading-tight tracking-tight transition group-hover:text-blue-600 sm:text-4xl dark:group-hover:text-blue-400">
              {featuredPost.title}
            </h3>
            <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300">{featuredPost.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
              Read the article
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </article>
        </Link>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">The archive</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">More notes from the journey.</h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{blogPosts.length} articles and counting</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-zinc-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 dark:focus-visible:ring-offset-zinc-950"
              >
                <ArticleVisual post={post} />
                <article className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    <span className="uppercase tracking-wider text-blue-600 dark:text-blue-400">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold leading-snug transition group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <time dateTime={post.isoDate} className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</time>
                    <ArrowIcon className="h-4 w-4 text-blue-600 transition group-hover:translate-x-1 dark:text-blue-400" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-white sm:px-10 sm:py-14 dark:bg-black">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[45px] border-blue-500/20" />
          <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Keep the conversation going</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Building something interesting?</h2>
              <p className="mt-3 leading-7 text-zinc-400">I&apos;d love to hear about the problem you&apos;re solving or the lesson you&apos;re learning.</p>
            </div>
            <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">
              Start a conversation <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
