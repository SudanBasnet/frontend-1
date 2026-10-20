export default function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <circle
        cx="8.75"
        cy="8.75"
        r="5.75"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m13 13 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
