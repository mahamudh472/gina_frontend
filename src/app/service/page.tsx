import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mic, Volume2, Headphones, Play } from "lucide-react";
import styles from "./page.module.css";

const voices = [
  {
    name: "Alexander",
    desc: "Tief, erdend, resonant",
    tags: ["Warm", "Beständig", "Zentriert"],
    emoji: "🧘‍♂️",
    color: "rgba(139,155,180,0.15)",
    qualities: ["Ideal für tiefe Entspannung", "Führt durch Bodyscans", "Stärkt Fokus & Klarheit"],
  },
  {
    name: "Serena",
    desc: "Sanft, beruhigend, fürsorglich",
    tags: ["Sanft", "Fließend", "Weitreichend"],
    emoji: "🌸",
    color: "rgba(201,160,220,0.15)",
    qualities: ["Ideal für Selbstliebe", "Begleitet Einschlafmeditationen", "Öffnet das Herz"],
  },
];

export default function ServicePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={`${styles.heroContent} container`}>
            <span className="badge"><Mic size={12} />Himmlische Stimmen</span>
            <h1 className={styles.heroTitle}>
              Die Stimmen, die deine
              <br /><span className={styles.heroAccent}>Reise begleiten</span>
            </h1>
            <p className={styles.heroSub}>
              Jede Stimme ist sorgfältig ausgewählt, um deine Meditationsreise zu unterstützen.
              Finde die Stimme, die mit dir resoniert.
            </p>
          </div>
        </section>

        {/* Voices */}
        <section className={styles.voicesSection}>
          <div className="container">
            <div className={styles.voicesGrid}>
              {voices.map((v, i) => (
                <div key={i} className={`${styles.voiceCard} glass-card`}>
                  <div className={styles.voiceTop} style={{ background: v.color }}>
                    <span className={styles.voiceEmoji}>{v.emoji}</span>
                    <button className={styles.playBtn} aria-label={`${v.name} Vorschau`}>
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                  <div className={styles.voiceBody}>
                    <h2 className={styles.voiceName}>{v.name}</h2>
                    <p className={styles.voiceDesc}>{v.desc}</p>
                    <div className={styles.voiceTags}>
                      {v.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                    <ul className={styles.qualities}>
                      {v.qualities.map((q) => <li key={q} className={styles.quality}>✦ {q}</li>)}
                    </ul>
                    <Link href="/meditation/neue-meditation" className="btn-primary" style={{ marginTop: "8px" }}>
                      Mit {v.name} meditieren
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sound Environments */}
        <section className={styles.soundsSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className="badge"><Volume2 size={12} />Klanglandschaften</span>
              <h2 className={styles.sectionTitle}>Atmosphären für jede Reise</h2>
              <p className={styles.sectionSub}>Wähle aus einer Vielzahl atmosphärischer Klangteppiche.</p>
            </div>
            <div className={styles.soundsGrid}>
              {["🌊 Ozeanwellen", "🌲 Waldgeräusche", "🌧️ Regen", "🔥 Kaminfeuer", "🎵 Binaural Beats", "🌌 Kosmisch"].map((s) => (
                <div key={s} className={`${styles.soundCard} glass-card`}>
                  <Headphones size={20} className={styles.soundIcon} />
                  <span className={styles.soundLabel}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
