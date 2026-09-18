import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS, SIZES } from "../../../constants";

type ProductInfoProps = {
  name: string;
  price: number;
  discountValue: number;
  discountedPrice: number;
};

export default function ProductInfo({
  name,
  price,
  discountValue,
  discountedPrice,
}: ProductInfoProps) {
  return (
    <View style={styles.infoContainer}>
      {/* Name & Price Row */}
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <Text style={styles.productName}>{name}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.productPrice}>${price}</Text>
        </View>
      </View>

      {/* Description & Discount Row */}
      <View style={styles.row}>
        <View style={styles.leftColumn}>
          <Text style={styles.productDescription}>short description</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.discountText}>({discountValue > 0 ? `$${discountValue} off` : "0%"})</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: SIZES.base,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SIZES.base,
  },
  leftColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  productName: {
    ...FONTS.product_title_text,
    color: COLORS.black,
  },
  productPrice: {
    ...FONTS.product_title_text,
    color: COLORS.black,
  },
  productDescription: {
    ...FONTS.product_sub_title_text,
    color: COLORS.black,
  },
  discountText: {
    ...FONTS.product_sub_title_text,
    color: "#00964D",
  },
});
