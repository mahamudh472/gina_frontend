"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, BookOpen, CreditCard, LogOut, Settings, User, Lock, X, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { href: "/meditation/startseite", label: "Startseite", icon: Home },
  { href: "/meditation/neue-meditation", label: "Neue Meditation", icon: Sparkles },
  { href: "/meditation/archiv", label: "Archiv", icon: BookOpen },
  { href: "/meditation/abonnement", label: "Abonnement", icon: CreditCard },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, updateProfile, changePassword } = useAuth();
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInitialized(true);
  }, []);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [fullName, setFullName] = useState("");
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openProfileModal = () => {
    if (user) {
      setFullName(user.full_name || "");
    }
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || profileLoading) return;

    setProfileLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await updateProfile(fullName);
      setSuccessMsg("Profil erfolgreich aktualisiert!");
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Fehler beim Aktualisieren des Profils.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.old || !passwords.new || !passwords.confirm || passwordLoading) return;

    if (passwords.new !== passwords.confirm) {
      setErrorMsg("Die neuen Passwörter stimmen nicht überein.");
      return;
    }

    setPasswordLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await changePassword(passwords.old, passwords.new, passwords.confirm);
      setSuccessMsg("Passwort erfolgreich geändert!");
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Fehler beim Ändern des Passworts.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const userInitial = user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "U");

  return (
    <>
      <aside className={`fixed top-0 left-0 bottom-0 w-[220px] bg-[#0d1320] border-r border-white/8 flex flex-col py-5 z-[150] transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} ${!isInitialized ? "sidebar-initial-hide" : ""}`}>
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => {
            if (window.innerWidth < 768) {
              onClose?.();
            }
          }}
          className="flex items-center gap-2.5 px-5 pb-6 text-none border-b border-white/8 mb-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="VISULARA" className="h-10 w-auto block" />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 px-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                suppressHydrationWarning
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose?.();
                  }
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-[0.9rem] font-medium transition-all duration-200 ${active ? "text-accent bg-accent/8" : "text-text-muted hover:text-text-primary hover:bg-white/6"}`}
              >
                <Icon size={18} className={active ? "text-accent" : ""} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="px-3 pt-4 border-t border-white/8">
          {isAuthenticated ? (
            <div 
              onClick={openProfileModal}
              className="flex items-center justify-between p-3 rounded-md bg-white/4 hover:bg-white/8 cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-[0.85rem] font-bold text-[#0b0f17] flex-shrink-0">
                  {userInitial}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[0.85rem] font-semibold text-text-primary truncate block">
                    {user?.full_name || "Benutzer"}
                  </span>
                  <span className="text-[0.72rem] text-text-muted">Mitglied</span>
                </div>
              </div>
              <Settings size={14} className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0 ml-1" />
            </div>
          ) : (
            <Link 
              href="/login" 
              onClick={() => {
                if (window.innerWidth < 768) {
                  onClose?.();
                }
              }}
              className="flex items-center gap-2.5 p-3 rounded-md bg-white/4 hover:bg-white/8 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[0.8rem] font-bold text-white group-hover:bg-accent group-hover:text-[#0b0f17] transition-all flex-shrink-0">
                G
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.85rem] font-semibold text-text-primary group-hover:text-accent transition-all">
                  Anmelden
                </span>
                <span className="text-[0.72rem] text-text-muted">Kostenloses Konto</span>
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* Profile & Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-md bg-[#0a0f1d] border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-6 z-10 text-white animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-2xl font-semibold font-serif text-white">
                Einstellungen
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 pb-px">
              <button 
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${activeTab === "profile" ? "border-accent text-accent" : "border-transparent text-white/50 hover:text-white"}`}
                onClick={() => { setActiveTab("profile"); setErrorMsg(null); setSuccessMsg(null); }}
              >
                Profil aktualisieren
              </button>
              <button 
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${activeTab === "password" ? "border-accent text-accent" : "border-transparent text-white/50 hover:text-white"}`}
                onClick={() => { setActiveTab("password"); setErrorMsg(null); setSuccessMsg(null); }}
              >
                Passwort ändern
              </button>
            </div>

            {/* Status Messages */}
            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center leading-relaxed">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center leading-relaxed">
                {errorMsg}
              </div>
            )}

            {/* Tab: Profile */}
            {activeTab === "profile" && (
              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/60 ml-1">E-Mail Adresse (schreibgeschützt)</label>
                  <div className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/5 text-white/40 outline-none select-none">
                    {user?.email}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/60 ml-1">Vollständiger Name</label>
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                    <input
                      type="text"
                      value={fullName}
                      disabled={profileLoading}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={profileLoading || !fullName.trim()}
                  className="w-full mt-2 py-3.5 bg-accent text-[#0b0f17] rounded-xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {profileLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Speichern...
                    </>
                  ) : (
                    "Profil speichern"
                  )}
                </button>
              </form>
            )}

            {/* Tab: Change Password */}
            {activeTab === "password" && (
              <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/60 ml-1">Aktuelles Passwort</label>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwords.old}
                      disabled={passwordLoading}
                      onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                      className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/60 ml-1">Neues Passwort</label>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwords.new}
                      disabled={passwordLoading}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/60 ml-1">Neues Passwort bestätigen</label>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwords.confirm}
                      disabled={passwordLoading}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-[#1e293b]/40 border border-white/5 text-white outline-none focus:border-accent/50 transition-all placeholder:text-white/20 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading || !passwords.old || !passwords.new || !passwords.confirm}
                  className="w-full mt-2 py-3.5 bg-accent text-[#0b0f17] rounded-xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {passwordLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Ändern...
                    </>
                  ) : (
                    "Passwort aktualisieren"
                  )}
                </button>
              </form>
            )}

            {/* Logout button at bottom of settings */}
            <div className="border-t border-white/10 pt-5 mt-2 flex justify-between items-center">
              <span className="text-xs text-white/40">Sitzung beenden</span>
              <button 
                onClick={async () => {
                  setIsModalOpen(false);
                  await logout();
                }}
                className="flex items-center gap-2 py-2 px-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 font-semibold text-sm transition-all active:scale-95 cursor-pointer"
              >
                <LogOut size={14} />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


