import Link from "next/link";
import { Play, Clock, ArrowLeft, Headphones } from "lucide-react";
import styles from "./page.module.css";

const segments = [
  { label: "Einleitung & Ankommen", duration: "3 Min", color: "#f2ca50" },
  { label: "Atemübung", duration: "4 Min", color: "#7eb8c9" },
  { label: "Körper-Scan", duration: "6 Min", color: "#9b8fc7" },
  { label: "Geführte Visualisierung", duration: "8 Min", color: "#f2ca50" },
  { label: "Tiefe Entspannung", duration: "5 Min", color: "#7ec98a" },
  { label: "Sanftes Erwachen", duration: "3 Min", color: "#c9a07e" },
];

export default function MeditationStructurePage() {
  const totalMin = 29;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/meditation/startseite" className={styles.backBtn}>
          <ArrowLeft size={16} /> Zurück
        </Link>
        <h1 className={styles.title}>Deine Meditation</h1>
        <span className={styles.duration}><Clock size={14} />{totalMin} Min</span>
      </div>

      {/* Meta card */}
      <div className={`${styles.metaCard} glass-card`}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Absicht</span>
          <span className={styles.metaValue}>Tiefe Entspannung</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Stimme</span>
          <span className={styles.metaValue}>Alexander</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Klang</span>
          <span className={styles.metaValue}>Ozeanwellen</span>
        </div>
        <div className={styles.metaDivider} />
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Datum</span>
          <span className={styles.metaValue}>Heute</span>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>Struktur</h2>
        <div className={styles.timeline}>
          {segments.map((seg, i) => (
            <div key={i} className={styles.segment}>
              <div className={styles.segmentLine}>
                <div className={styles.segmentDot} style={{ background: seg.color }} />
                {i < segments.length - 1 && <div className={styles.segmentConnector} />}
              </div>
              <div className={`${styles.segmentCard} glass-card`}>
                <span className={styles.segmentNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.segmentLabel}>{seg.label}</span>
                <span className={styles.segmentDur}>{seg.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Play CTA */}
      <div className={styles.playSection}>
        <Link href="/meditation/meditation-structure/audioplayer" className={`${styles.playBtn} btn-primary`}>
          <Play size={20} fill="currentColor" />
          Jetzt abspielen
        </Link>
        <span className={styles.headphonesHint}>
          <Headphones size={14} /> Kopfhörer empfohlen für bestes Erlebnis
        </span>
      </div>
    </div>
  );
}
