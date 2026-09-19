// src/features/auth/components/PhoneInput.tsx

import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { phoneConfig } from "../../../config/phone.config";

type PhoneInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
};

export default function PhoneInput({
  value,
  onChangeText,
  placeholder = "Mobile Number*",
  editable = true,
}: PhoneInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.prefix}>{phoneConfig.dialCode}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType="number-pad"
        maxLength={phoneConfig.phoneLength}
        editable={editable}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    height: 52,
  },
  prefix: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    paddingVertical: 0,
  },
});
