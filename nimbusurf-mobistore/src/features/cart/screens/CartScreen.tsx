import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CartItemList from "../components/CartItemList";
import CartTotalCard from "../components/CartTotalCard";
import { useCart } from "../hooks/useCart";

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const {
    items,
    subtotal,
    discount,
    shipping,
    total,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Bag</Text>
          {items.length > 0 ? (
            <Pressable onPress={clearCart}>
              <Text style={styles.clearText}>Clear Bag</Text>
            </Pressable>
          ) : null}
        </View>

        <CartItemList
          items={items}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onRemove={removeItem}
        />

        {items.length > 0 ? (
          <CartTotalCard
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            total={total}
            onCheckout={handleCheckout}
          />
        ) : (
          <View style={styles.emptyActionContainer}>
            <Pressable
              style={styles.continueShoppingButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.continueShoppingText}>
                Continue Shopping
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  clearText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#EF4444",
  },
  emptyActionContainer: {
    marginTop: 24,
  },
  continueShoppingButton: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  continueShoppingText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});