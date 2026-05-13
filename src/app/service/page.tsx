import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mic, Volume2, Headphones, Play } from "lucide-react";

const voices = [
  {
    name: "Alexander",
    desc: "Tief, erdend, resonant",
    tags: ["Warm", "Beständig", "Zentriert"],
    emoji: "🧘‍♂️",
    color: "rgba(139,155,180,0.15)",
    qualities: ["Ideal für tiefe Entspannung", "Führt durch Bodyscans", "Stärkt Fokus & Klarheit"],
  },
  {
    name: "Serena",
    desc: "Sanft, beruhigend, fürsorglich",
    tags: ["Sanft", "Fließend", "Weitreichend"],
    emoji: "🌸",
    color: "rgba(201,160,220,0.15)",
    qualities: ["Ideal für Selbstliebe", "Begleitet Einschlafmeditationen", "Öffnet das Herz"],
  },
];

export default function ServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative pt-[160px] pb-[100px] overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[url('/cosmic-bg.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#080c14]/94 to-[#080c14]/78" />
          </div>
          <div className="relative z-10 text-center flex flex-col items-center gap-5 container mx-auto px-4">
            <span className="badge inline-flex items-center gap-2"><Mic size={12} />Himmlische Stimmen</span>
            <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.15] text-white">
              Die Stimmen, die deine
              <br /><span className="text-accent">Reise begleiten</span>
            </h1>
            <p className="text-[1.05rem] text-text-muted max-w-[540px] leading-[1.7]">
              Jede Stimme ist sorgfältig ausgewählt, um deine Meditationsreise zu unterstützen.
              Finde die Stimme, die mit dir resoniert.
            </p>
          </div>
        </section>

        {/* Voices */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
              {voices.map((v, i) => (
                <div key={i} className="overflow-hidden glass-card">
                  <div className="h-[200px] flex items-center justify-center relative rounded-t-lg" style={{ background: v.color }}>
                    <span className="text-[5rem]">{v.emoji}</span>
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-accent hover:text-[#0b0f17] hover:border-accent" aria-label={`${v.name} Vorschau`}>
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-7 flex flex-col gap-3.5">
                    <h2 className="text-[1.6rem] font-bold text-white">{v.name}</h2>
                    <p className="text-[0.9rem] text-text-muted">{v.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {v.tags.map((t) => <span key={t} className="px-3 py-1 bg-white/6 border border-border rounded-full text-[0.78rem] text-text-muted">{t}</span>)}
                    </div>
                    <ul className="list-none flex flex-col gap-2">
                      {v.qualities.map((q) => <li key={q} className="text-[0.875rem] text-text-sub">✦ {q}</li>)}
                    </ul>
                    <Link href="/meditation/neue-meditation" className="btn-primary mt-2">
                      Mit {v.name} meditieren
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sound Environments */}
        <section className="py-20 px-4 bg-[#0d1320]/50">
          <div className="container mx-auto">
            <div className="text-center mb-12 flex flex-col items-center gap-3.5">
              <span className="badge inline-flex items-center gap-2"><Volume2 size={12} />Klanglandschaften</span>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-white">Atmosphären für jede Reise</h2>
              <p className="text-[0.95rem] text-text-muted max-w-[480px] leading-[1.6]">Wähle aus einer Vielzahl atmosphärischer Klangteppiche.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[700px] mx-auto">
              {["🌊 Ozeanwellen", "🌲 Waldgeräusche", "🌧️ Regen", "🔥 Kaminfeuer", "🎵 Binaural Beats", "🌌 Kosmisch"].map((s) => (
                <div key={s} className="p-5 flex items-center gap-3 cursor-pointer glass-card">
                  <Headphones size={20} className="text-accent flex-shrink-0" />
                  <span className="text-[0.9rem] font-medium text-text-sub">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

