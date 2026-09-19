// src/services/auth/mock.auth.service.ts

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

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class MockAuthService implements IAuthService {
  async sendOtp(phone: string): Promise<SendOtpResult> {
    await delay(600);

    const normalized = phone.replace(/\D/g, "");

    if (normalized.length !== phoneConfig.phoneLength) {
      return {
        success: false,
        message: `Please enter a valid ${phoneConfig.phoneLength}-digit mobile number.`,
      };
    }

    return {
      success: true,
      message: "OTP sent successfully (mock).",
      confirmationId: null,
    };
  }

  async verifyOtp(
    phone: string,
    otp: string
  ): Promise<VerifyOtpResult> {
    await delay(700);

    const normalizedPhone = phone.replace(/\D/g, "");
    const normalizedOtp = otp.replace(/\D/g, "");

    if (normalizedPhone.length !== phoneConfig.phoneLength) {
      return {
        success: false,
        message: "Invalid phone number.",
      };
    }

    if (normalizedOtp.length !== 6) {
      return {
        success: false,
        message: "Please enter a valid 6-digit OTP.",
      };
    }

    const user: AuthUser = {
      id: `user_${normalizedPhone}`,
      phone: normalizedPhone,
      name: "Nimbusurf User",
    };

    const token = `mock-token-${Date.now()}`;

    await setSecureItem(AUTH_TOKEN_KEY, token);
    await setSecureItem(AUTH_USER_KEY, JSON.stringify(user));

    return { success: true, user, token };
  }

  async resendOtp(phone: string): Promise<SendOtpResult> {
    return this.sendOtp(phone);
  }

  async logout(): Promise<void> {
    await removeSecureItem(AUTH_TOKEN_KEY);
    await removeSecureItem(AUTH_USER_KEY);
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
