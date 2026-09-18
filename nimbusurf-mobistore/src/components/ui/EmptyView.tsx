import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EmptyViewProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyView({
  title = "No data found",
  message = "There is nothing here yet.",
  actionLabel,
  onAction,
}: EmptyViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {actionLabel && onAction ? (
        <Pressable style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
  button: {
    marginTop: 18,
    backgroundColor: "#0F172A",
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
