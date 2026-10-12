"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ArrowLeft, X, Shield, Flame, Sparkles, Sun, Wind, Heart, 
  Zap, Star, Loader2, ChevronRight, ChevronLeft, Play, Pause, CloudRain, 
  Waves, VolumeX, UserPlus, Compass, Gem, Lightbulb, ArrowRight 
} from "lucide-react";
import { api, CharacterVoice, NatureSound, BackgroundImage, GenerateMeditationResponse } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

// ─── Step data ───────────────────────────────────────────────────────────────
const INTENTIONS = [
  {
    id: "identitaet",
    label: "Identität",
    sub: "Ich lebe meine Welt, so wie sie mir gefällt.",
    image: "/0%20Intensionen/identitaet.jpg",
    category: "relaxation",
  },
  {
    id: "emotion",
    label: "Emotion",
    sub: "Verbinde dich mit deinen Gefühlen und stärke dein Herz.",
    image: "/0%20Intensionen/Emotion.jpg",
    category: "self_love",
  },
  {
    id: "heilung",
    label: "Heilung",
    sub: "Lasse los, was dich belastet und heile dein Inneres.",
    image: "/0%20Intensionen/Heilung.jpg",
    category: "inner_peace",
  },
  {
    id: "zukunft",
    label: "Zukunft",
    sub: "Erschaffe dein Wunschleben und ziehe es in deine Zukunft.",
    image: "/0%20Intensionen/zukunft-gestalten.jpg",
    category: "transformation",
  },
  {
    id: "energie",
    label: "Energie",
    sub: "Aktiviere deine Kraft, finde Klarheit und neue Motivation.",
    image: "/0%20Intensionen/Energie.jpg",
    category: "energy",
  },
  {
    id: "alltag",
    label: "Alltag",
    sub: "Unterstützung für Deinen Alltag und mehr Leichtigkeit in Deinem Leben.",
    image: "/0%20Intensionen/Alltag.jpg",
    category: "focus_clarity",
  },
];

const INTENTION_TO_CATEGORY: Record<string, string> = {
  identitaet: "relaxation",
  emotion: "self_love",
  heilung: "inner_peace",
  zukunft: "transformation",
  energie: "energy",
  alltag: "focus_clarity",
  entspannung: "relaxation",
  selbstliebe: "self_love",
  fokus: "focus_clarity",
  dankbarkeit: "gratitude",
  vertrauen: "trust",
  transformation: "transformation",
  frieden: "inner_peace",
};

