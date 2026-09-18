import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../constants";

type ProductActionsProps = {
  onAddToBag: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

export default function ProductActions({
  onAddToBag,
  isWishlisted,
  onToggleWishlist,
}: ProductActionsProps) {
  return (
    <View style={styles.actionsContainer}>
      {/* Add To Bag */}
      <View style={styles.actionButtonWrapper}>
        <TouchableOpacity style={styles.addToBagButton} onPress={onAddToBag}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>
      </View>

      {/* Wishlist */}
      <TouchableOpacity style={styles.wishlistButton} onPress={onToggleWishlist}>
        <MaterialCommunityIcons
          name={isWishlisted ? "heart" : "heart-outline"}
          size={28}
          color={isWishlisted ? "#DA1C4C" : COLORS.black}
        />
      </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
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
  wishlistButton: {
    width: 70,
    height: "100%",
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#E2E8F0",
  },
});