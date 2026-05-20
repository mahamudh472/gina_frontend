"use client";

import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubscriptionCancelPage() {
  return (
    <div className="px-6 py-16 max-w-[800px] mx-auto w-full flex flex-col items-center justify-center min-h-[85vh] relative z-10 animate-fade-in-up">
      <div className="max-w-xl w-full p-8 md:p-12 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Glowing background accent */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Icon */}
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 relative mb-8 shadow-2xl">
          <X size={48} className="text-white/60" />
        </div>

        <h1 className="text-[2.5rem] font-serif font-bold text-white mb-4 tracking-tight leading-tight">
          Zahlung abgebrochen
        </h1>
        <p className="text-[1.05rem] text-white/60 mb-8 leading-relaxed max-w-[450px]">
          Der Zahlungsvorgang wurde abgebrochen. Es wurden keine Gebühren berechnet. Du kannst den Vorgang jederzeit erneut starten.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            id="btn-back-to-abonnement"
            href="/meditation/abonnement"
            className="btn-primary w-full sm:w-auto"
          >
            <ArrowLeft size={18} />
            Erneut versuchen
          </Link>
          <Link
            id="btn-back-to-home"
            href="/meditation/startseite"
            className="btn-secondary w-full sm:w-auto text-center"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
