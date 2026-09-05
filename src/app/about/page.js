import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { portfolioProjects } from "@/data/projects";
import { siteSeed } from "@/data/siteSeed";
import styles from "./about.module.css";

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

const principles = [
  {
    number: "01",
    title: "Clarity before complexity",
    description:
      "I begin by understanding the decision a screen needs to support, then make the path through it feel obvious.",
  },
  {
    number: "02",
    title: "Systems that stay flexible",
    description:
      "Reusable patterns matter when they make the product easier to change—not simply when they reduce lines of code.",
  },
  {
    number: "03",
    title: "Details that earn trust",
    description:
      "Responsive layouts, accessible controls, and honest loading, empty, and error states are part of the feature itself.",
  },
];

const workingRhythm = [
  {
    label: "Understand",
    description: "Map the people, constraints, data, and outcome before choosing the interface.",
  },
  {
    label: "Shape",
    description: "Turn the problem into focused flows and a visual system with a clear hierarchy.",
  },
  {
    label: "Build",
    description: "Develop the real states, connect the boundaries, and test the experience responsively.",
  },
  {
    label: "Refine",
    description: "Polish feedback, accessibility, performance, and the small details users feel immediately.",
  },
];

const { profile, services, currentFocus } = siteSeed;
const technologies = [...new Set(portfolioProjects.flatMap((project) => project.stack))];
const projectYears = portfolioProjects.map((project) => Number(project.year));
const timeline = `${Math.min(...projectYears)}—${Math.max(...projectYears)}`;
const selectedProjects = portfolioProjects.slice(0, 3);
const stats = [
  { value: portfolioProjects.length, label: "Case studies" },
  { value: blogPosts.length, label: "Published articles" },
  { value: technologies.length, label: "Technologies used" },
  { value: timeline, label: "Project timeline" },
];

export const metadata = {
  title: `About ${profile.name} | Frontend One`,
  description:
    "Meet the full-stack developer behind Frontend One and learn about the principles, tools, and process shaping the work.",
};

export default function AboutPage() {
  return (
    <div className={`${styles.page} overflow-hidden text-zinc-950 dark:text-white`}>
      <section className={styles.hero}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.17em] text-blue-700 backdrop-blur dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              About {profile.firstName}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              I make complex product ideas feel
              <span className={styles.gradientText}> clear and useful.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              I&apos;m {profile.name}, a {profile.role.toLowerCase()} who enjoys working across interface design, frontend systems, APIs, and data. I care about the point where thoughtful engineering becomes a calm, human experience.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950">
                See the work <ArrowIcon />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/75 px-5 py-3 text-sm font-bold text-zinc-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-zinc-100 dark:hover:border-blue-700 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950">
                Start a conversation
              </Link>
            </div>
          </div>

          <div className={styles.portraitStage} role="img" aria-label={`${profile.name}, ${profile.role}`}>
            <div className={styles.orbit} aria-hidden="true">
              <span>React</span>
              <span>Node.js</span>
              <span>Next.js</span>
            </div>
            <div className={styles.portraitCard}>
              <div className={styles.cardTopline}>
                <span>Frontend One</span>
                <span>Profile / 01</span>
              </div>
              <div className={styles.monogram} aria-hidden="true">{profile.initials}</div>
              <div className={styles.cardIdentity}>
                <div>
                  <p>{profile.name}</p>
                  <span>{profile.role}</span>
                </div>
                <span className={styles.statusDot} aria-hidden="true" />
              </div>
              <div className={styles.cardFooter}>
                <span>Design</span>
                <span>Development</span>
                <span>Direction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Portfolio overview" className={styles.statsSection}>
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">The perspective</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Useful before impressive.</h2>
          </div>
          <div>
            <p className="text-xl font-semibold leading-8 tracking-tight text-zinc-800 sm:text-2xl sm:leading-9 dark:text-zinc-100">
              Good digital products reduce uncertainty. They help someone understand where they are, what matters, and what happens next.
            </p>
            <div className="mt-8 grid gap-6 text-base leading-7 text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
              <p>
                That is why I like working across the stack. Seeing the interface, API, and data model as one connected system makes it easier to build experiences that stay coherent beyond the happy path.
              </p>
              <p>
                I aim for work that feels considered without feeling complicated: clear hierarchy, resilient components, accessible interactions, and feedback that earns the user&apos;s confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.number} className={styles.principleCard}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capabilitiesSection}>
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Across the stack</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">From first interaction to dependable data.</h2>
              <p className="mt-5 max-w-lg leading-7 text-zinc-400">
                I combine product thinking, interface craft, and practical engineering so fewer important decisions get lost between disciplines.
              </p>

              <div className={styles.techCloud} aria-label="Technologies represented in the portfolio">
                {technologies.map((technology, index) => (
                  <span key={technology}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.servicesList}>
              {services.map((service) => (
                <article key={service.number}>
                  <span>{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <ArrowIcon className="h-5 w-5" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Working rhythm</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">A practical path from ambiguity to something people can use.</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Explore the outcomes <ArrowIcon />
          </Link>
        </div>

        <ol className={styles.rhythmList}>
          {workingRhythm.map((step, index) => (
            <li key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.focusSection}>
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Right now</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Still learning, making, and refining.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-zinc-600 lg:justify-self-end dark:text-zinc-300">
              The tools change quickly. The useful habit is staying curious about better ways to communicate, build, and solve the problem in front of you.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {currentFocus.map((item, index) => (
              <article key={item.label} className={styles.focusCard}>
                <div>
                  <span className={item.accent} aria-hidden="true" />
                  <small>0{index + 1}</small>
                </div>
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
                <footer>{item.detail}</footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Work in practice</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">The principles, applied to real product problems.</h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400">
            All case studies <ArrowIcon />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {selectedProjects.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className={styles.projectCard}>
              <div className={`bg-gradient-to-br ${project.gradient}`}>
                <span>{project.number}</span>
                <strong>{project.metric}</strong>
                <small>{project.metricLabel}</small>
              </div>
              <article>
                <p>{project.category} · {project.year}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
                <footer>Read case study <ArrowIcon /></footer>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className={styles.cta}>
          <div aria-hidden="true" />
          <p>Have a thoughtful problem to solve?</p>
          <h2>Let&apos;s make the complicated part feel simple.</h2>
          <span>
            I&apos;m always happy to discuss a project, collaboration, or interesting product challenge.
          </span>
          <Link href="/contact">
            Start a conversation <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}
