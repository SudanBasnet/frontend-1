import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blogPosts";
import { siteSeed } from "@/data/siteSeed";

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

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Article not found | Frontend One" };
  }

  return {
    title: `${post.title} | Frontend One`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <article className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <header className="relative isolate overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_15%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_88%_76%,rgba(124,58,237,0.11),transparent_25%)] dark:bg-[radial-gradient(circle_at_14%_15%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_88%_76%,rgba(139,92,246,0.14),transparent_25%)]" />
        <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
            <ArrowIcon className="h-4 w-4 rotate-180" />
            All articles
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full bg-blue-100 px-3 py-1.5 text-blue-700 dark:bg-blue-950 dark:text-blue-300">{post.category}</span>
            <time dateTime={post.isoDate}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] sm:text-6xl">{post.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl dark:text-zinc-300">{post.excerpt}</p>

          <div className="mt-10 flex items-center gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-black text-white">{siteSeed.profile.initials}</span>
            <div>
              <p className="text-sm font-bold">{siteSeed.profile.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{siteSeed.profile.role}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-xl font-medium leading-9 text-zinc-700 sm:text-2xl sm:leading-10 dark:text-zinc-200">{post.introduction}</p>

        <div className="mt-12 space-y-12">
          {post.sections.map((section, index) => (
            <section key={section.heading}>
              <div className="mb-5 flex items-start gap-4">
                <span className="mt-1 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">0{index + 1}</span>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{section.heading}</h2>
              </div>
              <div className="space-y-5 pl-0 text-base leading-8 text-zinc-600 sm:pl-9 sm:text-lg dark:text-zinc-300">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-14 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8 dark:border-blue-900 dark:bg-blue-950/40">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">The takeaway</p>
          <p className="mt-3 text-lg font-bold leading-8 text-zinc-900 dark:text-white">{post.takeaway}</p>
        </aside>

        <div className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Read next</p>
          <Link href={`/blogs/${nextPost.slug}`} className="group mt-4 flex items-start justify-between gap-6 rounded-2xl border border-zinc-200 p-6 transition hover:border-blue-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-blue-800 dark:hover:bg-zinc-900/60">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{nextPost.category} · {nextPost.readTime}</span>
              <h2 className="mt-2 text-xl font-bold leading-snug transition group-hover:text-blue-600 sm:text-2xl dark:group-hover:text-blue-400">{nextPost.title}</h2>
            </div>
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
