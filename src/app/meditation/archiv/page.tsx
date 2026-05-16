"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Heart } from "lucide-react";

const meditations = [
  { 
    id: 1,
    title: "Innere Ruhe Meditation", 
    date: "15. April 2026", 
    duration: "20:00 min", 
    progress: 75,
    liked: false,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&h=400&auto=format&fit=crop"
  },
  { 
    id: 2,
    title: "Inner Peace", 
    date: "15. April 2026", 
    duration: "20:00 min", 
    progress: 65,
    liked: true,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&h=400&auto=format&fit=crop"
  },
  { 
    id: 3,
    title: "Inner Peace", 
    date: "15. April 2026", 
    duration: "20:00 min", 
    progress: 70,
    liked: false,
    image: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=400&h=400&auto=format&fit=crop"
  },
  { 
    id: 4,
    title: "Inner Peace", 
    date: "15. April 2026", 
    duration: "20:00 min", 
    progress: 68,
    liked: false,
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=400&h=400&auto=format&fit=crop"
  }
];

function CircularProgress({ percentage, weekTime, totalTime }: { percentage: number, weekTime: string, totalTime: string }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#f2ca50"
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="text-white/60 text-[0.95rem]">
          Diese Woche meditiert: <span className="text-accent font-bold">{weekTime}</span>
        </div>
        <div className="text-white/60 text-[0.95rem]">
          Gesamtzeit: <span className="text-accent font-bold">{totalTime}</span>
        </div>
      </div>
    </div>
  );
}

export default function ArchivPage() {
  return (
    <div className="px-6 py-10 md:px-20 max-w-[1400px] w-full flex flex-col gap-10 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tight uppercase leading-tight">
            Dein Visulara Portal
          </h1>
          <div className="flex items-center gap-3 text-lg">
            <span className="text-white/60 font-medium">Status:</span>
            <span className="text-accent font-bold">Premium Mitglied</span>
          </div>
        </div>
        
        <div className="lg:pr-10">
          <CircularProgress 
            percentage={65} 
            weekTime="120 Min." 
            totalTime="450 Min." 
          />
        </div>
      </div>

      {/* List Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[0.95rem] font-bold text-white/40 tracking-[0.25em] uppercase">
          Meine Meditationen
        </h2>

        <div className="flex flex-col gap-4">
          {meditations.map((m) => (
            <div 
              key={m.id} 
              className="group relative bg-white/[0.05] border border-white/10 rounded-[2rem] p-3 flex items-center gap-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.09] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-[1.2rem] overflow-hidden shadow-2xl border border-white/10 relative">
                <img 
                  src={m.image} 
                  alt={m.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-4 py-1">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {m.title}
                  </h3>
                  <p className="text-white/40 text-[0.9rem] font-medium">
                    Erstellt am: {m.date} . Dauer: {m.duration}
                  </p>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full max-w-[95%] flex flex-col gap-2">
                  <div className="w-full h-[2.5px] bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent relative"
                      style={{ width: `${m.progress}%` }}
                    >
                      <div className="absolute top-0 right-0 w-4 h-full bg-white/40 blur-[4px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-5 pr-4">
                <Link 
                  href="/meditation/meditation-structure/audioplayer" 
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-accent rounded-full text-[#0b0f17] shadow-[0_10px_25px_rgba(242,202,80,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_35px_rgba(242,202,80,0.5)] active:scale-95"
                >
                  <Play size={24} fill="currentColor" className="ml-1" />
                </Link>
                <button className="text-white/40 hover:text-accent transition-all duration-300 transform hover:scale-110">
                  <Heart 
                    size={28} 
                    fill={m.liked ? "#f2ca50" : "none"} 
                    className={m.liked ? "text-accent" : "text-white/60"} 
                    strokeWidth={m.liked ? 0 : 2}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

