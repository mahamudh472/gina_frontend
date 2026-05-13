"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X, Shield, Flame, RefreshCw, Sunset, Play, Loader2 } from "lucide-react";

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
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5 flex-wrap justify-center">
        {steps.map((s, i) => (
          <button 
            key={i} 
            className={`px-4.5 py-1.75 rounded-pill bg-white/6 border border-border text-[0.825rem] font-medium cursor-default transition-all duration-300 ${i === current ? "bg-accent border-accent text-[#0b0f17] font-bold" : i < current ? "bg-accent/12 border-accent/30 text-accent" : "text-text-muted"}`} 
            disabled
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-accent scale-125" : i < current ? "bg-accent/50" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Intention ────────────────────────────────────────────────────────
function StepIntention({ selected, onSelect, onNext }: { selected: string; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[860px] animate-in fade-in slide-in-from-bottom-2 duration-400">
      <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold text-white text-center mb-2.5">Wahle deine Absicht</h2>
      <p className="text-[1rem] text-text-muted text-center mb-9">Wähle das Thema, das heute mit dir mitschwingt.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full">
        {INTENTIONS.map((item) => {
          const { id, label, sub, img, icon: Icon } = item as any;
          return (
            <button
              key={id}
              className={`flex flex-col items-center gap-2 px-4 py-6 bg-white/5 border border-white/8 rounded-lg cursor-pointer transition-all duration-200 text-center hover:bg-white/9 hover:border-white/15 glass-card ${selected === id ? "border-accent/40 bg-accent/8 shadow-[0_0_16px_rgba(242,202,80,0.12)]" : ""}`}
              onClick={() => onSelect(id)}
            >
              <div className="w-11 h-11 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-1">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" style={{ width: "24px", height: "24px" }} />
                ) : (
                  Icon && <Icon size={22} />
                )}
              </div>
              <span className="text-[0.9rem] font-semibold text-white">{label}</span>
              <span className="text-[0.75rem] text-text-muted leading-[1.4]">{sub}</span>
            </button>
          );
        })}
      </div>
      <button className="btn-primary" onClick={onNext} disabled={!selected} style={{ marginTop: "32px" }}>
        Erzeuge deine Meditation
      </button>
      <p className="text-[0.78rem] text-text-muted mt-3">Kein Konto erforderlich · Kostenlos testen</p>
    </div>
  );
}

// ─── Step 2: Voice ────────────────────────────────────────────────────────────
function StepVoice({ selected, onSelect, onNext }: { selected: string; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[860px] animate-in fade-in slide-in-from-bottom-2 duration-400">
      <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold text-white text-center mb-2.5">Gib deinen Worten mehr Tiefe</h2>
      <p className="text-[1rem] text-text-muted text-center mb-9">Wähle die Stimme, die deine Meditationsreise begleitet.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[680px]">
        {VOICES.map((v) => (
          <button
            key={v.id}
            className={`flex flex-col items-center gap-3 px-6 py-8 pb-7 bg-white/5 border border-white/8 rounded-lg cursor-pointer transition-all duration-200 relative text-center hover:bg-white/9 glass-card ${selected === v.id ? "border-accent/40 bg-accent/6 shadow-[0_0_20px_rgba(242,202,80,0.12)]" : ""}`}
            onClick={() => onSelect(v.id)}
          >
            <button className="absolute top-3.5 right-3.5 w-[34px] h-[34px] rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-accent hover:text-[#0b0f17] hover:border-accent" aria-label="Vorschau" onClick={(e) => e.stopPropagation()}>
              <Play size={16} fill="currentColor" />
            </button>
            <div className="w-[90px] h-[90px] rounded-full bg-white/4 border border-white/10 flex items-center justify-center overflow-hidden mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[0.7rem] uppercase tracking-wider text-accent font-bold mb-1 opacity-80">{v.label}</span>
            <h3 className="text-[1.3rem] font-bold text-white">{v.name}</h3>
            <p className="text-[0.85rem] text-text-muted">{v.desc}</p>
            <div className="flex gap-1.5 flex-wrap justify-center">
              {v.tags.map((t) => <span key={t} className="px-2.5 py-0.75 bg-white/6 border border-border rounded-pill text-[0.72rem] text-text-muted">{t}</span>)}
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
    <div className="flex flex-col items-center w-full max-w-[860px] animate-in fade-in slide-in-from-bottom-2 duration-400">
      <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold text-white text-center mb-2.5">Vertiefe dein Erlebnis</h2>
      <p className="text-[1rem] text-text-muted text-center mb-9">Beantworte ein paar Fragen, um deine Reise zu personalisieren.</p>

      <div className="flex flex-col gap-3.5 w-full max-w-[720px]">
        <div className="p-5 md:p-6 flex flex-col gap-2.5 glass-card">
          <label className="text-[0.9rem] font-semibold text-text-sub">Wie fühlst du dich heute?</label>
          <input className="bg-white/7 border border-white/10 rounded-sm p-3 md:p-4 text-white text-[0.9rem] outline-none transition-all duration-200 placeholder:text-text-muted focus:border-accent/40 focus:bg-white/9 w-full" type="text" placeholder="z.B. erschöpft, ruhelos, angespannt" />
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-2.5 glass-card">
          <label className="text-[0.9rem] font-semibold text-text-sub">Was möchtest du mit dieser Meditation vertiefen?</label>
          <input className="bg-white/7 border border-white/10 rounded-sm p-3 md:p-4 text-white text-[0.9rem] outline-none transition-all duration-200 placeholder:text-text-muted focus:border-accent/40 focus:bg-white/9 w-full" type="text" placeholder="z.B. leichter fühlen, tiefer entspannen" />
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-2.5 glass-card">
          <label className="text-[0.9rem] font-semibold text-text-sub">Was soll heute draußen bleiben?</label>
          <input className="bg-white/7 border border-white/10 rounded-sm p-3 md:p-4 text-white text-[0.9rem] outline-none transition-all duration-200 placeholder:text-text-muted focus:border-accent/40 focus:bg-white/9 w-full" type="text" placeholder="z.B. Stress, Sorgen, Prüfungsangst" />
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-2.5 glass-card">
          <label className="text-[0.9rem] font-semibold text-text-sub">Wo spürst du Spannung in deinem Körper?</label>
          <div className="flex gap-2 flex-wrap">
            {TENSION_SPOTS.map((spot) => (
              <button
                key={spot}
                className={`px-3.5 py-1.5 bg-white/6 border border-border rounded-pill text-text-muted text-[0.825rem] cursor-pointer transition-all duration-200 hover:border-white/20 hover:text-white ${tension.includes(spot) ? "bg-accent/10 !border-accent/40 !text-accent" : ""}`}
                onClick={() => toggleTension(spot)}
              >
                {spot}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-2.5 glass-card">
          <label className="text-[0.9rem] font-semibold text-text-sub">Dein akustischer Entspannungsanker</label>
          <input className="bg-white/7 border border-white/10 rounded-sm p-3 md:p-4 text-white text-[0.9rem] outline-none transition-all duration-200 placeholder:text-text-muted focus:border-accent/40 focus:bg-white/9 w-full" type="text" placeholder="z.B. Regen, Meeresrauschen, Stille" />
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
    <div className="flex flex-col items-center w-full max-w-[860px] animate-in fade-in slide-in-from-bottom-2 duration-400 text-center">
      <div className="w-[100px] h-[100px] rounded-full bg-[radial-gradient(circle,rgba(242,202,80,0.2)_0%,rgba(242,202,80,0.05)_70%)] border-2 border-accent/30 flex items-center justify-center text-accent mb-6 animate-pulse">
        <Loader2 size={40} className="animate-spin" />
      </div>
      <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold text-white text-center mb-2.5">Deine Meditation entsteht...</h2>
      <p className="text-[1rem] text-text-muted text-center mb-9">Die KI erschafft gerade eine einzigartige Meditation nur für dich.</p>
      <div className="flex flex-col items-center gap-3 w-full max-w-[400px] mt-6">
        <div className="w-full h-1 bg-white/8 rounded-pill overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-[#fad84a] rounded-pill animate-[progressAnim_3s_ease-in-out_infinite]" />
        </div>
        <span className="text-[0.825rem] text-text-muted">KI analysiert deine Absichten...</span>
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
    <div className="min-h-screen flex flex-col relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-8 py-5 flex items-center z-10">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="VISULARA" style={{ height: "24px", width: "auto" }} />
        </Link>
      </div>

      {/* Wizard bar */}
      <div className="pt-20 px-8 pb-0 flex items-center justify-center gap-6 relative md:flex-row flex-col">
        <button className="md:absolute left-8 flex items-center gap-1.5 px-4.5 py-2 bg-white/8 border border-border rounded-pill text-text-muted text-[0.875rem] cursor-pointer transition-all duration-200 hover:enabled:text-white hover:enabled:bg-white/12 disabled:opacity-40 disabled:cursor-default" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0}>
          <ArrowLeft size={16} /> Zurück
        </button>
        <StepBar current={step} />
        <Link href="/meditation/startseite" className="md:absolute right-8 w-9 h-9 rounded-full bg-white/8 border border-border flex items-center justify-center text-text-muted transition-all duration-200 hover:bg-white/14 hover:text-white" aria-label="Schließen">
          <X size={18} />
        </Link>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-8 pt-10 pb-15 md:px-8 px-4">
        {step === 0 && <StepIntention selected={intention} onSelect={setIntention} onNext={next} />}
        {step === 1 && <StepVoice selected={voice} onSelect={setVoice} onNext={next} />}
        {step === 2 && <StepExperience onNext={next} />}
        {step === 3 && <StepGenerate />}
      </div>
    </div>
  );
}

