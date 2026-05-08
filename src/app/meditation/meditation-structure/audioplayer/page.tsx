"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft, Headphones, Waves } from "lucide-react";
import styles from "./page.module.css";

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
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/meditation/meditation-structure" className={styles.backBtn}>
          <ArrowLeft size={16} /> Zurück
        </Link>
        <h1 className={styles.title}>Tiefe Entspannung</h1>
        <div className={styles.headerSpacer} />
      </div>

      {/* Visualizer */}
      <div className={styles.visualizerWrap}>
        <div className={`${styles.orb} ${playing ? styles.orbPlaying : ""}`}>
          <div className={styles.orbInner}>
            <Waves size={36} className={styles.orbIcon} />
          </div>
        </div>
        <div className={styles.waveform}>
          {Array.from({ length: 48 }, (_, i) => (
            <div
              key={i}
              className={`${styles.waveBar} ${playing ? styles.waveAnimated : ""}`}
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
      <div className={styles.trackInfo}>
        <div className={styles.trackMeta}>
          <span className={styles.trackTitle}>Tiefe Entspannung</span>
          <span className={styles.trackVoice}>Alexander · Ozeanwellen</span>
        </div>
        <span className={`${styles.qualityBadge} badge`}><Headphones size={12} />8D Audio</span>
      </div>

      {/* Progress */}
      <div className={styles.progressSection}>
        <div className={styles.progressBar} onClick={handleSeek}>
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          <div className={styles.progressThumb} style={{ left: `${progressPct}%` }} />
          {/* Segment markers */}
          {segments.slice(0, -1).map((_, i) => {
            const pos = (segments.slice(0, i + 1).reduce((a, s) => a + s.duration, 0) / totalDuration) * 100;
            return <div key={i} className={styles.segMarker} style={{ left: `${pos}%` }} />;
          })}
        </div>
        <div className={styles.timeRow}>
          <span className={styles.timeLabel}>{formatTime(progress)}</span>
          <span className={styles.timeLabel}>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Segment indicator */}
      {currentSegIdx >= 0 && (
        <div className={styles.segIndicator}>
          <span className={styles.segNow}>Jetzt: </span>
          <span className={styles.segName}>{segments[currentSegIdx].label}</span>
        </div>
      )}

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.ctrlBtn} onClick={() => setProgress(Math.max(0, progress - 15))} aria-label="15s zurück">
          <SkipBack size={22} />
        </button>
        <button
          className={styles.playBtn}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Abspielen"}
        >
          {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>
        <button className={styles.ctrlBtn} onClick={() => setProgress(Math.min(totalDuration, progress + 15))} aria-label="15s vor">
          <SkipForward size={22} />
        </button>
      </div>

      {/* Volume */}
      <div className={styles.volumeRow}>
        <Volume2 size={16} className={styles.volIcon} />
        <div className={styles.volumeTrack}>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className={styles.volumeInput}
            aria-label="Lautstärke"
          />
        </div>
      </div>

      {/* Segment list */}
      <div className={styles.segList}>
        {segments.map((seg, i) => {
          const start = segments.slice(0, i).reduce((a, s) => a + s.duration, 0);
          const active = i === currentSegIdx;
          return (
            <button
              key={i}
              className={`${styles.segItem} ${active ? styles.segActive : ""}`}
              onClick={() => setProgress(start)}
            >
              <span className={styles.segNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.segLabel}>{seg.label}</span>
              <span className={styles.segDur}>{formatTime(seg.duration)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
