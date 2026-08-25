import Link from "next/link";
import ThemeSwitcher from "@/components/Layout/ThemeSwitcher";
import SessionControls from "@/components/Layout/SessionControls";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          Frontend One
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950"
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
