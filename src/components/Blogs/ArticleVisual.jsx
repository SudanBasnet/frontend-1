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

export default function ArticleVisual({ post, featured = false }) {
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
