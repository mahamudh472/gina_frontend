import Link from "next/link";
import { Check, Zap, Infinity } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "BASIC",
    tagline: "EINSTEIGER",
    price: "9.90 €",
    period: "PRO MONAT",
    credits: "1 Credit inclusive",
    features: [
      "Individualisierte Deep Meditation",
      "Stimme frei wählbar (w / m)",
      "Themenspezifische binaurale Musik",
      "Dauerhafte Portalnutzung",
      "Volle Mixersteuerung",
      "Automatische Archiv- Speicherung",
    ],
    cta: "Jetzt starten",
    highlighted: false,
  },
  {
    id: "core",
    name: "CORE",
    tagline: "EMPFEHLUNG",
    price: "29.90 €",
    period: "PRO MONAT",
    credits: "3 Credits inclusive",
    features: [
      "Individualisierte Deep Meditation",
      "Stimme frei wählbar (w / m)",
      "Themenspezifische binaurale Musik",
      "Dauerhafte Portalnutzung",
      "Volle Mixersteuerung",
      "Automatische Archiv- Speicherung",
    ],
    cta: "CORE Plan wählen",
    highlighted: true,
    badge: "MEISTGEWÄHLT"
  },
  {
    id: "pro",
    name: "PRO",
    tagline: "BUSINESS",
    price: "89.90 €",
    period: "PRO MONAT",
    credits: "10 Credits inclusive",
    features: [
      "Individualisierte Deep Meditation",
      "Stimme frei wählbar (w / m)",
      "Themenspezifische binaurale Musik",
      "Dauerhafte Portalnutzung",
      "Volle Mixersteuerung",
      "Automatische Archiv- Speicherung",
    ],
    cta: "Professional Upgrade",
    highlighted: false,
  },
];

export default function AbonnementPage() {
  return (
    <div className="px-10 py-16 max-w-[1200px] mx-auto w-full flex flex-col gap-12 min-h-screen relative z-10">
      <div className="text-left flex flex-col items-start mt-4">
        <h1 className="text-[3.5rem] font-serif font-bold text-white mb-2 tracking-tight leading-tight">Ihr Abonnement</h1>
        <p className="text-[1.1rem] text-white/60 max-w-[800px] leading-[1.6]">
          Entfesseln Sie die volle Frequenz des Kosmos. Wählen Sie die Reise, die mit Ihrer spirituellen Entwicklung in Resonanz steht.
        </p>
      </div>

      {/* Current plan banner */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 md:px-10 rounded-[32px] gap-8 backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center text-accent shadow-[0_0_20px_rgba(242,202,80,0.2)]">
            <Zap size={28} fill="currentColor" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <span className="text-[2.2rem] font-bold text-white tracking-tight">Pro Plan</span>
              <span className="bg-accent text-black text-[0.7rem] font-black px-3 py-1 rounded-full">AKTIV</span>
            </div>
            <span className="text-[1rem] text-white/40 font-medium">9,99 $/Monat · Verlängert am 1. Mai 2026</span>
          </div>
        </div>
        
        <div className="flex md:w-auto w-full relative z-10">
          <div className="flex items-center bg-black/40 border border-white/5 rounded-2xl py-4 px-2 md:w-auto w-full justify-center backdrop-blur-md">
            <div className="px-8 flex flex-col items-center gap-1.5 min-w-[140px]">
              <Infinity size={22} className="text-accent" />
              <span className="text-[0.7rem] text-white/40 uppercase tracking-[0.2em] font-bold">Sitzungen</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="px-8 flex flex-col items-center gap-0.5 min-w-[140px]">
              <span className="text-[1.8rem] font-bold text-white leading-none">14</span>
              <span className="text-[0.7rem] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">Verbleibende Tage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-[1.5rem] font-bold text-white/90 tracking-wide">Verfügbare Pläne</h2>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`relative group flex flex-col rounded-[32px] transition-all duration-500 ${
              p.highlighted 
                ? "bg-gradient-to-b from-[#1a1c12]/80 to-[#0d0e09]/90 border-[1.5px] border-accent/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(242,202,80,0.1)]" 
                : "bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20"
            }`}
          >
            {/* Meistgewählt Badge */}
            {p.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-accent text-black text-[0.65rem] font-black px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(242,202,80,0.3)] tracking-widest">
                  {p.badge}
                </span>
              </div>
            )}

            <div className="p-8 flex flex-col h-full">
              <div className="mb-5">
                <span className={`text-[0.75rem] font-bold tracking-[0.2em] uppercase ${p.highlighted ? "text-accent" : "text-white/40"}`}>
                  {p.tagline}
                </span>
                <h3 className="text-[2.2rem] font-bold text-white mt-1">{p.name}</h3>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[3.5rem] font-bold text-white tracking-tighter">{p.price}</span>
                </div>
                <div className="text-[0.7rem] font-bold text-white/40 tracking-widest uppercase mb-2">
                  {p.period}
                </div>
                <div className="text-[0.9rem] font-bold text-accent">
                  {p.credits}
                </div>
              </div>

              <div className="my-6 flex-1">
                <ul className="space-y-3">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check 
                        size={18} 
                        className={`mt-0.5 shrink-0 ${p.highlighted ? "text-accent" : "text-white/70"}`} 
                      />
                      <span className="text-[0.95rem] text-white/70 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  className={`w-full py-4 px-6 rounded-2xl text-[1rem] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    p.highlighted 
                      ? "bg-accent text-black shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:bg-accent/90 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] hover:-translate-y-1" 
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

