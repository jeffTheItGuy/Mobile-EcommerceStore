// src/services/auth/firebase.auth.service.ts

import type {
  IAuthService,
  SendOtpResult,
  VerifyOtpResult,
  AuthUser,
} from "./types";
import {
  getSecureItem,
  setSecureItem,
  removeSecureItem,
} from "../storage/secureStorage";
import { phoneConfig } from "../../config/phone.config";

const AUTH_TOKEN_KEY = "nimbusurf.auth.token";
const AUTH_USER_KEY = "nimbusurf.auth.user";

export class FirebaseAuthService implements IAuthService {
  private confirmationResult: any = null;

  private getAuth() {
    try {
      const auth = require("@react-native-firebase/auth").default;
      return auth();
    } catch {
      throw new Error(
        "Firebase Auth is not installed. " +
          "Run: npx expo install @react-native-firebase/auth @react-native-firebase/app"
      );
    }
  }

  async sendOtp(phone: string): Promise<SendOtpResult> {
    try {
      const normalized = phone.replace(/\D/g, "");

      if (normalized.length !== phoneConfig.phoneLength) {
        return {
          success: false,
          message: `Please enter a valid ${phoneConfig.phoneLength}-digit mobile number.`,
        };
      }

      // Construct full E.164 phone number using configurable dial code
      const fullPhone = `${phoneConfig.dialCode}${normalized}`;
      const auth = this.getAuth();

      const confirmation = await auth.signInWithPhoneNumber(fullPhone);
      this.confirmationResult = confirmation;

      return {
        success: true,
        message: "OTP sent via Firebase.",
        confirmationId: confirmation.verificationId ?? null,
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.message ?? "Failed to send OTP. Please try again.",
      };
    }
  }

  async verifyOtp(
    phone: string,
    otp: string,
    confirmationId?: string | null
  ): Promise<VerifyOtpResult> {
    try {
      const normalizedOtp = otp.replace(/\D/g, "");

      if (normalizedOtp.length !== 6) {
        return {
          success: false,
          message: "Please enter a valid 6-digit OTP.",
        };
      }

      if (!this.confirmationResult) {
        return {
          success: false,
          message: "Please request an OTP first.",
        };
      }

      const credential = await this.confirmationResult.confirm(
        normalizedOtp
      );

      if (!credential?.user) {
        return { success: false, message: "Verification failed." };
      }

      const firebaseUser = credential.user;

      const user: AuthUser = {
        id: firebaseUser.uid,
        phone: firebaseUser.phoneNumber ?? phone,
        name: firebaseUser.displayName ?? "Nimbusurf User",
      };

      const token = await firebaseUser.getIdToken();

      await setSecureItem(AUTH_TOKEN_KEY, token);
      await setSecureItem(AUTH_USER_KEY, JSON.stringify(user));

      return { success: true, user, token };
    } catch (error: any) {
      return {
        success: false,
        message:
          error?.message ?? "Invalid OTP. Please try again.",
      };
    }
  }

  async resendOtp(phone: string): Promise<SendOtpResult> {
    this.confirmationResult = null;
    return this.sendOtp(phone);
  }

  async logout(): Promise<void> {
    try {
      const auth = this.getAuth();
      await auth.signOut();
    } catch {
      // Ignore sign-out errors
    } finally {
      await removeSecureItem(AUTH_TOKEN_KEY);
      await removeSecureItem(AUTH_USER_KEY);
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const raw = await getSecureItem(AUTH_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
