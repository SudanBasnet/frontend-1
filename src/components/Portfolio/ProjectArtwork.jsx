export default function ProjectArtwork({ project, featured = false }) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-gradient-to-br ${project.gradient} ${
        featured ? "min-h-80 lg:min-h-full" : "h-64"
      }`}
      aria-hidden="true"
    >
      <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border-[36px] border-white/10" />
      <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[42px] border-white/10" />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 sm:inset-x-7 sm:top-7">
        <span>Project {project.number}</span>
        <span>{project.year}</span>
      </div>

      <div className={`absolute inset-x-5 bottom-5 overflow-hidden rounded-2xl border border-white/25 bg-zinc-950/20 p-4 shadow-2xl backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5 ${featured ? "top-20" : "top-16"}`}>
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            <span className="h-2 w-2 rounded-full bg-white/40" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </div>
          <span className="h-1.5 w-16 rounded-full bg-white/25" />
        </div>
        <div className="grid h-[calc(100%-26px)] grid-cols-[54px_1fr] gap-4 pt-4">
          <div className="space-y-3 border-r border-white/20 pr-3">
            <span className="block h-8 w-8 rounded-lg bg-white/90" />
            {["w-full", "w-3/4", "w-full"].map((width, index) => (
              <span key={index} className={`block h-1.5 rounded-full bg-white/30 ${width}`} />
            ))}
          </div>
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <span className="block h-2 w-20 rounded-full bg-white/35" />
              <span className="mt-2 block h-4 w-3/5 rounded-full bg-white/80" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white/15 p-3">
                <span className="block text-xl font-black text-white">{project.metric}</span>
                <span className="mt-1 block truncate text-[8px] text-white/65">{project.metricLabel}</span>
              </div>
              <div className="flex items-end gap-1 rounded-lg bg-white/85 p-3">
                {[45, 75, 58, 90].map((height, index) => (
                  <span key={index} className="flex-1 rounded-sm bg-zinc-950/20" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
