"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-5 md:px-8 h-[90px] bg-[#080c14]/70 backdrop-blur-[20px] border-b border-white/6">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="VISULARA" className="h-12 w-auto block" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          <li><Link href="/service" className="px-4 py-2 text-[0.9rem] font-medium text-text-muted rounded-pill transition-all duration-200 hover:text-text-primary hover:bg-white/6">Stimmen</Link></li>
          <li><Link href="/#preise" className="px-4 py-2 text-[0.9rem] font-medium text-text-muted rounded-pill transition-all duration-200 hover:text-text-primary hover:bg-white/6">Preise</Link></li>
          <li><Link href="/#faq" className="px-4 py-2 text-[0.9rem] font-medium text-text-muted rounded-pill transition-all duration-200 hover:text-text-primary hover:bg-white/6">FAQ</Link></li>
          <li><Link href="/#ueber" className="px-4 py-2 text-[0.9rem] font-medium text-text-muted rounded-pill transition-all duration-200 hover:text-text-primary hover:bg-white/6">Über uns</Link></li>
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/meditation/neue-meditation" className="btn-primary hidden md:inline-flex">
            Kostenlos starten
          </Link>
          <button
            className="md:hidden bg-white/8 border border-border rounded-sm text-text-primary p-2 cursor-pointer transition-all duration-200 hover:bg-white/14"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col gap-2 px-8 py-5 border-t border-border bg-[#080c14]/96 md:hidden">
          <Link href="/service" className="block py-3 px-4 text-text-muted font-medium rounded-sm transition-all duration-200 hover:text-white hover:bg-white/5" onClick={() => setOpen(false)}>Stimmen</Link>
          <Link href="/#preise" className="block py-3 px-4 text-text-muted font-medium rounded-sm transition-all duration-200 hover:text-white hover:bg-white/5" onClick={() => setOpen(false)}>Preise</Link>
          <Link href="/#faq" className="block py-3 px-4 text-text-muted font-medium rounded-sm transition-all duration-200 hover:text-white hover:bg-white/5" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/#ueber" className="block py-3 px-4 text-text-muted font-medium rounded-sm transition-all duration-200 hover:text-white hover:bg-white/5" onClick={() => setOpen(false)}>Über uns</Link>
          <Link href="/meditation/neue-meditation" className="btn-primary w-full justify-center mt-2" onClick={() => setOpen(false)}>
            Kostenlos starten
          </Link>
        </div>
      )}
    </nav>
  );
}

