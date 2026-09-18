import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CartItem = {
  id: string;
  name: string;
  img: string;
  type?: string;
  price: number;
  quantity: number;
};

const formatPrice = (price: number) => {
  return `₹${Number(price || 0).toLocaleString("en-IN")}`;
};

const parsePrice = (price: number | string) => {
  if (typeof price === "number") {
    return price;
  }

  const parsed = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number(parsed || 0);
};

export default function CartScreen({ navigation, route }: any) {
  const [items, setItems] = useState<CartItem[]>([]);
  const lastAddedId = useRef<string | null>(null);

  useEffect(() => {
    const product = route.params;

    if (!product?.id) {
      return;
    }

    const id = String(product.id);

    if (lastAddedId.current === id) {
      return;
    }

    lastAddedId.current = id;

    setItems((previous) => {
      const existing = previous.find((item) => item.id === id);

      if (existing) {
        return previous.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          id,
          name: product.name || "Product",
          img: product.img || "",
          type: product.type,
          price: parsePrice(product.price),
          quantity: 1,
        },
      ];
    });
  }, [route.params]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [items]);

  const discount = useMemo(() => {
    return Math.round(subtotal * 0.1);
  }, [subtotal]);

  const total = useMemo(() => {
    return Math.max(subtotal - discount, 0);
  }, [subtotal, discount]);

  const increaseQuantity = (id: string) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!items.length) {
      return;
    }

    navigation.navigate("Address");
  };

  if (!items.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your bag is empty</Text>
        <Text style={styles.emptySubtitle}>
          Add products from Home or Product List.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>My Bag</Text>

        <View style={styles.items}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.img }} style={styles.itemImage} />

              <View style={styles.itemDetails}>
                <Text numberOfLines={2} style={styles.itemName}>
                  {item.name}
                </Text>

                <Text style={styles.itemPrice}>
                  {formatPrice(item.price)}
                </Text>

                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>

                  <Text style={styles.quantityValue}>{item.quantity}</Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>

                  <Pressable onPress={() => removeItem(item.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Bag Total</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.discountValue}>
              - {formatPrice(discount)}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 16,
  },
  items: {
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
  },
  itemImage: {
    width: 100,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
    gap: 8,
  },
  itemName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  itemPrice: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },
  quantityRow: {
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
    fontWeight: "800",
    color: "#0F172A",
  },
  quantityValue: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  removeText: {
    marginLeft: "auto",
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "800",
  },
  summaryCard: {
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryValue: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },
  discountValue: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "800",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 6,
  },
  totalLabel: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  totalValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },
  checkoutBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(248, 250, 252, 0.96)",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  checkoutButton: {
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
