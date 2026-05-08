import Link from "next/link";
import { Check, Zap, Crown, Star, Infinity } from "lucide-react";
import styles from "./page.module.css";

const plans = [
  {
    id: "free",
    name: "Kostenlos",
    price: "$0",
    period: "/für immer",
    desc: "",
    icon: <Star size={20} />,
    features: [
      "3 Meditationen pro Monat",
      "2 Stimmoptionen",
      "Grundlegende Absichten",
      "7-Tage-Archiv",
    ],
    cta: "Herabstufen",
    active: false,
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "9,99 $",
    period: "/Monat",
    desc: "",
    icon: <Zap size={20} />,
    features: [
      "Unbegrenzte Meditationen",
      "Alle Stimmoptionen",
      "Alle 8 Absichten",
      "Voller Archivzugang",
      "Statistiken & Analysen",
      "Priorisierte Erstellung",
    ],
    cta: "Plan verwalten",
    active: true,
    highlighted: true,
    badge: "AKTUELL"
  },
  {
    id: "premium",
    name: "Premium",
    price: "19,99 $",
    period: "/Jahr",
    desc: "",
    icon: <Crown size={20} />,
    features: [
      "Alles im Pro",
      "Eigene Stimme hochladen",
      "Erweiterte KI-Anpassung",
      "Gruppenmeditationen",
      "1-zu-1-Coaching",
      "Früher Zugang zu Funktionen",
    ],
    cta: "Upgrade",
    active: false,
    highlighted: false,
  },
];

export default function AbonnementPage() {
  return (
    <div className={styles.page}>
      <div className={styles.topLogo}>
        <img src="/logo.svg" alt="Visulara" className={styles.logoImg} />
      </div>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Ihr Abonnement</h1>
          <p className={styles.sub}>Entfesseln Sie die volle Frequenz des Kosmos. Wählen Sie die Reise, die mit Ihrer spirituellen Entwicklung in Resonanz steht.</p>
        </div>
      </div>

      {/* Current plan banner */}
      <div className={`${styles.currentBanner} glass-card`}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon}>
            <Zap size={24} fill="currentColor" />
          </div>
          <div className={styles.bannerInfo}>
            <div className={styles.bannerPlanRow}>
              <span className={styles.bannerPlanName}>Pro Plan</span>
              <span className={styles.activeBadgeSmall}>AKTIV</span>
            </div>
            <span className={styles.bannerPlanDetails}>9,99 $/Monat · Verlängert am 1. Mai 2026</span>
          </div>
        </div>
        
        <div className={styles.bannerRight}>
          <div className={styles.statsBox}>
            <div className={styles.statItem}>
              <Infinity size={18} className={styles.statIcon} />
              <span className={styles.statLabel}>Sitzungen</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>14</span>
              <span className={styles.statLabel}>Verbleibende Tage</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>
        <h2>Verfügbare Pläne</h2>
      </div>

      {/* Plans */}
      <div className={styles.plansGrid}>
        {plans.map((p) => (
          <div
            key={p.id}
            className={`${styles.planCard} glass-card ${p.highlighted ? styles.highlightedCard : ""} ${p.id === 'premium' ? styles.premiumCard : ""}`}
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIconWrapper} ${styles[p.id + 'Icon']}`}>
                {p.icon}
              </div>
              {p.badge && <span className={styles.currentPlanBadge}>{p.badge}</span>}
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.planName}>{p.name}</h3>
              <div className={styles.planPrice}>
                <span className={styles.priceAmount}>{p.price}</span>
                <span className={styles.pricePeriod}>{p.period}</span>
              </div>

              <ul className={styles.featureList}>
                {p.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <Check size={14} className={styles.checkIcon} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardFooter}>
              <button
                className={`${styles.planBtn} ${p.highlighted ? styles.btnPrimary : styles.btnSecondary}`}
              >
                {p.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
