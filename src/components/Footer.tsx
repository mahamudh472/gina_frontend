import Link from "next/link";
import { X, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#080c14]/95 border-t border-border pt-16 pb-8 mt-20">
      <div className="max-w-[1200px] mx-auto px-8 container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="VISULARA" style={{ height: "28px", width: "auto" }} />
            </Link>
            <p className="text-[0.875rem] leading-[1.7] text-text-muted">
              KI-Meditationen, die dich wirklich kennen.
              <br />
              Erschaffe deine ganz persönliche Meditationsreise.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-[0.8rem] font-bold tracking-widest uppercase text-text-primary mb-1">Produkt</h4>
              <Link href="/service" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Stimmen</Link>
              <Link href="/#preise" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Preise</Link>
              <Link href="/meditation/archiv" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Archiv</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[0.8rem] font-bold tracking-widest uppercase text-text-primary mb-1">Unternehmen</h4>
              <Link href="/#ueber" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Über uns</Link>
              <Link href="/#" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Blog</Link>
              <Link href="/#" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Presse</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[0.8rem] font-bold tracking-widest uppercase text-text-primary mb-1">Rechtliches</h4>
              <Link href="/#" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Datenschutz</Link>
              <Link href="/#" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Nutzungsbedingungen</Link>
              <Link href="/#" className="text-[0.875rem] text-text-muted transition-colors duration-200 hover:text-text-primary">Impressum</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-border gap-4 text-center sm:text-left">
          <p className="text-[0.8rem] text-text-muted">
            © {new Date().getFullYear()} VISULARA. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/6 border border-border text-text-muted transition-all duration-200 hover:bg-accent/12 hover:border-accent/30 hover:text-accent" aria-label="Instagram">
              <Camera size={18} />
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/6 border border-border text-text-muted transition-all duration-200 hover:bg-accent/12 hover:border-accent/30 hover:text-accent" aria-label="Twitter/X">
              <X size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


