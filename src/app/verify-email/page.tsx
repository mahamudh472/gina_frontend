"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

function VerifyEmailContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { verifyEmail, checkOtp, requestPasswordReset, resendOtp } = useAuth();
  
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "registration";

  const isOtpComplete = otp.every(char => char !== "");

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete || !email || loading) return;

    setError(null);
    setResendMessage(null);
    setLoading(true);

    const otpCode = otp.join("");

    try {
      if (type === "reset") {
        await checkOtp(email, otpCode);
        router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${otpCode}`);
      } else {
        await verifyEmail(email, otpCode);
        router.push("/login?verified=true");
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || resending) return;

    setError(null);
    setResendMessage(null);
    setResending(true);

    try {
      if (type === "reset") {
        await requestPasswordReset(email);
        setResendMessage("A new password reset code has been sent to your email.");
      } else {
        await resendOtp(email);
        setResendMessage("A new verification code has been sent to your email.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "Failed to resend code. Please try again.");
    } finally {
      setResending(false);
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
            Verify your <span className="text-accent">email</span>
          </h1>
          <p className="text-white/70 text-base">
            We sent a 6-digit code to <span className="text-white font-semibold">{email || "your email"}</span>.<br />
            Enter it below to continue.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full rounded-[2rem] p-10 shadow-2xl relative overflow-hidden bg-slate-900/40 border border-white/10 backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm leading-relaxed text-center animate-fade-in">
                {error}
              </div>
            )}

            {/* Success Info Message */}
            {resendMessage && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm leading-relaxed text-center animate-fade-in">
                {resendMessage}
              </div>
            )}

            <div className="flex gap-3 justify-center">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  disabled={loading}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-16 text-center text-2xl font-bold rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all disabled:opacity-50"
                />
              ))}
            </div>

            <button 
              type="submit" 
              disabled={!isOtpComplete || loading}
              className="w-full py-4 bg-accent text-[#0b0f17] rounded-xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </button>

            <div className="text-center text-sm text-white/70">
              Didn&apos;t receive the code?{" "}
              <button 
                type="button" 
                onClick={handleResend}
                disabled={resending}
                className="text-accent bg-transparent border-none font-bold cursor-pointer hover:underline disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend"}
              </button>
            </div>
          </form>
        </div>

        <Link href="/login" className="flex items-center gap-2 text-white/70 text-sm font-medium hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Log In
        </Link>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020408] flex items-center justify-center text-white">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}


