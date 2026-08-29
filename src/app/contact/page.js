const contactDetails = [
  {
    title: "Tell me about the idea",
    description:
      "Share the problem, your goals, and what a successful result looks like.",
  },
  {
    title: "Add the useful details",
    description:
      "A rough timeline, project stage, and any helpful links are a great start.",
  },
  {
    title: "Expect a thoughtful reply",
    description:
      "I will review the context and respond with clear questions and next steps.",
  },
];

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className="h-4 w-4"
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
  title: "Contact | Frontend One",
  description:
    "Start a conversation about a web project, collaboration, or new opportunity.",
};

export default function ContactPage() {
  return (
    <div className="relative flex flex-1 overflow-hidden bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(37,99,235,0.14),transparent_26%),radial-gradient(circle_at_90%_75%,rgba(124,58,237,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_10%_15%,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_90%_75%,rgba(139,92,246,0.16),transparent_28%)]"
      />

      <section className="relative mx-auto grid w-full max-w-6xl items-start gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
        <div className="lg:sticky lg:top-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open to new projects
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
            Start a conversation
          </p>
          <h1 className="mt-3 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">
            Let&apos;s build something
            <span className="text-blue-600 dark:text-blue-400"> useful.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Have a project in mind, a tricky problem to solve, or simply want to
            connect? Send a few details and let&apos;s see where the idea can go.
          </p>

          <ol className="mt-10 space-y-6">
            {contactDetails.map((detail, index) => (
              <li key={detail.title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-blue-200 bg-blue-50 text-xs font-black text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-bold text-zinc-900 dark:text-white">
                    {detail.title}
                  </h2>
                  <p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {detail.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[2rem] border border-zinc-200 bg-white/90 p-5 shadow-2xl shadow-zinc-900/10 backdrop-blur sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-black/30">
          <div className="flex flex-col gap-3 border-b border-zinc-200 pb-7 sm:flex-row sm:items-end sm:justify-between dark:border-zinc-800">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Project enquiry
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                What can I help with?
              </h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              All fields are required
            </p>
          </div>

          <form className="mt-7 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Your name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
                />
              </label>

              <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Subject
              <input
                type="text"
                name="subject"
                required
                placeholder="A new website, dashboard, or collaboration"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
              />
            </label>

            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Project details
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Tell me what you are building, where you are in the process, and what support you need."
                className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600"
              />
            </label>

            <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
              <p className="max-w-xs text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                This form is ready for message-service integration. Submission
                is not connected yet.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                Send message
                <ArrowIcon />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
