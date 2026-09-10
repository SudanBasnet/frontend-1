const eyebrowColors = {
  blue: "text-blue-600 dark:text-blue-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
};

export default function SectionHeading({
  eyebrow,
  children,
  accent = "blue",
  inverted = false,
  titleClassName = "",
}) {
  const eyebrowColor = inverted ? "text-blue-400" : eyebrowColors[accent];
  const titleColor = inverted ? "text-white" : "";

  return (
    <>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${titleColor} ${titleClassName}`.trim()}
      >
        {children}
      </h2>
    </>
  );
}
