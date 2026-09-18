import { useCallback, useState } from "react";
import { Alert } from "react-native";

const sanitizePhone = (phone: string) => {
  return phone.replace(/[^0-9]/g, "").slice(0, 10);
};

const sanitizeOtp = (otp: string) => {
  return otp.replace(/[^0-9]/g, "").slice(0, 6);
};

export function useLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(sanitizePhone(value));
  }, []);

  const handleOtpChange = useCallback((value: string) => {
    setOtp(sanitizeOtp(value));
  }, []);

  const sendOtp = useCallback(async () => {
    if (phone.length !== 10) {
      Alert.alert(
        "Nimbusurf Mobi Store",
        "Please enter a valid 10-digit mobile number."
      );

      return false;
    }

    setLoading(true);

    try {
      /**
       * Replace this mock delay with your real OTP API.
       */
      await new Promise((resolve) => setTimeout(resolve, 600));

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
      /**
       * Replace this mock delay with your real OTP verification API.
       */
      await new Promise((resolve) => setTimeout(resolve, 600));

      Alert.alert(
        "Nimbusurf Mobi Store",
        "Login successful."
      );

      return true;
    } finally {
      setLoading(false);
    }
  }, [otp]);

  const resendOtp = useCallback(async () => {
    setOtp("");
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
