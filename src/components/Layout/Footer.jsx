import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-zinc-400">
        <p>
          &copy; {new Date().getFullYear()} Frontend One. All rights reserved.
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link
                href="/about"
                className="transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
