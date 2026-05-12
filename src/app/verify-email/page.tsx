"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function VerifyEmailContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp.join(""));
    
    if (type === "reset") {
      router.push("/reset-password");
    } else {
      // Default behavior (registration)
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-[#020408]">
      {/* Cosmic Background */}
      <div 
        className="fixed inset-0 z-0 bg-no-repeat bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/banner-bg2.svg')",
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-[540px] flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="mb-2">
          <img src="/logo.svg" alt="VISULARA" className="h-10 w-auto" />
        </div>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Verify your <span className="text-[#f2ca50]">email</span>
          </h1>
          <p className="text-white/70 text-base">
            We sent a 6-digit code to your email.<br />
            Enter it below to continue.
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="w-full rounded-[2rem] p-10 shadow-2xl relative overflow-hidden"
          style={{
            background: "rgba(15, 23, 42, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex gap-3 justify-center">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-16 text-center text-2xl font-bold rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-[#f2ca50]/50 transition-all"
                />
              ))}
            </div>

            <button type="submit" className="w-full py-4 bg-[#f2ca50] text-[#0b0f17] rounded-xl font-bold text-lg transition-all active:scale-[0.98]">
              Verify & Continue
            </button>

            <div className="text-center text-sm text-white/70">
              Didn&apos;t receive the code? <button type="button" className="text-[#f2ca50] bg-transparent border-none font-bold cursor-pointer hover:underline">Resend</button>
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
