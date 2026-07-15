"use client";

import { useState, useEffect } from "react";
import { Check, Zap, Loader2, AlertTriangle, Calendar, Coins, X } from "lucide-react";
import { api, Plan, SubscriptionDetails, WalletBalance } from "@/lib/api";

export default function AbonnementPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [wallet, setWallet] = useState<WalletBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Actions loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null); // holds plan slug or 'cancel'
  const [confirmModal, setConfirmModal] = useState<{
    type: "change" | "cancel";
    plan?: Plan;
  } | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [plansData, subData, walletData] = await Promise.all([
        api.finance.getPlans(),
        api.finance.getSubscription(),
        api.finance.getWallet(),
      ]);
      setPlans(plansData);
      setSubscription(subData);
      setWallet(walletData);
    } catch (err: any) {
      console.error("Failed to load subscription page data:", err);
      setError(err.message || "Fehler beim Laden der Abonnement-Daten.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePlanAction = async (plan: Plan) => {
    // If no active subscription, start checkout flow
    if (!subscription) {
      try {
        setActionLoading(plan.slug);
        setMessage(null);
        const { checkout_url } = await api.finance.checkout(plan.slug);
        window.location.href = checkout_url;
      } catch (err: any) {
        setMessage({ type: "error", text: err.message || "Checkout konnte nicht gestartet werden." });
        setActionLoading(null);
      }
      return;
    }

    // If subscription exists, check if they clicked their current plan
    if (subscription.plan.slug === plan.slug) {
      return; // current plan
    }

    // Open change plan confirmation modal
    setConfirmModal({ type: "change", plan });
  };

  const handleConfirmPlanChange = async () => {
    if (!confirmModal?.plan) return;
    const targetPlan = confirmModal.plan;
    setConfirmModal(null);
    setActionLoading(targetPlan.slug);
    setMessage(null);

    try {
      const response = await api.finance.changePlan(targetPlan.slug);
      setSubscription(response.subscription);
      
      // Dispatch event to refresh layout wallet credits
      window.dispatchEvent(new CustomEvent("visulara-wallet-refresh"));
      
      // Update local wallet balance as well
      const updatedWallet = await api.finance.getWallet();
      setWallet(updatedWallet);

      setMessage({
        type: "success",
        text: response.action === "upgrade" 
          ? `Erfolgreich auf den ${targetPlan.name} Plan hochgestuft!` 
          : `Downgrade auf den ${targetPlan.name} Plan zum Ende des Abrechnungszeitraums vorgemerkt.`,
      });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Planwechsel fehlgeschlagen." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelClick = () => {
    setConfirmModal({ type: "cancel" });
  };

  const handleConfirmCancel = async () => {
    setConfirmModal(null);
    setActionLoading("cancel");
    setMessage(null);

    try {
      const response = await api.finance.cancelSubscription();
      setSubscription(response.subscription);
      setMessage({
        type: "success",
        text: "Ihr Abonnement wird zum Ende des laufenden Abrechnungszeitraums gekündigt.",
      });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Kündigung fehlgeschlagen." });
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center relative z-10">
        <Loader2 className="animate-spin text-accent mb-4" size={48} />
        <p className="text-white/60 font-medium">Abonnement-Details werden geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-10 py-16 max-w-[1200px] mx-auto w-full flex flex-col items-center justify-center gap-6 min-h-[80vh] relative z-10">
        <AlertTriangle className="text-red-400" size={54} />
        <h2 className="text-2xl font-bold text-white">Fehler beim Laden</h2>
        <p className="text-white/60 text-center max-w-[500px]">{error}</p>
        <button
          onClick={fetchData}
          className="px-8 py-3.5 bg-accent text-[#0b0f17] rounded-full font-bold transition-all hover:scale-105 shadow-[0_10px_30px_rgba(242,202,80,0.3)]"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-10 py-16 max-w-[1200px] mx-auto w-full flex flex-col gap-12 min-h-screen relative z-10">
      <div className="text-left flex flex-col items-start mt-4">
        <h1 className="text-[2.2rem] sm:text-[3.5rem] font-serif font-bold text-white mb-2 tracking-tight leading-tight">Ihr Abonnement</h1>
        <p className="text-[1rem] sm:text-[1.1rem] text-white/60 max-w-[800px] leading-[1.6]">
          Entfesseln Sie die volle Frequenz des Kosmos. Wählen Sie die Reise, die mit Ihrer spirituellen Entwicklung in Resonanz steht.
        </p>
      </div>

      {/* Feedback Messages */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-4 border transition-all ${
          message.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 animate-in fade-in slide-in-from-top-4 duration-300" 
            : "bg-red-500/10 border-red-500/20 text-red-400 animate-in fade-in slide-in-from-top-4 duration-300"
        }`}>
          <span className="text-sm font-medium leading-relaxed">{message.text}</span>
          <button 
            onClick={() => setMessage(null)} 
            className="text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Current plan banner */}
      {subscription ? (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:px-10 rounded-[32px] gap-8 backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center text-accent shadow-[0_0_20px_rgba(242,202,80,0.2)] flex-shrink-0">
              <Zap size={24} className="sm:size-[28px]" fill="currentColor" />
            </div>
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="text-[1.6rem] sm:text-[2.2rem] font-bold text-white tracking-tight leading-tight truncate">
                  {subscription.plan.name} Plan
                </span>
                <span className={`text-[0.65rem] sm:text-[0.7rem] font-black px-2.5 sm:px-3 py-1 rounded-full ${
                  subscription.status === "active" && !subscription.cancel_at_period_end
                    ? "bg-accent text-black"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                  {subscription.cancel_at_period_end ? "KÜNDIGUNG" : "AKTIV"}
                </span>
              </div>
              <span className="text-[0.9rem] sm:text-[1rem] text-white/40 font-medium leading-tight">
                {subscription.plan.price} {subscription.plan.currency === "eur" ? "€" : "$"} / {subscription.plan.interval === "month" ? "Monat" : subscription.plan.interval} 
                {" · "}
                {subscription.cancel_at_period_end ? (
                  <span className="text-red-400 font-semibold">
                    Endet am {formatDate(subscription.current_period_end)}
                  </span>
                ) : (
                  <span>Verlängert am {formatDate(subscription.current_period_end)}</span>
                )}
              </span>
              {subscription.pending_plan && (
                <span className="text-[0.85rem] text-accent/80 font-bold bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-xl inline-block w-fit mt-1">
                  Wechsel zu: {subscription.pending_plan.name} am {formatDate(subscription.current_period_end)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="flex items-center bg-black/40 border border-white/5 rounded-2xl py-3 sm:py-4 px-1 sm:px-2 w-full justify-center backdrop-blur-md">
              <div className="px-3 sm:px-8 flex flex-col items-center gap-1.5 min-w-[100px] sm:min-w-[140px]">
                <Coins size={20} className="text-accent" />
                <span className="text-[0.65rem] sm:text-[0.7rem] text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                  Credits
                </span>
                <span className="text-[1.5rem] sm:text-[1.8rem] font-bold text-white leading-none mt-1">
                  {wallet?.balance}
                </span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="px-3 sm:px-8 flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[140px]">
                <Calendar size={20} className="text-white/40" />
                <span className="text-[0.65rem] sm:text-[0.7rem] text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                  Nächster Reset
                </span>
                <span className="text-[0.85rem] sm:text-[1rem] font-bold text-white mt-1">
                  {wallet?.last_reset_at ? formatDate(new Date(new Date(wallet.last_reset_at).setMonth(new Date(wallet.last_reset_at).getMonth() + 1)).toISOString()) : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:px-10 rounded-[32px] gap-8 backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full sm:w-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 flex-shrink-0">
                <Zap size={24} className="sm:size-[28px]" />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="text-[1.4rem] sm:text-[2rem] font-bold text-white/90 tracking-tight leading-tight truncate">Kein aktives Abonnement</h3>
                <p className="text-[0.85rem] sm:text-[1rem] text-white/40 font-medium leading-snug">
                  Abonnieren Sie einen Plan, um Ihre Meditationsreise mit monatlichen Credits zu starten.
                </p>
              </div>
            </div>

            <div className="flex items-center bg-black/40 border border-white/5 rounded-2xl py-3 sm:py-4 px-4 sm:px-2 w-full md:w-auto justify-center backdrop-blur-md relative z-10">
              <div className="px-3 sm:px-8 flex flex-col items-center gap-1.5 min-w-[100px] sm:min-w-[140px]">
                <Coins size={20} className="text-white/40" />
                <span className="text-[0.65rem] sm:text-[0.7rem] text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">
                  Credits
                </span>
                <span className="text-[1.5rem] sm:text-[1.8rem] font-bold text-white/60 leading-none mt-1">
                  {wallet?.balance || 0}
                </span>
              </div>
            </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-[1.8rem] font-bold text-white/90 tracking-wide font-serif">Verfügbare Pläne</h2>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {plans.map((p) => {
          const highlighted = p.top_badge !== null || p.slug === "core";
          const isCurrentPlan = subscription?.plan.slug === p.slug;
          const isPendingPlan = subscription?.pending_plan?.slug === p.slug;

          let btnText = "Plan wählen";
          let isDisabled = false;

          if (isCurrentPlan) {
            btnText = "Aktueller Plan";
            isDisabled = true;
          } else if (isPendingPlan) {
            btnText = "Wechsel vorgemerkt";
            isDisabled = true;
          } else if (subscription) {
            const currentPriceNum = parseFloat(subscription.plan.price);
            const targetPriceNum = parseFloat(p.price);
            if (targetPriceNum > currentPriceNum) {
              btnText = "Upgrade aktivieren";
            } else {
              btnText = "Downgrade planen";
            }
          } else {
            btnText = p.slug === "core" ? "CORE Plan wählen" : "Jetzt starten";
          }

          return (
            <div
              key={p.id}
              className={`relative group flex flex-col rounded-[32px] transition-all duration-500 ${
                highlighted 
                  ? "bg-gradient-to-b from-[#1a1c12]/80 to-[#0d0e09]/90 border-[1.5px] border-accent/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(242,202,80,0.1)]" 
                  : "bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              {/* Top Badge */}
              {(p.top_badge || p.badge) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-accent text-black text-[0.65rem] font-black px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(242,202,80,0.3)] tracking-widest uppercase">
                    {p.top_badge || p.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col h-full">
                <div className="mb-5">
                  <span className={`text-[0.75rem] font-bold tracking-[0.2em] uppercase ${highlighted ? "text-accent" : "text-white/40"}`}>
                    {p.badge || (p.slug === "pro" ? "BUSINESS" : "EINSTEIGER")}
                  </span>
                  <h3 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white mt-1">{p.name}</h3>
                </div>

                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[2.8rem] sm:text-[3.5rem] font-bold text-white tracking-tighter">
                      {p.price} {p.currency === "eur" ? "€" : "$"}
                    </span>
                  </div>
                  <div className="text-[0.7rem] font-bold text-white/40 tracking-widest uppercase mb-2">
                    PRO {p.interval === "month" ? "MONAT" : p.interval}
                  </div>
                  <div className="text-[0.9rem] font-bold text-accent">
                    {p.credit_amount} {p.credit_amount === 1 ? "Credit inklusive" : "Credits inklusive"}
                  </div>
                </div>

                <div className="my-6 flex-1">
                  <ul className="space-y-3">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check 
                          size={18} 
                          className={`mt-0.5 shrink-0 ${highlighted ? "text-accent" : "text-white/70"}`} 
                        />
                        <span className="text-[0.95rem] text-white/70 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handlePlanAction(p)}
                    disabled={isDisabled || actionLoading === p.slug}
                    className={`w-full py-4 px-6 rounded-2xl text-[1rem] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      isDisabled
                        ? "bg-white/5 text-white/40 border border-white/5 cursor-not-allowed"
                        : highlighted 
                          ? "bg-accent text-black shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:bg-accent/90 hover:shadow-[0_15px_40px_rgba(242,202,80,0.4)] hover:-translate-y-1" 
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {actionLoading === p.slug ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      btnText
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Subscription section at the bottom */}
      {subscription && !subscription.cancel_at_period_end && (
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10 pb-12 mt-4 animate-in fade-in">
          <p className="text-sm text-white/40 mb-4 text-center">
            Du möchtest dein Abonnement nicht mehr fortsetzen?
          </p>
          <button
            onClick={handleCancelClick}
            disabled={actionLoading === "cancel"}
            className="px-6 py-3.5 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-semibold rounded-2xl transition-all duration-300 w-full sm:w-auto cursor-pointer disabled:opacity-50 text-sm active:scale-95"
          >
            {actionLoading === "cancel" ? (
              <Loader2 size={18} className="animate-spin mx-auto" />
            ) : (
              "Abonnement kündigen"
            )}
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmModal(null)} />
          
          <div className="relative w-full max-w-md bg-[#0a0f1d] border border-white/10 rounded-[2rem] p-8 shadow-2xl z-10 text-white animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setConfirmModal(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {confirmModal.type === "change" && confirmModal.plan && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-semibold font-serif text-white mb-2">Plan wechseln?</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Möchten Sie wirklich von Ihrem aktuellen Plan zu <strong>{confirmModal.plan.name}</strong> wechseln?
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Aktuell:</span>
                    <span className="font-semibold">{subscription?.plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Neuer Plan:</span>
                    <span className="font-semibold text-accent">{confirmModal.plan.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Kosten:</span>
                    <span>{confirmModal.plan.price} {confirmModal.plan.currency === "eur" ? "€" : "$"} / Monat</span>
                  </div>
                </div>

                {parseFloat(confirmModal.plan.price) < parseFloat(subscription?.plan.price || "0") ? (
                  <div className="flex gap-2.5 items-start p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-400">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5 animate-pulse" />
                    <p className="leading-relaxed">
                      Dies ist ein Downgrade. Die Änderung wird erst zum Ende Ihres aktuellen Abrechnungszeitraums am <strong>{formatDate(subscription?.current_period_end || "")}</strong> wirksam.
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2.5 items-start p-3 bg-accent/10 border border-accent/20 rounded-xl text-xs text-accent">
                    <Zap size={16} className="shrink-0 mt-0.5" fill="currentColor" />
                    <p className="leading-relaxed">
                      Dies ist ein Upgrade. Das Upgrade erfolgt sofort und Ihre ungenutzten Credits werden beibehalten oder angepasst.
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all text-sm cursor-pointer"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleConfirmPlanChange}
                    className="flex-1 py-3 bg-accent text-[#0b0f17] rounded-xl font-bold transition-all hover:bg-accent/90 text-sm cursor-pointer shadow-lg shadow-accent/25"
                  >
                    Wechsel bestätigen
                  </button>
                </div>
              </div>
            )}

            {confirmModal.type === "cancel" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-semibold font-serif text-white mb-2">Abonnement kündigen?</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Sind Sie sicher, dass Sie Ihr Abonnement kündigen möchten? Sie verlieren Ihre verbleibenden Credits zum Ende des Abrechnungszeitraums.
                  </p>
                </div>

                <div className="flex gap-2.5 items-start p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Das Abonnement bleibt bis zum <strong>{formatDate(subscription?.current_period_end || "")}</strong> aktiv. Danach fallen keine Kosten mehr an und Ihr Konto wird auf den kostenlosen Status zurückgesetzt.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all text-sm cursor-pointer"
                  >
                    Behalten
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold transition-all hover:bg-red-600 text-sm cursor-pointer shadow-lg shadow-red-500/25"
                  >
                    Kündigen bestätigen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
