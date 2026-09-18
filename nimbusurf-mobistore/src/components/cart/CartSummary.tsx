import React from "react";
import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";

type CartSummaryProps = {
  subtotal: number;
  discount?: number;
  shipping?: number;
  total: number;
  style?: StyleProp<ViewStyle>;
};

const formatCurrency = (value: number) => {
  return `$${Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function CartSummary({
  subtotal,
  discount = 0,
  shipping = 0,
  total,
  style,
}: CartSummaryProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>Price Details</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Bag Total</Text>
        <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Discount</Text>
        <Text style={styles.discountValue}>
          - {formatCurrency(discount)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Shipping</Text>
        <Text style={styles.value}>
          {shipping === 0 ? "Free" : formatCurrency(shipping)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total Payable</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#475569",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  discountValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10B981",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
});
