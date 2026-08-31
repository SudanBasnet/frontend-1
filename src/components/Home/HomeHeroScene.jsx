"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./HomeHeroScene.module.css";

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
    <path
      d="M6 14 14 6m-6 0h6v6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HomeHeroScene({ project }) {
  const sceneRef = useRef(null);

  const handlePointerMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = sceneRef.current;
    if (!scene) return;

    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    scene.style.setProperty("--scene-rotate-x", `${(0.5 - y) * 9}deg`);
    scene.style.setProperty("--scene-rotate-y", `${(x - 0.5) * 12}deg`);
    scene.style.setProperty("--scene-light-x", `${x * 100}%`);
    scene.style.setProperty("--scene-light-y", `${y * 100}%`);
  };

  const resetScene = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    scene.style.setProperty("--scene-rotate-x", "0deg");
    scene.style.setProperty("--scene-rotate-y", "0deg");
    scene.style.setProperty("--scene-light-x", "50%");
    scene.style.setProperty("--scene-light-y", "50%");
  };

  return (
    <div
      ref={sceneRef}
      className={styles.scene}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetScene}
    >
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.stage}>
        <div className={styles.orbitSystem} aria-hidden="true">
          <span className={`${styles.orbit} ${styles.orbitOne}`} />
          <span className={`${styles.orbit} ${styles.orbitTwo}`} />
          <span className={`${styles.planet} ${styles.planetOne}`} />
          <span className={`${styles.planet} ${styles.planetTwo}`} />
          <span className={`${styles.planet} ${styles.planetThree}`} />
        </div>

        <div className={styles.deviceShadow} aria-hidden="true" />
        <article className={styles.device}>
          <div className={styles.deviceBar}>
            <div className={styles.trafficLights} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className={styles.address}>portfolio / {project.slug}</span>
            <span className={styles.liveDot} aria-label="Project is live">
              live
            </span>
          </div>

          <div className={styles.interface}>
            <aside className={styles.sidebar} aria-label="Project preview navigation">
              <span className={styles.brandMark}>{project.number}</span>
              <span className={styles.navLineWide} />
              <span />
              <span className={styles.navLineShort} />
              <span />
            </aside>

            <div className={styles.content}>
              <div className={styles.projectMeta}>
                <p>{project.category}</p>
                <span>{project.year}</span>
              </div>
              <h2>{project.title}</h2>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.metrics}>
                <div>
                  <span>Technologies</span>
                  <strong>{project.stack.length}</strong>
                </div>
                <div>
                  <span>Outcomes</span>
                  <strong>{project.outcomes.length}</strong>
                </div>
              </div>

              <div className={styles.stack}>
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <Link href={`/portfolio/${project.slug}`} className={styles.projectLink}>
                Open case study
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </article>

        <div className={`${styles.floatCard} ${styles.metricCard}`} aria-hidden="true">
          <span>Impact</span>
          <strong>{project.metric}</strong>
          <small>{project.metricLabel}</small>
        </div>

        <div className={`${styles.floatCard} ${styles.statusCard}`} aria-hidden="true">
          <span className={styles.pulse} />
          System online
        </div>
      </div>
      <p className={styles.hint}>Move to explore the scene</p>
    </div>
  );
}
