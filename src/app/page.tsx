"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    router.replace(isAuthenticated ? "/meditation/startseite" : "/login");
  }, [loading, isAuthenticated, router]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#020408]">
      <Loader2 className="animate-spin text-[#e5b842]" size={48} aria-label="Weiterleitung" />
    </main>
  );
}
