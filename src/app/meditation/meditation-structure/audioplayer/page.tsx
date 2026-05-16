"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Repeat, 
  Volume2, 
  Music2, 
  Wind,
  Mic2
} from "lucide-react";

export default function AudioPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [musicLevel, setMusicLevel] = useState(50);
  const [natureLevel, setNatureLevel] = useState(75);
  const [isLiked, setIsLiked] = useState(false);

  // Mock duration
  const totalDuration = 1200; // 20:00 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < totalDuration ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatRemaining = (seconds: number) => {
    const remaining = totalDuration - seconds;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `-${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 gap-5 max-w-4xl mx-auto w-full">
      
      {/* Top Card: Player Info & Visualization */}
      <div className="glass-card w-full p-6 md:p-10 flex flex-col items-center relative overflow-hidden rounded-[2rem]">
        {/* Favorite Button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-6 right-6 transition-all duration-300 hover:scale-110 ${isLiked ? "text-accent fill-accent" : "text-white/40 hover:text-white"}`}
        >
          <Heart size={24} />
        </button>

        {/* Orb Visualizer */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-6 mt-2">
          {/* Animated Ripples */}
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`absolute border border-accent/20 rounded-full transition-all duration-[2000ms] ease-out pointer-events-none ${
                isPlaying ? "animate-[ripple_4s_infinite]" : "opacity-20"
              }`}
              style={{ 
                width: `${i * 25}%`, 
                height: `${i * 25}%`,
                animationDelay: `${i * 1000}ms`,
                opacity: 0.3 - (i * 0.05)
              }}
            />
          ))}
          
          {/* Main Glowing Orb */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Inner Glow */}
            <div className={`absolute inset-0 bg-accent rounded-full blur-2xl opacity-40 transition-all duration-1000 ${isPlaying ? "scale-150" : "scale-100"}`} />
            {/* Orb Body */}
            <div className="relative w-16 h-16 bg-[radial-gradient(circle_at_30%_30%,#fff5d6_0%,#f2ca50_40%,#d4a930_100%)] rounded-full shadow-[0_0_50px_rgba(242,202,80,0.7),inset_-3px_-3px_10px_rgba(0,0,0,0.3)]">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/60 rounded-full blur-[1.5px]" />
            </div>
          </div>
          
          {/* Concentric Ellipses (as seen in image) */}
          <div className="absolute w-[200px] h-[100px] border border-accent/15 rounded-[100%] rotate-0 opacity-40" />
          <div className="absolute w-[250px] h-[125px] border border-accent/10 rounded-[100%] rotate-0 opacity-20" />
        </div>

        {/* Text Information */}
        <div className="text-center flex flex-col items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            Meditation für inneren Frieden
          </h1>
          <p className="text-text-muted text-base font-medium">
            Geführt von Serena - 20:00
          </p>
          
          <div className="mt-1 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Begrüßung</span>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="w-full mt-8 flex flex-col gap-2.5">
          <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden group cursor-pointer">
            <div 
              className="absolute h-full bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(242,202,80,0.5)]" 
              style={{ width: `${(progress / totalDuration) * 100}%` }}
            />
            {/* Markers */}
            {[0.2, 0.4, 0.6, 0.8].map((m) => (
              <div key={m} className="absolute h-full w-[2px] bg-white/20" style={{ left: `${m * 100}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-white/50 text-xs font-medium tabular-nums">
            <span>{formatTime(progress)}</span>
            <span>{formatRemaining(progress)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Card: Controls & Mixer */}
      <div className="glass-card w-full p-6 md:p-8 flex flex-col gap-8 rounded-[2rem]">
        
        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <button className="text-white/40 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-accent text-bg-deep flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(242,202,80,0.4)] hover:scale-105 hover:bg-accent-dark group"
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>
          
          <button className="text-white/40 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
        </div>

        {/* Feature Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureToggle 
            title="Affirmationen" 
            description="Bestätigungsabschnitt wiederholen" 
            icon={<Mic2 size={16} />} 
          />
          <FeatureToggle 
            title="Suggestionen" 
            description="Vorschlagsabschnitt wiederholen" 
            icon={<Repeat size={16} />} 
          />
          <FeatureToggle 
            title="Visualisierung" 
            description="Vorschlagsabschnitt wiederholen" 
            icon={<Repeat size={16} />} 
          />
        </div>

        {/* Audio Mixer */}
        <div className="flex flex-col gap-5 pt-3 border-t border-white/5">
          <MixerSlider 
            icon={<Volume2 size={18} />} 
            value={volume} 
            onChange={setVolume} 
            label="Hauptstimme"
          />
          <MixerSlider 
            icon={<Music2 size={18} />} 
            value={musicLevel} 
            onChange={setMusicLevel} 
            label="Hintergrundmusik"
          />
          <MixerSlider 
            icon={<Wind size={18} />} 
            value={natureLevel} 
            onChange={setNatureLevel} 
            label="Naturgeräusche"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureToggle({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  const [isLooping, setIsLooping] = useState(false);
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-white/80 font-bold text-sm tracking-wide">{title}</span>
        <button 
          onClick={() => setIsLooping(!isLooping)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${
            isLooping 
            ? "bg-accent/20 border-accent text-accent shadow-[0_0_10px_rgba(242,202,80,0.2)]" 
            : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
          }`}
        >
          <Repeat size={10} />
          LOOP
        </button>
      </div>
      <p className="text-white/30 text-[11px] leading-tight">
        {description}
      </p>
    </div>
  );
}

function MixerSlider({ icon, value, onChange, label }: { icon: React.ReactNode, value: number, onChange: (v: number) => void, label: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="text-white/40 group-hover:text-accent transition-colors duration-300">
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </div>
      <div className="flex-1 relative h-1 flex items-center">
        <div className="absolute w-full h-full bg-white/10 rounded-full" />
        <div 
          className="absolute h-full bg-accent rounded-full shadow-[0_0_8px_rgba(242,202,80,0.3)] transition-all duration-100" 
          style={{ width: `${value}%` }} 
        />
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          aria-label={label}
        />
      </div>
      <span className="text-white/40 text-[10px] font-bold tabular-nums w-7 text-right group-hover:text-white transition-colors">
        {value}%
      </span>
    </div>
  );
}

