"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "stimmen", "archiv", "preise"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[90px] bg-[#080c14]/70 backdrop-blur-[20px] border-b border-white/5">
      <div className="max-w-[1600px] mx-auto h-full px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            {/* Logo Icon */}
            <img src="/logo.svg" alt="VISULARA logo" className="h-11 w-auto block transition-transform duration-300 group-hover:scale-105" />
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <Link
              href="/#features"
              className={`text-[1.1rem] font-medium transition-colors duration-200 ${
                activeSection === "features" ? "text-[#e5b842]" : "text-[#8a96b0] hover:text-[#e5b842]"
              }`}
            >
              Zufluchtsort
            </Link>
          </li>
          <li>
            <Link
              href="/#stimmen"
              className={`text-[1.1rem] font-medium transition-colors duration-200 ${
                activeSection === "stimmen" ? "text-[#e5b842]" : "text-[#8a96b0] hover:text-[#e5b842]"
              }`}
            >
              Stimmen
            </Link>
          </li>
          <li>
            <Link
              href="/#archiv"
              className={`text-[1.1rem] font-medium transition-colors duration-200 ${
                activeSection === "archiv" ? "text-[#e5b842]" : "text-[#8a96b0] hover:text-[#e5b842]"
              }`}
            >
              Archiv
            </Link>
          </li>
          <li>
            <Link
              href="/#preise"
              className={`text-[1.1rem] font-medium transition-colors duration-200 ${
                activeSection === "preise" ? "text-[#e5b842]" : "text-[#8a96b0] hover:text-[#e5b842]"
              }`}
            >
              Abonnement
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/meditation/neue-meditation"
            className="hidden md:inline-flex items-center justify-center px-8 py-3 bg-[#e5b842] text-[#080c14] text-sm font-bold rounded-full transition-all duration-300 hover:bg-[#fad84a] hover:shadow-[0_0_24px_rgba(229,184,66,0.45)] hover:-translate-y-px active:scale-95 cursor-pointer"
          >
            Meditation starten
          </Link>
          <button
            className="md:hidden bg-white/5 border border-white/10 rounded-full text-white p-2.5 cursor-pointer transition-all duration-200 hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[90px] left-0 right-0 border-b border-white/5 bg-[#080c14]/98 md:hidden px-6 py-6 flex flex-col gap-4 animate-fade-in">
          <Link
            href="/#features"
            className="py-3 px-4 text-sm font-semibold text-[#8a96b0] rounded-lg transition-all duration-200 hover:text-white hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Zufluchtsort
          </Link>
          <Link
            href="/#stimmen"
            className="py-3 px-4 text-sm font-semibold text-[#8a96b0] rounded-lg transition-all duration-200 hover:text-white hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Stimmen
          </Link>
          <Link
            href="/#archiv"
            className="py-3 px-4 text-sm font-semibold text-[#8a96b0] rounded-lg transition-all duration-200 hover:text-white hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Archiv
          </Link>
          <Link
            href="/#preise"
            className="py-3 px-4 text-sm font-semibold text-[#8a96b0] rounded-lg transition-all duration-200 hover:text-white hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Abonnement
          </Link>
          <Link
            href="/meditation/neue-meditation"
            className="flex justify-center items-center py-3 w-full bg-[#e5b842] text-[#080c14] text-xs font-bold rounded-full transition-all duration-200 hover:bg-[#fad84a] mt-2"
            onClick={() => setOpen(false)}
          >
            Meditation starten
          </Link>
        </div>
      )}
    </nav>
  );
}
