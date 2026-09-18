import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

type AppTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function AppTextInput({
  label,
  error,
  containerStyle,
  style,
  ...props
}: AppTextInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...props}
        placeholderTextColor="#94A3B8"
        style={[styles.input, error ? styles.inputError : null, style]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    color: "#0F172A",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: "#EF4444",
  },
});
