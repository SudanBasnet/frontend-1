const variants = {
  border:
    "border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300",
  muted:
    "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  surface:
    "border border-zinc-300 bg-white/60 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300",
};

const sizes = {
  compact: "px-2.5 py-1 text-[11px]",
  medium: "px-3 py-1.5 text-xs",
};

export default function ProjectStack({
  items,
  variant = "muted",
  size = "compact",
  className = "",
}) {
  const itemClassName = variants[variant] ?? variants.muted;
  const sizeClassName = sizes[size] ?? sizes.compact;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technology stack">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full font-semibold ${sizeClassName} ${itemClassName}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
