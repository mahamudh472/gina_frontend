import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0E0E11] border-t border-white/5 pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Newsletter Section */}
        <div className="text-center mb-20">
          <span className="text-[0.72rem] font-bold tracking-[0.25em] text-[#e5b842] uppercase font-sans">
            TRETEN SIE DEM ORBIT BEI
          </span>
          <h2 className="text-[3.2rem] font-serif font-bold text-white mt-4 mb-10 max-w-[960px] mx-auto leading-tight">
            Erhalten Sie himmlische Weisheit in Ihrem Posteingang.
          </h2>
          
          <form className="max-w-[620px] mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input 
              type="email" 
              placeholder="Ihre himmlische Adresse" 
              required 
              className="w-full sm:w-[420px] px-8 py-4 rounded-full bg-[#1B1B1E] border border-white/10 text-white text-[0.95rem] placeholder-[#8a96b0]/40 outline-none focus:border-[#e5b842]/50 transition-colors shadow-inner"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto px-8 py-4 bg-[#e2e2e8] hover:bg-white text-[#080c14] font-bold rounded-full text-[0.95rem] transition-colors shadow-lg cursor-pointer"
            >
              Abonnieren
            </button>
          </form>
        </div>

        {/* Brand Divider & Info */}
        <div className="flex flex-col items-center border-t border-white/5 pt-16">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2 group mb-4">
            {/* circular wave line art logo */}
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden bg-white/5 transition-transform duration-300 group-hover:scale-105">
              {/* sparkles representing stars */}
              <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-2 left-3 opacity-60" />
              <div className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full top-3 left-5 opacity-40" />
              <div className="absolute w-[2.5px] h-[2.5px] bg-[#e5b842] rounded-full top-1.5 left-4 animate-pulse" />
              {/* wave / crescent */}
              <div className="absolute inset-1.5 rounded-full border-t border-l border-white/30 rotate-45" />
              {/* meditating figure at bottom center */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <div className="w-2.5 h-1 rounded-t-full bg-white/80" />
              </div>
            </div>
            <span className="text-[1.1rem] font-bold tracking-[0.2em] text-white font-sans uppercase">
              VISULARA
            </span>
          </Link>

          {/* Subtitle */}
          <p className="text-[0.68rem] font-bold tracking-[0.25em] text-[#8a96b0]/80 uppercase mb-8 text-center font-sans">
            GELEITET VON DEN STERNEN. FÜR DIE SEELE GEMACHT.
          </p>

          {/* Horizontal Links */}
          <div className="flex items-center gap-8 justify-center flex-wrap">
            <Link href="/#" className="text-[0.8rem] font-medium text-[#8a96b0] hover:text-[#e5b842] transition-colors duration-200">
              Datenschutz
            </Link>
            <Link href="/#" className="text-[0.8rem] font-medium text-[#8a96b0] hover:text-[#e5b842] transition-colors duration-200">
              Nutzungsbedingungen
            </Link>
            <Link href="/#" className="text-[0.8rem] font-medium text-[#8a96b0] hover:text-[#e5b842] transition-colors duration-200">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
