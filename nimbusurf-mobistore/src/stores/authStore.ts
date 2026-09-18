import { useEffect } from "react";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import type { User } from "./types";

const AUTH_TOKEN_KEY = "nimbusurf.auth.token";
const AUTH_USER_KEY = "nimbusurf.auth.user";

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  loginWithOtp: (phone: string, otp: string) => Promise<boolean>;
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

  loginWithOtp: async (phone, otp) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanOtp = otp.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      set({
        error: "Please enter a valid 10-digit mobile number.",
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
      /**
       * Replace this mock delay with your real OTP verification API.
       */
      await new Promise((resolve) => setTimeout(resolve, 600));

      const token = `demo-token-${Date.now()}`;

      const user: User = {
        id: `user_${cleanPhone}`,
        phone: cleanPhone,
        name: "Nimbusurf User",
      };

      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

      set({
        user,
        token,
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
      await Promise.all([
        SecureStore.deleteItemAsync(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(AUTH_USER_KEY),
      ]);
    } catch {
      // Ignore storage errors during logout.
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
      const [token, rawUser] = await Promise.all([
        SecureStore.getItemAsync(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(AUTH_USER_KEY),
      ]);

      if (token && rawUser) {
        const user = JSON.parse(rawUser) as User;

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
