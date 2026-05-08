"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X, Wind, Heart, Zap, Star, Shield, Flame, RefreshCw, Sunset, Play, Loader2 } from "lucide-react";
import styles from "./page.module.css";

// ─── Step data ───────────────────────────────────────────────────────────────
const INTENTIONS = [
  { id: "entspannung", label: "Entspannung", sub: "Spanne ab und finde Frieden", img: "/intention-1.svg" },
  { id: "selbstliebe", label: "Selbstliebe", sub: "Umarme dein inneres Licht", img: "/intention-2.svg" },
  { id: "fokus", label: "Fokus & Klarheit", sub: "Schärfe deinen Geist", img: "/intention-3.svg" },
  { id: "dankbarkeit", label: "Dankbarkeit", sub: "Öffne dein Herz mit Dank", img: "/intention-4.svg" },
  { id: "vertrauen", label: "Vertrauen", sub: "Loslassen & Hingabe", icon: Shield },
  { id: "energie", label: "Energie", sub: "Entfache dein inneres Feuer", icon: Flame },
  { id: "transformation", label: "Transformation", sub: "Entwickle dich über Grenzen", icon: RefreshCw },
  { id: "frieden", label: "Innerer Frieden", sub: "Zur Ruhe zurückkehren", icon: Sunset },
];

const VOICES = [
  { id: "alexander", name: "Alexander", desc: "Tief, erdend, resonant", tags: ["Warm", "Beständig", "Zentriert"], img: "/voice-alexander.svg", label: "Männliche Stimme" },
  { id: "serena", name: "Serena", desc: "Sanft, beruhigend, fürsorglich", tags: ["Sanft", "Fließend", "Weitreichend"], img: "/voice-serena.svg", label: "Weibliche Stimme" },
];

