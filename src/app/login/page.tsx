"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const isFormValid = formData.email && formData.password && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError(null);
    setLoading(true);

    try {
      await login(formData.email, formData.password);
    } catch (err: unknown) {
      const error = err as Error & { code?: string };
      if (error.code === "EMAIL_NOT_VERIFIED") {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}&type=registration`);
      } else {
        setError(error.message || "Invalid credentials. Please try again.");
      }
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

      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="mb-2">
          <img src="/logo.svg" alt="VISULARA" className="h-15 w-auto" />
        </div>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium text-white mb-3 font-serif">
            Welcome <span className="text-accent">Back</span>
          </h1>
          <p className="text-white/70 text-base">
            Continue your cosmic meditation journey
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full rounded-[2rem] p-10 shadow-2xl relative overflow-hidden bg-slate-900/40 border border-white/10 backdrop-blur-3xl">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm leading-relaxed animate-fade-in">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  disabled={loading}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  disabled={loading}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full py-3.5 pl-12 pr-12 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
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
              <Link href="/forgot-password" className="self-end text-sm text-accent font-medium hover:underline transition-all">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="mt-2 w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-accent text-[#0b0f17] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-white/70 text-base">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent font-bold hover:underline transition-all ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}


