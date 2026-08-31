import Link from "next/link";
import ThemeSwitcher from "@/components/Layout/ThemeSwitcher";
import SessionControls from "@/components/Layout/SessionControls";
import { navigationLinks } from "@/components/Layout/navigationLinks";
import styles from "./LayoutChrome.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`${styles.brand} text-xl font-bold tracking-tight text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:text-white dark:focus-visible:ring-offset-zinc-950`}
        >
          <span className={styles.brandMark} aria-hidden="true">F1</span>
          Frontend One
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <SessionControls />
        </div>
      </div>
    </header>
  );
}
