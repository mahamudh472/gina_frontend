import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function StartseitePage() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.content}>
        {/* Center Logo */}
        <div className={styles.logoWrapper}>
          <Image 
            src="/logo-visulara.svg" 
            alt="Visulara Logo" 
            width={200} 
            height={60} 
            className={styles.logo}
          />
        </div>

        {/* Badge */}
        <div className={styles.badge}>
          ✨ KI-GESTÜTZTE MEDITATION
        </div>

        {/* Heading */}
        <h1 className={styles.title}>
          Entfalte dein Potenzial mit deiner individuellen Meditation
        </h1>

        {/* Description */}
        <p className={styles.description}>
          Erstelle deine Meditation in vier Schritten. Persönlich, eindringlich und genau auf deine Seelenreise zugeschnitten.
        </p>

        {/* Steps Indicator */}
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <span className={styles.stepText}>Absicht</span>
            <span className={styles.stepArrow}>›</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <span className={styles.stepText}>Stimme</span>
            <span className={styles.stepArrow}>›</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <span className={styles.stepText}>Erfahrung</span>
            <span className={styles.stepArrow}>›</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>4</span>
            <span className={styles.stepText}>Erzeugen</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/meditation/neue-meditation" className={styles.ctaButton}>
          Meine Meditation starten
        </Link>

        {/* Footer Text */}
        <p className={styles.footerText}>
          Kein Konto erforderlich · Kostenlos testen
        </p>
      </div>
    </div>
  );
}
