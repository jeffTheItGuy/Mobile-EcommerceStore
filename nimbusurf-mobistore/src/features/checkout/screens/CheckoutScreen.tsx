import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useCart } from "../../cart/hooks/useCart";
import { useAddressStore } from "../../address/store/addressStore";

import AddressSelection from "../components/AddressSelection";
import PaymentSelection, {
  type PaymentMethod,
} from "../components/PaymentSelection";

const formatCurrency = (value: number) => {
  return `₹${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  const {
    items,
    subtotal,
    discount,
    shipping,
    total,
    clearCart,
  } = useCart();

  const { addresses, selectedAddressId } = useAddressStore();

  const selectedAddress = useMemo(() => {
    return (
      addresses.find((address) => address.id === selectedAddressId) ||
      addresses.find((address) => address.isDefault) ||
      addresses[0] ||
      null
    );
  }, [addresses, selectedAddressId]);

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Alert.alert("Empty Bag", "Add items to your bag before checkout.");
      return;
    }

    if (!selectedAddress) {
      Alert.alert(
        "Delivery Address Required",
        "Please add a delivery address before placing your order.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Add Address",
            onPress: () => navigation.navigate("Address"),
          },
        ]
      );

      return;
    }

    clearCart();

    navigation.navigate("CheckoutSuccess", {
      total,
      paymentMethod,
    });
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your bag is empty</Text>

        <Text style={styles.emptySubtitle}>
          Add products before proceeding to checkout.
        </Text>

        <Pressable
          style={styles.emptyButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.emptyButtonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Delivery Address</Text>

      <AddressSelection
        address={selectedAddress}
        onAddAddress={() => navigation.navigate("Address")}
      />

      <Text style={styles.sectionTitle}>Payment Method</Text>

      <PaymentSelection
        selected={paymentMethod}
        onSelect={setPaymentMethod}
      />

      <Text style={styles.sectionTitle}>Items</Text>

      <View style={styles.itemsCard}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image
              source={{ uri: item.img }}
              style={styles.itemImage}
              resizeMode="contain"
            />

            <View style={styles.itemDetails}>
              <Text numberOfLines={2} style={styles.itemName}>
                {item.name}
              </Text>

              <Text style={styles.itemMeta}>
                Qty: {item.quantity}
              </Text>
            </View>

            <Text style={styles.itemPrice}>
              {formatCurrency(item.price * item.quantity)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Price Details</Text>

      <View style={styles.priceCard}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Bag Total</Text>
          <Text style={styles.priceValue}>
            {formatCurrency(subtotal)}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Discount</Text>
          <Text style={styles.discountValue}>
            - {formatCurrency(discount)}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping</Text>
          <Text style={styles.priceValue}>
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
        </View>
      </View>

      <Pressable style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    paddingBottom: 48,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 20,
    marginBottom: 10,
  },

  itemsCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 12,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  itemImage: {
    width: 64,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    marginRight: 12,
  },

  itemDetails: {
    flex: 1,
    marginRight: 12,
  },

  itemName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 18,
  },

  itemMeta: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
  },

  itemPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  priceCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  priceLabel: {
    fontSize: 13,
    color: "#475569",
  },

  priceValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },

  discountValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#10B981",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  totalValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  placeOrderButton: {
    marginTop: 24,
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  placeOrderButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },

  emptyButton: {
    marginTop: 20,
    backgroundColor: "#0F172A",
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
