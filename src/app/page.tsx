"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Star, Users, Headphones, Music, BookOpen, Waves, ChevronDown, Check, Sparkles, Zap, ArrowRight, Play, Volume2 } from "lucide-react";


function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-[120px] pb-[80px] overflow-hidden bg-[#080c14]">
      {/* Flipped Background Image Container */}
      <div className="absolute inset-0 bg-[url('/hero_bg.jpg')] bg-cover bg-center scale-x-[-1] z-0 pointer-events-none" />
      {/* Dark background blend overlay */}
      <div className="absolute inset-0 bg-[#080c14]/25 z-0 pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headline and Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <h1 className="text-[3.6rem] md:text-[5rem] font-bold leading-[1.08] text-white tracking-tight font-serif mb-6 animate-fade-in-up">
            Entfalte dein
            <br />Potenzial
            <br />mit deiner
            <br />individuellen
            <br />Meditation.
          </h1>
          
          <p className="text-[1.15rem] leading-[1.75] text-[#8a96b0] max-w-[520px] mb-10 animate-fade-in-up [animation-delay:0.1s]">
            Eine persönliche Reise für deinen inneren Frieden und Wachstum. Erlebe Stille durch die Linse des Kosmos.
          </p>
          
          <div className="flex items-center gap-4 flex-wrap animate-fade-in-up [animation-delay:0.2s]">
            {mounted && isAuthenticated ? (
              <>
                <Link 
                  href="/meditation/neue-meditation" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#e5b842] text-[#080c14] font-bold rounded-full transition-all duration-300 hover:bg-[#f5c647] hover:-translate-y-px hover:shadow-[0_0_24px_rgba(229,184,66,0.4)] active:scale-95 text-xs tracking-wide"
                >
                  Meine Meditation starten
                </Link>
                <Link 
                  href="/meditation/archiv" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#e5b842]/40 text-[#e5b842] hover:text-[#f5c647] hover:border-[#f5c647] font-bold rounded-full transition-all duration-300 backdrop-blur-md hover:bg-white/5 active:scale-95 text-xs tracking-wide"
                >
                  Archiv erkunden
                </Link>
              </>
            ) : mounted ? (
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#e5b842] text-[#080c14] font-bold rounded-full transition-all duration-300 hover:bg-[#f5c647] hover:-translate-y-px hover:shadow-[0_0_24px_rgba(229,184,66,0.4)] active:scale-95 text-xs tracking-wide"
              >
                Kostenlos registrieren
              </Link>
            ) : null}
          </div>
        </div>

        {/* Right Column: Floating glass elements over background face silhouette */}
        <div className="lg:col-span-5 relative min-h-[480px] w-full animate-fade-in [animation-delay:0.2s]">
          {/* Starlight Card */}
          <div className="absolute right-[5%] bottom-[24px] bg-[#1F1F2299] backdrop-blur-2xl border border-white/5 rounded-3xl pt-12 pb-14 px-8 shadow-2xl max-w-[340px] w-full transition-all duration-300 hover:border-white/10 hover:-translate-y-1">
            <div className="flex justify-between items-center mb-8">
              <Sparkles size={20} className="text-[#e5b842]" />
              <span className="px-3.5 py-1 bg-[#e5b842]/10 border border-[#e5b842]/20 text-[#e5b842] rounded-full text-[0.72rem] font-extrabold tracking-widest uppercase">
                NEUE AURA
              </span>
            </div>
            <h3 className="text-white text-[1.35rem] font-bold mb-4 leading-snug">
              Starlight-Synchronisierung
            </h3>
            <p className="text-[#8a96b0] text-[0.95rem] leading-relaxed mb-8">
              Richte deinen zirkadianen Rhythmus auf die himmlischen Bewegungen des Nachthimmels aus.
            </p>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-[#e5b842]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoFeatures() {
  return (
    <section className="py-[80px] relative bg-[#080D1E]" id="features">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Klang Landschaften */}
          <div className="lg:col-span-4 bg-[#1B1B1E] border border-white/5 shadow-2xl rounded-3xl p-8 flex flex-col justify-between min-h-[340px] transition-all duration-300 hover:bg-[#202024] hover:border-white/10 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-[140px] h-[140px] bg-[#e5b842]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col gap-5">
              <div className="w-[56px] h-[56px] rounded-full bg-[#080D1E]/40 border border-white/5 flex items-center justify-center text-[#e5b842]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 10v4M8 6v12M12 4v16M16 6v12M20 10v4" />
                </svg>
              </div>
              <div>
                <h3 className="text-[1.95rem] font-bold text-white mb-4 leading-tight font-serif">
                  Klang
                  <br />Landschaften
                </h3>
                <p className="text-[0.95rem] leading-[1.65] text-[#8a96b0]">
                  Tauche ein in 8D-Raumklang, aufgenommen in den ruhigsten Heiligtümern der Welt.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Weisheitsarchiv */}
          <div className="lg:col-span-8 bg-[#1B1B1E] border border-white/5 shadow-2xl rounded-3xl p-8 flex flex-col justify-between min-h-[340px] transition-all duration-300 hover:bg-[#202024] hover:border-white/10 hover:-translate-y-1 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-full">
              <div className="md:col-span-7 flex flex-col justify-between h-full py-2">
                <div className="flex flex-col gap-5">
                  <div className="w-[56px] h-[56px] rounded-full bg-[#080D1E]/40 border border-white/5 flex items-center justify-center text-[#e5b842]">
                    <BookOpen size={22} className="text-[#e5b842]" />
                  </div>
                  <div>
                    <h3 className="text-[1.95rem] font-bold text-white mb-4 leading-tight font-serif">
                      Weisheitsarchiv
                    </h3>
                    <p className="text-[0.95rem] leading-[1.65] text-[#8a96b0] max-w-[380px]">
                      Greife auf eine kuratierte Bibliothek antiker Praktiken zu, angepasst für den modernen kosmischen Reisenden.
                    </p>
                  </div>
                </div>
                <Link 
                  href="/meditation/archiv" 
                  className="text-[0.72rem] font-extrabold tracking-[0.18em] uppercase text-[#e5b842] hover:text-[#fad84a] flex items-center gap-1.5 mt-8 transition-colors"
                >
                  BIBLIOTHEK DURCHSUCHEN →
                </Link>
              </div>
              {/* Visual Thumbnail */}
              <div className="md:col-span-5 h-[220px] md:h-full w-full rounded-2xl overflow-hidden border border-white/5 relative flex-shrink-0">
                <img 
                  src="/cosmic-bg-new.png" 
                  alt="Meditation Third Eye" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Tägliche Rituale */}
          <div className="lg:col-span-6 bg-[#1B1B1E] border border-white/5 shadow-2xl rounded-3xl p-8 flex flex-col justify-center items-center text-center min-h-[320px] transition-all duration-300 hover:bg-[#202024] hover:border-white/10 hover:-translate-y-1 relative overflow-hidden">
            <div className="flex flex-col gap-5 items-center max-w-[360px]">
              <div className="w-[56px] h-[56px] rounded-full bg-[#080D1E]/40 border border-white/5 flex items-center justify-center text-[#e5b842] mb-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="6" r="2" />
                  <path d="M12 8v8M9 11l3 2 3-2M8 18h8" />
                </svg>
              </div>
              <div>
                <h3 className="text-[1.95rem] font-bold text-white mb-4 leading-tight font-serif">
                  Tägliche Rituale
                </h3>
                <p className="text-[0.95rem] leading-[1.65] text-[#8a96b0]">
                  Ein gewohnheitsbildendes Erlebnis, das Achtsamkeit in dein morgendliches Sternengucken einwebt.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Gemeinschaft Schwingungen */}
          <div className="lg:col-span-6 bg-[#1B1B1E] border border-white/5 shadow-2xl rounded-3xl p-8 flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:bg-[#202024] hover:border-white/10 hover:-translate-y-1 relative overflow-hidden">
            <div className="flex justify-between items-start w-full">
              <h3 className="text-[1.95rem] font-bold text-white leading-tight font-serif">
                Gemeinschaft
                <br />Schwingungen
              </h3>
              {/* Overlapping avatar badge */}
              <div className="flex items-center -space-x-2.5">
                <img src="/man1.svg" className="w-8 h-8 rounded-full border-2 border-[#1B1B1E] object-cover" alt="" />
                <img src="/man2.svg" className="w-8 h-8 rounded-full border-2 border-[#1B1B1E] object-cover" alt="" />
                <div className="w-8 h-8 rounded-full bg-[#e5b842] text-[#080c14] flex items-center justify-center text-[0.6rem] font-extrabold border-2 border-[#1B1B1E]">
                  +12k
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[3.2rem] font-serif font-extrabold text-[#e5b842] leading-none">4.9</span>
                <span className="text-[0.85rem] text-[#8a96b0] font-medium">/ 5.0 Bewertung</span>
              </div>
              <p className="text-[0.95rem] leading-[1.65] text-[#8a96b0] max-w-[360px]">
                Schließe dich Tausenden an, die ihren Zufluchtsort in den Sternen finden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VoicesSection() {
  return (
    <section className="py-[100px] bg-[#131316] relative" id="stimmen">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-2">
          <span className="text-[0.72rem] font-bold tracking-[0.25em] text-[#e5b842] uppercase font-sans">
            PERSONALISIERTE FREQUENZ
          </span>
          <h2 className="text-[3.2rem] font-serif font-bold text-white mt-1 mb-4 leading-tight">
            Himmlische Stimmen
          </h2>
          <p className="text-[1.05rem] text-[#8a96b0] max-w-[760px] leading-[1.7] mx-auto font-sans">
            Wähle die Resonanz, die mit deinem aktuellen Zustand übereinstimmt. Unsere Stimmen sind darauf ausgelegt, dich durch die kosmische Leere zu führen.
          </p>
        </div>

        {/* Voice Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1350px] mx-auto">
          {/* Card 1: Männliche Stimme */}
          <div className="bg-[#1B1B1E] border border-[#e5b842]/20 rounded-3xl p-8 flex flex-row items-center gap-6 transition-all duration-300 hover:bg-[#202024] hover:border-[#e5b842]/45 hover:-translate-y-1 shadow-[0_0_20px_rgba(229,184,66,0.02)] hover:shadow-[0_0_25px_rgba(229,184,66,0.06)] relative overflow-hidden">
            {/* Voice Portrait */}
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-white/10 flex-shrink-0 flex items-center justify-center relative bg-[#131316]">
              <img src="/voice-alexander.svg" alt="Männliche Stimme" className="w-full h-full object-cover" />
            </div>

            {/* Voice Details */}
            <div className="flex-1">
              <h3 className="text-[1.65rem] font-bold text-[#e5b842] font-serif mb-1 leading-tight">
                Männliche Stimme
              </h3>
              <span className="text-[0.72rem] font-bold tracking-[0.15em] text-[#8a96b0] uppercase font-sans mb-4 block">
                TIEF & GEERDET
              </span>
              
              {/* Audio Mockup Player Bar */}
              <div className="flex items-center gap-4 w-full mt-5">
                <Waves size={18} className="text-[#e5b842] flex-shrink-0" />
                <div className="flex-1 h-[3px] bg-white/10 rounded-full relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#e5b842] w-[15%] rounded-full" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#e5b842] -top-[2px] left-[15%] shadow-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Weibliche Stimme */}
          <div className="bg-[#1B1B1E] border border-[#e5b842]/20 rounded-3xl p-8 flex flex-row items-center gap-6 transition-all duration-300 hover:bg-[#202024] hover:border-[#e5b842]/45 hover:-translate-y-1 shadow-[0_0_20px_rgba(229,184,66,0.02)] hover:shadow-[0_0_25px_rgba(229,184,66,0.06)] relative overflow-hidden">
            {/* Voice Portrait */}
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-white/10 flex-shrink-0 flex items-center justify-center relative bg-[#131316]">
              <img src="/voice-serena.svg" alt="Weibliche Stimme" className="w-full h-full object-cover" />
            </div>

            {/* Voice Details */}
            <div className="flex-1">
              <h3 className="text-[1.65rem] font-bold text-[#e5b842] font-serif mb-1 leading-tight">
                Weibliche Stimme
              </h3>
              <span className="text-[0.72rem] font-bold tracking-[0.15em] text-[#8a96b0] uppercase font-sans mb-4 block">
                SANFT & LEUCHTEND
              </span>
              
              {/* Audio Mockup Player Bar */}
              <div className="flex items-center gap-4 w-full mt-5">
                <svg className="w-5 h-5 text-[#e5b842] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 10v4M8 6v12M12 3v18M16 6v12M20 10v4" />
                </svg>
                <div className="flex-1 h-[3px] bg-white/10 rounded-full relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#e5b842] w-[45%] rounded-full" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#e5b842] -top-[2px] left-[45%] shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchiveSection() {
  const archives = [
    {
      title: "Tiefe Konzentration",
      duration: "15 MIN",
      img: "/cosmic-bg.png",
      desc: "Fokussiere dein Bewusstsein auf den Punkt eines einzelnen Sterns im obsidianfarbenen Nichts."
    },
    {
      title: "Solarer Atem",
      duration: "20 MIN",
      img: "/hero_bg.jpg",
      desc: "Atme die Wärme ferner Sonnen ein und atme die kalte Stille des tiefen Weltraums aus."
    },
    {
      title: "Nebel Drift",
      duration: "10 MIN",
      img: "/voice-serena.svg",
      desc: "Lass dein Bewusstsein sich in eine Wolke aus Sternenstaub und kosmischem Potenzial ausdehnen."
    }
  ];

  return (
    <section className="py-[100px] relative bg-[#080D1E]" id="archiv">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-2 text-left max-w-[1350px] mx-auto">
          <span className="text-[0.72rem] font-bold tracking-[0.25em] text-[#e5b842] uppercase font-sans">
            VERGANGENE MEDITATIONEN
          </span>
          <h2 className="text-[3.2rem] font-serif font-bold text-white mt-1 mb-4 leading-tight">
            Das Archiv
          </h2>
          <p className="text-[1.05rem] text-[#8a96b0] max-w-[760px] leading-[1.7] font-sans">
            Verbinde dich erneut mit Sitzungen, die zu deiner Reise passten. Jeder Moment des Friedens ist hier bewahrt.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1350px] mx-auto">
          {archives.map((c, i) => (
            <div 
              key={i} 
              className="bg-[#1B1B1E] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-[#202024] hover:border-[#e5b842]/20 hover:-translate-y-1 group flex flex-col h-full shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            >
              {/* Card Banner Image */}
              <div className="w-full aspect-[1.5] relative overflow-hidden bg-[#080c14]">
                <img 
                  src={c.img} 
                  alt={c.title} 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1E] via-[#1B1B1E]/10 to-transparent" />
                
                {/* Float Duration Badge */}
                <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/85 text-[#e5b842] rounded-full text-[0.62rem] font-bold tracking-wider">
                  {c.duration}
                </span>
              </div>

              {/* Text Padding Area */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-[1.5rem] font-serif font-bold text-white mb-3 transition-colors group-hover:text-[#e5b842]">
                    {c.title}
                  </h3>
                  <p className="text-[0.95rem] leading-[1.65] text-[#8a96b0] mb-6">
                    {c.desc}
                  </p>
                </div>
                
                <Link 
                  href="/meditation/neue-meditation" 
                  className="text-[0.72rem] font-extrabold tracking-[0.18em] text-[#e5b842] hover:text-[#fad84a] inline-flex items-center gap-1 mt-auto transition-colors"
                >
                  NOCHMAL ANSEHEN ▷
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      category: "EINSTEIGER",
      name: "BASIC",
      price: "9.90 €",
      period: "PRO MONAT",
      credits: "1 Credit inclusive",
      features: [
        "Individualisierte Deep Meditation",
        "Stimme frei wählbar (w / m)",
        "Themenspezifische binaurale Musik",
        "Dauerhafte Portalnutzung",
        "Volle Mixersteuerung",
        "Automatische Archiv- Speicherung"
      ],
      cta: "Jetzt starten",
      href: "/meditation/neue-meditation",
      highlighted: false,
      goldCheckmarks: false
    },
    {
      category: "EMPFEHLUNG",
      name: "CORE",
      price: "29.90 €",
      period: "PRO MONAT",
      credits: "3 Credits inclusive",
      features: [
        "Individualisierte Deep Meditation",
        "Stimme frei wählbar (w / m)",
        "Themenspezifische binaurale Musik",
        "Dauerhafte Portalnutzung",
        "Volle Mixersteuerung",
        "Automatische Archiv- Speicherung"
      ],
      cta: "CORE Plan wählen",
      href: "/meditation/abonnement",
      highlighted: true,
      goldCheckmarks: true
    },
    {
      category: "BUSINESS",
      name: "PRO",
      price: "89.90 €",
      period: "PRO MONAT",
      credits: "10 Credits inclusive",
      features: [
        "Individualisierte Deep Meditation",
        "Stimme frei wählbar (w / m)",
        "Themenspezifische binaurale Musik",
        "Dauerhafte Portalnutzung",
        "Volle Mixersteuerung",
        "Automatische Archiv- Speicherung"
      ],
      cta: "Professional\nUpgrade",
      href: "/meditation/abonnement",
      highlighted: false,
      goldCheckmarks: false
    }
  ];

  return (
    <section className="py-[100px] relative bg-[#080D1E]" id="preise">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-2 text-left max-w-[1350px] mx-auto">
          <span className="text-[0.72rem] font-bold tracking-[0.25em] text-[#e5b842] uppercase font-sans">
            AUFSTIEG ZU HÖHERER KLARHEIT
          </span>
          <h2 className="text-[3.2rem] font-serif font-bold text-white mt-1 mb-4 leading-tight">
            Abonnement
          </h2>
          <p className="text-[1.05rem] text-[#8a96b0] max-w-[780px] leading-[1.7] font-sans">
            Entfalte die volle Frequenz des Kosmos. Wähle die Reise, die mit deiner spirituellen Entwicklung in Einklang steht.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1350px] mx-auto items-stretch">
          {plans.map((p, i) => (
            <div 
              key={i} 
              className={`rounded-[28px] p-8 flex flex-col gap-6 relative transition-all duration-300 hover:-translate-y-1.5 ${
                p.highlighted 
                  ? "bg-[#1B1B1E] border-2 border-[#e5b842] shadow-[0_0_30px_rgba(229,184,66,0.12)]" 
                  : "bg-[#1B1B1E]/40 border border-white/10 hover:border-white/20 hover:bg-[#1B1B1E]/60 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
              }`}
            >
              {/* Highlight Label */}
              {p.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e5b842] text-[#080c14] text-[0.62rem] font-extrabold px-4 py-1.5 rounded-full whitespace-nowrap tracking-[0.2em] uppercase shadow-lg">
                  MEISTGEWÄHLT
                </div>
              )}

              {/* Category & Title */}
              <div>
                <span className={`text-[0.68rem] font-extrabold tracking-widest uppercase block ${
                  p.highlighted ? "text-[#e5b842]" : "text-[#8a96b0]"
                }`}>
                  {p.category}
                </span>
                <h3 className="text-[2rem] font-bold text-white mt-1 leading-tight font-sans">
                  {p.name}
                </h3>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[3.4rem] font-bold text-white leading-none">
                    {p.price}
                  </span>
                </div>
                <span className="text-[0.72rem] font-bold tracking-widest text-[#8a96b0] uppercase block mt-2">
                  {p.period}
                </span>
                <span className="text-[0.875rem] font-bold text-[#e5b842] block mt-3">
                  {p.credits}
                </span>
              </div>

              {/* Features List */}
              <ul className="list-none flex flex-col gap-4 flex-grow my-3 border-t border-white/5 pt-6">
                {p.features.map((f, index) => (
                  <li key={index} className="flex items-start gap-3.5 text-[0.825rem] text-[#c5cdd9] leading-[1.5]">
                    <Check 
                      size={14} 
                      className={`flex-shrink-0 mt-0.5 ${
                        p.goldCheckmarks ? "text-[#e5b842]" : "text-white/70"
                      }`} 
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link 
                href={p.href} 
                className={`w-full text-center rounded-full text-[0.875rem] font-bold tracking-wider transition-all duration-300 active:scale-95 flex flex-col justify-center items-center ${
                  p.highlighted 
                    ? "bg-[#e5b842] text-[#080c14] hover:bg-[#fad84a] shadow-[0_0_15px_rgba(229,184,66,0.2)] py-4" 
                    : "border border-white/20 text-white hover:bg-white/5 hover:border-white/40 h-[56px] py-2 whitespace-pre-line"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Pricing Footer text */}
        <div className="text-center mt-12">
          <Link href="/meditation/abonnement" className="text-[0.72rem] font-bold text-[#8a96b0] hover:text-[#f2ca50] tracking-widest uppercase transition-colors">
            Abonnement verwalten
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { 
      q: "Kann ich meine Reise jederzeit abbrechen?", 
      a: "Ja, du bist der Meister deiner eigenen Umlaufbahn. Du kannst dein Abonnement jederzeit über deine Kontoeinstellungen pausieren oder kündigen, ganz ohne himmlische Reibung." 
    },
    { 
      q: "Was sind Priority AI-Generationen?", 
      a: "Cosmic Unlimited-Mitglieder erhalten Zugang zu unserem erstklassigen Server-Cluster, der nahezu sofortiges Rendern von individuellen Meditationsstimmen und personalisierten Skripten ermöglicht." 
    },
    { 
      q: "Ist der 'Jahres'-Tarif wirklich besser im Preis-Leistungs-Verhältnis?", 
      a: "In der Tat. Die Wahl des Cosmic Unlimited Jahreszyklus bietet dir etwa 4 Monate kostenlosen Zugang im Vergleich zum monatlichen Celestial-Tarif." 
    }
  ];

  return (
    <section className="py-[100px] bg-[#080D1E] relative" id="faq">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="text-[3.2rem] font-serif font-bold text-white leading-tight">
            Häufige Vibrationen
          </h2>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4 max-w-[1150px] mx-auto">
          {faqs.map((item, i) => (
            <details 
              key={i} 
              open
              className="bg-[#1B1B1E] border border-white/5 rounded-2xl overflow-hidden group transition-all duration-300 hover:bg-[#202024] hover:border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.15)]"
            >
              <summary className="flex items-center justify-between py-6 px-8 cursor-pointer text-[1.18rem] font-bold text-white list-none gap-4 select-none font-sans">
                <span>{item.q}</span>
                <ChevronDown size={18} className="text-[#8a96b0] transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
              </summary>
              <div className="px-8 pb-6 pt-1 text-[0.875rem] leading-[1.65] text-[#8a96b0] font-sans">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-[60px] md:py-[100px] relative overflow-hidden px-6">
      <div className="max-w-[1600px] mx-auto rounded-3xl bg-gradient-to-br from-[#0d1320] to-[#080c14] border border-white/5 relative overflow-hidden p-8 md:p-14 shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* Background cosmic galaxy image */}
        <div className="absolute inset-0 bg-[url('/cosmic-bg.png')] bg-cover bg-center opacity-25 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1320] via-transparent to-[#0d1320]/90 z-0 pointer-events-none" />

        <div className="relative z-10 text-center lg:text-left max-w-[700px]">
          <h2 className="text-[2rem] md:text-[2.8rem] font-extrabold text-white leading-tight font-sans">
            Ein Universum des Friedens erwartet dich
          </h2>
          <p className="text-[1.05rem] text-[#8a96b0] mt-3.5 leading-relaxed">
            Schließe dich Tausenden an, die ihre geistige Gesundheit bereits mit gina revolutioniert haben.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          {mounted && isAuthenticated ? (
            <Link 
              href="/meditation/neue-meditation" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#080c14] font-bold rounded-full transition-all duration-300 shadow-xl hover:bg-[#f2ca50] hover:shadow-[0_0_24px_rgba(242,202,80,0.3)] hover:-translate-y-px active:scale-95 text-xs tracking-wider"
            >
              <Sparkles size={14} />
              MEDITATION STARTEN
            </Link>
          ) : mounted ? (
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#080c14] font-bold rounded-full transition-all duration-300 shadow-xl hover:bg-[#f2ca50] hover:shadow-[0_0_24px_rgba(242,202,80,0.3)] hover:-translate-y-px active:scale-95 text-xs tracking-wider"
            >
              <Sparkles size={14} />
              JETZT STARTEN
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#080c14]">
      {/* Fixed Layout Components */}
      <Navbar />
      
      {/* Scrollable Layout Body */}
      <main className="relative z-10">
        <HeroSection />
        <BentoFeatures />
        <VoicesSection />
        <ArchiveSection />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
}
