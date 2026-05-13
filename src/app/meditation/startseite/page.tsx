import Link from "next/link";

export default function StartseitePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] w-full px-5 py-20 gap-10 animate-in fade-in zoom-in-95 duration-1000">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-[0.7rem] font-bold tracking-[0.15em] uppercase">
          ✨ KI-GESTÜTZTE MEDITATION
        </div>

        {/* Heading - Large and Serif */}
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif font-extrabold leading-[1.1] text-white max-w-[800px]">
          Entfalte dein Potenzial <br />
          <span className="text-white">mit deiner individuellen <br /> Meditation</span>
        </h1>

        {/* Description */}
        <p className="text-[1.1rem] leading-[1.7] text-white/80 max-w-[650px]">
          Erstelle deine Meditation in vier Schritten. Persönlich, eindringlich und <br className="hidden md:block" />
          genau auf deine Seelenreise zugeschnitten.
        </p>

        {/* Steps Indicator - Circles as in image */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { n: 1, l: "Absicht" },
            { n: 2, l: "Stimme" },
            { n: 3, l: "Erfahrung" },
            { n: 4, l: "Erzeugen" }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <span className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center text-[0.9rem] font-black shadow-[0_0_15px_rgba(242,202,80,0.4)]">
                {step.n}
              </span>
              <span className="text-white font-medium text-[0.95rem] opacity-90">{step.l}</span>
              {idx < 3 && <span className="text-white/20 ml-2 hidden md:block text-xl font-light">›</span>}
            </div>
          ))}
        </div>

        {/* Primary CTA Button */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <Link 
            href="/meditation/neue-meditation" 
            className="px-12 py-5 rounded-full bg-accent text-[#0b0f17] text-[1.25rem] font-black no-underline shadow-[0_0_50px_rgba(242,202,80,0.4)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_70px_rgba(242,202,80,0.6)] hover:brightness-110 active:scale-95"
          >
            Meine Meditation starten
          </Link>
          <p className="text-[0.8rem] text-white/50 tracking-wide font-medium">
            Kein Konto erforderlich · Kostenlos testen
          </p>
        </div>
      </div>
    </div>
  );
}

