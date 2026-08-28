"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/components/Layout/navigationLinks";
import styles from "./FloatingNavigation.module.css";

function NavigationIcon({ name }) {
  const paths = {
    home: (
      <>
        <path d="m3 9 7-6 7 6" />
        <path d="M5 8.5V17h10V8.5M8 17v-5h4v5" />
      </>
    ),
    about: (
      <>
        <circle cx="10" cy="6.25" r="3" />
        <path d="M4.5 17c.55-3.2 2.38-4.8 5.5-4.8s4.95 1.6 5.5 4.8" />
      </>
    ),
    portfolio: (
      <>
        <rect x="2.75" y="5.5" width="14.5" height="10.75" rx="2" />
        <path d="M7 5.5V4.25c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5V5.5M2.75 10h14.5M8.5 10h3" />
      </>
    ),
    blogs: (
      <>
        <path d="M4 3.25h9.25A2.75 2.75 0 0 1 16 6v10.75H6.75A2.75 2.75 0 0 1 4 14V3.25Z" />
        <path d="M4 14c0-1.52 1.23-2.75 2.75-2.75H16M7.25 6.5h5.5" />
      </>
    ),
    contact: (
      <>
        <rect x="2.5" y="4" width="15" height="12" rx="2" />
        <path d="m3.5 5 6.5 5 6.5-5" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={styles.icon}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </g>
    </svg>
  );
}

export default function FloatingNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.dock} aria-label="Floating navigation">
      <ul className={styles.list}>
        {navigationLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(`${link.href}/`));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <NavigationIcon name={link.icon} />
                <span className={styles.label}>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
