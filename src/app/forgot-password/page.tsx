"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setError(null);
    setLoading(true);

    try {
      await requestPasswordReset(email);
      router.push(`/verify-email?email=${encodeURIComponent(email)}&type=reset`);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to trigger password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-[#020408]">
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0 bg-no-repeat bg-cover bg-center bg-[url('/banner-bg2.svg')]">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-[540px] flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="mb-2">
          <img src="/logo.svg" alt="VISULARA" className="h-15 w-auto" />
        </div>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium text-white mb-3 font-serif">
            Reset your <span className="text-accent">password</span>
          </h1>
          <p className="text-white/70 text-base">
            Enter your email address and we&apos;ll send you a 6-digit code to reset your password.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full rounded-[2rem] p-10 shadow-2xl relative overflow-hidden bg-slate-900/40 border border-white/10 backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm leading-relaxed text-center animate-fade-in">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!email || loading}
              className="w-full py-4 bg-accent text-[#0b0f17] rounded-xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Code...
                </>
              ) : (
                "Send Reset Code"
              )}
            </button>
          </form>
        </div>

        <Link href="/login" className="flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Log In
        </Link>
      </div>
    </main>
  );
}


