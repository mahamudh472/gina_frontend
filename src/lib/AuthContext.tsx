"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api, getTokens, setTokens, clearTokens, UserProfile } from "./api";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<{ message: string }>;
  verifyEmail: (email: string, otp: string) => Promise<{ message: string }>;
  requestPasswordReset: (email: string) => Promise<{ message: string }>;
  checkOtp: (email: string, otp: string) => Promise<{ message: string }>;
  confirmPasswordReset: (email: string, otp: string, newPassword: string) => Promise<{ message: string }>;
  changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<{ message: string }>;
  updateProfile: (fullName: string) => Promise<UserProfile>;
  refreshProfile: () => Promise<UserProfile | null>;
  resendOtp: (email: string) => Promise<{ message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user profile from localStorage/API on mount
  useEffect(() => {
    async function initializeAuth() {
      const tokens = getTokens();
      
      // Fast paint: load cached profile from localStorage
      if (typeof window !== "undefined") {
        const cachedUser = localStorage.getItem("visulara_user_profile");
        if (cachedUser) {
          try {
            setUser(JSON.parse(cachedUser));
          } catch {
            // Ignore corrupted cache
          }
        }
      }

      if (tokens?.access) {
        try {
          const profile = await api.accounts.getProfile();
          setUser(profile);
          if (typeof window !== "undefined") {
            localStorage.setItem("visulara_user_profile", JSON.stringify(profile));
          }
        } catch (error) {
          console.error("Failed to load user profile on mount:", error);
          // If token getProfile fails (and refresh inside apiFetch fails), apiFetch will dispatch unauthorized event
        }
      }
      setLoading(false);
    }

    initializeAuth();

    // Listen for unauthorized events from the API client
    const handleUnauthorized = () => {
      setUser(null);
      clearTokens();
      router.push("/login");
    };

    window.addEventListener("visulara-unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("visulara-unauthorized", handleUnauthorized);
    };
  }, [router]);

  // 1. Login Action
  const login = async (email: string, password: string) => {
    try {
      const data = await api.accounts.login({ email, password });
      setTokens(data.access, data.refresh);
      const profile = await api.accounts.getProfile();
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("visulara_user_profile", JSON.stringify(profile));
      }
      router.push("/meditation/startseite");
    } catch (error) {
      throw error;
    }
  };

  // 2. Logout Action
  const logout = async () => {
    try {
      await api.accounts.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      setUser(null);
      clearTokens();
      router.push("/login");
    }
  };

  // 3. Register/Signup Action
  const register = async (email: string, password: string, fullName: string) => {
    return api.accounts.register({ email, password, full_name: fullName });
  };

  // 4. Verify Email Action
  const verifyEmail = async (email: string, otp: string) => {
    return api.accounts.verifyEmail({ email, otp });
  };

  // 5. Password Reset Request
  const requestPasswordReset = async (email: string) => {
    return api.accounts.requestPasswordReset({ email });
  };

  // 6. Check OTP validity
  const checkOtp = async (email: string, otp: string) => {
    return api.accounts.checkOtp({ email, otp });
  };

  // 7. Confirm Password Reset
  const confirmPasswordReset = async (email: string, otp: string, newPassword: string) => {
    return api.accounts.confirmPasswordReset({ email, otp, new_password: newPassword });
  };

  // 8. Change Password (Authenticated)
  const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    return api.accounts.changePassword({
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
  };

  // 9. Update Profile (Authenticated)
  const updateProfile = async (fullName: string) => {
    try {
      const updatedUser = await api.accounts.updateProfile({ full_name: fullName });
      setUser(updatedUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("visulara_user_profile", JSON.stringify(updatedUser));
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  // 10. Manual profile refresh
  const refreshProfile = async () => {
    const tokens = getTokens();
    if (!tokens?.access) return null;
    try {
      const profile = await api.accounts.getProfile();
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("visulara_user_profile", JSON.stringify(profile));
      }
      return profile;
    } catch (error) {
      console.error("Failed to refresh profile:", error);
      return null;
    }
  };

  // 11. Resend OTP
  const resendOtp = async (email: string) => {
    return api.accounts.resendOtp({ email });
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    verifyEmail,
    requestPasswordReset,
    checkOtp,
    confirmPasswordReset,
    changePassword,
    updateProfile,
    refreshProfile,
    resendOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
