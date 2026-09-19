// src/stores/authStore.ts

import { useEffect } from "react";
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { authService } from "../services/auth";
import { phoneConfig } from "../config/phone.config";
import type { User } from "./types";

const AUTH_TOKEN_KEY = "nimbusurf.auth.token";
const AUTH_USER_KEY = "nimbusurf.auth.user";

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginWithOtp: (
    phone: string,
    otp: string,
    confirmationId?: string | null
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  loginWithOtp: async (phone, otp, confirmationId) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanOtp = otp.replace(/\D/g, "");

    if (cleanPhone.length !== phoneConfig.phoneLength) {
      set({
        error: `Please enter a valid ${phoneConfig.phoneLength}-digit mobile number.`,
        isLoading: false,
      });
      return false;
    }

    if (cleanOtp.length !== 6) {
      set({
        error: "Please enter a valid 6-digit OTP.",
        isLoading: false,
      });
      return false;
    }

    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await authService.verifyOtp(
        phone,
        otp,
        confirmationId
      );

      if (!result.success || !result.user) {
        set({
          error: result.message ?? "Login failed. Please try again.",
          isLoading: false,
        });
        return false;
      }

      set({
        user: result.user,
        token: result.token ?? null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch {
      set({
        error: "Unable to login. Please try again.",
        isLoading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore errors during logout
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  hydrate: async () => {
    try {
      const user = await authService.getCurrentUser();

      if (user) {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        });
      } else {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      }
    } catch {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  clearError: () =>
    set({
      error: null,
    }),
}));

export const selectAuthUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectAuthLoading = (state: AuthState) => state.isLoading;
export const selectAuthError = (state: AuthState) => state.error;

export function useAuthHydration() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
