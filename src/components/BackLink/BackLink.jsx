import Link from "next/link";
import ArrowIcon from "@/components/Icons/ArrowIcon";

export default function BackLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
    >
      <ArrowIcon className="h-4 w-4 rotate-180" />
      {children}
    </Link>
  );
}
