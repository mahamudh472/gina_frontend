import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Star, Users, Headphones, Music, BookOpen, Waves, ChevronDown, Check, Sparkles, Zap } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/banner-bg.svg')] bg-cover bg-[center_top] z-0" />
      <div className="relative z-10 pt-[100px] pb-[80px] max-w-[720px] container">
        <div className="badge mb-7 animate-fade-in-up"><Sparkles size={12} /> KI-generierte Meditationen</div>
        <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.15] tracking-tight text-white mb-6 animate-fade-in-up [animation-delay:0.1s]">
          Entfalte dein Potenzial
          <br /><span className="text-accent">mit deiner individuellen</span>
          <br />Meditation.
        </h1>
        <p className="text-[1.1rem] leading-[1.7] text-text-sub max-w-[560px] mb-10 animate-fade-in-up [animation-delay:0.2s]">
          VISULARA erschafft einzigartige Meditationen basierend auf deiner Absicht, Stimme und Bedürfnissen – personalisiert wie nie zuvor.
        </p>
        <div className="flex items-center gap-4 flex-wrap mb-5 animate-fade-in-up [animation-delay:0.3s]">
          <Link href="/meditation/neue-meditation" className="btn-primary"><Sparkles size={16} />Meditation erstellen</Link>
          <Link href="/#preise" className="btn-secondary">Pläne entdecken</Link>
        </div>
        <p className="text-[0.8rem] text-text-muted animate-fade-in-up [animation-delay:0.4s]">Kein Konto erforderlich · Kostenlos testen</p>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: <Star size={18} fill="#f2ca50" color="#f2ca50" />, value: "4.9 / 5.0", label: "Bewertung" },
    { icon: <Users size={18} />, value: "12.000+", label: "aktive Nutzer" },
    { icon: <Headphones size={18} />, value: "85.000+", label: "Meditationen generiert" },
  ];
  return (
    <div className="relative z-20 bg-[#0d1320]/85 backdrop-blur-[20px] border-y border-border py-6">
      <div className="flex items-center justify-center gap-16 flex-wrap container">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-accent flex">{s.icon}</span>
            <span className="text-[1.2rem] font-bold text-white">{s.value}</span>
            <span className="text-[0.85rem] text-text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    { icon: <Music size={28} />, title: "Klang Landschaften", desc: "Atmosphärische Klangteppiche aus Natur, Binaural Beats und ambienter Musik.", tag: "8D Audio" },
    { icon: <BookOpen size={28} />, title: "Weisheitsarchiv", desc: "Persönliche Bibliothek aller vergangenen Meditationen – jederzeit abrufbar.", tag: "Unbegrenzt" },
    { icon: <Waves size={28} />, title: "8D Spatial Sound", desc: "Dreidimensionaler Klang, der dich vollständig umhüllt für tiefste Entspannung.", tag: "Exklusiv" },
    { icon: <Zap size={28} />, title: "KI-Personalisierung", desc: "Die KI passt jede Meditation individuell an deine Stimmung und Bedürfnisse an.", tag: "KI-gestützt" },
  ];
  return (
    <section className="py-[100px] relative" id="features">
      <div className="container">
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="badge">Features</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-white">Alles für deine perfekte Meditation</h2>
          <p className="text-[1rem] text-text-muted max-w-[540px] leading-[1.6]">VISULARA kombiniert KI-Technologie mit bewährten Meditationstechniken.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-8 flex flex-col gap-3">
              <div className="w-[52px] h-[52px] rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">{f.icon}</div>
              <span className="text-[0.72rem] font-bold tracking-widest uppercase text-accent">{f.tag}</span>
              <h3 className="text-[1.15rem] font-bold text-white">{f.title}</h3>
              <p className="text-[0.9rem] leading-[1.65] text-text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Wähle deine Absicht", desc: "Entspannung, Fokus, Selbstliebe oder eine der 8 Kategorien.", img: "/intention-1.svg" },
    { num: "02", title: "Wähle deine Stimme", desc: "Alexander – tief & resonant oder Serena – sanft & beruhigend.", img: "/hero-step2.svg" },
    { num: "03", title: "Personalisiere dein Erlebnis", desc: "Beantworte Fragen zu deiner Stimmung und Bedürfnissen.", img: "/hero-step3.svg" },
    { num: "04", title: "Genieße deine Meditation", desc: "VISULARA generiert eine einzigartige Meditation nur für dich.", img: "/hero-step5.svg" },
  ];
  return (
    <section className="py-[100px] bg-[#0d1320]/50" id="ueber">
      <div className="container">
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="badge">Wie es funktioniert</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-white">In 4 Schritten zur perfekten Meditation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-3 p-0 relative group">
              <div className="w-full aspect-video bg-white/3 border border-border rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <span className="text-[2rem] font-black text-accent/20 leading-none">{s.num}</span>
              <h3 className="text-[1rem] font-bold text-white">{s.title}</h3>
              <p className="text-[0.875rem] text-text-muted leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoicesSection() {
  const voices = [
    { name: "Alexander", desc: "Tief, erdend, resonant", tags: ["Warm", "Beständig", "Zentriert"], img: "/voice-alexander.svg" },
    { name: "Serena", desc: "Sanft, beruhigend, fürsorglich", tags: ["Sanft", "Fließend", "Weitreichend"], img: "/voice-serena.svg" },
  ];
  return (
    <section className="py-[100px]" id="stimmen">
      <div className="container">
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="badge">Himmlische Stimmen</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-white">Deine Meditationsbegleiter</h2>
          <p className="text-[1rem] text-text-muted max-w-[540px] leading-[1.6]">Wähle die Stimme, die deine Reise begleiten soll.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {voices.map((v, i) => (
            <div key={i} className="glass-card py-10 px-8 flex flex-col items-center gap-4 text-center">
              <div className="w-[100px] h-[100px] rounded-full bg-white/4 flex items-center justify-center border border-white/10 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-[1.4rem] font-bold text-white">{v.name}</h3>
              <p className="text-[0.9rem] text-text-muted">{v.desc}</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {v.tags.map((t) => <span key={t} className="px-3 py-1 bg-white/6 border border-border rounded-pill text-[0.78rem] text-text-muted">{t}</span>)}
              </div>
              <Link href="/meditation/neue-meditation" className="btn-secondary">Mit {v.name} meditieren</Link>
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
      name: "Kostenlos", price: "0 €", period: "/ Monat", desc: "Zum Kennenlernen",
      features: ["3 Meditationen / Monat", "2 Stimmen", "Standard-Audio", "Archiv 7 Tage"],
      cta: "Jetzt starten", href: "/meditation/neue-meditation", highlighted: false,
    },
    {
      name: "Pro", price: "9,99 €", period: "/ Monat", desc: "Für engagierte Meditierenden",
      features: ["Unbegrenzte Meditationen", "Alle Stimmen & Klänge", "8D Spatial Sound", "Vollständiges Archiv", "Personalisierungsprofile"],
      cta: "Pro werden", href: "/meditation/abonnement", highlighted: true,
    },
    {
      name: "Premium", price: "79,99 €", period: "/ Jahr", desc: "Spare 33% gegenüber monatlich",
      features: ["Alles in Pro", "Frühzeitiger Feature-Zugang", "Prioritäts-Support", "Exklusive Stimmen"],
      cta: "Premium wählen", href: "/meditation/abonnement", highlighted: false,
    },
  ];
  return (
    <section className="py-[100px] bg-[#0d1320]/50" id="preise">
      <div className="container">
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="badge">Preise</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-white">Wähle deinen Plan</h2>
          <p className="text-[1rem] text-text-muted max-w-[540px] leading-[1.6]">Starte kostenlos und upgrade jederzeit.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start max-w-[1200px] mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`glass-card py-9 px-7 flex flex-col gap-5 relative ${p.highlighted ? "border-border-accent shadow-[0_0_32px_rgba(242,202,80,0.12)] lg:-translate-y-2" : ""}`}>
              {p.highlighted && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-[#0b0f17] text-[0.72rem] font-bold px-3.5 py-1 rounded-pill whitespace-nowrap">Beliebteste Wahl</div>}
              <div className="flex flex-col gap-1">
                <span className="text-[1.1rem] font-bold text-white">{p.name}</span>
                <p className="text-[0.825rem] text-text-muted">{p.desc}</p>
              </div>
              <div className="flex items-baseline gap-1.5 pb-4 border-b border-border">
                <span className="text-[2.2rem] font-extrabold text-white">{p.price}</span>
                <span className="text-[0.875rem] text-text-muted">{p.period}</span>
              </div>
              <ul className="list-none flex flex-col gap-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.875rem] text-text-sub">
                    <Check size={15} className="text-accent flex-shrink-0 mt-0.5" /><span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={p.href} className={p.highlighted ? "btn-primary w-full" : "btn-secondary w-full"}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "Wie funktioniert die KI-Meditation?", a: "VISULARA nutzt KI, um basierend auf deiner Absicht, Stimme und persönlichen Angaben eine vollständig individuelle Meditation zu generieren." },
    { q: "Brauche ich Meditationserfahrung?", a: "Nein. VISULARA eignet sich für Anfänger und Erfahrene. Die KI passt Tiefe und Stil automatisch an." },
    { q: "Kann ich Meditationen offline hören?", a: "Mit Pro oder Premium kannst du Meditationen herunterladen und offline genießen." },
    { q: "Wie ändere oder kündige ich meinen Plan?", a: "Jederzeit unter 'Abonnement' in den Einstellungen – ohne Mindestlaufzeit." },
    { q: "Was ist 8D Spatial Sound?", a: "Eine Technik für dreidimensionales Klangerlebnis, das dich mit Kopfhörern vollständig umhüllt." },
  ];
  return (
    <section className="py-[100px]" id="faq">
      <div className="container">
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <span className="badge">FAQ</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-tight text-white">Häufige Fragen</h2>
        </div>
        <div className="flex flex-col gap-3 max-w-[760px] mx-auto">
          {faqs.map((item, i) => (
            <details key={i} className="glass-card p-0 overflow-hidden group">
              <summary className="flex items-center justify-between py-5 px-6 cursor-pointer text-[0.95rem] font-semibold text-white list-none gap-4 select-none">
                <span>{item.q}</span>
                <ChevronDown size={18} className="flex-shrink-0 text-text-muted transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-5 text-[0.9rem] leading-[1.7] text-text-muted border-t border-border pt-4 mt-0">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-[100px] text-center bg-[url('/banner-bg.svg')] bg-cover bg-center border-t border-white/5 relative">
      <div className="absolute inset-0 bg-[#080c14]/40" />
      <div className="container relative z-10 flex flex-col items-center">
        <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-white mb-4">Bereit für deine erste Meditation?</h2>
        <p className="text-[1rem] text-text-muted mb-8">Kostenlos starten. Keine Kreditkarte erforderlich.</p>
        <Link href="/meditation/neue-meditation" className="btn-primary"><Sparkles size={16} />Jetzt kostenlos starten</Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <VoicesSection />
      <PricingSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </>
  );
}

