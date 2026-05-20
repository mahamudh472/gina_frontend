"use client";

import { useState, useEffect } from "react";
import { Check, Sparkles, Loader2, ArrowRight, Coins } from "lucide-react";
import { api, SubscriptionDetails, WalletBalance } from "@/lib/api";
import Link from "next/link";

export default function SubscriptionSuccessPage() {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [wallet, setWallet] = useState<WalletBalance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dispatch event to refresh layout wallet credits
    window.dispatchEvent(new CustomEvent("visulara-wallet-refresh"));

    const fetchData = async () => {
      try {
        const [subData, walletData] = await Promise.all([
          api.finance.getSubscription(),
          api.finance.getWallet(),
        ]);
        setSubscription(subData);
        setWallet(walletData);
      } catch (err) {
        console.error("Failed to load subscription details on success page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 py-16 max-w-[800px] mx-auto w-full flex flex-col items-center justify-center min-h-[85vh] relative z-10 animate-fade-in-up">
      <div className="max-w-xl w-full p-8 md:p-12 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Glowing background accent */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Icon */}
        <div className="w-24 h-24 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center text-accent relative mb-8 shadow-[0_0_50px_rgba(242,202,80,0.15)] animate-float">
          <Check size={48} className="drop-shadow-[0_0_10px_rgba(242,202,80,0.5)]" />
          <Sparkles size={24} className="absolute -top-1 -right-1 text-accent animate-pulse" />
        </div>

        <h1 className="text-[2.5rem] font-serif font-bold text-white mb-4 tracking-tight leading-tight">
          Zahlung erfolgreich!
        </h1>
        <p className="text-[1.05rem] text-white/60 mb-8 leading-relaxed max-w-[450px]">
          Willkommen bei VISULARA Premium! Deine Seele ist nun bereit für die volle Frequenz des Kosmos.
        </p>

        {loading ? (
          <div className="w-full py-8 flex flex-col items-center justify-center gap-2">
            <Loader2 className="animate-spin text-accent" size={32} />
            <p className="text-sm text-white/40">Guthaben wird geladen...</p>
          </div>
        ) : subscription ? (
          <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-white/40 text-sm">Dein Plan:</span>
              <span className="text-white font-bold">{subscription.plan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40 text-sm">Aktuelles Guthaben:</span>
              <span className="text-accent font-bold flex items-center gap-1.5">
                <Coins size={16} />
                {wallet?.balance} {wallet?.balance === 1 ? "Credit" : "Credits"}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 mb-8 text-sm text-amber-400">
            Dein Abonnement wurde aktiviert. Es kann einen Moment dauern, bis alle Daten vollständig synchronisiert sind.
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            id="btn-create-meditation"
            href="/meditation/neue-meditation"
            className="btn-primary w-full sm:w-auto"
          >
            Meditation erstellen
            <ArrowRight size={18} />
          </Link>
          <Link
            id="btn-view-subscription"
            href="/meditation/abonnement"
            className="btn-secondary w-full sm:w-auto text-center"
          >
            Abonnement ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}
