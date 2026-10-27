import Link from "next/link";
import ArrowIcon from "@/components/Icons/ArrowIcon";

export default function SectionLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400"
    >
      {children} <ArrowIcon />
    </Link>
  );
}
