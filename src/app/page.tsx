import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { Star, Users, Headphones, Music, BookOpen, Waves, ChevronDown, Check, Sparkles, Zap } from "lucide-react";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroBadge}><Sparkles size={12} /> KI-generierte Meditationen</div>
        <h1 className={styles.heroTitle}>
          Entfalte dein Potenzial
          <br /><span className={styles.heroAccent}>mit deiner individuellen</span>
          <br />Meditation.
        </h1>
        <p className={styles.heroSub}>
          VISULARA erschafft einzigartige Meditationen basierend auf deiner Absicht, Stimme und Bedürfnissen – personalisiert wie nie zuvor.
        </p>
        <div className={styles.heroCtas}>
          <Link href="/meditation/neue-meditation" className="btn-primary"><Sparkles size={16} />Meditation erstellen</Link>
          <Link href="/#preise" className="btn-secondary">Pläne entdecken</Link>
        </div>
        <p className={styles.heroNote}>Kein Konto erforderlich · Kostenlos testen</p>
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
    <div className={styles.statsBar}>
      <div className={`${styles.statsInner} container`}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
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
    <section className={styles.features} id="features">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Features</span>
          <h2 className={styles.sectionTitle}>Alles für deine perfekte Meditation</h2>
          <p className={styles.sectionSub}>VISULARA kombiniert KI-Technologie mit bewährten Meditationstechniken.</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={`${styles.featureCard} glass-card`}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <span className={styles.featureTag}>{f.tag}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
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
    <section className={styles.howItWorks} id="ueber">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Wie es funktioniert</span>
          <h2 className={styles.sectionTitle}>In 4 Schritten zur perfekten Meditation</h2>
        </div>
        <div className={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepImgWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" className={styles.stepImg} />
              </div>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
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
    <section className={styles.voices} id="stimmen">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Himmlische Stimmen</span>
          <h2 className={styles.sectionTitle}>Deine Meditationsbegleiter</h2>
          <p className={styles.sectionSub}>Wähle die Stimme, die deine Reise begleiten soll.</p>
        </div>
        <div className={styles.voicesGrid}>
          {voices.map((v, i) => (
            <div key={i} className={`${styles.voiceCard} glass-card`}>
              <div className={styles.voiceAvatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.img} alt={v.name} className={styles.avatarImg} />
              </div>
              <h3 className={styles.voiceName}>{v.name}</h3>
              <p className={styles.voiceDesc}>{v.desc}</p>
              <div className={styles.voiceTags}>{v.tags.map((t) => <span key={t} className={styles.voiceTag}>{t}</span>)}</div>
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
    <section className={styles.pricing} id="preise">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Preise</span>
          <h2 className={styles.sectionTitle}>Wähle deinen Plan</h2>
          <p className={styles.sectionSub}>Starte kostenlos und upgrade jederzeit.</p>
        </div>
        <div className={styles.pricingGrid}>
          {plans.map((p, i) => (
            <div key={i} className={`${styles.pricingCard} glass-card ${p.highlighted ? styles.highlighted : ""}`}>
              {p.highlighted && <div className={styles.popularBadge}>Beliebteste Wahl</div>}
              <div className={styles.planHeader}>
                <span className={styles.planName}>{p.name}</span>
                <p className={styles.planDesc}>{p.desc}</p>
              </div>
              <div className={styles.planPrice}>
                <span className={styles.priceAmount}>{p.price}</span>
                <span className={styles.pricePeriod}>{p.period}</span>
              </div>
              <ul className={styles.planFeatures}>
                {p.features.map((f) => (
                  <li key={f} className={styles.planFeature}>
                    <Check size={15} className={styles.checkIcon} /><span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={p.href} className={p.highlighted ? "btn-primary" : "btn-secondary"} style={{ width: "100%", justifyContent: "center" }}>
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
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">FAQ</span>
          <h2 className={styles.sectionTitle}>Häufige Fragen</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item, i) => (
            <details key={i} className={`${styles.faqItem} glass-card`}>
              <summary className={styles.faqQuestion}>
                <span>{item.q}</span>
                <ChevronDown size={18} className={styles.faqChevron} />
              </summary>
              <p className={styles.faqAnswer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className={styles.ctaBanner}>
      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 className={styles.ctaTitle}>Bereit für deine erste Meditation?</h2>
        <p className={styles.ctaSub}>Kostenlos starten. Keine Kreditkarte erforderlich.</p>
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
