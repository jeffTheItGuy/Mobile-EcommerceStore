// src/services/auth/types.ts

/**
 * Shared auth types used across all auth service implementations.
 * Mirrors the existing `User` shape from src/services/types.ts
 */

export type AuthUser = {
  id: string;
  phone: string;
  name?: string;
};

export type SendOtpResult = {
  success: boolean;
  message?: string;
  /** Firebase returns a confirmation object; mock returns null */
  confirmationId?: string | null;
};

export type VerifyOtpResult = {
  success: boolean;
  user?: AuthUser | null;
  token?: string | null;
  message?: string;
};

export interface IAuthService {
  /** Send an OTP to the given phone number */
  sendOtp(phone: string): Promise<SendOtpResult>;

  /** Verify the OTP and return user + token on success */
  verifyOtp(
    phone: string,
    otp: string,
    confirmationId?: string | null
  ): Promise<VerifyOtpResult>;

  /** Resend OTP (typically just calls sendOtp again) */
  resendOtp(phone: string): Promise<SendOtpResult>;

  /** Sign out and clear stored credentials */
  logout(): Promise<void>;

  /** Retrieve the currently persisted user, if any */
  getCurrentUser(): Promise<AuthUser | null>;
}
