import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  variant?: "title" | "subtitle" | "body" | "caption" | "price";
  color?: string;
};

export default function AppText({
  variant = "body",
  color = "#121212",
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        variant === "title" && styles.title,
        variant === "subtitle" && styles.subtitle,
        variant === "body" && styles.body,
        variant === "caption" && styles.caption,
        variant === "price" && styles.price,
        { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    color: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    color: "#6B7280",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
});