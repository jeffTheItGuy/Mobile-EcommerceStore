import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const formatCurrency = (value: number) => {
  return `₹${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default function CheckoutSuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const total = route.params?.total ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>Order Placed Successfully</Text>

      <Text style={styles.subtitle}>
        Thank you for shopping with Nimbusurf Mobi Store.
      </Text>

      {total > 0 ? (
        <Text style={styles.total}>
          Amount: {formatCurrency(total)}
        </Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </Pressable>
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

  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  icon: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },

  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  button: {
    marginTop: 28,
    backgroundColor: "#7C3AED",
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
