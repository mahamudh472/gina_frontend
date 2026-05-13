"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Updating password...");
    // Handle reset password logic here
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
          <img src="/logo.svg" alt="VISULARA" className="h-10 w-auto" />
        </div>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium text-white mb-3 font-serif">
            Set new <span className="text-accent">password</span>
          </h1>
          <p className="text-white/70 text-base">
            Create a strong password for your cosmic sanctuary.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full rounded-[2rem] p-10 shadow-2xl relative overflow-hidden bg-slate-900/40 border border-white/10 backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">New Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-12 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">Confirm New Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-12 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-accent text-[#0b0f17] rounded-xl font-bold text-lg transition-all active:scale-[0.98]">
              Update Password
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

