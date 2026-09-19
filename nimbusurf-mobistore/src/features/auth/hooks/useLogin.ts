// src/features/auth/hooks/useLogin.ts

import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { authService } from "../../../services/auth";
import { useAuthStore } from "../../../stores/authStore";
import { phoneConfig } from "../../../config/phone.config";

const sanitizePhone = (phone: string) => {
  return phone.replace(/[^0-9]/g, "").slice(0, phoneConfig.phoneLength);
};

const sanitizeOtp = (otp: string) => {
  return otp.replace(/[^0-9]/g, "").slice(0, 6);
};

export function useLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  const loginWithOtp = useAuthStore((state) => state.loginWithOtp);

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(sanitizePhone(value));
  }, []);

  const handleOtpChange = useCallback((value: string) => {
    setOtp(sanitizeOtp(value));
  }, []);

  const sendOtp = useCallback(async () => {
    if (phone.length !== phoneConfig.phoneLength) {
      Alert.alert(
        "Nimbusurf Mobi Store",
        `Please enter a valid ${phoneConfig.phoneLength}-digit mobile number.`
      );
      return false;
    }

    setLoading(true);
    try {
      const result = await authService.sendOtp(phone);

      if (!result.success) {
        Alert.alert(
          "Nimbusurf Mobi Store",
          result.message ?? "Failed to send OTP."
        );
        return false;
      }

      setConfirmationId(result.confirmationId ?? null);
      setOtp("");
      setOtpSent(true);
      return true;
    } finally {
      setLoading(false);
    }
  }, [phone]);

  const verifyOtp = useCallback(async () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Nimbusurf Mobi Store",
        "Please enter the 6-digit OTP."
      );
      return false;
    }

    setLoading(true);
    try {
      const success = await loginWithOtp(phone, otp, confirmationId);

      if (!success) {
        const error = useAuthStore.getState().error;
        Alert.alert(
          "Nimbusurf Mobi Store",
          error ?? "Verification failed. Please try again."
        );
        return false;
      }

      Alert.alert("Nimbusurf Mobi Store", "Login successful.");
      return true;
    } finally {
      setLoading(false);
    }
  }, [phone, otp, confirmationId, loginWithOtp]);

  const resendOtp = useCallback(async () => {
    setOtp("");
    setConfirmationId(null);
    return sendOtp();
  }, [sendOtp]);

  return {
    phone,
    otp,
    otpSent,
    loading,
    setPhone: handlePhoneChange,
    setOtp: handleOtpChange,
    sendOtp,
    verifyOtp,
    resendOtp,
  };
}
