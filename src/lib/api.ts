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
let refreshSubscribers: ((token: string | null) => void)[] = [];

function waitForTokenRefresh() {
  return new Promise<string | null>((resolve) => {
    refreshSubscribers.push(resolve);
  });
}

function onRefreshComplete(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function dispatchUnauthorized() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("visulara-unauthorized"));
  }
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

  if (response.status === 401 && !isAuthEndpoint) {
    if (!tokens?.refresh) {
      clearTokens();
      dispatchUnauthorized();
      return response;
    }

    if (isRefreshing) {
      const newToken = await waitForTokenRefresh();
      if (!newToken) {
        return response;
      }

      headers["Authorization"] = `Bearer ${newToken}`;
      return fetch(url, { ...options, headers });
    }

    isRefreshing = true;
    try {
      const refreshResponse = await fetch(`${BASE_URL}/api/v1/accounts/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      if (!refreshResponse.ok) {
        clearTokens();
        onRefreshComplete(null);
        dispatchUnauthorized();
        return response;
      }

      const data = await refreshResponse.json();
      setTokens(data.access, data.refresh);
      onRefreshComplete(data.access);

      headers["Authorization"] = `Bearer ${data.access}`;
      return fetch(url, { ...options, headers });
    } catch (error) {
      clearTokens();
      onRefreshComplete(null);
      dispatchUnauthorized();
      throw error;
    } finally {
      isRefreshing = false;
    }
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

export interface CharacterVoice {
  id: number;
  name: string;
  avatar_url: string;
  short_description: string;
  tags: string; // comma separated tags
  file: string;
}

export interface NatureSound {
  id: number;
  name: string;
  file: string;
}

export interface BackgroundImage {
  id: number;
  name: string;
  file: string;
}

export interface ExperienceQuestionAnswers {
  name: string;
  goal: string;
  how_you_feel?: string;
  what_remains_outside?: string;
  tension_spots?: string[];
}

export interface GenerateMeditationRequest {
  category: string;
  charecter_voice_id: number;
  experience_question_answers: ExperienceQuestionAnswers;
  nature_sound_name?: string | null;
  background_image_id?: number | null;
}

export interface MeditationStep {
  id: number;
  step_type: string;
  content: string;
  audio_file: string;
  duration: string; // "00:00:45"
  duration_percentage: number;
  created_at: string;
}

export interface GenerateMeditationResponse {
  id: number;
  meditation_id: number;
  total_duration: number;
  steps: MeditationStep[];
}

export interface MeditationArchiveItem {
  id: number;
  banner_url: string;
  category: string;
  category_name: string;
  created_at: string;
  total_duration: number;
}

export interface MeditationArchiveResponse {
  all_meditation_ids: number[];
  overall_total_duration: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: MeditationArchiveItem[];
}

export interface MeditationDetails {
  id: number;
  title: string;
  banner_url: string;
  background_image: BackgroundImage | null;
  charecter_voice: CharacterVoice;
  nature_sound: NatureSound | null;
  experience_question_answer: ExperienceQuestionAnswers;
  category: string;
  created_at: string;
  steps: MeditationStep[];
  total_duration: number;
}

export interface Plan {
  id: number;
  name: string;
  slug: string;
  price: string;
  currency: string;
  credit_amount: number;
  interval: string;
  badge: string | null;
  top_badge: string | null;
  features: string[];
  is_active: boolean;
}

export interface WalletBalance {
  balance: number;
  last_reset_at: string;
  updated_at: string;
}

export interface SubscriptionDetails {
  id: number;
  plan: Plan;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  pending_plan: Plan | null;
}

export interface PlanChangeResponse {
  message: string;
  action: "upgrade" | "downgrade";
  subscription: SubscriptionDetails;
}

export interface SubscriptionCancelResponse {
  message: string;
  subscription: SubscriptionDetails;
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

  meditation: {
    async getCharacterVoices(): Promise<CharacterVoice[]> {
      const res = await apiFetch("/api/v1/charecter-voice/", {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch character voices");
      }
      return res.json();
    },

    async getNatureSounds(): Promise<NatureSound[]> {
      const res = await apiFetch("/api/v1/nature-sounds/", {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch nature sounds");
      }
      return res.json();
    },

    async getBackgroundImages(): Promise<BackgroundImage[]> {
      const res = await apiFetch("/api/v1/background-image/", {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch background images");
      }
      return res.json();
    },

    async generate(data: GenerateMeditationRequest): Promise<GenerateMeditationResponse> {
      const res = await apiFetch("/api/v1/meditation/generate/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err.detail || 
          (err.charecter_voice_id ? err.charecter_voice_id.join(", ") : null) ||
          (err.category ? err.category.join(", ") : null) ||
          "Meditation generation failed"
        );
      }
      return res.json();
    },

    async getArchive(page: number = 1, pageSize: number = 10): Promise<MeditationArchiveResponse> {
      const res = await apiFetch(`/api/v1/meditation/archive/?page=${page}&page_size=${pageSize}`, {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch meditation archive");
      }
      return res.json();
    },

    async getDetails(id: number | string): Promise<MeditationDetails> {
      const res = await apiFetch(`/api/v1/meditation/${id}/`, {
        method: "GET",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch meditation details");
      }
      return res.json();
    },
  },
  finance: {
    async getPlans(): Promise<Plan[]> {
      const res = await apiFetch("/api/v1/plans/", { method: "GET" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch plans");
      }
      return res.json();
    },

    async getWallet(): Promise<WalletBalance> {
      const res = await apiFetch("/api/v1/wallet/", { method: "GET" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to fetch wallet balance");
      }
      return res.json();
    },

    async getSubscription(): Promise<SubscriptionDetails | null> {
      const res = await apiFetch("/api/v1/subscription/", { method: "GET" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (res.status === 404 || err.detail === "No subscription found for this user.") {
          return null;
        }
        throw new Error(err.error || err.detail || "Failed to fetch subscription");
      }
      return res.json();
    },

    async checkout(planSlug: string): Promise<{ checkout_url: string }> {
      const res = await apiFetch("/api/v1/subscription/checkout/", {
        method: "POST",
        body: JSON.stringify({ plan_slug: planSlug }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err.plan_slug 
            ? err.plan_slug.join(", ") 
            : (err.error || err.detail || "Checkout failed")
        );
      }
      return res.json();
    },

    async changePlan(planSlug: string): Promise<PlanChangeResponse> {
      const res = await apiFetch("/api/v1/subscription/change/", {
        method: "POST",
        body: JSON.stringify({ plan_slug: planSlug }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to change subscription plan");
      }
      return res.json();
    },

    async cancelSubscription(): Promise<SubscriptionCancelResponse> {
      const res = await apiFetch("/api/v1/subscription/cancel/", {
        method: "POST",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Failed to cancel subscription");
      }
      return res.json();
    },
  },
};
