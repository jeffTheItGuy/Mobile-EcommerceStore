import React from "react";
import { StyleSheet, Text, StyleProp, TextStyle } from "react-native";

type ProductPriceProps = {
  price: number | string;
  style?: StyleProp<TextStyle>;
};

const formatCurrency = (price: number | string) => {
  const parsed =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^0-9.]/g, ""));

  return `₹${Number(parsed || 0).toLocaleString("en-IN")}`;
};

export default function ProductPrice({ price, style }: ProductPriceProps) {
  return <Text style={[styles.price, style]}>{formatCurrency(price)}</Text>;
}

const styles = StyleSheet.create({
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
});
