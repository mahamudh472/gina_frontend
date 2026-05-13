"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Play, Clock, Calendar, Bookmark } from "lucide-react";

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
    <div className="px-5 py-12 md:px-15 max-w-[1200px] w-full flex flex-col gap-8 mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-[2.2rem] font-extrabold text-white tracking-tight">Meditationsarchiv</h1>
        <p className="text-[1rem] text-white/70">
          {meditations.length} Sitzungen · {meditations.filter(m => m.bookmarked).length} markiert
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative w-full">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          <input 
            className="w-full h-14 pl-13 pr-5 bg-[#23384b]/55 border border-white/15 rounded-2xl text-white text-[1rem] outline-none backdrop-blur-3xl transition-all duration-200 focus:border-accent/50 focus:bg-[#23384b]/65" 
            type="text" 
            placeholder="Suchen nach Titeln, Inhalten oder Themen..." 
          />
        </div>
        
        <div className="flex gap-3">
          {["Alle", "Gespeichert"].map((f) => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2.5 rounded-full text-[0.95rem] font-medium cursor-pointer transition-all duration-200 border border-white/10 bg-transparent text-white/75 ${activeFilter === f ? "!bg-accent !text-[#0b0f17] !border-accent" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meditations.map((m, i) => (
          <div key={i} className="relative bg-[#23384b]/45 border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 backdrop-blur-3xl transition-all duration-300 hover:bg-[#23384b]/55 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20_40_rgba(0,0,0,0.3)] group">
            <Bookmark 
              size={20} 
              className="absolute top-8 right-8 cursor-pointer transition-all duration-200 hover:scale-110" 
              fill={m.bookmarked ? "currentColor" : "none"} 
              style={{ color: m.bookmarked ? "#f2ca50" : "rgba(255, 255, 255, 0.4)" }}
            />
            
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <div className="w-3 h-3 rounded-full" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }} />
              </div>
              <h3 className="text-[1.5rem] font-bold text-white tracking-tight">{m.title}</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full text-[0.9rem] font-medium bg-accent/10 text-accent border border-accent/20">{m.category}</span>
            </div>

            <div className="flex items-center gap-5 text-white/50 text-[0.95rem]">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{m.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{m.duration}</span>
              </div>
              <div className="flex-1" />
              <span className="text-white/70 font-medium">{m.voice}</span>
            </div>

            <Link href="/meditation/meditation-structure/audioplayer" className="w-full h-[60px] flex items-center justify-center gap-3 bg-accent/5 border border-accent/30 rounded-[20px] text-accent text-[1.15rem] font-semibold transition-all duration-200 group-hover:bg-accent group-hover:text-[#0b0f17] group-hover:border-accent">
              <Play size={18} fill="currentColor" />
              Nochmals abspielen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