const TENSION_SPOTS = ["Kiefer & Gesicht", "Schultern & Nacken", "Brust & Herz", "Unterer Rücken", "Hände & Arme"];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
  const steps = ["1. Intention", "2. Stimme", "3. Erlebnis", "4. Generieren"];
  return (
    <div className={styles.stepBarWrap}>
      <div className={styles.stepPills}>
        {steps.map((s, i) => (
          <button key={i} className={`${styles.stepPill} ${i === current ? styles.stepActive : ""} ${i < current ? styles.stepDone : ""}`} disabled>
            {s}
          </button>
        ))}
      </div>
      <div className={styles.stepDots}>
        {steps.map((_, i) => (
          <span key={i} className={`step-dot ${i === current ? "active" : ""} ${i < current ? "completed" : ""}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Intention ────────────────────────────────────────────────────────
function StepIntention({ selected, onSelect, onNext }: { selected: string; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Wahle deine Absicht</h2>
      <p className={styles.stepSub}>Wähle das Thema, das heute mit dir mitschwingt.</p>
      <div className={styles.intentionGrid}>
        {INTENTIONS.map((item) => {
          const { id, label, sub, img, icon: Icon } = item as any;
          return (
            <button
              key={id}
              className={`${styles.intentionCard} glass-card ${selected === id ? styles.intentionSelected : ""}`}
              onClick={() => onSelect(id)}
            >
              <div className={styles.intentionIcon}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" style={{ width: "24px", height: "24px" }} />
                ) : (
                  Icon && <Icon size={22} />
                )}
              </div>
              <span className={styles.intentionLabel}>{label}</span>
              <span className={styles.intentionSub}>{sub}</span>
            </button>
          );
        })}
      </div>
      <button className="btn-primary" onClick={onNext} disabled={!selected} style={{ marginTop: "32px" }}>
        Erzeuge deine Meditation
      </button>
      <p className={styles.noteText}>Kein Konto erforderlich · Kostenlos testen</p>
    </div>
  );
}

// ─── Step 2: Voice ────────────────────────────────────────────────────────────
function StepVoice({ selected, onSelect, onNext }: { selected: string; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Gib deinen Worten mehr Tiefe</h2>
      <p className={styles.stepSub}>Wähle die Stimme, die deine Meditationsreise begleitet.</p>
      <div className={styles.voicesRow}>
        {VOICES.map((v) => (
          <button
            key={v.id}
            className={`${styles.voiceCard} glass-card ${selected === v.id ? styles.voiceSelected : ""}`}
            onClick={() => onSelect(v.id)}
          >
            <button className={styles.playPreview} aria-label="Vorschau" onClick={(e) => e.stopPropagation()}>
              <Play size={16} fill="currentColor" />
            </button>
            <div className={styles.voiceAvatar}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.img} alt={v.name} className={styles.avatarImg} />
            </div>
            <span className={styles.voiceLabel}>{v.label}</span>
            <h3 className={styles.voiceName}>{v.name}</h3>
            <p className={styles.voiceDesc}>{v.desc}</p>
            <div className={styles.voiceTags}>
              {v.tags.map((t) => <span key={t} className={styles.voiceTag}>{t}</span>)}
            </div>
          </button>
        ))}
      </div>
      <button className="btn-secondary" onClick={onNext} disabled={!selected} style={{ marginTop: "32px" }}>
        Weiter
      </button>
    </div>
  );
}

// ─── Step 3: Experience ───────────────────────────────────────────────────────
function StepExperience({ onNext }: { onNext: () => void }) {
  const [tension, setTension] = useState<string[]>([]);

  const toggleTension = (spot: string) => {
    setTension((prev) => prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]);
  };

  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Vertiefe dein Erlebnis</h2>
      <p className={styles.stepSub}>Beantworte ein paar Fragen, um deine Reise zu personalisieren.</p>

      <div className={styles.formFields}>
        <div className={`${styles.fieldCard} glass-card`}>
          <label className={styles.fieldLabel}>Wie fühlst du dich heute?</label>
          <input className={styles.fieldInput} type="text" placeholder="z.B. erschöpft, ruhelos, angespannt" />
        </div>
        <div className={`${styles.fieldCard} glass-card`}>
          <label className={styles.fieldLabel}>Was möchtest du mit dieser Meditation vertiefen?</label>
          <input className={styles.fieldInput} type="text" placeholder="z.B. leichter fühlen, tiefer entspannen" />
        </div>
        <div className={`${styles.fieldCard} glass-card`}>
          <label className={styles.fieldLabel}>Was soll heute draußen bleiben?</label>
          <input className={styles.fieldInput} type="text" placeholder="z.B. Stress, Sorgen, Prüfungsangst" />
        </div>
        <div className={`${styles.fieldCard} glass-card`}>
          <label className={styles.fieldLabel}>Wo spürst du Spannung in deinem Körper?</label>
          <div className={styles.tensionPills}>
            {TENSION_SPOTS.map((spot) => (
              <button
                key={spot}
                className={`${styles.tensionPill} ${tension.includes(spot) ? styles.tensionActive : ""}`}
                onClick={() => toggleTension(spot)}
              >
                {spot}
              </button>
            ))}
          </div>
        </div>
        <div className={`${styles.fieldCard} glass-card`}>
          <label className={styles.fieldLabel}>Dein akustischer Entspannungsanker</label>
          <input className={styles.fieldInput} type="text" placeholder="z.B. Regen, Meeresrauschen, Stille" />
        </div>
      </div>

      <button className="btn-primary" onClick={onNext} style={{ marginTop: "24px" }}>
        Weiter
      </button>
    </div>
  );
}

// ─── Step 4: Generate ─────────────────────────────────────────────────────────
function StepGenerate() {
  return (
    <div className={styles.stepContent} style={{ alignItems: "center", textAlign: "center" }}>
      <div className={styles.generateOrb}>
        <Loader2 size={40} className={styles.spinIcon} />
      </div>
      <h2 className={styles.stepTitle}>Deine Meditation entsteht...</h2>
      <p className={styles.stepSub}>Die KI erschafft gerade eine einzigartige Meditation nur für dich.</p>
      <div className={styles.generateProgress}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
        <span className={styles.progressLabel}>KI analysiert deine Absichten...</span>
      </div>
      <Link href="/meditation/meditation-structure" className="btn-primary" style={{ marginTop: "32px" }}>
        Meditation abspielen
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NeueMeditationPage() {
  const [step, setStep] = useState(0);
  const [intention, setIntention] = useState("");
  const [voice, setVoice] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 3));

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.logoLink}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="VISULARA" style={{ height: "24px", width: "auto" }} />
        </Link>
      </div>

      {/* Wizard bar */}
      <div className={styles.wizardHeader}>
        <button className={styles.backBtn} onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0}>
          <ArrowLeft size={16} /> Zurück
        </button>
        <StepBar current={step} />
        <Link href="/meditation/startseite" className={styles.closeBtn} aria-label="Schließen">
          <X size={18} />
        </Link>
      </div>

      {/* Step content */}
      <div className={styles.content}>
        {step === 0 && <StepIntention selected={intention} onSelect={setIntention} onNext={next} />}
        {step === 1 && <StepVoice selected={voice} onSelect={setVoice} onNext={next} />}
        {step === 2 && <StepExperience onNext={next} />}
        {step === 3 && <StepGenerate />}
      </div>
    </div>
  );
}
