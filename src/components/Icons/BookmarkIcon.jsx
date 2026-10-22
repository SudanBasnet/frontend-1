export default function BookmarkIcon({
  filled = false,
  outlined = true,
  className = "size-4",
}) {
  const outlineProps = outlined
    ? {
        stroke: "currentColor",
        strokeWidth: "1.6",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }
    : {};

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      className={className}
    >
      <path d="M5 3.5h10v13l-5-3-5 3v-13Z" {...outlineProps} />
    </svg>
  );
}
