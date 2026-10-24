const accentColors = {
  blue: "text-blue-600 dark:text-blue-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  muted: "text-zinc-500 dark:text-zinc-400",
};

export default function Eyebrow({
  children,
  accent = "blue",
  inverted = false,
  className = "",
}) {
  const color = inverted ? "text-blue-400" : accentColors[accent];

  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] ${color} ${className}`.trim()}
    >
      {children}
    </p>
  );
}
