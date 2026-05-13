"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, BookOpen, CreditCard } from "lucide-react";

const navItems = [
  { href: "/meditation/startseite", label: "Startseite", icon: Home },
  { href: "/meditation/neue-meditation", label: "Neue Meditation", icon: Sparkles },
  { href: "/meditation/archiv", label: "Archiv", icon: BookOpen },
  { href: "/meditation/abonnement", label: "Abonnement", icon: CreditCard },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <aside className={`fixed top-0 left-0 bottom-0 w-[220px] bg-[#0d1320] border-r border-white/8 flex flex-col py-5 z-50 transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-5 pb-6 text-none border-b border-white/8 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="VISULARA" className="h-7 w-auto block" />
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-[0.9rem] font-medium transition-all duration-200 ${active ? "text-accent bg-accent/8" : "text-text-muted hover:text-text-primary hover:bg-white/6"}`}
            >
              <Icon size={18} className={active ? "text-accent" : ""} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom user hint */}
      <div className="px-3 pt-4 border-t border-white/8">
        <div className="flex items-center gap-2.5 p-3 rounded-md bg-white/4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-[0.8rem] font-bold text-[#0b0f17] flex-shrink-0">G</div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.85rem] font-semibold text-text-primary">Gast</span>
            <span className="text-[0.72rem] text-text-muted">Kostenlos</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

