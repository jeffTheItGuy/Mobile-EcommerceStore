import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingViewProps = {
  message?: string;
};

export default function LoadingView({
  message = "Loading...",
}: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F46E5" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F4F1",
    padding: 24,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
});