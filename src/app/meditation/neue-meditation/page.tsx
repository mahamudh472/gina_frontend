"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, X, Shield, Flame, Sparkles, Sun, Wind, Heart, Zap, Star, Loader2, ChevronRight, Play, Pause, CloudRain, Waves, VolumeX } from "lucide-react";

// ─── Step data ───────────────────────────────────────────────────────────────
const INTENTIONS = [
  { id: "entspannung", label: "Entspannung", sub: "lass los und finde Ruhe", icon: Wind },
  { id: "selbstliebe", label: "Selbstliebe", sub: "Umarme dein inneres Licht", icon: Heart },
  { id: "fokus", label: "Fokus & Klarheit", sub: "Schärfe deinen Geist", icon: Zap },
  { id: "dankbarkeit", label: "Dankbarkeit", sub: "Lass Dankbarkeit dein Herz erfüllen", icon: Star },
  { id: "vertrauen", label: "Vertrauen", sub: "Vertrauen dem Fluss Des Lebens", icon: Shield },
  { id: "energie", label: "Energie", sub: "Entfache dein inneres Feuer", icon: Flame },
  { id: "transformation", label: "Transformation", sub: "Wachse über deine Grenzen hinaus", icon: Sparkles },
  { id: "frieden", label: "Innerer Frieden", sub: "Kehre in deine Stille zurück", icon: Sun },
];

const VOICES = [
  { id: "alexander", name: "Alexander", desc: "Tief, erdend, resonant", tags: ["Warm", "Beständig", "Zentriert"], img: "/voice-alexander.svg", label: "Männliche Stimme" },
  { id: "serena", name: "Serena", desc: "Sanft, beruhigend, fürsorglich", tags: ["Sanft", "Fließend", "Weitreichend"], img: "/voice-serena.svg", label: "Weibliche Stimme" },
];

