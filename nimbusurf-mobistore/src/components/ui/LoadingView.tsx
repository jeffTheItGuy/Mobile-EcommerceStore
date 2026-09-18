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
      <ActivityIndicator size="large" color="#7C3AED" />
      <Text style={styles.message}>{message}</Text>
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
  message: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748B",
  },
});
