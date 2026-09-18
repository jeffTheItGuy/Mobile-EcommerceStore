import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PRODUCT_LIST, ScreenProduct } from "./mockData";

const formatPrice = (price: number) => {
  return `₹${Number(price || 0).toLocaleString("en-IN")}`;
};

export default function ProductListScreen({ navigation, route }: any) {
  const categoryType = route.params?.categoryType || "";

  const products = useMemo(() => {
    const normalized = String(categoryType).toLowerCase();

    if (!normalized) {
      return PRODUCT_LIST;
    }

    if (normalized.includes("women")) {
      return PRODUCT_LIST.filter((item) => item.type === "women");
    }

    if (normalized.includes("men")) {
      return PRODUCT_LIST.filter((item) => item.type === "men");
    }

    if (normalized.includes("kids")) {
      return PRODUCT_LIST.filter((item) => item.type === "kids");
    }

    return PRODUCT_LIST;
  }, [categoryType]);

  const openProduct = (product: ScreenProduct) => {
    navigation.navigate("Product", {
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });
  };

  if (!products.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptySubtitle}>
          Try selecting another category.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.productCard}
            onPress={() => openProduct(item)}
          >
            <Image source={{ uri: item.img }} style={styles.productImage} />

            <View style={styles.productDetails}>
              <Text numberOfLines={1} style={styles.productBrand}>
                {item.brand}
              </Text>

              <Text numberOfLines={2} style={styles.productName}>
                {item.name}
              </Text>

              <Text style={styles.productPrice}>
                {formatPrice(item.price)}
              </Text>

              <Text style={styles.productOffer}>{item.offer}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  list: {
    padding: 10,
    paddingBottom: 32,
  },
  productCard: {
    flex: 1,
    margin: 6,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 210,
    backgroundColor: "#F1F5F9",
  },
  productDetails: {
    padding: 12,
    gap: 4,
  },
  productBrand: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  productName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  productPrice: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },
  productOffer: {
    color: "#10B981",
    fontSize: 12,
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
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
  },
});
