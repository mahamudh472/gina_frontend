"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-6 relative z-10 text-center">
      <div className="fixed inset-0 bg-[url('/banner-step1-new.svg')] bg-cover bg-center bg-no-repeat z-[-1] after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(8,12,20,0.4)_100%)]" />
      
      <div className="mb-12 flex items-center gap-3 animate-fade-in">
        <img src="/logo.svg" alt="VISULARA" style={{ height: '40px' }} />
      </div>

      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-accent/10 border border-accent/30 text-accent rounded-full text-[0.8rem] font-bold uppercase tracking-wider">
          <span className="text-[1.2rem]">✦</span> Premium Meditation Platform
        </div>
        <h1 className="text-[4rem] font-extrabold text-white mb-4 max-sm:text-[2.5rem]">
          Welcome to <span className="text-accent">Visulara</span>
        </h1>
        <p className="text-text-muted text-[1.2rem] max-w-[400px] mx-auto">
          Your personalized meditation journey begins here
        </p>
      </div>

      <div className="w-full max-w-[400px] p-12 max-sm:px-8 max-sm:py-10 bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[24px] shadow-[0_24px_48px_rgba(0,0,0,0.4)] animate-fade-in-up [animation-delay:200ms]">
        <div className="flex flex-col gap-4">
          <Link href="/signup" className="py-4 bg-accent text-[#0b0f17] rounded-xl font-bold text-[1rem] transition-all duration-300 shadow-[0_8px_24px_rgba(242,202,80,0.2)] hover:translate-y-0.5 hover:bg-[#fad84a] hover:shadow-[0_12px_32px_rgba(242,202,80,0.4)] active:translate-y-0 text-center no-underline">
            Create Account
          </Link>
          
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-text-muted text-[0.8rem]">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <Link href="/login" className="flex justify-center py-4 rounded-xl border border-white/20 bg-transparent text-white font-semibold transition-all duration-300 hover:bg-white/5 hover:border-white/30 text-center no-underline">
            Log In
          </Link>
        </div>
      </div>

      <p className="mt-8 text-white/40 text-[0.75rem] text-center max-w-[300px] animate-fade-in [animation-delay:500ms]">
        By continuing, you agree to our Terms of Service & Privacy Policy
      </p>
    </main>
  );
}
