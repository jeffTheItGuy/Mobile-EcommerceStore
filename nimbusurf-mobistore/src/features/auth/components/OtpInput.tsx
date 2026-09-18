import React, { useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export default function OtpInput({
  value,
  onChange,
  length = 6,
}: OtpInputProps) {
  const inputs = useRef<Array<TextInput | null>>([]);

  const chars = Array.from({ length }, (_, index) => {
    return value[index] ?? "";
  });

  const updateOtp = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);

    const nextOtp = value.split("");

    if (!digit) {
      nextOtp[index] = "";

      onChange(nextOtp.join("").slice(0, length));

      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }

      return;
    }

    nextOtp[index] = digit;

    const joined = nextOtp.join("").slice(0, length);

    onChange(joined);

    if (index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {chars.map((char, index) => (
        <TextInput
          key={`otp-${index}`}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          style={[styles.box, char ? styles.boxFilled : null]}
          value={char}
          onChangeText={(text) => updateOtp(text, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },

  box: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  boxFilled: {
    borderColor: "#7C3AED",
  },
});
