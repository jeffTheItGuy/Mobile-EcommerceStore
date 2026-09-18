import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS, FONTS, SIZES } from "../../../constants";

type ProductActionsProps = {
  onAddToBag: () => void;
  onBuyNow: () => void;
};

export default function ProductActions({
  onAddToBag,
  onBuyNow,
}: ProductActionsProps) {
  return (
    <View style={styles.actionsContainer}>
      {/* Add To Bag */}
      <View style={styles.actionButtonWrapper}>
        <TouchableOpacity style={styles.addToBagButton} onPress={onAddToBag}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>
      </View>

      {/* Buy Now */}
      <View style={styles.actionButtonWrapper}>
        <TouchableOpacity style={styles.buyNowButton} onPress={onBuyNow}>
          <Text style={styles.buyNowText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 70,
    ...FONTS.box_shadow,
  },
  actionButtonWrapper: {
    flex: 1,
    height: "100%",
  },
  addToBagButton: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  addToBagText: {
    color: COLORS.black,
    ...FONTS.big_button_text,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#DA1C4C",
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    color: COLORS.white,
    ...FONTS.big_button_text,
  },
});
