"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, X, Shield, Flame, Sparkles, Sun, Wind, Heart, 
  Zap, Star, Loader2, ChevronRight, Play, Pause, CloudRain, 
  Waves, VolumeX 
} from "lucide-react";
import { api, CharacterVoice, NatureSound, BackgroundImage, GenerateMeditationResponse } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

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

const INTENTION_TO_CATEGORY: Record<string, string> = {
  entspannung: "relaxation",
  selbstliebe: "self_love",
  fokus: "focus_clarity",
  dankbarkeit: "gratitude",
  vertrauen: "trust",
  energie: "energy",
  transformation: "transformation",
  frieden: "inner_peace",
};

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
          Konto erforderlich · Kostenlos testen
        </p>
      </div>
    </div>
  );
}

// ─── Step 2: Voice ────────────────────────────────────────────────────────────
function StepVoice({ 
  selected, 
  onSelect, 
  onNext, 
  voices 
}: { 
  selected: number | null; 
  onSelect: (id: number) => void; 
  onNext: () => void; 
  voices: CharacterVoice[];
}) {
  const [playingVoiceId, setPlayingVoiceId] = useState<number | null>(null);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
      }
    };
  }, [audioInstance]);

  const handleTogglePlay = (e: React.MouseEvent, v: CharacterVoice) => {
    e.stopPropagation();
    if (playingVoiceId === v.id) {
      if (audioInstance) {
        audioInstance.pause();
      }
      setPlayingVoiceId(null);
    } else {
      if (audioInstance) {
        audioInstance.pause();
      }
      const audio = new Audio(v.file);
      audio.play().catch((err) => console.error("Audio preview failed", err));
      audio.onended = () => {
        setPlayingVoiceId(null);
      };
      setAudioInstance(audio);
      setPlayingVoiceId(v.id);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[1000px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-serif text-white text-center mb-4 tracking-tight leading-tight">
        {selected ? "Geben Sie Ihren Worten mehr Tiefe" : "Gib deinen Worten mehr Tiefe"}
      </h2>
      <p className="text-[1.1rem] text-text-sub text-center mb-12 max-w-[600px] opacity-80 font-medium">
        {selected ? "Wählen Sie die Stimme, die Ihre Meditationsreise leiten wird." : "Wähle die Stimme, die deine Meditationsreise begleitet."}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[850px]">
        {voices.map((v) => {
          const isActive = selected === v.id;
          const isPlaying = playingVoiceId === v.id;
          const tagsArray = v.tags ? v.tags.split(",").map((t) => t.trim()) : [];
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
                onClick={(e) => handleTogglePlay(e, v)}
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>

              <div className="relative mb-6">
                <div className={`w-28 h-28 rounded-full border-2 transition-all duration-500 overflow-hidden ${
                  isActive ? "border-accent scale-105" : "border-white/10 group-hover:border-white/20"
                }`}>
                  <img src={v.avatar_url || "/voice-serena.svg"} alt={v.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-1 z-10 w-full">
                <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isActive ? "text-accent" : "text-white"}`}>{v.name}</h3>
                <p className="text-[0.95rem] text-white/60 mb-6 font-medium">{v.short_description}</p>
                
                {isPlaying ? <Waveform /> : <div className="h-10 mb-8" />}
                
                <div className="flex gap-2 flex-wrap justify-center mb-6">
                  {tagsArray.map((t) => (
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
function StepExperience({ 
  feel,
  setFeel,
  goal,
  setGoal,
  remainsOutside,
  setRemainsOutside,
  tension,
  toggleTension,
  selectedNatureSoundName,
  setSelectedNatureSoundName,
  selectedBackgroundImageId,
  setSelectedBackgroundImageId,
  natureSounds,
  backgroundImages,
  onNext, 
  onBack 
}: { 
  feel: string;
  setFeel: (v: string) => void;
  goal: string;
  setGoal: (v: string) => void;
  remainsOutside: string;
  setRemainsOutside: (v: string) => void;
  tension: string[];
  toggleTension: (spot: string) => void;
  selectedNatureSoundName: string | null;
  setSelectedNatureSoundName: (v: string | null) => void;
  selectedBackgroundImageId: number | null;
  setSelectedBackgroundImageId: (v: number | null) => void;
  natureSounds: NatureSound[];
  backgroundImages: BackgroundImage[];
  onNext: () => void; 
  onBack: () => void;
}) {

  const inputClasses = "bg-[#2D3528]/40 border border-white/5 rounded-xl p-4 text-[#F2CA50] text-[1rem] outline-none transition-all duration-300 placeholder:text-[#F2CA50]/40 focus:border-accent/40 focus:bg-[#2D3528]/60 w-full";
  const cardClasses = "bg-[#2D3528]/40 border border-white/5 rounded-[1.5rem] p-6 w-full";
  const labelClasses = "text-[1rem] font-medium text-white/90 mb-4 block";

  const getIconForSound = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("rain") || lowercase.includes("regen")) return CloudRain;
    if (lowercase.includes("wave") || lowercase.includes("wellen") || lowercase.includes("ocean") || lowercase.includes("meer")) return Waves;
    if (lowercase.includes("fire") || lowercase.includes("kamin") || lowercase.includes("knistern") || lowercase.includes("feuer")) return Flame;
    return Wind;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[750px] animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white text-center mb-4 tracking-tight leading-tight">Vertiefe deine Erfahrung</h2>
      <p className="text-[1.1rem] text-white/60 text-center mb-12 max-w-[600px] font-medium">Beantworte ein paar Fragen, um deine Reise zu personalisieren.</p>

      <div className="flex flex-col gap-5 w-full">
        {/* Input 1 */}
        <div className={cardClasses}>
          <label className={labelClasses}>Wie fühlst du dich heute?</label>
          <input 
            className={inputClasses} 
            type="text" 
            placeholder="z.B. erschöpft, rastlos, angespannt" 
            value={feel}
            onChange={(e) => setFeel(e.target.value)}
          />
        </div>

        {/* Input 2 */}
        <div className={cardClasses}>
          <label className={labelClasses}>Was möchtest du mit dieser Meditation vertiefen?</label>
          <input 
            className={inputClasses} 
            type="text" 
            placeholder="z.B. leichter fühlen, entspannter, freier" 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        {/* Input 3 */}
        <div className={cardClasses}>
          <label className={labelClasses}>Was darf heute draußen bleiben?</label>
          <input 
            className={inputClasses} 
            type="text" 
            placeholder="z.B. Stress bei der Arbeit, Ängste, Prüfungsangst, Gedankenkarussell" 
            value={remainsOutside}
            onChange={(e) => setRemainsOutside(e.target.value)}
          />
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
            {natureSounds.map((sound) => {
              const Icon = getIconForSound(sound.name);
              const isActive = selectedNatureSoundName === sound.name;
              return (
                <button
                  key={sound.id}
                  onClick={() => setSelectedNatureSoundName(sound.name)}
                  className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                      : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon size={24} className={isActive ? "text-accent" : "text-white/40"} />
                  <span className="text-[0.85rem] font-bold">{sound.name}</span>
                </button>
              );
            })}
            <button
              onClick={() => setSelectedNatureSoundName(null)}
              className={`col-span-2 flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition-all duration-300 ${
                selectedNatureSoundName === null 
                  ? "bg-[#F5C5180F] border-2 border-accent text-accent shadow-[0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/5 text-white/40 hover:bg-white/[0.06]"
              }`}
            >
              <VolumeX size={24} className={selectedNatureSoundName === null ? "text-accent" : "text-white/40"} />
              <span className="text-[0.85rem] font-bold">Vollkommene Stille</span>
            </button>
          </div>
        </div>

        {/* Power Landscape */}
        <div className={cardClasses}>
          <label className={labelClasses}>Deine Kraftlandschaft:</label>
          <div className="grid grid-cols-2 gap-4">
            {backgroundImages.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedBackgroundImageId(l.id)}
                className={`group relative aspect-[16/10] rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedBackgroundImageId === l.id ? "ring-2 ring-accent ring-offset-2 ring-offset-[#0b0f17]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={l.file} alt={l.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                  <span className="text-[0.75rem] font-bold text-white text-center leading-tight">{l.name}</span>
                </div>
                {selectedBackgroundImageId === l.id && (
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

function StepGenerate({
  loading,
  error,
  result,
  onRetry,
}: {
  loading: boolean;
  error: string;
  result: GenerateMeditationResponse | null;
  onRetry: () => void;
}) {
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

  const isAnimationFinished = currentStepIndex === GENERATION_STEPS.length - 1;
  const isReady = isAnimationFinished && result !== null;

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
      
      {error ? (
        <div className="flex flex-col items-center gap-6 max-w-md">
          <p className="text-red-400 font-semibold">{error}</p>
          <button 
            onClick={onRetry}
            className="bg-accent text-[#0b0f17] px-10 py-3.5 rounded-full font-bold text-[1.1rem] shadow-[0_10px_30px_rgba(242,202,80,0.2)] hover:scale-105 transition-all"
          >
            Erneut versuchen
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-[450px]">
          {/* Progress List */}
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
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-500 ${idx <= currentStepIndex ? 'bg-accent shadow-[0_0_10px_rgba(242,202,80,0.8)]' : 'bg-white/20'}`} />
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
      )}
      
      {isReady && (
        <Link 
          href={`/meditation/meditation-structure?id=${result.meditation_id}`}
          className="bg-accent text-[#0b0f17] px-12 py-4 rounded-full font-bold text-[1.1rem] transition-all duration-500 min-w-[320px] mt-16 shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] animate-in fade-in slide-in-from-bottom-4"
        >
          Meditation abspielen
        </Link>
      )}

      {isAnimationFinished && !result && !error && (
        <div className="flex items-center gap-2 text-white/50 mt-16">
          <Loader2 className="animate-spin text-accent" size={20} />
          <span>Generierung wird abgeschlossen...</span>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NeueMeditationPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [intention, setIntention] = useState("");
  const [voice, setVoice] = useState<number | null>(null);

  // Loaded Options
  const [voices, setVoices] = useState<CharacterVoice[]>([]);
  const [natureSounds, setNatureSounds] = useState<NatureSound[]>([]);
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  // Experience states:
  const [feel, setFeel] = useState("");
  const [goal, setGoal] = useState("");
  const [remainsOutside, setRemainsOutside] = useState("");
  const [tension, setTension] = useState<string[]>(["Schultern & Nacken", "Hände & Arme"]);
  const [selectedNatureSoundName, setSelectedNatureSoundName] = useState<string | null>(null);
  const [selectedBackgroundImageId, setSelectedBackgroundImageId] = useState<number | null>(null);

  // Generation state:
  const [generationResult, setGenerationResult] = useState<GenerateMeditationResponse | null>(null);
  const [generationError, setGenerationError] = useState("");
  const [generationLoading, setGenerationLoading] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        setOptionsLoading(true);
        const [voicesRes, soundsRes, imagesRes] = await Promise.all([
          api.meditation.getCharacterVoices(),
          api.meditation.getNatureSounds(),
          api.meditation.getBackgroundImages(),
        ]);
        setVoices(voicesRes);
        setNatureSounds(soundsRes);
        setBackgroundImages(imagesRes);

        // Set defaults if available
        if (voicesRes.length > 0) setVoice(voicesRes[0].id);
        if (soundsRes.length > 0) setSelectedNatureSoundName(soundsRes[0].name);
        if (imagesRes.length > 0) setSelectedBackgroundImageId(imagesRes[0].id);
      } catch (err: any) {
        console.error("Failed to load options:", err);
        setOptionsError(err.message || "Fehler beim Laden der Optionen. Bitte lade die Seite neu.");
      } finally {
        setOptionsLoading(false);
      }
    }
    loadOptions();
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleTension = (spot: string) => {
    setTension((prev) => prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]);
  };

  const handleStartGeneration = async () => {
    setStep(3);
    setGenerationLoading(true);
    setGenerationError("");
    setGenerationResult(null);

    const category = INTENTION_TO_CATEGORY[intention] || "relaxation";
    const voiceId = voice || (voices.length > 0 ? voices[0].id : 1);
    
    // Get first name from profile
    const firstName = user?.full_name ? user.full_name.split(" ")[0] : "Anna";

    try {
      const result = await api.meditation.generate({
        category,
        charecter_voice_id: voiceId,
        experience_question_answers: {
          name: firstName,
          goal: goal || "Tiefenentspannung",
          how_you_feel: feel,
          what_remains_outside: remainsOutside,
          tension_spots: tension,
        },
        nature_sound_name: selectedNatureSoundName,
        background_image_id: selectedBackgroundImageId,
      });
      setGenerationResult(result);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("visulara-wallet-refresh"));
      }
    } catch (err: any) {
      console.error("Meditation generation failed:", err);
      setGenerationError(err.message || "Die Generierung ist fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setGenerationLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative pt-12 pb-12 px-6">
      <div className="flex flex-col items-center mb-12 mt-16">
        <StepBar current={step} />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center">
        {optionsLoading ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <Loader2 className="animate-spin text-accent mb-4" size={48} />
            <p className="text-white/60">Optionen werden geladen...</p>
          </div>
        ) : optionsError ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-red-400 font-bold mb-4">{optionsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-[#0b0f17] px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
            >
              Neu laden
            </button>
          </div>
        ) : (
          <>
            {step === 0 && <StepIntention selected={intention} onSelect={setIntention} onNext={next} />}
            {step === 1 && <StepVoice selected={voice} onSelect={setVoice} onNext={next} voices={voices} />}
            {step === 2 && (
              <StepExperience
                feel={feel}
                setFeel={setFeel}
                goal={goal}
                setGoal={setGoal}
                remainsOutside={remainsOutside}
                setRemainsOutside={setRemainsOutside}
                tension={tension}
                toggleTension={toggleTension}
                selectedNatureSoundName={selectedNatureSoundName}
                setSelectedNatureSoundName={setSelectedNatureSoundName}
                selectedBackgroundImageId={selectedBackgroundImageId}
                setSelectedBackgroundImageId={setSelectedBackgroundImageId}
                natureSounds={natureSounds}
                backgroundImages={backgroundImages}
                onNext={handleStartGeneration}
                onBack={back}
              />
            )}
            {step === 3 && (
              <StepGenerate
                loading={generationLoading}
                error={generationError}
                result={generationResult}
                onRetry={handleStartGeneration}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
