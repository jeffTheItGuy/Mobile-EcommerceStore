// src/config/phone.config.ts

export type PhoneConfig = {
  dialCode: string;
  /** Number of digits expected after the dial code */
  phoneLength: number;
};

/**
 * Change the default country by editing EXPO_PUBLIC_DEFAULT_DIAL_CODE in .env
 *
 * Examples:
 *   +263 → Zimbabwe (9-digit mobile numbers)
 *   +91  → India (10-digit mobile numbers)
 *   +1   → US/Canada (10-digit numbers)
 *   +44  → UK (10-11 digit numbers)
 */
const DIAL_CODE = process.env.EXPO_PUBLIC_DEFAULT_DIAL_CODE ?? "+263";

/**
 * Auto-detect expected phone length based on dial code.
 * Override with EXPO_PUBLIC_PHONE_LENGTH if needed.
 */
const PHONE_LENGTH_MAP: Record<string, number> = {
  "+263": 9,  // Zimbabwe
  "+91": 10,  // India
  "+1": 10,   // US / Canada
  "+44": 10,  // UK
  "+234": 10, // Nigeria
  "+254": 9,  // Kenya
  "+27": 9,   // South Africa
};

const PHONE_LENGTH =
  Number(process.env.EXPO_PUBLIC_PHONE_LENGTH) ||
  PHONE_LENGTH_MAP[DIAL_CODE] ||
  10;

export const phoneConfig: PhoneConfig = {
  dialCode: DIAL_CODE,
  phoneLength: PHONE_LENGTH,
};
