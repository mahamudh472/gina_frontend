import Link from "next/link";
import { Play, Clock, ArrowLeft, Headphones } from "lucide-react";

const segments = [
  { label: "Einleitung & Ankommen", duration: "3 Min", color: "#f2ca50" },
  { label: "Atemübung", duration: "4 Min", color: "#7eb8c9" },
  { label: "Körper-Scan", duration: "6 Min", color: "#9b8fc7" },
  { label: "Geführte Visualisierung", duration: "8 Min", color: "#f2ca50" },
  { label: "Tiefe Entspannung", duration: "5 Min", color: "#7ec98a" },
  { label: "Sanftes Erwachen", duration: "3 Min", color: "#c9a07e" },
];

export default function MeditationStructurePage() {
  const totalMin = 29;

  return (
    <div className="p-10 md:p-12 max-w-[700px] w-full flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link href="/meditation/startseite" className="flex items-center gap-1.5 px-4 py-2 bg-white/7 border border-border rounded-pill text-text-muted text-[0.85rem] no-underline transition-all duration-200 hover:text-white hover:bg-white/12 flex-shrink-0">
          <ArrowLeft size={16} /> Zurück
        </Link>
        <h1 className="text-[1.5rem] font-extrabold text-white flex-1">Deine Meditation</h1>
        <span className="flex items-center gap-1.5 text-[0.875rem] text-text-muted flex-shrink-0"><Clock size={14} />{totalMin} Min</span>
      </div>

      {/* Meta card */}
      <div className="grid grid-cols-2 md:grid-cols-4 p-5 md:p-6 items-center glass-card gap-4 md:gap-0">
        <div className="flex flex-col gap-1 items-center text-center">
          <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-text-muted">Absicht</span>
          <span className="text-[0.9rem] font-semibold text-white">Tiefe Entspannung</span>
        </div>
        <div className="w-px h-9 bg-border hidden md:block mx-auto" />
        <div className="flex flex-col gap-1 items-center text-center">
          <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-text-muted">Stimme</span>
          <span className="text-[0.9rem] font-semibold text-white">Alexander</span>
        </div>
        <div className="w-px h-9 bg-border hidden md:block mx-auto" />
        <div className="flex flex-col gap-1 items-center text-center">
          <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-text-muted">Klang</span>
          <span className="text-[0.9rem] font-semibold text-white">Ozeanwellen</span>
        </div>
        <div className="w-px h-9 bg-border hidden md:block mx-auto" />
        <div className="flex flex-col gap-1 items-center text-center">
          <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-text-muted">Datum</span>
          <span className="text-[0.9rem] font-semibold text-white">Heute</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[1rem] font-bold text-text-muted uppercase tracking-widest">Struktur</h2>
        <div className="flex flex-col">
          {segments.map((seg, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0 pt-5">
                <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]" style={{ color: seg.color, background: seg.color }} />
                {i < segments.length - 1 && <div className="w-0.5 flex-1 min-h-[16px] bg-border my-1" />}
              </div>
              <div className="flex-1 flex items-center gap-3.5 px-5 py-3.5 mb-2.5 glass-card">
                <span className="text-[0.75rem] font-bold text-text-muted flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[0.9rem] font-semibold text-text-sub">{seg.label}</span>
                <span className="text-[0.8rem] text-text-muted flex-shrink-0">{seg.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Play CTA */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <Link href="/meditation/meditation-structure/audioplayer" className="btn-primary text-[1rem] px-10 py-4">
          <Play size={20} fill="currentColor" />
          Jetzt abspielen
        </Link>
        <span className="flex items-center gap-1.5 text-[0.78rem] text-text-muted">
          <Headphones size={14} /> Kopfhörer empfohlen für bestes Erlebnis
        </span>
      </div>
    </div>
  );
}

