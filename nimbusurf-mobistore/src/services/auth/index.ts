// src/services/auth/index.ts

import { AUTH_PROVIDER } from "../../config/auth.config";
import type { IAuthService } from "./types";
import { MockAuthService } from "./mock.auth.service";
import { FirebaseAuthService } from "./firebase.auth.service";

/**
 * Factory — picks the correct auth service based on
 * EXPO_PUBLIC_AUTH_PROVIDER in .env
 *
 *   "mock"     → MockAuthService   (default, Expo Go safe)
 *   "firebase" → FirebaseAuthService (requires dev build)
 */
function createAuthService(): IAuthService {
  switch (AUTH_PROVIDER) {
    case "firebase":
      return new FirebaseAuthService();
    case "mock":
    default:
      return new MockAuthService();
  }
}

export const authService: IAuthService = createAuthService();

export type {
  IAuthService,
  SendOtpResult,
  VerifyOtpResult,
  AuthUser,
} from "./types";
