import Eyebrow from "@/components/Eyebrow/Eyebrow";

export default function SectionHeading({
  eyebrow,
  children,
  accent = "blue",
  inverted = false,
  titleClassName = "",
}) {
  const titleColor = inverted ? "text-white" : "";

  return (
    <>
      <Eyebrow accent={accent} inverted={inverted}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${titleColor} ${titleClassName}`.trim()}
      >
        {children}
      </h2>
    </>
  );
}
