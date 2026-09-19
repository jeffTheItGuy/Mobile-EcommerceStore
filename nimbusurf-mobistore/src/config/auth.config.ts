// src/config/auth.config.ts

export type AuthProvider = "mock" | "firebase";

/**
 * Switch auth provider via environment variable.
 *
 * .env → EXPO_PUBLIC_AUTH_PROVIDER=mock      (default, works in Expo Go)
 * .env → EXPO_PUBLIC_AUTH_PROVIDER=firebase   (requires dev build)
 */
export const AUTH_PROVIDER: AuthProvider =
  (process.env.EXPO_PUBLIC_AUTH_PROVIDER as AuthProvider) ?? "mock";

export const IS_MOCK_AUTH = AUTH_PROVIDER === "mock";
export const IS_FIREBASE_AUTH = AUTH_PROVIDER === "firebase";
