import { delay } from "./client";
import {
  getSecureItem,
  removeSecureItem,
  setSecureItem,
} from "../storage/secureStorage";

import type { User } from "../types";

const AUTH_TOKEN_KEY = "nimbusurf.auth.token";
const AUTH_USER_KEY = "nimbusurf.auth.user";

export async function requestOtp(
  phone: string
): Promise<{
  success: boolean;
  message?: string;
}> {
  await delay(600);

  const normalizedPhone = phone.replace(/\D/g, "");

  if (normalizedPhone.length !== 10) {
    return {
      success: false,
      message: "Please enter a valid 10-digit mobile number.",
    };
  }

  return {
    success: true,
    message: "OTP sent successfully.",
  };
}

export async function verifyOtp(
  phone: string,
  otp: string
): Promise<User> {
  await delay(700);

  const normalizedPhone = phone.replace(/\D/g, "");
  const normalizedOtp = otp.replace(/\D/g, "");

  if (normalizedPhone.length !== 10) {
    throw new Error("Invalid phone number.");
  }

  if (normalizedOtp.length !== 6) {
    throw new Error("Please enter a valid 6-digit OTP.");
  }

  const user: User = {
    id: `user_${normalizedPhone}`,
    phone: normalizedPhone,
    name: "Nimbusurf User",
  };

  const token = `mock-token-${Date.now()}`;

  await setSecureItem(AUTH_TOKEN_KEY, token);
  await setSecureItem(AUTH_USER_KEY, JSON.stringify(user));

  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const rawUser = await getSecureItem(AUTH_USER_KEY);

    if (!rawUser) {
      return null;
    }

    return JSON.parse(rawUser) as User;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  return getSecureItem(AUTH_TOKEN_KEY);
}

export async function logout(): Promise<void> {
  await removeSecureItem(AUTH_TOKEN_KEY);
  await removeSecureItem(AUTH_USER_KEY);
}
