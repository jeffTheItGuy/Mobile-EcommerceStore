// src/features/auth/screens/LoginScreen.tsx

import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "../components/PhoneInput";
import OtpInput from "../components/OtpInput";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore, useAuthHydration } from "../../../stores/authStore";
import { AUTH_PROVIDER } from "../../../config/auth.config";

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  // Hydrate auth state on mount (restores session if user was logged in)
  useAuthHydration();

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const {
    phone,
    otp,
    otpSent,
    loading,
    setPhone,
    setOtp,
    sendOtp,
    verifyOtp,
    resendOtp,
  } = useLogin();

  // If already authenticated, skip login
  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("HomePage");
    }
  }, [isAuthenticated, navigation]);

  const handleContinue = async () => {
    if (!otpSent) {
      await sendOtp();
      return;
    }

    const success = await verifyOtp();
    if (success) {
      // Auth state is already updated by authStore.loginWithOtp()
      // Navigate to the main app
      navigation.navigate("HomePage");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              Welcome to Nimbusurf Mobi Store
            </Text>
            <Text style={styles.subtitle}>
              Login or signup using your mobile number.
            </Text>
            {AUTH_PROVIDER === "mock" ? (
              <Text style={styles.mockBadge}>
                Demo mode — any 6-digit OTP works
              </Text>
            ) : null}
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Mobile Number</Text>
            <PhoneInput
              value={phone}
              onChangeText={setPhone}
              editable={!loading}
            />

            {otpSent ? (
              <View style={styles.otpSection}>
                <Text style={styles.label}>Enter OTP</Text>
                <OtpInput value={otp} onChange={setOtp} />
                <Pressable
                  style={styles.resendButton}
                  onPress={resendOtp}
                  disabled={loading}
                >
                  <Text style={styles.resendText}>Resend OTP</Text>
                </Pressable>
              </View>
            ) : null}

            <Pressable
              style={[
                styles.continueButton,
                loading && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.continueButtonText}>
                  {otpSent ? "Continue" : "Send OTP"}
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  mockBadge: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
    backgroundColor: "#FEF3C7",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  otpSection: {
    marginTop: 12,
  },
  resendButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  resendText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7C3AED",
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
