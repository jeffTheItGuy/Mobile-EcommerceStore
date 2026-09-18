import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setOtpSent(true);
    Alert.alert("OTP Sent", "Use 123456 for demo login.");
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit OTP.");
      return;
    }

    Alert.alert("Login Successful", "Welcome to Nimbusurf Mobi Store.");
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Nimbusurf</Text>
          <Text style={styles.subtitle}>
            Login or signup using your mobile number
          </Text>
        </View>

        <Text style={styles.label}>Mobile Number</Text>

        <View style={styles.phoneRow}>
          <Text style={styles.countryCode}>+91</Text>

          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter mobile number"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        {otpSent ? (
          <View style={styles.otpSection}>
            <Text style={styles.label}>Enter OTP</Text>

            <TextInput
              style={styles.otpInput}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter 6-digit OTP"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        ) : null}

        <Pressable
          style={styles.button}
          onPress={otpSent ? handleLogin : handleSendOtp}
        >
          <Text style={styles.buttonText}>
            {otpSent ? "Continue" : "Send OTP"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    height: 54,
  },
  countryCode: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    paddingVertical: 0,
  },
  otpSection: {
    marginTop: 20,
  },
  otpInput: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  button: {
    marginTop: 28,
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
