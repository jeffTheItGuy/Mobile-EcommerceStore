import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

type CartItemProduct = {
  id: string | number;
  name: string;
  img: string;
  price: number | string;
  quantity: number;
};

type CartItemProps = {
  item: CartItemProduct;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
};

const formatCurrency = (price: number | string) => {
  const parsed =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^0-9.]/g, ""));

  return `$${Number(parsed || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  style,
}: CartItemProps) {
  return (
    <View style={[styles.item, style]}>
      <Image
        source={{ uri: item.img }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>{formatCurrency(item.price)}</Text>

        <View style={styles.controlsRow}>
          <View style={styles.quantityControls}>
            <Pressable style={styles.quantityButton} onPress={onDecrease}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <Pressable style={styles.quantityButton} onPress={onIncrease}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          <Pressable onPress={onRemove}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
  },
  image: {
    width: 96,
    height: 110,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#0F172A",
  },
  price: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  controlsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  quantity: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  remove: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EF4444",
  },
});
