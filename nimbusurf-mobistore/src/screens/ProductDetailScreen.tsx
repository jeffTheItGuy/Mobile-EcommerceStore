import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const formatPrice = (price: number | string) => {
  const parsed =
    typeof price === "number" ? price : Number(String(price).replace(/[^0-9.]/g, ""));

  return `₹${Number(parsed || 0).toLocaleString("en-IN")}`;
};

export default function ProductDetailScreen({ navigation, route }: any) {
  const product = route.params;

  if (!product?.id) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Product not found</Text>
        <Text style={styles.errorSubtitle}>
          Please go back and select a product again.
        </Text>
      </View>
    );
  }

  const handleAddToBag = () => {
    navigation.navigate("Cart", {
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });
  };

  const handleBuyNow = () => {
    navigation.navigate("Cart", {
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.img }} style={styles.image} />

        <View style={styles.detailsCard}>
          <Text style={styles.brand}>{product.type?.toUpperCase() || "PRODUCT"}</Text>

          <Text style={styles.name}>{product.name}</Text>

          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          <Text style={styles.description}>
            Premium quality product from Nimbusurf Mobi Store. Fast delivery,
            easy returns, and secure checkout.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Pressable style={styles.addToBag} onPress={handleAddToBag}>
          <Text style={styles.addToBagText}>Add To Bag</Text>
        </Pressable>

        <Pressable style={styles.buyNow} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
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
    paddingBottom: 120,
  },
  image: {
    width: "100%",
    height: 420,
    backgroundColor: "#F1F5F9",
  },
  detailsCard: {
    margin: 16,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
    gap: 10,
  },
  brand: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  name: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  price: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "800",
  },
  description: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    gap: 12,
    padding: 16,
    backgroundColor: "rgba(248, 250, 252, 0.96)",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  addToBag: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  addToBagText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },
  buyNow: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  buyNowText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  errorSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
