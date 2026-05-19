"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Play, Heart, Loader2 } from "lucide-react";
import { api, MeditationArchiveResponse } from "@/lib/api";

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

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (secs === 0) return `${mins}:00 min`;
  return `${mins}:${secs.toString().padStart(2, "0")} min`;
}

export default function ArchivPage() {
  const [archiveData, setArchiveData] = useState<MeditationArchiveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Liked meditations state (local client state for heart button)
  const [likedIds, setLikedIds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadArchive() {
      try {
        setLoading(true);
        setError("");
        const res = await api.meditation.getArchive(currentPage, pageSize);
        setArchiveData(res);
      } catch (err: any) {
        console.error("Failed to load archive:", err);
        setError(err.message || "Fehler beim Laden des Portals. Bitte logge dich ein und versuche es erneut.");
      } finally {
        setLoading(false);
      }
    }
    loadArchive();
  }, [currentPage]);

  const stats = useMemo(() => {
    if (!archiveData) return { weekMins: 0, totalMins: 0, percentage: 0 };
    
    // Calculate last 7 days meditation time in seconds
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last7DaysSeconds = archiveData.results
      .filter((m) => new Date(m.created_at) >= sevenDaysAgo)
      .reduce((acc, m) => acc + m.total_duration, 0);

    const weekMins = Math.round(last7DaysSeconds / 60);
    const totalMins = Math.round(archiveData.overall_total_duration / 60);
    
    // Assume weekly goal is 120 minutes
    const goalMins = 120;
    const percentage = Math.min(100, Math.round((weekMins / goalMins) * 100));

    return { weekMins, totalMins, percentage };
  }, [archiveData]);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading && !archiveData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 min-h-[60vh]">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-white/60">Portal wird geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center pt-32 text-center px-6 min-h-[60vh] gap-6">
        <p className="text-red-400 font-bold text-lg max-w-md">{error}</p>
        <Link
          href="/login"
          className="bg-accent text-[#0b0f17] px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
        >
          Zum Login
        </Link>
      </div>
    );
  }

  const results = archiveData?.results || [];

  return (
    <div className="px-6 py-10 md:px-20 max-w-[1400px] w-full flex flex-col gap-10 mx-auto pt-28 min-h-screen">
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
            percentage={stats.percentage} 
            weekTime={`${stats.weekMins} Min.`} 
            totalTime={`${stats.totalMins} Min.`} 
          />
        </div>
      </div>

      {/* List Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[0.95rem] font-bold text-white/40 tracking-[0.25em] uppercase">
          Meine Meditationen
        </h2>

        {results.length === 0 ? (
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-12 text-center flex flex-col items-center gap-6">
            <p className="text-white/60 text-lg">Du hast noch keine Meditationen erstellt.</p>
            <Link
              href="/meditation/neue-meditation"
              className="bg-accent text-[#0b0f17] px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105"
            >
              Erste Meditation erstellen
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((m) => {
              const isLiked = !!likedIds[m.id];
              return (
                <div 
                  key={m.id} 
                  className="group relative bg-white/[0.05] border border-white/10 rounded-[2rem] p-3 flex items-center gap-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.09] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                >
                  {/* Thumbnail */}
                  <Link 
                    href={`/meditation/meditation-structure?id=${m.id}`}
                    className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-[1.2rem] overflow-hidden shadow-2xl border border-white/10 relative cursor-pointer"
                  >
                    <img 
                      src={m.banner_url || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&h=400&auto=format&fit=crop"} 
                      alt={m.category_name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-4 py-1">
                    <div className="flex flex-col gap-1">
                      <Link 
                        href={`/meditation/meditation-structure?id=${m.id}`}
                        className="text-xl md:text-2xl font-bold text-white tracking-tight hover:text-accent transition-colors cursor-pointer"
                      >
                        {m.category_name} Meditation
                      </Link>
                      <p className="text-white/40 text-[0.9rem] font-medium">
                        Erstellt am: {formatDate(m.created_at)} · Dauer: {formatDuration(m.total_duration)}
                      </p>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full max-w-[95%] flex flex-col gap-2">
                      <div className="w-full h-[2.5px] bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent relative"
                          style={{ width: `100%` }} // Archive item implies fully generated
                        >
                          <div className="absolute top-0 right-0 w-4 h-full bg-white/40 blur-[4px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-5 pr-4">
                    <Link 
                      href={`/meditation/meditation-structure/audioplayer?id=${m.id}`} 
                      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-accent rounded-full text-[#0b0f17] shadow-[0_10px_25px_rgba(242,202,80,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_35px_rgba(242,202,80,0.5)] active:scale-95"
                    >
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </Link>
                    <button 
                      onClick={() => toggleLike(m.id)}
                      className="text-white/40 hover:text-accent transition-all duration-300 transform hover:scale-110"
                    >
                      <Heart 
                        size={28} 
                        fill={isLiked ? "#f2ca50" : "none"} 
                        className={isLiked ? "text-accent" : "text-white/60"} 
                        strokeWidth={isLiked ? 0 : 2}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {archiveData && archiveData.count > pageSize && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!archiveData.previous || loading}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                archiveData.previous && !loading
                  ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  : "bg-white/5 border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              Vorherige
            </button>
            <span className="text-white/60 font-semibold self-center">
              Seite {currentPage} von {Math.ceil(archiveData.count / pageSize)}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!archiveData.next || loading}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all border ${
                archiveData.next && !loading
                  ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  : "bg-white/5 border-white/5 text-white/20 cursor-not-allowed"
              }`}
            >
              Nächste
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
