import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { resolveImage } from "../../../constants/images";
import type { CartItem } from "../../../stores/types";
import { formatCurrency } from "../hooks/useCart";

type CartItemListProps = {
  items: CartItem[];
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartItemList({
  items,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}: CartItemListProps) {
  if (!items.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your bag is empty</Text>
        <Text style={styles.emptySubtitle}>
          Add products to start shopping.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              source={resolveImage(item.img)}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.details}>
            <Text numberOfLines={2} style={styles.name}>
              {item.name}
            </Text>
            {item.type ? (
              <Text style={styles.type}>{item.type}</Text>
            ) : null}
            <Text style={styles.price}>
              {formatCurrency(item.price)}
            </Text>
            <View style={styles.controlsRow}>
              <View style={styles.quantityControls}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => onDecreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => onIncreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => onRemove(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748B",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
  },
  imageWrapper: {
    width: 100,
    height: 120,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 20,
  },
  type: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  price: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  controlsRow: {
    marginTop: 12,
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
  quantityText: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  removeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#EF4444",
  },
});