function Waveform() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-10 mb-8">
      {[0.4, 0.6, 0.3, 0.8, 0.5, 0.9, 1, 0.7, 0.8, 0.4, 0.9, 0.6, 0.4, 0.7, 0.5].map((h, i) => (
        <div 
          key={i} 
          className="w-[3px] bg-[#42C3FF] rounded-full transition-all duration-500" 
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  );
}

const TENSION_SPOTS = ["Kiefer & Gesicht", "Schultern & Nacken", "Brust & Herz", "Oberer Rücken", "Unterer Rücken", "Hände & Arme", "Bauch", "Hüfte & Becken", "Oberschenkel", "Knie & Gelenke", "Waden", "Füße"];

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ current, subStep }: { current: number; subStep?: number }) {
  const steps = ["1. Absicht", "2. Stimme", "3. Erfahrung", "4. Erzeugen"];
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Step buttons */}
      <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto max-w-full justify-center px-4 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((s, i) => {
          const isActive = i === current;
          return (
            <div
              key={i}
              className={`px-5 sm:px-6 py-2 rounded-full text-[0.85rem] sm:text-[0.95rem] font-semibold transition-all duration-300 flex-shrink-0 ${
                isActive
                  ? "bg-[#F2CA50] text-[#0b0f17] shadow-[0_4px_16px_rgba(242,202,80,0.3)]"
                  : "bg-black/40 text-white/70 border border-white/5 backdrop-blur-sm"
              }`}
            >
              {s}
            </div>
          );
        })}
      </div>

      {/* 6 Dots below */}
      <div className="flex items-center gap-2.5 mt-1">
        {[0, 1, 2, 3, 4, 5].map((dot) => {
          const isDotActive = subStep !== undefined ? dot === subStep : dot === current;
          return (
            <div
              key={dot}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isDotActive ? "bg-white/90 scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/20"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 1: Intention ────────────────────────────────────────────────────────
function StepIntention({
  selected,
  onSelect,
  onNext,
}: {
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center w-full max-w-[1300px] animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4">
      <h2 className="text-[clamp(2.4rem,5.5vw,3.8rem)] font-serif text-white text-center mb-2 tracking-tight leading-tight">
        Wähle <span className="text-[#F2CA50]">Deine</span> Intention
      </h2>
      <p className="text-[0.95rem] sm:text-[1.1rem] text-white/80 text-center mb-10 max-w-[650px] font-normal">
        Wähle das Thema, das heute mit dir in Resonanz steht.
      </p>

      {/* 6 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 w-full">
        {INTENTIONS.map((item) => {
          const { id, label, sub, image } = item;
          const isActive = selected === id;
          return (
            <button
              key={id}
              type="button"
              className={`group relative flex flex-col justify-end text-center rounded-[1.25rem] sm:rounded-[1.4rem] overflow-hidden transition-all duration-300 cursor-pointer min-h-[350px] sm:min-h-[400px] lg:min-h-[390px] xl:min-h-[420px] p-3 pb-5 ${
                isActive
                  ? "border-2 border-[#F2CA50] shadow-[0_0_30px_rgba(242,202,80,0.35)] scale-[1.03] ring-1 ring-[#F2CA50]/50"
                  : "border border-amber-500/20 hover:border-amber-400/60 hover:scale-[1.02] shadow-lg shadow-black/40"
              }`}
              onClick={() => onSelect(id)}
            >
              {/* Card Image */}
              <img
                src={image}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

              {/* Active subtle tint */}
              {isActive && (
                <div className="absolute inset-0 bg-[#F2CA50]/5 pointer-events-none" />
              )}

              {/* Content at the bottom */}
              <div className="relative z-10 flex flex-col items-center px-1">
                <h3 className="font-serif text-[1.2rem] sm:text-[1.3rem] text-white font-medium mb-1 drop-shadow-md">
                  {label}
                </h3>
                <p className="text-[0.72rem] sm:text-[0.78rem] text-white/80 leading-snug font-normal drop-shadow">
                  {sub}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex flex-col items-center mt-12 w-full px-4 sm:px-0">
        <button
          type="button"
          className={`px-14 py-3 rounded-full font-semibold text-[1.1rem] transition-all duration-300 min-w-[200px] ${
            selected
              ? "bg-[#F2CA50] text-[#0b0f17] shadow-[0_8px_25px_rgba(242,202,80,0.35)] hover:scale-105 hover:bg-[#e0b83e] cursor-pointer"
              : "bg-[#F2CA50]/40 text-[#0b0f17]/60 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selected}
        >
          weiter
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Voice ────────────────────────────────────────────────────────────
const DEFAULT_VOICES: CharacterVoice[] = [
  {
    id: 1,
    name: "Alexander",
    file: "",
    short_description: "Tief · Warm · Ruhig · Erdend",
    avatar_url: "/voice-alexander.jpg",
    tags: "Tief, Warm, Ruhig, Erdend",
  },
  {
    id: 2,
    name: "Serena",
    file: "",
    short_description: "Sanft · Klar · Weich · Weit",
    avatar_url: "/voice-serena.jpg",
    tags: "Sanft, Klar, Weich, Weit",
  },
];

function StepVoice({ 
  selected, 
  onSelect, 
  onNext, 
  voices 
}: { 
  selected: number | null; 
  onSelect: (id: number) => void; 
  onNext: () => void; 
  voices: CharacterVoice[];
}) {
  const [playingVoiceId, setPlayingVoiceId] = useState<number | null>(null);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
      }
    };
  }, [audioInstance]);

  const displayVoices = voices && voices.length >= 2 ? voices : DEFAULT_VOICES;

  const alexander = displayVoices.find((v) => v.name.toLowerCase().includes("alexander")) || displayVoices[0];
  const serena = displayVoices.find((v) => v.name.toLowerCase().includes("serena")) || displayVoices[1] || displayVoices[0];

  const handleTogglePlay = (e: React.MouseEvent, v: CharacterVoice) => {
    e.stopPropagation();
    if (!v.file) return;
    if (playingVoiceId === v.id) {
      if (audioInstance) {
        audioInstance.pause();
      }
      setPlayingVoiceId(null);
    } else {
      if (audioInstance) {
        audioInstance.pause();
      }
      const audio = new Audio(v.file);
      audio.play().catch((err) => console.error("Audio preview failed", err));
      audio.onended = () => {
        setPlayingVoiceId(null);
      };
      setAudioInstance(audio);
      setPlayingVoiceId(v.id);
    }
  };

  const isAlexanderActive = selected === alexander.id;
  const isSerenaActive = selected === serena.id;

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
      {/* Title */}
      <h2 className="text-[clamp(2.4rem,5.5vw,3.8rem)] font-serif text-white text-center mb-2 tracking-tight leading-tight">
        Wähle eine <span className="text-[#F2CA50]">Stimme,</span> die dich begleitet
      </h2>
      <p className="text-[0.95rem] sm:text-[1.1rem] text-white/80 text-center mb-10 max-w-[650px] font-normal">
        Spüre, welche Stimme sich für deine heutige Meditation richtig anfühlt.
      </p>

      {/* Outer Card Container */}
      <div className="w-full max-w-[820px] bg-[#0c141e]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
          {/* ─── Card 1: Alexander ────────────────────────────────────────── */}
          <div
            onClick={() => onSelect(alexander.id)}
            className={`group relative flex flex-col items-center p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 text-center overflow-hidden border ${
              isAlexanderActive
                ? "bg-[#141b25]/90 border-[#F2CA50] shadow-[0_0_35px_rgba(242,202,80,0.25)] ring-1 ring-[#F2CA50]/50 scale-[1.01]"
                : "bg-[#0e1622]/70 border-[#C59B27]/30 hover:border-[#F2CA50]/60 hover:bg-[#121926]/80"
            }`}
          >
            {/* Top Emblem */}
            <div className="w-12 h-12 rounded-full border border-[#C59B27]/60 flex items-center justify-center mb-5 bg-[#C59B27]/10 text-[#F2CA50]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="3.5" r="0.75" fill="currentColor" />
                <circle cx="10" cy="4.8" r="0.6" fill="currentColor" />
                <circle cx="14" cy="4.8" r="0.6" fill="currentColor" />
                <path d="M12 6.5L6.5 17H17.5L12 6.5Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11L9.2 17H14.8L12 11Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Circular Portrait */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#C59B27]/70 p-0.5 shadow-[0_0_25px_rgba(242,202,80,0.2)] mb-5 overflow-hidden">
              <img
                src={alexander.avatar_url || "/voice-alexander.jpg"}
                alt="Alexander"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F2CA50]/20 to-transparent mix-blend-color pointer-events-none rounded-full" />
            </div>

            {/* Name */}
            <h3 className="font-serif text-[1.55rem] sm:text-[1.75rem] text-[#F2CA50] font-normal tracking-wide mb-2">
              Alexander
            </h3>

            {/* Waveform */}
            <div 
              className="flex items-center justify-center gap-[2.5px] h-6 my-2 cursor-pointer"
              onClick={(e) => handleTogglePlay(e, alexander)}
            >
              {[2, 3, 4, 3, 2, 4, 6, 9, 14, 18, 12, 8, 5, 3, 3, 3, 3, 3, 4, 6, 12, 16, 11, 7, 4, 3, 2, 2].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-[#F2CA50] rounded-full transition-all duration-300"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Tags */}
            <p className="text-[0.76rem] sm:text-[0.8rem] text-white/70 font-normal tracking-wider mt-2">
              Tief  ·  Warm  ·  Ruhig  ·  Erdend
            </p>
          </div>

          {/* ─── Card 2: Serena ───────────────────────────────────────────── */}
          <div
            onClick={() => onSelect(serena.id)}
            className={`group relative flex flex-col items-center p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 text-center overflow-hidden border ${
              isSerenaActive
                ? "bg-[#141b25]/90 border-[#38bdf8] shadow-[0_0_35px_rgba(56,189,248,0.25)] ring-1 ring-[#38bdf8]/50 scale-[1.01]"
                : "bg-[#0e1622]/70 border-[#38bdf8]/30 hover:border-[#38bdf8]/60 hover:bg-[#121926]/80"
            }`}
          >
            {/* Top Emblem */}
            <div className="w-12 h-12 rounded-full border border-[#38bdf8]/50 flex items-center justify-center mb-5 bg-[#38bdf8]/10 text-[#38bdf8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="3.5" r="0.75" fill="currentColor" />
                <circle cx="12" cy="5.2" r="0.55" fill="currentColor" />
                <path d="M12 7C9.5 10 9.5 14 12 17C14.5 14 14.5 10 12 7Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C8.5 11.5 6.5 14 7.5 16.5C9.5 17 11 16.5 12 17" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C15.5 11.5 17.5 14 16.5 16.5C14.5 17 13 16.5 12 17" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 16.5C8 18 10 18.5 12 18.5C14 18.5 16 18.0 18 16.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Circular Portrait */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#38bdf8]/60 p-0.5 shadow-[0_0_25px_rgba(56,189,248,0.2)] mb-5 overflow-hidden">
              <img
                src={serena.avatar_url || "/voice-serena.jpg"}
                alt="Serena"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Name */}
            <h3 className="font-serif text-[1.55rem] sm:text-[1.75rem] text-[#e0f2fe] font-normal tracking-wide mb-2">
              Serena
            </h3>

            {/* Waveform */}
            <div 
              className="flex items-center justify-center gap-[2.5px] h-6 my-2 cursor-pointer"
              onClick={(e) => handleTogglePlay(e, serena)}
            >
              {[2, 3, 4, 3, 2, 4, 6, 9, 14, 18, 12, 8, 5, 3, 3, 3, 3, 3, 4, 6, 12, 16, 11, 7, 4, 3, 2, 2].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-[#60a5fa] rounded-full transition-all duration-300"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Tags */}
            <p className="text-[0.76rem] sm:text-[0.8rem] text-white/70 font-normal tracking-wider mt-2">
              Sanft  ·  Klar  ·  Weich  ·  Weit
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex flex-col items-center mt-12 w-full px-4 sm:px-0">
        <button
          type="button"
          className={`px-14 py-3 rounded-full font-semibold text-[1.1rem] transition-all duration-300 min-w-[200px] ${
            selected
              ? "bg-[#F2CA50] text-[#0b0f17] shadow-[0_8px_25px_rgba(242,202,80,0.35)] hover:scale-105 hover:bg-[#e0b83e] cursor-pointer"
              : "bg-[#F2CA50]/40 text-[#0b0f17]/60 cursor-not-allowed"
          }`}
          onClick={onNext}
          disabled={!selected}
        >
          weiter
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Experience ───────────────────────────────────────────────────────
const PERSPECTIVE_CARDS = [
  {
    id: "mein_zuk_ich",
    title: "Mein zukünftiges Ich",
    question: "Stell dir dich selbst in deinem gewünschten Leben vor.",
    prompt: "Wie bist du? Wie lebst du? Was ist dir wichtig?",
    image: "/1-identitaet/mein_zuk_ich.jpg",
    iconType: "user-plus",
  },
  {
    id: "role_model",
    title: "Mein Role Model",
    question: "Denke an einen Menschen, der dich inspiriert.",
    prompt: "Wer ist dein Vorbild? Was bewunderst du an ihm",
    image: "/1-identitaet/role_model.jpg",
    iconType: "star",
  },
  {
    id: "beste_vision",
    title: "Die beste Version meiner selbst",
    question: "Entfalte dein volles Potential und lebe deine Stärke",
    prompt: "",
    image: "/1-identitaet/beste_vision.jpg",
    iconType: "gem",
  },
  {
    id: "wer_moechte_ich_sein",
    title: "Wer möchte ich sein",
    question: "Klare Ausrichtung auf deine Werte und deinen Weg.",
    prompt: "",
    image: "/1-identitaet/wer-moechte_ich_sein.jpg",
    iconType: "compass",
  },
];

const INTENTION_CATEGORY_TABS = [
  { id: "identitaet", label: "IDENTITÄT", color: "#70C4DC" },
  { id: "emotionen", label: "EMOTIONEN", color: "#E2E785" },
  { id: "heilung", label: "HEILUNG", color: "#7CE4B5" },
  { id: "zukunft", label: "ZUKUNFT", color: "#E8C68A" },
  { id: "energie", label: "ENERGIE", color: "#D4F164" },
  { id: "alltag", label: "ALLTAG", color: "#CCA6EC" },
];

function CategoryTabIcon({ id, color }: { id: string; color: string }) {
  if (id === "identitaet") {
    return (
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Heart head with chevron */}
        <path d="M16 14.5c-2.4-2.8-5.2-1.5-5.2 1.5 0 2.5 3 4.5 5.2 6.5 2.2-2 5.2-4 5.2-6.5 0-3-2.8-4.3-5.2-1.5z" />
        <path d="M14.2 15l1.8 1.8 2.2-2.2" />
        {/* Torso & shoulders with inner vertical slits */}
        <path d="M7.5 26.5v-3c0-2.4 2-4 4.5-4 1.8 0 2.8 1.6 4 1.6s2.2-1.6 4-1.6c2.5 0 4.5 1.6 4.5 4v3" />
        <path d="M11 26.5v-3" />
        <path d="M21 26.5v-3" />
      </svg>
    );
  }
  if (id === "emotionen") {
    return (
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Heart outline */}
        <path d="M16 26.5l-1.6-1.5C7.2 19 3 15 3 10.5 3 6.8 6 4 9.8 4c2.2 0 4.2 1.1 5.2 2.8C16.1 5.1 18.1 4 20.2 4 24 4 27 6.8 27 10.5c0 4.5-4.2 8.5-11.4 14.5L16 26.5z" />
        {/* Two shine slashes in lower-left */}
        <path d="M8.5 14h3" />
        <path d="M10.5 17h3" />
      </svg>
    );
  }
  if (id === "heilung") {
    return (
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Center upright petal */}
        <path d="M16 6c-3 5-3.5 10 0 16 3.5-6 3-11 0-16z" />
        {/* Left upright petal */}
        <path d="M14 14.5c-3.5-1.5-6 0-6 4.5 1.5 2.5 4 3 6 2.5" />
        {/* Right upright petal */}
        <path d="M18 14.5c3.5-1.5 6 0 6 4.5-1.5 2.5-4 3-6 2.5" />
        {/* Left horizontal petal */}
        <path d="M14.5 21.5c-4-.8-8.5 0-8.5 1.5 0 1.5 4.5 2.3 8.5 1.5" />
        {/* Right horizontal petal */}
        <path d="M17.5 21.5c4-.8 8.5 0 8.5 1.5 0 1.5-4.5 2.3-8.5 1.5" />
      </svg>
    );
  }
  if (id === "zukunft") {
    return (
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Sun arc */}
        <path d="M11.5 14.5a4.5 4.5 0 0 1 9 0" />
        {/* 3 primary rays */}
        <path d="M16 6v3" />
        <path d="M9.5 8.5l2 2" />
        <path d="M22.5 8.5l-2 2" />
        {/* Horizon */}
        <path d="M5 14.5h22" />
        {/* Winding road (parallel lines) */}
        <path d="M10 26.5l3.5-3.5c1.5-1.5 2.5-3 1.5-5l1.5-3.5" />
        <path d="M16.5 26.5l3.5-3.5c1.5-1.5 2.5-3 1.5-5l1.5-3.5" />
      </svg>
    );
  }
  if (id === "energie") {
    return (
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer flame with secondary tongue */}
        <path d="M15.5 5c-1 3-3.5 5.5-5 8.5-1.5 3-1.5 6 0 8.5a7.5 7.5 0 0 0 11.5 0c1.5-2.5 1.2-5-.5-7 2.2.5 2.8-1 2-2.5-.5-1-1.2-1.5-1.8-2 0 1.5-.7 2.5-1.7 2.5.5-2-.5-4.5-2-6-1.2-1.2-2-1.8-2.5-2z" />
        {/* Inner flame crease/slits */}
        <path d="M12.5 16.5c1-1.5 2-2 2-3" />
        <path d="M18.5 16.5c0-1-.5-2-1-2.5" />
      </svg>
    );
  }
  if (id === "alltag") {
    return (
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {/* Top rim and ticks */}
        <path d="M6.5 14h15" />
        <path d="M10 12.5v1.5" />
        <path d="M18 12.5v1.5" />
        {/* Tapered cup body */}
        <path d="M7 14v3l2.5 5.5h9l2.5-5.5V14" />
        {/* Saucer */}
        <path d="M7.5 25h13" />
        {/* Handle */}
        <path d="M21 15.5h2.5a2.5 2.5 0 0 1 0 5H20.2" />
        {/* Dashed vertical steam */}
        <path d="M14 6v2.2" />
        <path d="M14 10v1.8" />
      </svg>
    );
  }
  return null;
}

const REFLECTION_QUESTIONS = [
  { id: "bewahren", label: "1. Was möchtest du bewahren?" },
  { id: "veraendern", label: "2. Was möchtest du verändern?" },
  { id: "gehen", label: "3. Was darf gehen?" },
  { id: "entstehen", label: "4. Was darf neu entstehen?" },
];

const EMOTION_CARDS = [
  {
    id: "innerer_frieden",
    title: "Innerer Frieden & Gelassenheit",
    desc: "Zur Ruhe kommen, loslassen und bei dir ankommen.",
    image: "/2-emotionen/innerer-Frieden.jpg",
  },
  {
    id: "selbstvertrauen",
    title: "Selbstvertrauen",
    desc: "Deiner eigenen Kraft vertrauen und dir selbst sicher begegnen.",
    image: "/2-emotionen/selbstvertrauen.jpg",
  },
  {
    id: "mut",
    title: "Mut",
    desc: "Dir vertrauen und deinen eigenen Weg gehen.",
    image: "/2-emotionen/MUT.jpg",
  },
  {
    id: "dankbarkeit",
    title: "Dankbarkeit",
    desc: "Wahrnehmen, was bereits da ist, und das Gute in deinem Leben spüren.",
    image: "/2-emotionen/dankbarkeit.jpg",
  },
  {
    id: "lebensfreude",
    title: "Lebensfreude",
    desc: "Das Leben wieder spüren, Leichtigkeit finden und genießen.",
    image: "/2-emotionen/lebensfreude.jpg",
  },
  {
    id: "selbstliebe",
    title: "Selbstliebe",
    desc: "Zur Ruhe kommen, loslassen und bei dir ankommen.",
    image: "/2-emotionen/selbstliebe.jpg",
  },
];

const EMOTION_QUESTIONS = [
  {
    id: "feel",
    label: "1. Wie fühlst Du Dich gerade?",
    placeholder: "Bezogen auf das von Dir gewählte Thema: Was fühlst Du gerade oder was bewegt in dieser Hinsicht?",
  },
  {
    id: "wish",
    label: "2. Was wünschst Du Dir?",
    placeholder: "Was möchtest Du dazu mehr spüren oder in Deinem Leben erfahren?",
  },
  {
    id: "important",
    label: "3. Was ist Dir dabei besonders wichtig?",
    placeholder: "Was möchtest Du aus dieser Meditation für Dich mitnehmen?",
  },
];

const HEILUNG_CARDS = [
  {
    id: "loslassen",
    title: "Loslassen",
    desc: "Lass los, was Dich nicht länger begleiten muss.",
    image: "/3-heilung/Loslassen.jpg",
  },
  {
    id: "vergeben",
    title: "Vergeben",
    desc: "Finde Frieden mit dem, was war - mit anderen oder mit Dir selbst.",
    image: "/3-heilung/Vergeben.jpg",
  },
  {
    id: "alte_muster",
    title: "Alte Muster lösen",
    desc: "Erkenne, was sich wiederholt, und öffne Raum für neue Wege.",
    image: "/3-heilung/Alte-Muster-loesen.jpg",
  },
  {
    id: "selbstannahme",
    title: "Selbstannahme",
    desc: "Begegne Dir selbst mit Verständnis, Liebe und ohne Urteil.",
    image: "/3-heilung/selbstanahme.jpg",
  },
  {
    id: "inneres_kind",
    title: "Inneres Kind",
    desc: "Begegne dem Teil in Dir, der gesehen, verstanden und gehalten werden möchte.",
    image: "/3-heilung/inneres-Kind.jpg",
  },
];

const HEILUNG_QUESTIONS = [
  {
    id: "concern",
    label: "1. Was beschäftigt Dich gerade?",
    placeholder: "Bezogen auf das von Dir gewählte Thema: Gibt es etwas, das Dich innerlich bewegt, belastet oder immer wieder beschäftigt?",
  },
  {
    id: "change",
    label: "2. Was darf sich für Dich verändern?",
    placeholder: "Was möchtest Du leichter werden lassen, loslassen, verstehen oder in Dir verändern?",
  },
  {
    id: "give_self",
    label: "3. Was möchtest Du Dir selbst heute geben?",
    placeholder: "Was würde Dir gerade guttun - Verständnis, Frieden, Vergebung, Geborgenheit oder einfach Raum für Dich?",
  },
];

const ZUKUNFT_CARDS = [
  {
    id: "wunschleben",
    title: "Wunschleben visualisieren",
    desc: "Stelle dir vor, wie dein ideales Leben aussieht und spüre es jetzt schon.",
    image: "/4-zukunft/Wunschleben.jpg",
  },
  {
    id: "traumjob",
    title: "Traumjob",
    desc: "Verbinde dich mit deiner Berufung und erschaffe erfüllende Möglichkeiten.",
    image: "/4-zukunft/Traumjob.jpg",
  },
  {
    id: "fuelle_wohlstand",
    title: "Fülle & Wohlstand",
    desc: "Öffne dich für Fülle in allen Bereichen deines Lebens.",
    image: "/4-zukunft/Fuelle_Wohlstand.jpg",
  },
  {
    id: "liebe_anziehen",
    title: "Liebe anziehen",
    desc: "Öffne dein Herz und ziehe liebevolle Beziehungen in dein Leben.",
    image: "/4-zukunft/liebe-anziehen.jpg",
  },
  {
    id: "gesundheit_staerken",
    title: "Gesundheit stärken",
    desc: "Stärke deinen Körper und Geist für ein vitales, lebendiges und gesundes Leben.",
    image: "/4-zukunft/Gesundheit-staerken.jpg",
  },
];

const ZUKUNFT_QUESTIONS = [
  {
    id: "where_stand",
    label: "1. Wo stehst Du gerade?",
    placeholder: "Bezogen auf das von Dir gewählte Thema: Was beschäftigt Dich heute in Bezug auf deine Zukunft? Wo möchtest Du etwas verändern oder weiterentwickeln?",
  },
  {
    id: "experience_future",
    label: "2. Wie möchtest Du deine Zukunft erleben?",
    placeholder: "Was wünschst Du Dir zu diesem Thema, was möchtest Du mehr in Dein Leben ziehen und wie soll es sich für Dich anfühlen?",
  },
  {
    id: "important",
    label: "3. Was ist dir dabei besonders wichtig?",
    placeholder: "Gibt es eine Situation, einen Wunsch zum Thema, oder eine Seite an dir, die dabei eine besondere Rolle spielt?",
  },
];

const ENERGIE_CARDS = [
  {
    id: "kraft_tanken",
    title: "Kraft tanken",
    desc: "Fülle deine Energiequellen auf und spüre neue innere Stärke.",
    image: "/5-energie/kraft_tanken.jpg",
  },
  {
    id: "klarheit_finden",
    title: "Klarheit finden",
    desc: "Bringe deinen Geist zur Ruhe und finde klare Antworten in dir.",
    image: "/5-energie/klarheit_finden.jpg",
  },
  {
    id: "fokus",
    title: "Fokus",
    desc: "Richte deine Energie ganz auf das, was wirklich wichtig ist.",
    image: "/5-energie/Fokus.jpg",
  },
  {
    id: "motivation",
    title: "Motivation",
    desc: "Entfache deine innere Motivation und komm ins Handeln.",
    image: "/5-energie/Motivation.jpg",
  },
  {
    id: "kreativitaet",
    title: "Kreativität",
    desc: "Öffne dich für neue Ideen und kreative Inspiration aus deiner Tiefe.",
    image: "/5-energie/kreativitaet.jpg",
  },
];

const ENERGIE_QUESTIONS = [
  {
    id: "experience_energy",
    label: "1. Wie erlebst Du Deine Energie gerade?",
    placeholder: "Bezogen auf das von Dir gewählte Thema: Was ist gerade da – was fehlt Dir, was ist zu viel oder was beschäftigt Dich?",
  },
  {
    id: "activate_inner",
    label: "2. Was möchtest Du in Dir aktivieren?",
    placeholder: "Was möchtest Du zu diesem Thema mehr spüren, entwickeln oder in Bewegung bringen?",
  },
  {
    id: "direct_energy",
    label: "3. Wohin möchtest Du Deine Energie lenken?",
    placeholder: "Gibt es eine Situation, ein Ziel oder einen Lebensbereich, auf den Du Deine Energie heute besonders richten möchtest?",
  },
];

const ALLTAG_CARDS = [
  {
    id: "besser_schlafen",
    title: "Besser schlafen",
    desc: "Finde Ruhe und komme tief und erholt zur Ruhe.",
    image: "/6-alltag/besser_schlafen.jpg",
  },
  {
    id: "stress_abbauen",
    title: "Stress abbauen",
    desc: "Lass Anspannung los und finde zurück zu innerer Leichtigkeit.",
    image: "/6-alltag/stress-abbauen.jpg",
  },
  {
    id: "konzentration",
    title: "Konzentration",
    desc: "Stärke deine Konzentration und bleibe bei dem, was zählt.",
    image: "/6-alltag/konzentration.jpg",
  },
  {
    id: "pruefung_meistern",
    title: "Prüfung meistern",
    desc: "Gehe gelassen und selbstbewusst in deine Prüfung.",
    image: "/6-alltag/pruefung-meistern.jpg",
  },
  {
    id: "schwierige_gespraeche",
    title: "Schwierige Gespräche",
    desc: "Finde die richtigen Worte und trete klar und ruhig in den Dialog.",
    image: "/6-alltag/schwierige_Gespraeche.jpg",
  },
];

const ALLTAG_QUESTIONS = [
  {
    id: "current_situation",
    label: "1. Wie ist deine aktuelle Situation?",
    placeholder: "Bezogen auf das von Dir gewählte Thema: Was beschäftigt Dich gerade? Was möchtest Du verändern, bewältigen oder hinter Dir lassen?",
  },
  {
    id: "moment_wish",
    label: "2. Was wünschst du dir für diesen Moment?",
    placeholder: "Wie möchtest Du Dich fühlen oder mit der Situation umgehen? Was würde Dir jetzt guttun?",
  },
  {
    id: "important",
    label: "3. Was ist dir dabei besonders wichtig?",
    placeholder: "Gibt es etwas, das wir in Deiner Meditation berücksichtigen sollen – eine konkrete Situation, einen Gedanken, eine Person oder ein Ziel?",
  },
];

function StepExperience({ 
  category = "identitaet",
  onSelectCategory,
  onNext, 
  onBack 
}: { 
  category?: string;
  onSelectCategory?: (cat: string) => void;
  feel?: string;
  setFeel?: (v: string) => void;
  goal?: string;
  setGoal?: (v: string) => void;
  remainsOutside?: string;
  setRemainsOutside?: (v: string) => void;
  tension?: string[];
  toggleTension?: (spot: string) => void;
  selectedNatureSoundName?: string | null;
  setSelectedNatureSoundName?: (v: string | null) => void;
  selectedBackgroundImageId?: number | null;
  setSelectedBackgroundImageId?: (v: number | null) => void;
  natureSounds?: NatureSound[];
  backgroundImages?: BackgroundImage[];
  onNext: () => void; 
  onBack: () => void; 
}) {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [activeCardId, setActiveCardId] = useState("mein_zuk_ich");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});

  // Emotionen states
  const [activeEmotionCardId, setActiveEmotionCardId] = useState("innerer_frieden");
  const [emotionAnswers, setEmotionAnswers] = useState<Record<string, string>>({});

  // Heilung states
  const [activeHeilungCardId, setActiveHeilungCardId] = useState("loslassen");
  const [heilungAnswers, setHeilungAnswers] = useState<Record<string, string>>({});

  // Zukunft states
  const [activeZukunftCardId, setActiveZukunftCardId] = useState("");
  const [zukunftAnswers, setZukunftAnswers] = useState<Record<string, string>>({});

  // Energie states
  const [activeEnergieCardId, setActiveEnergieCardId] = useState("");
  const [energieAnswers, setEnergieAnswers] = useState<Record<string, string>>({});

  // Alltag states
  const [activeAlltagCardId, setActiveAlltagCardId] = useState("");
  const [alltagAnswers, setAlltagAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  const handleCategorySwitch = (catId: string) => {
    setSelectedCategory(catId);
    onSelectCategory?.(catId);
  };

  const handleAnswerChange = (id: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [id]: text }));
  };

  const handleReflectionChange = (id: string, text: string) => {
    setReflectionAnswers((prev) => ({ ...prev, [id]: text }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start w-full max-w-[1350px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-4 sm:px-8 text-left relative z-10">
        {/* ─── Top Section: Was ist deine Intention? ─────────────────── */}
        <h2 className="text-[clamp(2.4rem,5vw,3.6rem)] font-serif text-white text-left mb-2 tracking-tight leading-tight">
          Was ist deine <span className="text-[#F2CA50]">Intention?</span>
        </h2>
        <p className="text-[0.95rem] sm:text-[1.05rem] text-white/80 text-left mb-8 max-w-[650px] font-normal">
          Wähle das Thema, das heute für Dich wichtig ist.
        </p>

        {/* 6 Category Selection Badges */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto max-w-full justify-start py-2 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {INTENTION_CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySwitch(cat.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl transition-all duration-200 w-[86px] sm:w-[98px] md:w-[104px] h-[86px] sm:h-[98px] md:h-[104px] cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? "bg-[#162430]/85 border-[2.5px] border-[#F2CA50] shadow-[0_0_22px_rgba(242,202,80,0.28)]"
                    : "bg-[#14202a]/70 border border-white/10 hover:border-white/20 hover:bg-[#1a2835]/80"
                }`}
              >
                {/* Category Icon */}
                <div className="flex items-center justify-center">
                  <CategoryTabIcon id={cat.id} color={cat.color} />
                </div>
                <span className={`text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider ${isSelected ? "text-white/90" : "text-white/70"}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Divider with glowing center flare */}
        <div className="w-full max-w-[1100px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-8 relative flex items-center justify-center">
          <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#F2CA50]/70 to-transparent blur-[1px]" />
        </div>

        {/* ─── Category: Emotionen ─── */}
        {selectedCategory === "emotionen" && (
          <div className="w-full flex flex-col items-start animate-in fade-in duration-500">
            {/* ─── Second Section: Welche Emotion möchtest Du stärken ─── */}
            <h3 className="text-[clamp(1.9rem,4vw,2.6rem)] font-serif text-white text-left mb-2 tracking-tight">
              Welche <span className="text-[#F2CA50]">Emotion</span> möchtest Du stärken
            </h3>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white/70 text-left mb-8 max-w-[750px] font-normal">
              Wähle das Thema, das heute für Dich wichtig ist.
            </p>

            {/* 6 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 w-full mb-14">
              {EMOTION_CARDS.map((card) => {
                const isActive = activeEmotionCardId === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveEmotionCardId(card.id)}
                    className={`group relative flex flex-col justify-end text-left rounded-2xl overflow-hidden transition-all duration-300 aspect-[507/933] cursor-pointer p-3 sm:p-4 pb-5 ${
                      isActive
                        ? "border-2 border-[#F2CA50] shadow-[0_0_25px_rgba(242,202,80,0.35)] scale-[1.02] ring-1 ring-[#F2CA50]/50"
                        : "border border-white/10 hover:border-white/30 bg-[#0d141e]/80"
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col">
                      <h4 className="font-serif text-[1rem] sm:text-[1.1rem] text-white font-medium mb-1 drop-shadow-md leading-tight">
                        {card.title}
                      </h4>
                      <p className="text-[0.7rem] sm:text-[0.76rem] text-white/80 leading-snug drop-shadow font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ─── Third Section: Erzähle uns von dir ─── */}
            <div className="w-full max-w-[880px] mb-4 text-left">
              <h4 className="text-[0.76rem] sm:text-[0.8rem] font-bold tracking-wider text-white/90 uppercase mb-1.5">
                ERZÄHLE UNS VON DIR.
              </h4>
              <p className="text-[0.95rem] sm:text-[1.02rem] text-white/80 font-normal">
                Deine Worte helfen uns, eine Meditation zu gestalten, die wirklich zu dir passt.
              </p>
            </div>

            {/* 3 Question Input Boxes */}
            <div className="flex flex-col gap-4 w-full max-w-[880px] mb-10">
              {EMOTION_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-[#0d141e]/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all duration-200"
                >
                  <span className="text-[0.92rem] sm:text-[0.96rem] text-white/90 font-medium mb-3">
                    {q.label}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-[#070b12] p-3 sm:p-4 focus-within:border-[#F2CA50]/50 transition-colors">
                    <textarea
                      rows={2}
                      placeholder={q.placeholder}
                      value={emotionAnswers[q.id] || ""}
                      onChange={(e) => setEmotionAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      maxLength={500}
                      className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed"
                    />
                  </div>
                  <span className="text-[0.68rem] text-white/40 self-end mt-2">
                    max. 500 Zeichen pro Feld
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Nimm dir einen Moment + Meditation generieren */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-[880px] mb-8">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-[#F2CA50] flex-shrink-0 drop-shadow-[0_0_12px_rgba(242,202,80,0.5)]">
                  <Lightbulb size={32} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[0.98rem] sm:text-[1.05rem] font-medium leading-tight">
                    Nimm dir einen Moment.
                  </span>
                  <span className="text-white/80 text-[0.92rem] sm:text-[0.98rem] leading-tight mt-0.5 font-normal">
                    Es geht um Dich.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-[#F2CA50] text-[#0b0f17] font-semibold text-[0.98rem] sm:text-[1.05rem] px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(242,202,80,0.35)] hover:bg-[#e0b83e] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Meditation generieren</span>
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Category: Heilung ─── */}
        {selectedCategory === "heilung" && (
          <div className="w-full flex flex-col items-start animate-in fade-in duration-500">
            {/* ─── Second Section: Was möchtest du heilen? ─── */}
            <h3 className="text-[clamp(1.9rem,4vw,2.6rem)] font-serif text-white text-left mb-2 tracking-tight">
              Was möchtest du <span className="text-[#F2CA50]">heilen?</span>
            </h3>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white/70 text-left mb-8 max-w-[750px] font-normal">
              Wähle das Thema, das heute für Dich wichtig ist.
            </p>

            {/* 5 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full max-w-[1100px] mb-14">
              {HEILUNG_CARDS.map((card) => {
                const isActive = activeHeilungCardId === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveHeilungCardId(card.id)}
                    className={`group relative flex flex-col justify-end text-left rounded-2xl overflow-hidden transition-all duration-300 aspect-[507/933] cursor-pointer p-3 sm:p-4 pb-5 ${
                      isActive
                        ? "border-2 border-[#F2CA50] shadow-[0_0_25px_rgba(242,202,80,0.35)] scale-[1.02] ring-1 ring-[#F2CA50]/50"
                        : "border border-white/10 hover:border-white/30 bg-[#0d141e]/80"
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col">
                      <h4 className="font-serif text-[1rem] sm:text-[1.1rem] text-white font-medium mb-1 drop-shadow-md leading-tight">
                        {card.title}
                      </h4>
                      <p className="text-[0.7rem] sm:text-[0.76rem] text-white/80 leading-snug drop-shadow font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ─── Third Section: Erzähle uns von dir ─── */}
            <div className="w-full max-w-[880px] mb-4 text-left">
              <h4 className="text-[0.76rem] sm:text-[0.8rem] font-bold tracking-wider text-white/90 uppercase mb-1.5">
                ERZÄHLE UNS VON DIR.
              </h4>
              <p className="text-[0.95rem] sm:text-[1.02rem] text-white/80 font-normal">
                Deine Worte helfen uns, eine Meditation zu gestalten, die wirklich zu dir passt.
              </p>
            </div>

            {/* 3 Question Input Boxes */}
            <div className="flex flex-col gap-4 w-full max-w-[880px] mb-10">
              {HEILUNG_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-[#0d141e]/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all duration-200"
                >
                  <span className="text-[0.92rem] sm:text-[0.96rem] text-white/90 font-medium mb-3">
                    {q.label}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-[#070b12] p-3 sm:p-4 focus-within:border-[#F2CA50]/50 transition-colors">
                    <textarea
                      rows={2}
                      placeholder={q.placeholder}
                      value={heilungAnswers[q.id] || ""}
                      onChange={(e) => setHeilungAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      maxLength={500}
                      className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed"
                    />
                  </div>
                  <span className="text-[0.68rem] text-white/40 self-end mt-2">
                    max. 500 Zeichen pro Feld
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Nimm dir einen Moment + Meditation generieren */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-[880px] mb-8">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-[#F2CA50] flex-shrink-0 drop-shadow-[0_0_12px_rgba(242,202,80,0.5)]">
                  <Lightbulb size={32} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[0.98rem] sm:text-[1.05rem] font-medium leading-tight">
                    Nimm dir einen Moment.
                  </span>
                  <span className="text-white/80 text-[0.92rem] sm:text-[0.98rem] leading-tight mt-0.5 font-normal">
                    Es geht um Dich.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-[#F2CA50] text-[#0b0f17] font-semibold text-[0.98rem] sm:text-[1.05rem] px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(242,202,80,0.35)] hover:bg-[#e0b83e] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Meditation generieren</span>
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Category: Zukunft ─── */}
        {selectedCategory === "zukunft" && (
          <div className="w-full flex flex-col items-start animate-in fade-in duration-500">
            {/* ─── Second Section: Wie möchtest du deine Zukunft gestalten? ─── */}
            <h3 className="text-[clamp(1.9rem,4vw,2.6rem)] font-serif text-white text-left mb-2 tracking-tight">
              Wie möchtest du deine <span className="text-[#F2CA50]">Zukunft</span> gestalten?
            </h3>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white/70 text-left mb-8 max-w-[750px] font-normal">
              Entdecke, was möglich ist, und gestalte dein Morgen mit neuen inneren Bildern.
            </p>

            {/* 5 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full max-w-[1100px] mb-14">
              {ZUKUNFT_CARDS.map((card) => {
                const isActive = activeZukunftCardId === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveZukunftCardId((prev) => (prev === card.id ? "" : card.id))}
                    className={`group relative flex flex-col justify-end items-center text-center rounded-2xl overflow-hidden transition-all duration-300 aspect-[507/933] cursor-pointer p-3 sm:p-4 pb-5 ${
                      isActive
                        ? "border-2 border-[#F2CA50] shadow-[0_0_25px_rgba(242,202,80,0.35)] scale-[1.02] ring-1 ring-[#F2CA50]/50"
                        : "border border-white/10 hover:border-white/30 bg-[#0d141e]/80"
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center w-full">
                      <h4 className="font-serif text-[1rem] sm:text-[1.08rem] text-white font-medium mb-1 drop-shadow-md leading-tight text-center">
                        {card.title}
                      </h4>
                      <p className="text-[0.7rem] sm:text-[0.76rem] text-white/80 leading-snug drop-shadow font-normal text-center">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ─── Third Section: Erzähle uns von dir ─── */}
            <div className="w-full max-w-[880px] mb-4 text-left">
              <h4 className="text-[0.76rem] sm:text-[0.8rem] font-bold tracking-wider text-white/90 uppercase mb-1.5">
                ERZÄHLE UNS VON DIR.
              </h4>
              <p className="text-[0.95rem] sm:text-[1.02rem] text-white/80 font-normal">
                Deine Worte helfen uns, eine Meditation zu gestalten, die wirklich zu dir passt.
              </p>
            </div>

            {/* 3 Question Input Boxes */}
            <div className="flex flex-col gap-4 w-full max-w-[880px] mb-10">
              {ZUKUNFT_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-[#0d141e]/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all duration-200"
                >
                  <span className="text-[0.92rem] sm:text-[0.96rem] text-white/90 font-medium mb-3">
                    {q.label}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-[#070b12] p-3 sm:p-4 focus-within:border-[#F2CA50]/50 transition-colors">
                    <textarea
                      rows={2}
                      placeholder={q.placeholder}
                      value={zukunftAnswers[q.id] || ""}
                      onChange={(e) => setZukunftAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      maxLength={500}
                      className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed"
                    />
                  </div>
                  <span className="text-[0.68rem] text-white/40 self-end mt-2 italic">
                    max. 500 Zeichen pro Feld
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Nimm dir einen Moment + Meditation generieren */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-[880px] mb-8">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-[#F2CA50] flex-shrink-0 drop-shadow-[0_0_12px_rgba(242,202,80,0.5)]">
                  <Lightbulb size={32} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[0.98rem] sm:text-[1.05rem] font-medium leading-tight">
                    Nimm dir einen Moment.
                  </span>
                  <span className="text-white/80 text-[0.92rem] sm:text-[0.98rem] leading-tight mt-0.5 font-normal">
                    Es geht um Dich.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-[#F2CA50] text-[#0b0f17] font-semibold text-[0.98rem] sm:text-[1.05rem] px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(242,202,80,0.35)] hover:bg-[#e0b83e] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Meditation generieren</span>
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Category: Energie ─── */}
        {selectedCategory === "energie" && (
          <div className="w-full flex flex-col items-start animate-in fade-in duration-500">
            {/* ─── Second Section: Wohin möchtest Du Deine Energie lenken? ─── */}
            <h3 className="text-[clamp(1.9rem,4vw,2.6rem)] font-serif text-white text-left mb-2 tracking-tight">
              Wohin möchtest Du <span className="text-[#F2CA50]">Deine Energie</span> lenken?
            </h3>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white/70 text-left mb-8 max-w-[750px] font-normal">
              In welchen Bereich möchtest Du Deine Energie heute lenken?
            </p>

            {/* 5 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full max-w-[1100px] mb-14">
              {ENERGIE_CARDS.map((card) => {
                const isActive = activeEnergieCardId === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveEnergieCardId((prev) => (prev === card.id ? "" : card.id))}
                    className={`group relative flex flex-col justify-end items-center text-center rounded-2xl overflow-hidden transition-all duration-300 aspect-[507/933] cursor-pointer p-3 sm:p-4 pb-5 ${
                      isActive
                        ? "border-2 border-[#F2CA50] shadow-[0_0_25px_rgba(242,202,80,0.35)] scale-[1.02] ring-1 ring-[#F2CA50]/50"
                        : "border border-white/10 hover:border-white/30 bg-[#0d141e]/80"
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center w-full">
                      <h4 className="font-serif text-[1rem] sm:text-[1.08rem] text-white font-medium mb-1 drop-shadow-md leading-tight text-center">
                        {card.title}
                      </h4>
                      <p className="text-[0.7rem] sm:text-[0.76rem] text-white/80 leading-snug drop-shadow font-normal text-center">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ─── Third Section: Erzähle uns von dir ─── */}
            <div className="w-full max-w-[880px] mb-4 text-left">
              <h4 className="text-[0.76rem] sm:text-[0.8rem] font-bold tracking-wider text-white/90 uppercase mb-1.5">
                ERZÄHLE UNS VON DIR.
              </h4>
              <p className="text-[0.95rem] sm:text-[1.02rem] text-white/80 font-normal">
                Deine Worte helfen uns, eine Meditation zu gestalten, die wirklich zu dir passt.
              </p>
            </div>

            {/* 3 Question Input Boxes */}
            <div className="flex flex-col gap-4 w-full max-w-[880px] mb-10">
              {ENERGIE_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-[#0d141e]/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all duration-200"
                >
                  <span className="text-[0.92rem] sm:text-[0.96rem] text-white/90 font-medium mb-3">
                    {q.label}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-[#070b12] p-3 sm:p-4 focus-within:border-[#F2CA50]/50 transition-colors">
                    <textarea
                      rows={2}
                      placeholder={q.placeholder}
                      value={energieAnswers[q.id] || ""}
                      onChange={(e) => setEnergieAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      maxLength={500}
                      className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed"
                    />
                  </div>
                  <span className="text-[0.68rem] text-white/40 self-end mt-2 italic">
                    max. 500 Zeichen pro Feld
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Nimm dir einen Moment + Meditation generieren */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-[880px] mb-8">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-[#F2CA50] flex-shrink-0 drop-shadow-[0_0_12px_rgba(242,202,80,0.5)]">
                  <Lightbulb size={32} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[0.98rem] sm:text-[1.05rem] font-medium leading-tight">
                    Nimm dir einen Moment.
                  </span>
                  <span className="text-white/80 text-[0.92rem] sm:text-[0.98rem] leading-tight mt-0.5 font-normal">
                    Es geht um Dich.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-[#F2CA50] text-[#0b0f17] font-semibold text-[0.98rem] sm:text-[1.05rem] px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(242,202,80,0.35)] hover:bg-[#e0b83e] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Meditation generieren</span>
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Category: Alltag ─── */}
        {selectedCategory === "alltag" && (
          <div className="w-full flex flex-col items-start animate-in fade-in duration-500">
            {/* ─── Second Section: In welchem Bereich suchst ─── */}
            <h3 className="text-[clamp(1.9rem,4vw,2.6rem)] font-serif text-white text-left mb-2 tracking-tight">
              In welchem <span className="text-[#F2CA50]">Bereich</span> suchst
            </h3>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white/70 text-left mb-8 max-w-[750px] font-normal">
              In welchem Bereich benötigst Du einen kleinen Alltagshelfer?
            </p>

            {/* 5 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 w-full max-w-[1100px] mb-14">
              {ALLTAG_CARDS.map((card) => {
                const isActive = activeAlltagCardId === card.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveAlltagCardId((prev) => (prev === card.id ? "" : card.id))}
                    className={`group relative flex flex-col justify-end items-center text-center rounded-2xl overflow-hidden transition-all duration-300 aspect-[507/933] cursor-pointer p-3 sm:p-4 pb-5 ${
                      isActive
                        ? "border-2 border-[#F2CA50] shadow-[0_0_25px_rgba(242,202,80,0.35)] scale-[1.02] ring-1 ring-[#F2CA50]/50"
                        : "border border-white/10 hover:border-white/30 bg-[#0d141e]/80"
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center w-full">
                      <h4 className="font-serif text-[1rem] sm:text-[1.08rem] text-white font-medium mb-1 drop-shadow-md leading-tight text-center">
                        {card.title}
                      </h4>
                      <p className="text-[0.7rem] sm:text-[0.76rem] text-white/80 leading-snug drop-shadow font-normal text-center">
                        {card.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ─── Third Section: Erzähle uns von dir ─── */}
            <div className="w-full max-w-[880px] mb-4 text-left">
              <h4 className="text-[0.76rem] sm:text-[0.8rem] font-bold tracking-wider text-white/90 uppercase mb-1.5">
                ERZÄHLE UNS VON DIR.
              </h4>
              <p className="text-[0.95rem] sm:text-[1.02rem] text-white/80 font-normal">
                Deine Worte helfen uns, eine Meditation zu gestalten, die wirklich zu dir passt.
              </p>
            </div>

            {/* 3 Question Input Boxes */}
            <div className="flex flex-col gap-4 w-full max-w-[880px] mb-10">
              {ALLTAG_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-[#0d141e]/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all duration-200"
                >
                  <span className="text-[0.92rem] sm:text-[0.96rem] text-white/90 font-medium mb-3">
                    {q.label}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-[#070b12] p-3 sm:p-4 focus-within:border-[#F2CA50]/50 transition-colors">
                    <textarea
                      rows={2}
                      placeholder={q.placeholder}
                      value={alltagAnswers[q.id] || ""}
                      onChange={(e) => setAlltagAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      maxLength={500}
                      className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed"
                    />
                  </div>
                  <span className="text-[0.68rem] text-white/40 self-end mt-2 italic">
                    max. 500 Zeichen pro Feld
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Nimm dir einen Moment + Meditation generieren */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-[880px] mb-8">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-[#F2CA50] flex-shrink-0 drop-shadow-[0_0_12px_rgba(242,202,80,0.5)]">
                  <Lightbulb size={32} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[0.98rem] sm:text-[1.05rem] font-medium leading-tight">
                    Nimm dir einen Moment.
                  </span>
                  <span className="text-white/80 text-[0.92rem] sm:text-[0.98rem] leading-tight mt-0.5 font-normal">
                    Es geht um Dich.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-[#F2CA50] text-[#0b0f17] font-semibold text-[0.98rem] sm:text-[1.05rem] px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(242,202,80,0.35)] hover:bg-[#e0b83e] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Meditation generieren</span>
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Category: Identität (Default) ─── */}
        {selectedCategory !== "emotionen" && selectedCategory !== "heilung" && selectedCategory !== "zukunft" && selectedCategory !== "energie" && selectedCategory !== "alltag" && (
          <div className="w-full flex flex-col items-start animate-in fade-in duration-500">
            {/* ─── Second Section: Tiefer eintauchen ─────────────────────── */}
            <h3 className="text-[clamp(1.9rem,4vw,2.6rem)] font-serif text-white text-left mb-2 tracking-tight">
              Tiefer eintauchen – Dein <span className="text-[#F2CA50]">zukünftiges</span> Ich
            </h3>
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white/70 text-left mb-8 max-w-[750px] font-normal">
              Wähle eine der vier Perspektiven und nimm dir einen Moment Zeit, um deine Gedanken zu sammeln.
            </p>

            {/* 4 Cards Grid with Quote */}
            <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
              {/* 2x2 Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[880px]">
                {PERSPECTIVE_CARDS.map((card) => {
                  const isActive = activeCardId === card.id;
                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveCardId(card.id)}
                      className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 bg-[#0d141e]/90 cursor-pointer ${
                        isActive
                          ? "border-[#F2CA50]/70 shadow-[0_0_25px_rgba(242,202,80,0.2)] ring-1 ring-[#F2CA50]/40"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Visual Container maintaining natural 740x487 ratio */}
                      <div className="relative w-full aspect-[740/487] p-4 sm:p-5 flex flex-col justify-end overflow-hidden">
                        {/* Background Image */}
                        <img
                          src={card.image}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1019] via-[#0b1019]/40 to-transparent pointer-events-none" />

                        {/* Text on Card */}
                        <div className="relative z-10 flex flex-col">
                          <h4 className="font-serif text-[1.2rem] sm:text-[1.35rem] text-white font-medium mb-1 drop-shadow-md">
                            {card.title}
                          </h4>
                          <p className="text-[0.78rem] sm:text-[0.84rem] text-white/90 leading-snug drop-shadow font-normal">
                            {card.question}
                          </p>
                          {card.prompt && (
                            <p className="text-[0.78rem] sm:text-[0.84rem] text-white/75 leading-snug drop-shadow font-normal mt-1">
                              {card.prompt}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Input Area */}
                      <div className="p-4 sm:p-5 pt-3 flex flex-col bg-[#0b1019] border-t border-white/5">
                        <textarea
                          placeholder="Schreib hier Deine Gedanken ..."
                          value={answers[card.id] || ""}
                          onChange={(e) => handleAnswerChange(card.id, e.target.value)}
                          maxLength={500}
                          rows={3}
                          className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed min-h-[75px]"
                        />
                        <span className="text-[0.68rem] text-white/30 self-end mt-1">
                          max. 500 Zeichen pro Feld
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Right Quote Callout */}
              <div className="hidden lg:flex flex-col justify-center max-w-[210px] pl-4 pt-24">
                <p className="font-serif italic text-[#F2CA50] text-[1.2rem] sm:text-[1.25rem] leading-relaxed drop-shadow-lg">
                  „Klarheit beginnt mit einer ehrlichen Frage an dich selbst“
                </p>
              </div>
            </div>

            {/* Quote for mobile/smaller screens */}
            <div className="block lg:hidden mt-8 max-w-md text-left">
              <p className="font-serif italic text-[#F2CA50] text-[1.1rem] leading-relaxed">
                „Klarheit beginnt mit einer ehrlichen Frage an dich selbst“
              </p>
            </div>

            {/* ─── Third Section: Zum Abschluss - Ein kurzer Reflexionsimpuls ─── */}
            <div className="w-full max-w-[880px] mt-14 mb-4 text-left">
              <h4 className="text-[0.76rem] sm:text-[0.8rem] font-bold tracking-wider text-white/90 uppercase mb-1.5">
                ZUM ABSCHLUSS - EIN KURZER REFLEXIONSIMPULS
              </h4>
              <p className="text-[0.95rem] sm:text-[1.02rem] text-white/80 font-normal">
                Schau noch einmal auf deine Antworten. Was wird für dich sichtbar?
              </p>
            </div>

            {/* 4 Reflection Question Input Boxes */}
            <div className="flex flex-col gap-4 w-full max-w-[880px]">
              {REFLECTION_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-[#0d141e]/70 backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all duration-200"
                >
                  <span className="text-[0.92rem] sm:text-[0.96rem] text-white/90 font-medium mb-3">
                    {q.label}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-[#070b12] p-3 sm:p-4 focus-within:border-[#F2CA50]/50 transition-colors">
                    <textarea
                      rows={2}
                      placeholder="Deine Gedanken ..."
                      value={reflectionAnswers[q.id] || ""}
                      onChange={(e) => handleReflectionChange(q.id, e.target.value)}
                      maxLength={500}
                      className="w-full bg-transparent resize-none outline-none text-[0.88rem] sm:text-[0.92rem] text-[#F2CA50] placeholder:text-white/30 font-normal leading-relaxed"
                    />
                  </div>
                  <span className="text-[0.68rem] text-white/40 self-end mt-2">
                    max. 500 Zeichen pro Feld
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Nimm dir einen Moment + Meditation generieren */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-[880px] mt-10 mb-8">
              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-[#F2CA50] flex-shrink-0 drop-shadow-[0_0_12px_rgba(242,202,80,0.5)]">
                  <Lightbulb size={32} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-[0.98rem] sm:text-[1.05rem] font-medium leading-tight">
                    Nimm dir einen Moment.
                  </span>
                  <span className="text-white/80 text-[0.92rem] sm:text-[0.98rem] leading-tight mt-0.5 font-normal">
                    Es geht um Dich.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="w-full sm:w-auto bg-[#F2CA50] text-[#0b0f17] font-semibold text-[0.98rem] sm:text-[1.05rem] px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(242,202,80,0.35)] hover:bg-[#e0b83e] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Meditation generieren</span>
                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step 4: Generate ─────────────────────────────────────────────────────────
const GENERATION_STEPS = [
  "Deine Absichten werden analysiert...",
  "Deine persönliche Erzählung wird gestaltet...",
  "Affirmationen & Vorschläge werden verwoben...",
  "Deine Klanglandschaft wird komponiert...",
  "Deine Reise wird finalisiert...",
];

function StepGenerate({
  loading,
  error,
  result,
  onRetry,
}: {
  loading: boolean;
  error: string;
  result: GenerateMeditationResponse | null;
  onRetry: () => void;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < GENERATION_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const isAnimationFinished = currentStepIndex === GENERATION_STEPS.length - 1;
  const isReady = isAnimationFinished && result !== null;

  return (
    <div className="flex flex-col items-center w-full max-w-[1000px] animate-in fade-in duration-1000 text-center relative pt-10">
      <style jsx>{`
        @keyframes ring-grow {
          0% { 
            transform: scale(1); 
            opacity: 0.8; 
            border-width: 2px;
            box-shadow: 0 0 15px rgba(242, 202, 80, 0.4);
          }
          100% { 
            transform: scale(4); 
            opacity: 0; 
            border-width: 1px;
            box-shadow: 0 0 5px rgba(242, 202, 80, 0);
          }
        }
        .animate-ring-grow {
          animation: ring-grow 4s ease-out infinite;
        }
      `}</style>

      {/* Central Animation */}
      <div className="relative mb-20">
        {/* Animated Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none">
          {[0, 1.3, 2.6].map((delay, i) => (
            <div 
              key={i}
              className="absolute inset-0 rounded-full border border-accent/20 animate-ring-grow"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
        
        {/* Center Circle */}
        <div className="w-24 h-24 rounded-full bg-[#f2ca501a] border-2 border-[#f2ca504d] flex items-center justify-center text-accent z-10 relative shadow-[0_0_40px_rgba(242,202,80,0.2)]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
            <path d="M12 22C12 22 12 22 12 22C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22Z" fill="currentColor" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>

      <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-serif text-white text-center mb-2 tracking-tight leading-tight">Deine Reise erwartet dich</h2>
      <p className="text-[1.1rem] text-white/60 text-center mb-20 font-medium">Deine persönliche Meditation wird erstellt...</p>
      
      {error ? (
        <div className="flex flex-col items-center gap-6 max-w-md">
          <p className="text-red-400 font-semibold">{error}</p>
          <button 
            onClick={onRetry}
            className="bg-accent text-[#0b0f17] px-10 py-3.5 rounded-full font-bold text-[1.1rem] shadow-[0_10px_30px_rgba(242,202,80,0.2)] hover:scale-105 transition-all"
          >
            Erneut versuchen
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-[450px]">
          {/* Progress List */}
          <div className="flex flex-col gap-4 w-full mb-10 h-[180px] overflow-hidden relative text-left">
            <div 
              className="flex flex-col gap-4 transition-all duration-700 ease-in-out"
              style={{ transform: `translateY(-${Math.max(0, currentStepIndex - 3) * 40}px)` }}
            >
              {GENERATION_STEPS.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 transition-all duration-700 ${idx <= currentStepIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-500 ${idx <= currentStepIndex ? 'bg-accent shadow-[0_0_10px_rgba(242,202,80,0.8)]' : 'bg-white/20'}`} />
                  <span className={`text-[1.05rem] font-medium transition-colors duration-500 ${idx === currentStepIndex ? 'text-white' : 'text-white/40'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-accent transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(242,202,80,0.5)]" 
              style={{ width: `${((currentStepIndex + 1) / GENERATION_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {isReady && (
        <div className="w-full px-4 sm:px-0 flex justify-center mt-16">
          <Link 
            href={`/meditation/meditation-structure?id=${result.meditation_id}`}
            className="bg-accent text-[#0b0f17] px-12 py-4 rounded-full font-bold text-[1.1rem] transition-all duration-500 w-full sm:w-[320px] min-w-0 text-center shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] animate-in fade-in slide-in-from-bottom-4"
          >
            Meditation abspielen
          </Link>
        </div>
      )}

      {isAnimationFinished && !result && !error && (
        <div className="flex items-center gap-2 text-white/50 mt-16">
          <Loader2 className="animate-spin text-accent" size={20} />
          <span>Generierung wird abgeschlossen...</span>
        </div>
      )}
    </div>
  );
}

// ─── Step 3 Experience Background ─────────────────────────────────────────────
function ExperienceBackground({ category }: { category?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const bgSrc = category === "emotionen"
    ? "/2-emotionen/Background_emotion.jpg"
    : category === "heilung"
    ? "/3-heilung/Background_Heilung.jpg"
    : category === "zukunft"
    ? "/4-zukunft/Background_Zukunft.jpg"
    : category === "energie"
    ? "/5-energie/Background_Energie.jpg"
    : category === "alltag"
    ? "/6-alltag/Background_Alltag.jpg"
    : "/1-identitaet/Hintergrund_Ident.jpg";

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const imgHeight = imgRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // When the bottom of the image approaches the viewport bottom, translate down to stay sticky
      const stickyThreshold = imgHeight - viewportHeight;
      if (stickyThreshold > 0 && scrollY > stickyThreshold) {
        setOffsetY(scrollY - stickyThreshold);
      } else {
        setOffsetY(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [bgSrc]);

  return (
    <div className="absolute inset-0 bg-[#080c14] pointer-events-none z-0 overflow-hidden">
      <div 
        className="w-full will-change-transform"
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      >
        <img
          ref={imgRef}
          key={bgSrc}
          src={bgSrc}
          alt="Hintergrund Erfahrung"
          className="w-full h-auto object-cover min-w-full"
        />
        {/* Subtle bottom gradient to blend seamlessly into dark background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080c14] pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NeueMeditationPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [intention, setIntention] = useState("");
  const [voice, setVoice] = useState<number | null>(null);
  const [experienceCategory, setExperienceCategory] = useState("identitaet");

  // Loaded Options
  const [voices, setVoices] = useState<CharacterVoice[]>([]);
  const [natureSounds, setNatureSounds] = useState<NatureSound[]>([]);
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  // Experience states:
  const [feel, setFeel] = useState("");
  const [goal, setGoal] = useState("");
  const [remainsOutside, setRemainsOutside] = useState("");
  const [tension, setTension] = useState<string[]>(["Schultern & Nacken", "Hände & Arme"]);
  const [selectedNatureSoundName, setSelectedNatureSoundName] = useState<string | null>(null);
  const [selectedBackgroundImageId, setSelectedBackgroundImageId] = useState<number | null>(null);

  // Generation state:
  const [generationResult, setGenerationResult] = useState<GenerateMeditationResponse | null>(null);
  const [generationError, setGenerationError] = useState("");
  const [generationLoading, setGenerationLoading] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        setOptionsLoading(true);
        const [voicesRes, soundsRes, imagesRes] = await Promise.all([
          api.meditation.getCharacterVoices().catch(() => []),
          api.meditation.getNatureSounds().catch(() => []),
          api.meditation.getBackgroundImages().catch(() => []),
        ]);
        if (voicesRes && voicesRes.length > 0) {
          setVoices(voicesRes);
          setVoice((v) => v ?? voicesRes[0].id);
        }
        if (soundsRes && soundsRes.length > 0) {
          setNatureSounds(soundsRes);
          setSelectedNatureSoundName((s) => s ?? soundsRes[0].name);
        }
        if (imagesRes && imagesRes.length > 0) {
          setBackgroundImages(imagesRes);
          setSelectedBackgroundImageId((b) => b ?? imagesRes[0].id);
        }
      } catch (err: unknown) {
        console.warn("Options load error ignored:", err);
      } finally {
        setOptionsLoading(false);
      }
    }
    loadOptions();
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleTension = (spot: string) => {
    setTension((prev) => prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]);
  };

  const handleStartGeneration = async () => {
    setStep(3);
    setGenerationLoading(true);
    setGenerationError("");
    setGenerationResult(null);

    const category = INTENTION_TO_CATEGORY[intention] || "relaxation";
    const voiceId = voice || (voices.length > 0 ? voices[0].id : 1);
    
    // Get first name from profile
    const firstName = user?.full_name ? user.full_name.split(" ")[0] : "Anna";

    try {
      const result = await api.meditation.generate({
        category,
        charecter_voice_id: voiceId,
        experience_question_answers: {
          name: firstName,
          goal: goal || "Tiefenentspannung",
          how_you_feel: feel,
          what_remains_outside: remainsOutside,
          tension_spots: tension,
        },
        nature_sound_name: selectedNatureSoundName,
        background_image_id: selectedBackgroundImageId,
      });
      setGenerationResult(result);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("visulara-wallet-refresh"));
      }
    } catch (err: unknown) {
      console.error("Meditation generation failed:", err);
      const error = err as Error;
      setGenerationError(error.message || "Die Generierung ist fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setGenerationLoading(false);
    }
  };

  return (
    <div className={`flex-1 flex flex-col relative pt-16 sm:pt-20 pb-16 px-4 sm:px-6 min-h-full ${step === 2 ? "bg-[#080c14]" : ""}`}>
      {/* Background image for Step 3 (Experience) */}
      {step === 2 && <ExperienceBackground category={experienceCategory} />}

      {/* Top Header: zurück button + centered StepBar */}
      <div className="flex flex-col items-center mb-8 sm:mb-10 relative w-full max-w-[1350px] mx-auto z-10">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="self-start sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2 mb-3 sm:mb-0 flex items-center gap-1.5 text-white/70 hover:text-white text-[0.95rem] font-medium transition-colors cursor-pointer z-20"
          >
            <ChevronLeft size={18} /> zurück
          </button>
        )}
        <StepBar
          current={step}
          subStep={
            step === 2
              ? ({
                  identitaet: 0,
                  emotionen: 1,
                  heilung: 2,
                  zukunft: 3,
                  energie: 4,
                  alltag: 5,
                }[experienceCategory] ?? 0)
              : undefined
          }
        />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center relative z-10 w-full">
        {step === 0 && (
          <StepIntention
            selected={intention}
            onSelect={(id) => {
              setIntention(id);
              if (id === "emotion") setExperienceCategory("emotionen");
              else if (id === "identitaet") setExperienceCategory("identitaet");
              else if (id === "heilung") setExperienceCategory("heilung");
              else if (id === "zukunft") setExperienceCategory("zukunft");
              else if (id === "energie") setExperienceCategory("energie");
              else if (id === "alltag") setExperienceCategory("alltag");
            }}
            onNext={next}
          />
        )}
        {step === 1 && <StepVoice selected={voice} onSelect={setVoice} onNext={next} voices={voices} />}
        {step === 2 && (
          <StepExperience
            category={experienceCategory}
            onSelectCategory={setExperienceCategory}
            feel={feel}
            setFeel={setFeel}
            goal={goal}
            setGoal={setGoal}
            remainsOutside={remainsOutside}
            setRemainsOutside={setRemainsOutside}
            tension={tension}
            toggleTension={toggleTension}
            selectedNatureSoundName={selectedNatureSoundName}
            setSelectedNatureSoundName={setSelectedNatureSoundName}
            selectedBackgroundImageId={selectedBackgroundImageId}
            setSelectedBackgroundImageId={setSelectedBackgroundImageId}
            natureSounds={natureSounds}
            backgroundImages={backgroundImages}
            onNext={handleStartGeneration}
            onBack={back}
          />
        )}
        {step === 3 && (
          <StepGenerate
            loading={generationLoading}
            error={generationError}
            result={generationResult}
            onRetry={handleStartGeneration}
          />
        )}
      </div>
    </div>
  );
}
