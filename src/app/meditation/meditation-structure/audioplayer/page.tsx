"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft, Headphones, Waves } from "lucide-react";

const segments = [
  { label: "Einleitung", duration: 180 },
  { label: "Atemübung", duration: 240 },
  { label: "Körper-Scan", duration: 360 },
  { label: "Visualisierung", duration: 480 },
  { label: "Entspannung", duration: 300 },
  { label: "Erwachen", duration: 180 },
];

const totalDuration = segments.reduce((a, s) => a + s.duration, 0);

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function AudioPlayerPage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // seconds
  const [volume, setVolume] = useState(80);

  const currentSegIdx = segments.findIndex((_, i) => {
    const start = segments.slice(0, i).reduce((a, s) => a + s.duration, 0);
    const end = start + segments[i].duration;
    return progress >= start && progress < end;
  });

  const progressPct = (progress / totalDuration) * 100;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setProgress(Math.round(pct * totalDuration));
  };

  return (
    <div className="p-10 md:p-12 max-w-[680px] w-full flex flex-col gap-7">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/meditation/meditation-structure" className="flex items-center gap-1.5 px-4 py-2 bg-white/7 border border-border rounded-pill text-text-muted text-[0.85rem] no-underline transition-all duration-200 hover:text-white hover:bg-white/12 flex-shrink-0">
          <ArrowLeft size={16} /> Zurück
        </Link>
        <h1 className="text-[1.3rem] font-extrabold text-white flex-1">Tiefe Entspannung</h1>
        <div className="w-[100px] hidden md:block" />
      </div>

      {/* Visualizer */}
      <div className="flex flex-col items-center gap-6">
        <div className={`w-[120px] h-[120px] rounded-full bg-[radial-gradient(circle,rgba(242,202,80,0.18)_0%,rgba(13,19,32,0)_70%)] border-2 border-accent/25 flex items-center justify-center transition-all duration-400 ${playing ? "animate-pulse border-accent/50 bg-[radial-gradient(circle,rgba(242,202,80,0.25)_0%,rgba(13,19,32,0)_70%)]" : ""}`}>
          <div className="w-20 h-20 rounded-full bg-accent/8 flex items-center justify-center">
            <Waves size={36} className="text-accent" />
          </div>
        </div>
        <div className="flex items-center gap-[3px] h-12 w-full md:flex hidden">
          {Array.from({ length: 48 }, (_, i) => (
            <div
              key={i}
              className={`flex-1 bg-accent rounded-[2px] min-h-[4px] transition-all duration-300 ${playing ? "animate-[waveAnim_1.2s_ease-in-out_infinite_alternate]" : ""}`}
              style={{
                height: `${20 + Math.sin(i * 0.5) * 18 + Math.random() * 12}px`,
                animationDelay: `${i * 0.04}s`,
                opacity: (i / 48) < progressPct / 100 ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[1.15rem] font-bold text-white">Tiefe Entspannung</span>
          <span className="text-[0.825rem] text-text-muted">Alexander · Ozeanwellen</span>
        </div>
        <span className="badge text-[0.75rem]"><Headphones size={12} />8D Audio</span>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="relative h-1.25 bg-white/10 rounded-pill cursor-pointer overflow-visible" onClick={handleSeek}>
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-[#fad84a] rounded-pill transition-all duration-200" style={{ width: `${progressPct}%` }} />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_8px_rgba(242,202,80,0.5)] transition-all duration-200" style={{ left: `${progressPct}%` }} />
          {/* Segment markers */}
          {segments.slice(0, -1).map((_, i) => {
            const pos = (segments.slice(0, i + 1).reduce((a, s) => a + s.duration, 0) / totalDuration) * 100;
            return <div key={i} className="absolute top-[-2px] w-[2px] h-[9px] bg-white/25 rounded-[1px] -translate-x-1/2" style={{ left: `${pos}%` }} />;
          })}
        </div>
        <div className="flex justify-between">
          <span className="text-[0.78rem] text-text-muted tabular-nums">{formatTime(progress)}</span>
          <span className="text-[0.78rem] text-text-muted tabular-nums">{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Segment indicator */}
      {currentSegIdx >= 0 && (
        <div className="text-center text-[0.85rem]">
          <span className="text-text-muted">Jetzt: </span>
          <span className="text-accent font-semibold">{segments[currentSegIdx].label}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-7">
        <button className="w-12 h-12 rounded-full bg-white/7 border border-border text-text-sub flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/14 hover:text-white" onClick={() => setProgress(Math.max(0, progress - 15))} aria-label="15s zurück">
          <SkipBack size={22} />
        </button>
        <button
          className="w-[68px] h-[68px] rounded-full bg-accent text-[#0b0f17] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-[0_0_24px_rgba(242,202,80,0.35)] hover:bg-[#fad84a] hover:shadow-[0_0_36px_rgba(242,202,80,0.55)] hover:scale-105"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Abspielen"}
        >
          {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>
        <button className="w-12 h-12 rounded-full bg-white/7 border border-border text-text-sub flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/14 hover:text-white" onClick={() => setProgress(Math.min(totalDuration, progress + 15))} aria-label="15s vor">
          <SkipForward size={22} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 justify-center">
        <Volume2 size={16} className="text-text-muted flex-shrink-0" />
        <div className="w-[180px]">
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="appearance-none w-full h-1 bg-white/15 rounded-[2px] outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
            aria-label="Lautstärke"
          />
        </div>
      </div>

      {/* Segment list */}
      <div className="flex flex-col gap-1.5 border-t border-border pt-5">
        {segments.map((seg, i) => {
          const start = segments.slice(0, i).reduce((a, s) => a + s.duration, 0);
          const active = i === currentSegIdx;
          return (
            <button
              key={i}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-md bg-transparent border border-transparent cursor-pointer transition-all duration-200 text-left hover:bg-white/5 ${active ? "!bg-accent/8 !border-accent/20" : ""}`}
              onClick={() => setProgress(start)}
            >
              <span className="text-[0.72rem] font-bold text-text-muted w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className={`flex-1 text-[0.875rem] font-medium text-text-sub ${active ? "text-accent" : ""}`}>{seg.label}</span>
              <span className="text-[0.78rem] text-text-muted">{formatTime(seg.duration)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

