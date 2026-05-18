"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Clock } from "lucide-react";

const segments = [
  { 
    label: "Begrüßung", 
    duration: "1:30", 
    title: "Begrüßung",
    subtitle: "Ein herzliches Willkommen",
    description: "Komme ganz bei dir an. Wir bereiten uns gemeinsam auf diese besondere Reise vor und lassen den Alltag hinter uns.",
    percentage: "7.5%",
    color: "#52B3FF" 
  },
  { 
    label: "Persönlich", 
    duration: "2:00", 
    title: "Persönlich",
    subtitle: "Deine persönliche Intention",
    description: "Wir stimmen die Meditation auf deine aktuelle Stimmung ab. Spüre in deinen Körper und setze deinen ganz persönlichen Fokus für heute.",
    percentage: "10.0%",
    color: "#c084fc" 
  },
  { 
    label: "Einführung", 
    duration: "2:30", 
    title: "Einführung",
    subtitle: "Atem & Ankommen",
    description: "Vertiefe deinen Atem. Mit jedem Einatmen nimmst du frische Energie auf, mit jedem Ausatmen lässt du verbrauchte Gedanken los.",
    percentage: "12.5%",
    color: "#22d3ee" 
  },
  { 
    label: "Vorschlag", 
    duration: "4:00", 
    title: "Vorschlag",
    subtitle: "Sanfte Führung",
    description: "Lasse dich von der Stimme tragen. Wir lenken deine Aufmerksamkeit auf die Entspannung deiner Muskeln und das Loslassen von Anspannung.",
    percentage: "20.0%",
    color: "#a3e635" 
  },
  { 
    label: "Bestätigung", 
    duration: "3:30", 
    title: "Bestätigung",
    subtitle: "Affirmationen verankern",
    description: "Positive Leitsätze stärken dein Unterbewusstsein. Wiederhole sie im Stillen und spüre, wie sie Vertrauen und Ruhe in dir ausbreiten.",
    percentage: "17.5%",
    color: "#fb923c" 
  },
  { 
    label: "Visualisierung", 
    duration: "4:30", 
    title: "Visualisierung",
    subtitle: "Reise an deinen Kraftort",
    description: "Stelle dir deinen stillen Bergsee vor. Nimm die Farben, die Luft und die vollkommene Ruhe dieses magischen Ortes in dich auf.",
    percentage: "22.5%",
    color: "#f43f5e" 
  },
  { 
    label: "Abschluss", 
    duration: "2:00", 
    title: "Abschluss",
    subtitle: "Rückkehr ins Hier & Jetzt",
    description: "Bringe die gewonnene Ruhe langsam zurück in deinen Tag. Nimm tiefe Atemzüge, bewege sanft deine Finger und öffne in deinem Tempo die Augen.",
    percentage: "10.0%",
    color: "#fbbf24" 
  },
];

export default function MeditationStructurePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSeg = segments[activeIndex];

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[950px] mx-auto px-6 pt-32 pb-16 animate-in fade-in duration-700">
      
      {/* "Deine Meditation ist bereit" Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#f2ca50]/30 bg-[#f2ca50]/5 text-[#f2ca50] text-[0.7rem] font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
        <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#f2ca50]/40 text-[#f2ca50]">
          <Play size={8} fill="currentColor" className="ml-[1px]" />
        </span>
        Deine Meditation ist bereit
      </div>

      {/* Page Title */}
      <h1 className="text-[2.5rem] md:text-[3.5rem] font-serif text-white text-center font-normal tracking-wide mb-3 leading-tight">
        Deine Meditationsstruktur
      </h1>
      
      {/* Total Duration */}
      <div className="flex items-center gap-1.5 justify-center text-[#f2ca50] text-[0.85rem] font-semibold mb-12">
        <Clock size={14} className="text-[#f2ca50]" />
        <span>Gesamt: 20 Min. 0 Sek.</span>
      </div>

      {/* Tabs Container */}
      <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl mb-8 flex flex-row justify-between gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {segments.map((seg, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 min-w-[95px] md:min-w-0 ${
                isActive
                  ? "bg-[#f2ca50] text-[#0b0f17] font-bold shadow-[0_4px_20px_rgba(242,202,80,0.25)] scale-[1.02]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-[0.8rem] font-bold tracking-wide whitespace-nowrap">{seg.label}</span>
              <span className={`text-[0.68rem] mt-0.5 font-semibold ${isActive ? "text-[#0b0f17]/70" : "text-white/40"}`}>{seg.duration}</span>
            </button>
          );
        })}
      </div>

      {/* Segment Detail Card */}
      <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] mb-12 relative overflow-hidden transition-all duration-500">
        
        {/* Card Header */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Glowing Orb */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center relative flex-shrink-0 border"
            style={{ 
              backgroundColor: `${activeSeg.color}15`,
              borderColor: `${activeSeg.color}30`
            }}
          >
            <div 
              className="w-3.5 h-3.5 rounded-full animate-pulse" 
              style={{ 
                backgroundColor: activeSeg.color,
                boxShadow: `0 0 15px ${activeSeg.color}`
              }}
            />
          </div>

          {/* Titles */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">
              {activeSeg.title}
            </h3>
            <span className="text-[#52B3FF] text-[0.85rem] font-bold tracking-wide">
              {activeSeg.subtitle}
            </span>
          </div>

          {/* Segment Duration Badge */}
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-[#f2ca50]/10 border border-[#f2ca50]/20 rounded-full text-[#f2ca50] text-[0.85rem] font-bold flex-shrink-0">
            <Clock size={12} />
            <span>{activeSeg.duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[0.95rem] md:text-[1.05rem] text-white/80 leading-relaxed font-normal mt-8 mb-10 max-w-[680px]">
          {activeSeg.description}
        </p>

        {/* Contribution Progress */}
        <div className="space-y-3.5 w-full">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(242,202,80,0.2)]"
              style={{ 
                width: activeSeg.percentage,
                background: `linear-gradient(90deg, #f2ca50 0%, ${activeSeg.color} 100%)`
              }}
            />
          </div>
          <span className="text-[0.75rem] text-white/40 font-semibold block">
            {activeSeg.percentage} der gesamten Sitzung
          </span>
        </div>

      </div>

      {/* Begin Meditation Button */}
      <Link
        href="/meditation/meditation-structure/audioplayer"
        className="inline-flex items-center gap-3 bg-[#f2ca50] text-[#0b0f17] px-10 py-4.5 rounded-full font-bold text-[1.1rem] transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] mb-4"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0b0f17] text-[#f2ca50] flex-shrink-0">
          <Play size={10} fill="currentColor" className="ml-[1.5px]" />
        </span>
        <span>Meditation beginnen</span>
      </Link>

    </div>
  );
}