function Waveform() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-10 mb-8">
      {[0.4, 0.6, 0.3, 0.8, 0.5, 0.9, 1, 0.7, 0.8, 0.4, 0.9, 0.6, 0.4, 0.7, 0.5].map((h, i) => (
        <div 
          key={i} 
          className="w-[3px] bg-[#42C3FF] rounded-full transition-all duration-500" 
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  );
}

const TENSION_SPOTS = ["Kiefer & Gesicht", "Schultern & Nacken", "Brust & Herz", "Unterer Rücken", "Hände & Arme"];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ current }: { current: number }) {
  const steps = ["1. Absicht", "2. Stimme", "3. Erfahrung", "4. Erzeugen"];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        {steps.map((s, i) => {
          const isCompleted = i < current;
          const isActive = i === current;
          return (
            <div key={i} className="flex items-center gap-3">
              <div 
                className={`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-accent text-[#0b0f17]" 
                    : isCompleted
                      ? "bg-[#2A2D1B] text-accent border border-accent/20"
                      : "bg-white/10 text-white/40"
                }`}
              >
                {s}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-white/20" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Dots */}
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((dot) => (
          <div 
            key={dot} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dot === 2 ? "bg-white/60" : "bg-white/20"}`} 
          />
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Intention ────────────────────────────────────────────────────────
function StepIntention({ selected, onSelect, onNext }: { selected: string; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif text-white text-center mb-4 tracking-tight leading-tight">Wähle deine Absicht</h2>
      <p className="text-[1.1rem] text-text-sub text-center mb-12 max-w-[600px] opacity-80 font-medium">Wähle das Thema, das heute mit dir in Resonanz steht.</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {INTENTIONS.map((item) => {
          const { id, label, sub, icon: Icon } = item;
          const isActive = selected === id;
          return (
            <button
              key={id}
              className={`group flex flex-col items-center gap-3 p-6 pt-8 pb-8 rounded-xl cursor-pointer transition-all duration-500 text-center relative overflow-hidden ${
                isActive 
                  ? "bg-accent/10 border-2 border-accent shadow-[0_0_30px_rgba(242,202,80,0.15)] scale-[1.02]" 
                  : "bg-[#F5C5180F] border border-white/10 hover:bg-[#F5C5181A] hover:border-white/20"
              }`}
              onClick={() => onSelect(id)}
            >
              {/* Card Glow Effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
              )}
              
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive ? "bg-accent/20 text-accent scale-110" : "bg-white/5 text-accent/70 group-hover:scale-110 group-hover:text-accent"
              }`}>
                <Icon size={24} />
              </div>
              
              <div className="flex flex-col gap-1.5 z-10">
                <span className={`text-[1.05rem] font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-white/90 group-hover:text-white"}`}>
                  {label}
                </span>
                <span className={`text-[0.8rem] leading-relaxed px-2 transition-colors duration-300 ${isActive ? "text-white/70" : "text-white/40 group-hover:text-white/60"}`}>
                  {sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 mt-12 w-full">
        <button 
          className={`px-12 py-4 rounded-full font-bold text-[1.1rem] transition-all duration-500 min-w-[320px] ${
            selected 
              ? "bg-accent text-[#0b0f17] shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] cursor-pointer" 
              : "bg-[#F5C5180F] text-white/20 border border-white/10 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selected}
        >
          {selected ? "Erzeuge deine Meditation" : "Erstelle Deine Meditation"}
        </button>
        <p className="text-[0.85rem] text-white/40 font-medium">
          Kein Konto erforderlich · Kostenlos testen
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Voice ────────────────────────────────────────────────────────────
function StepVoice({ selected, onSelect, onNext }: { selected: string; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div className="flex flex-col items-center w-full max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif text-white text-center mb-4 tracking-tight leading-tight">
        {selected ? "Geben Sie Ihren Worten mehr Tiefe" : "Gib deinen Worten mehr Tiefe"}
      </h2>
      <p className="text-[1.1rem] text-text-sub text-center mb-12 max-w-[600px] opacity-80 font-medium">
        {selected ? "Wählen Sie die Stimme, die Ihre Meditationsreise leiten wird." : "Wähle die Stimme, die deine Meditationsreise begleitet."}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[850px]">
        {VOICES.map((v) => {
          const isActive = selected === v.id;
          return (
            <div
              key={v.id}
              className={`group relative flex flex-col items-center p-12 rounded-[2.5rem] cursor-pointer transition-all duration-500 text-center overflow-hidden border-2 ${
                isActive 
                  ? "bg-white/[0.04] border-accent shadow-[0_0_50px_rgba(242,202,80,0.15)] backdrop-blur-2xl" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/20 backdrop-blur-xl"
              }`}
              onClick={() => onSelect(v.id)}
            >
              {/* Audio Button - Now absolute to the card */}
              <button 
                className="absolute top-8 right-8 w-14 h-14 rounded-full bg-accent text-[#0b0f17] flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                {isActive ? <Play size={24} fill="currentColor" className="ml-1" /> : <Pause size={24} fill="currentColor" />}
              </button>

              <div className="relative mb-6">
                <div className={`w-28 h-28 rounded-full border-2 transition-all duration-500 overflow-hidden ${
                  isActive ? "border-accent scale-105" : "border-white/10 group-hover:border-white/20"
                }`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-1 z-10 w-full">
                <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isActive ? "text-accent" : "text-white"}`}>{v.name}</h3>
                <p className="text-[0.95rem] text-white/60 mb-6 font-medium">{v.desc}</p>
                
                <Waveform />
                
                <div className="flex gap-2 flex-wrap justify-center mb-6">
                  {v.tags.map((t) => (
                    <span key={t} className={`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all duration-300 ${
                      isActive ? "bg-accent/20 text-accent border border-accent/30" : "bg-white/5 text-white/40 border border-white/10"
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>

                {isActive && (
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-accent/20 rounded-full text-accent text-[0.75rem] font-bold border border-accent/30 animate-in fade-in zoom-in-95 duration-300 mt-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Ausgewählt
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        className={`px-12 py-4 rounded-full font-bold text-[1.1rem] transition-all duration-500 min-w-[320px] mt-16 ${
          selected 
            ? "bg-accent text-[#0b0f17] shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] cursor-pointer opacity-100" 
            : "bg-white/5 text-accent/20 border border-white/5 cursor-not-allowed opacity-30 shadow-none"
        }`}
        onClick={onNext} 
        disabled={!selected}
      >
        Weiter
      </button>
    </div>
  );
}

// ─── Step 3: Experience ───────────────────────────────────────────────────────
function StepExperience({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [tension, setTension] = useState<string[]>(["Schultern & Nacken", "Hände & Arme"]);
  const [anchor, setAnchor] = useState("wind");
  const [landscape, setLandscape] = useState("bergsee");

  const toggleTension = (spot: string) => {
    setTension((prev) => prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]);
  };

  const inputClasses = "bg-[#2D3528]/40 border border-white/5 rounded-xl p-4 text-[#F2CA50] text-[1rem] outline-none transition-all duration-300 placeholder:text-[#F2CA50]/40 focus:border-accent/40 focus:bg-[#2D3528]/60 w-full";
  const cardClasses = "bg-[#2D3528]/40 border border-white/5 rounded-[1.5rem] p-6 w-full";
  const labelClasses = "text-[1rem] font-medium text-white/90 mb-4 block";

  const ACOUSTIC_ANCHORS = [
    { id: "regen", label: "Sanfter Sommerregen", icon: Wind }, // Using Wind for now, but will look for CloudRain
    { id: "wind", label: "Leises Windrauschen", icon: Wind },
    { id: "kamin", label: "Knistern im Kamin", icon: Flame },
    { id: "wellen", label: "Rhythmische Meereswellen", icon: Wind },
  ];

  const LANDSCAPES = [
    { id: "urwald", label: "Tiefgrüner Urwald", img: "/forest_meditation_landscape_1778925243251.png" },
    { id: "bergsee", label: "Stiller Bergsee in der Dämmerung", img: "/mountain_lake_meditation_landscape_1778925266179.png" },
    { id: "strand", label: "Unendlicher weißer Sandstrand", img: "/beach_meditation_landscape_1778925284705.png" },
    { id: "wiese", label: "Blumenwiese im Sonnenlicht", img: "/meadow_meditation_landscape_1778925304878.png" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[750px] animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white text-center mb-4 tracking-tight leading-tight">Vertiefe deine Erfahrung</h2>
      <p className="text-[1.1rem] text-white/60 text-center mb-12 max-w-[600px] font-medium">Beantworte ein paar Fragen, um deine Reise zu personalisieren.</p>

      <div className="flex flex-col gap-5 w-full">
        {/* Input 1 */}
        <div className={cardClasses}>
          <label className={labelClasses}>Wie fühlst du dich heute?</label>
          <input className={inputClasses} type="text" placeholder="z.B. erschöpft, rastlos, angespannt" />
        </div>

        {/* Input 2 */}
        <div className={cardClasses}>
          <label className={labelClasses}>Was möchtest du mit dieser Meditation vertiefen?</label>
          <input className={inputClasses} type="text" placeholder="z.B. leichter fühlen, entspannter, freier" />
        </div>

        {/* Input 3 */}
        <div className={cardClasses}>
          <label className={labelClasses}>Was darf heute draußen bleiben?</label>
          <input className={inputClasses} type="text" placeholder="z.B. Stress bei der Arbeit, Ängste, Prüfungsangst, Gedankenkarussell" />
        </div>

        {/* Tension Spots */}
        <div className={cardClasses}>
          <label className={labelClasses}>Wo in deinem Körper spürst du Anspannung?</label>
          <div className="flex gap-3 flex-wrap">
            {TENSION_SPOTS.map((spot) => (
              <button
                key={spot}
                className={`px-6 py-2 rounded-full text-[0.9rem] font-bold transition-all duration-300 ${
                  tension.includes(spot) 
                    ? "bg-accent text-[#0b0f17]" 
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
                }`}
                onClick={() => toggleTension(spot)}
              >
                {spot}
              </button>
            ))}
          </div>
        </div>

        {/* Acoustic Anchor */}
        <div className={cardClasses}>
          <label className={labelClasses}>Dein akustischer Entspannungsanker:</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setAnchor("regen")}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                anchor === "regen" 
                  ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              <CloudRain size={24} className={anchor === "regen" ? "text-accent" : "text-white/40"} />
              <span className="text-[0.85rem] font-bold">Sanfter Sommerregen</span>
            </button>
            <button
              onClick={() => setAnchor("wind")}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                anchor === "wind" 
                  ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              <Wind size={24} className={anchor === "wind" ? "text-accent" : "text-white/40"} />
              <span className="text-[0.85rem] font-bold">Leises Windrauschen</span>
            </button>
            <button
              onClick={() => setAnchor("kamin")}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                anchor === "kamin" 
                  ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              <Flame size={24} className={anchor === "kamin" ? "text-accent" : "text-white/40"} />
              <span className="text-[0.85rem] font-bold">Knistern im Kamin</span>
            </button>
            <button
              onClick={() => setAnchor("wellen")}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                anchor === "wellen" 
                  ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              <Waves size={24} className={anchor === "wellen" ? "text-accent" : "text-white/40"} />
              <span className="text-[0.85rem] font-bold">Rhythmische Meereswellen</span>
            </button>
            <button
              onClick={() => setAnchor("stille")}
              className={`col-span-2 flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                anchor === "stille" 
                  ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              <VolumeX size={24} className={anchor === "stille" ? "text-accent" : "text-white/40"} />
              <span className="text-[0.85rem] font-bold">Vollkommene Stille</span>
            </button>
          </div>
        </div>

        {/* Power Landscape */}
        <div className={cardClasses}>
          <label className={labelClasses}>Deine Kraftlandschaft:</label>
          <div className="grid grid-cols-2 gap-4">
            {LANDSCAPES.map((l) => (
              <button
                key={l.id}
                onClick={() => setLandscape(l.id)}
                className={`group relative aspect-[16/10] rounded-xl overflow-hidden transition-all duration-300 ${
                  landscape === l.id ? "ring-2 ring-accent ring-offset-2 ring-offset-[#0b0f17]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={l.img} alt={l.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                  <span className="text-[0.75rem] font-bold text-white text-center leading-tight">{l.label}</span>
                </div>
                {landscape === l.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-[#0b0f17] -rotate-45 mb-0.5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-12">
        <button 
          className="flex-1 bg-white/5 text-white/60 py-4 rounded-full font-bold text-[1.1rem] transition-all hover:bg-white/10"
          onClick={onBack}
        >
          Zurück
        </button>
        <button 
          className="flex-1 bg-accent text-[#0b0f17] py-4 rounded-full font-bold text-[1.1rem] transition-all shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:scale-105"
          onClick={onNext}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Generate ─────────────────────────────────────────────────────────
const GENERATION_STEPS = [
  "Deine Absichten werden analysiert...",
  "Deine persönliche Erzählung wird gestaltet...",
  "Affirmationen & Vorschläge werden verwoben...",
  "Deine Klanglandschaft wird komponiert...",
  "Deine Reise wird finalisiert...",
];

function StepGenerate() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < GENERATION_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-[1000px] animate-in fade-in duration-1000 text-center relative pt-10">
      <style jsx>{`
        @keyframes ring-grow {
          0% { 
            transform: scale(1); 
            opacity: 0.8; 
            border-width: 2px;
            box-shadow: 0 0 15px rgba(242, 202, 80, 0.4);
          }
          100% { 
            transform: scale(4); 
            opacity: 0; 
            border-width: 1px;
            box-shadow: 0 0 5px rgba(242, 202, 80, 0);
          }
        }
        .animate-ring-grow {
          animation: ring-grow 4s ease-out infinite;
        }
      `}</style>

      {/* Central Animation */}
      <div className="relative mb-20">
        {/* Animated Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none">
          {[0, 1.3, 2.6].map((delay, i) => (
            <div 
              key={i}
              className="absolute inset-0 rounded-full border border-accent/20 animate-ring-grow"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
        
        {/* Center Circle */}
        <div className="w-24 h-24 rounded-full bg-[#f2ca501a] border-2 border-[#f2ca504d] flex items-center justify-center text-accent z-10 relative shadow-[0_0_40px_rgba(242,202,80,0.2)]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
            <path d="M12 22C12 22 12 22 12 22C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22Z" fill="currentColor" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>

      <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-serif text-white text-center mb-2 tracking-tight leading-tight">Deine Reise erwartet dich</h2>
      <p className="text-[1.1rem] text-white/60 text-center mb-20 font-medium">Deine persönliche Meditation wird erstellt...</p>
      
      {/* Progress List */}
      <div className="flex flex-col items-center w-full max-w-[450px]">
        <div className="flex flex-col gap-4 w-full mb-10 h-[180px] overflow-hidden relative text-left">
           <div 
             className="flex flex-col gap-4 transition-all duration-700 ease-in-out"
             style={{ transform: `translateY(-${Math.max(0, currentStepIndex - 3) * 40}px)` }}
           >
             {GENERATION_STEPS.map((step, idx) => (
               <div 
                 key={idx} 
                 className={`flex items-center gap-4 transition-all duration-700 ${idx <= currentStepIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               >
                 <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-500 ${idx <= currentStepIndex ? 'bg-accent shadow-[0_0_10px_rgba(242,202,80,0.8)]' : 'bg-white/20'}`} />
                 <span className={`text-[1.05rem] font-medium transition-colors duration-500 ${idx === currentStepIndex ? 'text-white' : 'text-white/40'}`}>
                   {step}
                 </span>
               </div>
             ))}
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-accent transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(242,202,80,0.5)]" 
            style={{ width: `${((currentStepIndex + 1) / GENERATION_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
      
      {currentStepIndex === GENERATION_STEPS.length - 1 && (
        <Link 
          href="/meditation/meditation-structure" 
          className="bg-accent text-[#0b0f17] px-12 py-4 rounded-full font-bold text-[1.1rem] transition-all duration-500 min-w-[320px] mt-16 shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] animate-in fade-in slide-in-from-bottom-4"
        >
          Meditation abspielen
        </Link>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NeueMeditationPage() {
  const [step, setStep] = useState(0);
  const [intention, setIntention] = useState("");
  const [voice, setVoice] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="flex-1 flex flex-col relative pt-12 pb-12 px-6">
      <div className="flex flex-col items-center mb-12 mt-16">
        <StepBar current={step} />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center">
        {step === 0 && <StepIntention selected={intention} onSelect={setIntention} onNext={next} />}
        {step === 1 && <StepVoice selected={voice} onSelect={setVoice} onNext={next} />}
        {step === 2 && <StepExperience onNext={next} onBack={back} />}
        {step === 3 && <StepGenerate />}
      </div>
    </div>
  );
}

