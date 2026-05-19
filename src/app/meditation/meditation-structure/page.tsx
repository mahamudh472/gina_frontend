"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Play, Clock, Loader2, ArrowLeft } from "lucide-react";
import { api, MeditationDetails } from "@/lib/api";

const STEP_TYPE_MAP: Record<string, { label: string; subtitle: string; color: string }> = {
  greeting: { label: "Begrüßung", subtitle: "Ein herzliches Willkommen", color: "#52B3FF" },
  personal: { label: "Persönlich", subtitle: "Deine persönliche Intention", color: "#c084fc" },
  introduction: { label: "Einführung", subtitle: "Atem & Ankommen", color: "#22d3ee" },
  suggestion: { label: "Vorschlag", subtitle: "Sanfte Führung", color: "#a3e635" },
  affirmation: { label: "Bestätigung", subtitle: "Affirmationen verankern", color: "#fb923c" },
  visualization: { label: "Visualisierung", subtitle: "Reise an deinen Kraftort", color: "#f43f5e" },
  conclusion: { label: "Abschluss", subtitle: "Rückkehr ins Hier & Jetzt", color: "#fbbf24" },
};

function formatStepDuration(durationStr: string) {
  const parts = durationStr.split(":");
  if (parts.length === 3) {
    const mins = parseInt(parts[1], 10);
    const secs = parseInt(parts[2], 10);
    if (mins === 0) return `${secs} Sek.`;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  return durationStr;
}

function MeditationStructureContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [meditation, setMeditation] = useState<MeditationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function loadMeditation() {
      try {
        setLoading(true);
        setError("");
        let targetId = id;

        if (!targetId) {
          // Fetch most recent meditation from archive
          const archiveRes = await api.meditation.getArchive(1, 1);
          if (archiveRes.results && archiveRes.results.length > 0) {
            targetId = archiveRes.results[0].id.toString();
          }
        }

        if (!targetId) {
          setError("Keine Meditationen gefunden. Bitte erstelle zuerst eine Meditation.");
          setLoading(false);
          return;
        }

        const details = await api.meditation.getDetails(targetId);
        setMeditation(details);
      } catch (err: any) {
        console.error("Failed to load meditation details:", err);
        setError(err.message || "Fehler beim Laden der Meditation. Bitte versuche es erneut.");
      } finally {
        setLoading(false);
      }
    }

    loadMeditation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 min-h-[60vh]">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-white/60">Struktur wird geladen...</p>
      </div>
    );
  }

  if (error || !meditation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 text-center px-6 min-h-[60vh] gap-6">
        <p className="text-red-400 font-bold text-lg max-w-md">{error || "Meditation nicht gefunden"}</p>
        <Link
          href="/meditation/neue-meditation"
          className="bg-accent text-[#0b0f17] px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
        >
          Neue Meditation erstellen
        </Link>
      </div>
    );
  }

  const segments = meditation.steps.map((step) => {
    const meta = STEP_TYPE_MAP[step.step_type] || { 
      label: step.step_type.charAt(0).toUpperCase() + step.step_type.slice(1), 
      subtitle: "Meditationsschritt", 
      color: "#fbbf24" 
    };
    return {
      label: meta.label,
      duration: formatStepDuration(step.duration),
      title: meta.label,
      subtitle: meta.subtitle,
      description: step.content,
      percentage: `${step.duration_percentage}%`,
      color: meta.color
    };
  });

  const activeSeg = segments[activeIndex] || segments[0];
  const totalMins = Math.floor(meditation.total_duration / 60);
  const totalSecs = Math.floor(meditation.total_duration % 60);

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
        <span>Gesamt: {totalMins} Min. {totalSecs} Sek.</span>
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
      {activeSeg && (
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
      )}

      {/* Begin Meditation Button */}
      <Link
        href={`/meditation/meditation-structure/audioplayer?id=${meditation.id}`}
        suppressHydrationWarning
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

export default function MeditationStructurePage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col items-center justify-center pt-32 min-h-[60vh]">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-white/60">Struktur wird geladen...</p>
      </div>
    }>
      <MeditationStructureContent />
    </Suspense>
  );
}
