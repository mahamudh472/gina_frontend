"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Play, Clock, Calendar, Bookmark } from "lucide-react";
import styles from "./page.module.css";

const meditations = [
  { 
    title: "Fokus & Flow-Zustand", 
    category: "Fokus & Klarheit", 
    duration: "18:00", 
    date: "11. Apr. 2026", 
    voice: "Serena",
    color: "#7eb8c9",
    bookmarked: true
  },
  { 
    title: "Herzöffnung der Dankbarkeit", 
    category: "Dankbarkeit", 
    duration: "22:00", 
    date: "9. Apr. 2026", 
    voice: "Serena",
    color: "#7ec98a",
    bookmarked: false
  },
  { 
    title: "Stille im Abendlicht", 
    category: "Tiefe Ruhe", 
    duration: "21:10", 
    date: "7. Apr. 2026", 
    voice: "Maya",
    color: "#f2ca50",
    bookmarked: true
  },
  { 
    title: "Morgenklarheit", 
    category: "Klarheit", 
    duration: "06:45", 
    date: "5. Apr. 2026", 
    voice: "Noah",
    color: "#7eb8c9",
    bookmarked: false
  },
  { 
    title: "Selbstmitgefühl aktivieren", 
    category: "Selbstliebe", 
    duration: "19:20", 
    date: "3. Apr. 2026", 
    voice: "Lea",
    color: "#c9a0dc",
    bookmarked: false
  },
  { 
    title: "Sonnenatem im Herzen", 
    category: "Herzensraum", 
    duration: "08:30", 
    date: "1. Apr. 2026", 
    voice: "Jonas",
    color: "#7ec98a",
    bookmarked: true
  }
];

export default function ArchivPage() {
  const [activeFilter, setActiveFilter] = useState("Alle");

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meditationsarchiv</h1>
        <p className={styles.sub}>
          {meditations.length} Sitzungen · {meditations.filter(m => m.bookmarked).length} markiert
        </p>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchWrap}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            className={styles.searchInput} 
            type="text" 
            placeholder="Suchen nach Titeln, Inhalten oder Themen..." 
          />
        </div>
        
        <div className={styles.filters}>
          {["Alle", "Gespeichert"].map((f) => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {meditations.map((m, i) => (
          <div key={i} className={styles.card}>
            <Bookmark 
              size={20} 
              className={styles.bookmarkBtn} 
              fill={m.bookmarked ? "currentColor" : "none"} 
              style={{ color: m.bookmarked ? "#f2ca50" : "rgba(255, 255, 255, 0.4)" }}
            />
            
            <div className={styles.cardHeader}>
              <div className={styles.dotCircle}>
                <div className={styles.statusDot} style={{ background: m.color }} />
              </div>
              <h3 className={styles.cardTitle}>{m.title}</h3>
            </div>

            <div className={styles.cardTags}>
              <span className={styles.tag}>{m.category}</span>
            </div>

            <div className={styles.cardMeta}>
              <div className={styles.metaItem}>
                <Calendar size={14} />
                <span>{m.date}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={14} />
                <span>{m.duration}</span>
              </div>
              <div className={styles.metaSpacer} />
              <span className={styles.metaVoice}>{m.voice}</span>
            </div>

            <Link href="/meditation/meditation-structure/audioplayer" className={styles.playBtn}>
              <Play size={18} fill="currentColor" />
              Nochmals abspielen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
