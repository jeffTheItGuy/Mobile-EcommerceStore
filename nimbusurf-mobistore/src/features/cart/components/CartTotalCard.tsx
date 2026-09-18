import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { formatCurrency } from "../hooks/useCart";

type CartTotalCardProps = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onCheckout?: () => void;
};

function TotalRow({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle?: object;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
}

export default function CartTotalCard({
  subtotal,
  discount,
  shipping,
  total,
  onCheckout,
}: CartTotalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Price Details</Text>

      <TotalRow
        label="Bag Total"
        value={formatCurrency(subtotal)}
      />

      <TotalRow
        label="Shipping"
        value={shipping === 0 ? "Free" : formatCurrency(shipping)}
      />

      <TotalRow
        label="Discount"
        value={`- ${formatCurrency(discount)}`}
        valueStyle={styles.discountValue}
      />

      <View style={styles.divider} />

      <TotalRow
        label="Total Payable"
        value={formatCurrency(total)}
        valueStyle={styles.totalValue}
      />

      <Pressable style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  label: {
    fontSize: 14,
    color: "#475569",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  discountValue: {
    color: "#10B981",
  },

  totalValue: {
    fontSize: 16,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },

  checkoutButton: {
    marginTop: 16,
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
