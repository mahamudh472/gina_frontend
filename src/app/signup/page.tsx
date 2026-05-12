"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const isFormValid = formData.name && formData.email && formData.password && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) router.push("/verify-email?type=registration");
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

      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="mb-2">
          <img src="/logo.svg" alt="VISULARA" className="h-10 w-auto" />
        </div>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create your <span className="text-[#f2ca50]">Account</span>
          </h1>
          <p className="text-white/70 text-base">
            Begin your cosmic meditation journey
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
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-2 ">
              <label className="text-sm text-white/70 ml-1">Full Name</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#f2ca50] transition-colors" />
                <input
                  type="text"
                  placeholder="Fahamid Hossain Ovi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-[#f2ca50]/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#f2ca50] transition-colors" />
                <input
                  type="email"
                  placeholder="fahamidhossainovi@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-[#f2ca50]/50 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70 ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#f2ca50] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="f@hamid12#3D"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full py-3.5 pl-12 pr-12 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-[#f2ca50]/50 transition-all placeholder:text-white/20"
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

            {/* Terms Checkbox */}
            <div 
              className="flex items-center gap-3 cursor-pointer select-none mt-1 group" 
              onClick={() => setAgreed(!agreed)}
            >
              <div
                className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
                style={{
                  background: agreed ? "#f2ca50" : "rgba(255, 255, 255, 0.1)",
                  border: agreed ? "1px solid #f2ca50" : "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                {agreed && <Check size={14} color="#0b0f17" strokeWidth={3} />}
              </div>
              <p className="text-sm text-white/70">
                I agree to the <span className="text-[#f2ca50] hover:underline transition-all">Terms of Service</span> and <span className="text-[#f2ca50] hover:underline transition-all">Privacy Policy</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="mt-2 w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#f2ca50",
                color: "#0b0f17",
              }}
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-white/70 text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-[#f2ca50] font-bold hover:underline transition-all ml-1">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
