import Link from "next/link";
import { Check, Zap, Crown, Star, Infinity } from "lucide-react";

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
    <div className="px-10 py-20 max-w-[1200px] mx-auto w-full flex flex-col gap-20 min-h-screen relative z-10">
      <div className="flex justify-center -mb-5">
        <img src="/logo.svg" alt="Visulara" className="h-[38px] opacity-100" />
      </div>
      <div className="text-center flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-[2.8rem] font-bold text-white mb-2 tracking-tight">Ihr Abonnement</h1>
          <p className="text-[1rem] text-white/70 max-w-[700px] leading-[1.6]">Entfesseln Sie die volle Frequenz des Kosmos. Wählen Sie die Reise, die mit Ihrer spirituellen Entwicklung in Resonanz steht.</p>
        </div>
      </div>

      {/* Current plan banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:px-10 rounded-[24px] gap-8 backdrop-blur-xl bg-white/3 border border-white/10 glass-card">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-accent/10 border border-accent/30 rounded-2xl flex items-center justify-center text-accent">
            <Zap size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-[1.8rem] font-bold text-white">Pro Plan</span>
              <span className="bg-accent/20 text-accent text-[0.7rem] font-extrabold px-3 py-0.75 rounded-full border border-accent/30">AKTIV</span>
            </div>
            <span className="text-[0.95rem] text-white/50">9,99 $/Monat · Verlängert am 1. Mai 2026</span>
          </div>
        </div>
        
        <div className="flex md:w-auto w-full">
          <div className="flex items-center bg-black/20 border border-white/10 rounded-2xl py-3 md:w-auto w-full justify-center">
            <div className="px-6 flex flex-col items-center gap-1 min-w-[120px]">
              <Infinity size={18} className="text-accent" />
              <span className="text-[0.75rem] text-white/50 uppercase tracking-widest">Sitzungen</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="px-6 flex flex-col items-center gap-1 min-w-[120px]">
              <span className="text-[1.4rem] font-bold text-white">14</span>
              <span className="text-[0.75rem] text-white/50 uppercase tracking-widest">Verbleibende Tage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="-mb-10">
        <h2 className="text-[1.875rem] font-semibold text-white">Verfügbare Pläne</h2>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:max-w-none max-w-[500px] mx-auto">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`bg-white/5 border border-white/20 rounded-3xl p-10 md:px-8 flex flex-col gap-8 transition-all duration-300 backdrop-blur-xl glass-card ${p.highlighted ? "!bg-[#51572f]/72 !border-[#9a8a45] shadow-[0_10px_40px_rgba(0,0,0,0.3)]" : ""} ${p.id === 'premium' ? "premium-card" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 border border-white/20 rounded-xl flex items-center justify-center text-white ${p.id === 'free' ? 'text-white/60' : p.id === 'pro' ? 'text-accent border-accent/30' : 'text-[#a884f3] border-[#a884f3]/30'}`}>
                {p.icon}
              </div>
              {p.badge && <span className="bg-accent/20 text-accent text-[0.7rem] font-extrabold px-3 py-1 rounded-full border border-accent/30">{p.badge}</span>}
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <h3 className="text-[2.2rem] font-bold text-white">{p.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-[3rem] font-bold text-white">{p.price}</span>
                <span className="text-[1rem] text-white/50">{p.period}</span>
              </div>

              <ul className="list-none flex flex-col gap-3 mt-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.95rem] text-white/80">
                    <Check size={14} className="text-accent mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <button
                className={`w-full p-4 rounded-2xl text-[1rem] font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${p.highlighted ? "bg-[#51572f]/72 text-accent border border-[#9a8a45] hover:bg-[#5b6139]/85 hover:-translate-y-0.5" : "bg-white/5 text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/30"} ${p.id === 'premium' ? "!text-[#a78bfa]" : ""}`}
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

