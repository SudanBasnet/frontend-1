import Link from "next/link";
import { portfolioProjects } from "@/data/projects";
import styles from "./FloatingPortfolioSpheres.module.css";

const featuredProjects = portfolioProjects.slice(0, 2);

const ArrowUpRightIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className={styles.arrow}
  >
    <path
      d="M6 14 14 6m-6 0h6v6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function FloatingPortfolioSpheres() {
  return (
    <nav className={styles.cluster} aria-label="Quick portfolio links">
      <ul className={styles.list}>
        {featuredProjects.map((project, index) => (
          <li
            key={project.slug}
            className={`${styles.item} ${styles[`project${index + 1}`]}`}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              className={`${styles.sphere} ${styles.projectSphere}`}
              aria-label={`View ${project.title} case study`}
            >
              <span className={styles.shine} aria-hidden="true" />
              <span className={styles.projectNumber} aria-hidden="true">
                {project.number}
              </span>
            </Link>
            <span className={styles.tooltip} aria-hidden="true">
              {project.title}
            </span>
          </li>
        ))}

        <li className={`${styles.item} ${styles.primary}`}>
          <Link href="/portfolio" className={`${styles.sphere} ${styles.primarySphere}`}>
            <span className={styles.shine} aria-hidden="true" />
            <span className={styles.kicker}>View my</span>
            <span className={styles.title}>Portfolio</span>
            <ArrowUpRightIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
