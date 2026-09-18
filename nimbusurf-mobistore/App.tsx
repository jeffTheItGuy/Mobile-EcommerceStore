import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.title}>Nimbusurf Mobi Store</Text>
        <Text style={styles.subtitle}>Expo SDK 57 + Node 22</Text>
        <Text style={styles.note}>
          Next step: replace this with your ecommerce navigation.
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 18,
    color: "#444444",
  },
  note: {
    marginTop: 16,
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
  },
});
