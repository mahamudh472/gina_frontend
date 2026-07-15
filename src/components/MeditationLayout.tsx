"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, Coins, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";

export default function MeditationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(false);
    }
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  const [wallet, setWallet] = useState<{ balance: number } | null>(null);

  const fetchWallet = async () => {
    try {
      const data = await api.finance.getWallet();
      setWallet(data);
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWallet();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleRefresh = () => {
      fetchWallet();
    };
    window.addEventListener("visulara-wallet-refresh", handleRefresh);
    return () => {
      window.removeEventListener("visulara-wallet-refresh", handleRefresh);
    };
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-[#080c14]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-accent" size={48} />
          <p className="text-white/60">Verbindung wird hergestellt...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isAudioPlayer = pathname?.startsWith("/meditation/meditation-structure/audioplayer");
  const bgImage = isAudioPlayer ? "/hero-step2.svg" : "/banner-step1-new.svg";

  return (
    <div className="min-h-screen relative overflow-x-clip overflow-y-visible bg-[#080c14]">
      {/* Fixed cosmic background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#080c14]/40 via-[#0d1628]/30 to-[#1e283c]/20" />
      </div>

      {/* Header with Nav Toggle and Logo */}
      <header className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-6 pointer-events-none transition-all duration-500 ease-in-out ${isOpen ? "md:ml-[220px]" : "ml-0"}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 ease-in-out backdrop-blur-md pointer-events-auto"
          aria-label={isOpen ? "Sidebar schließen" : "Sidebar öffnen"}
        >
          <Menu size={20} />
        </button>

        <div className="static md:absolute md:left-1/2 md:-translate-x-1/2 pointer-events-auto flex items-center justify-center">
          <Link href="/">
            <img src="/logo.svg" alt="Visulara Logo" className="h-8 md:h-12 w-auto" />
          </Link>
        </div>

        <div className="pointer-events-auto">
          <Link href="/meditation/abonnement" className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md shadow-[0_0_15px_rgba(242,202,80,0.1)] hover:bg-accent/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
            <Coins size={14} className="text-accent md:size-[16px]" />
            <span className="text-white text-[0.75rem] md:text-[0.85rem] font-bold tracking-wide">
              {wallet !== null ? `${wallet.balance} ${wallet.balance === 1 ? "Credit" : "Credits"}` : "..."}
            </span>
          </Link>
        </div>
      </header>

      {/* Sidebar Backdrop on Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[140] bg-black/40 backdrop-blur-sm md:hidden pointer-events-auto cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Main content */}
      <main className={`relative z-10 transition-all duration-500 ease-in-out min-h-screen flex flex-col ${isOpen ? "md:ml-[220px]" : "ml-0"}`}>
        {children}
      </main>
    </div>
  );
}

