/**
 * VISULARA API Client & Auth Services
 * Provides type-safe requests and automatic JWT token refreshing
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Token Storage Utilities (Client-Safe)
export function getTokens() {
  if (typeof window === "undefined") return null;
  const access = localStorage.getItem("visulara_access_token");
  const refresh = localStorage.getItem("visulara_refresh_token");
  return { access, refresh };
}

export function setTokens(access: string, refresh?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("visulara_access_token", access);
  if (refresh) {
    localStorage.setItem("visulara_refresh_token", refresh);
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("visulara_access_token");
  localStorage.removeItem("visulara_refresh_token");
  localStorage.removeItem("visulara_user_profile");
}

// Queue for holding failed requests while token is refreshing
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/**
 * Custom Fetch Wrapper
 * Handles base URL, default headers, and token refresh automatically
 */
export async function apiFetch(path: string, options: RequestOptions = {}): Promise<Response> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = { ...options.headers };

  // Set default content type to JSON if body exists and is not form-data
  if (options.body && typeof options.body === "string" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // Inject Bearer access token if available
  const tokens = getTokens();
  if (tokens?.access) {
    headers["Authorization"] = `Bearer ${tokens.access}`;
  }

  const response = await fetch(url, { ...options, headers });

  // Handle Token Refresh on 401 Unauthorized
  const isAuthEndpoint =
    path === "/api/v1/accounts/login/" ||
    path === "/api/v1/accounts/token/refresh/" ||
    path === "/api/v1/accounts/register/";

  if (response.status === 401 && tokens?.refresh && !isAuthEndpoint) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await fetch(`${BASE_URL}/api/v1/accounts/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: tokens.refresh }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setTokens(data.access);
          isRefreshing = false;
          onRefreshed(data.access);
        } else {
          isRefreshing = false;
          clearTokens();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("visulara-unauthorized"));
          }
          return response; // Return original unauthorized response
        }
      } catch (error) {
        isRefreshing = false;
        clearTokens();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("visulara-unauthorized"));
        }
        throw error;
      }
    }

    // Wait for the new token and retry the request
    return new Promise((resolve) => {
      subscribeTokenRefresh((newToken) => {
        headers["Authorization"] = `Bearer ${newToken}`;
        resolve(fetch(url, { ...options, headers }));
      });
    });
  }

  return response;
}

// Request & Response Interfaces
export interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
}

export interface RegisterRequest {
  email: string;
  password?: string;
  full_name?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface RefreshResponse {
  access: string;
}

// High-level API Service Wrapper
export const api = {
  accounts: {
    // 1. POST /api/v1/accounts/register/
    async register(data: RegisterRequest): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/register/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Registration failed");
      }
      return res.json();
    },

    // 2. POST /api/v1/accounts/verify-email/
    async verifyEmail(data: { email: string; otp: string }): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/verify-email/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Email verification failed");
      }
      return res.json();
    },

    // 3. POST /api/v1/accounts/login/
    async login(data: RegisterRequest): Promise<LoginResponse> {
      const res = await apiFetch("/api/v1/accounts/login/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        const error = new Error(err.detail || "Login failed") as Error & { code?: string };
        error.code = err.code; // Store custom error codes (e.g. EMAIL_NOT_VERIFIED)
        throw error;
      }
      return res.json();
    },

    // 4. POST /api/v1/accounts/logout/
    async logout(): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/logout/", {
        method: "POST",
      });
      clearTokens();
      if (!res.ok && res.status !== 401) {
        const err = await res.json();
        throw new Error(err.message || err.detail || "Logout failed");
      }
      return { message: "Successfully logged out" };
    },

    // 11. POST /api/v1/accounts/resend-otp/
    async resendOtp(data: { email: string }): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/resend-otp/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Failed to resend verification code");
      }
      return res.json();
    },

    // 5. POST /api/v1/accounts/password-reset/
    async requestPasswordReset(data: { email: string }): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/password-reset/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Password reset request failed");
      }
      return res.json();
    },

    // 6. POST /api/v1/accounts/check-otp/
    async checkOtp(data: { email: string; otp: string }): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/check-otp/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "OTP check failed");
      }
      return res.json();
    },

    // 7. POST /api/v1/accounts/password-reset-confirm/
    async confirmPasswordReset(data: {
      email: string;
      otp: string;
      new_password?: string;
    }): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/password-reset-confirm/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Password confirmation failed");
      }
      return res.json();
    },

    // 8. POST /api/v1/accounts/change-password/
    async changePassword(data: {
      old_password?: string;
      new_password?: string;
      confirm_password?: string;
    }): Promise<{ message: string }> {
      const res = await apiFetch("/api/v1/accounts/change-password/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || err.message || "Password change failed");
      }
      return res.json();
    },

    // 9. GET /api/v1/accounts/profile/
    async getProfile(): Promise<UserProfile> {
      const res = await apiFetch("/api/v1/accounts/profile/", {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Failed to fetch profile");
      }
      return res.json();
    },

    // 10. PATCH /api/v1/accounts/profile/update/
    async updateProfile(data: { full_name: string }): Promise<UserProfile> {
      const res = await apiFetch("/api/v1/accounts/profile/update/", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || err.detail || "Failed to update profile");
      }
      return res.json();
    },
  },
};
