import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useWishlistStore } from "../../../stores/wishlistStore";
import type { Product } from "../../../stores/types";

export default function WishlistScreen() {
  const navigation = useNavigation<any>();
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  const handlePressProduct = useCallback(
    (product: Product) => {
      navigation.navigate("Product", {
        id: product.id,
        name: product.name,
        img: product.img,
        type: product.type,
        price: product.price,
      });
    },
    [navigation]
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={["top"]}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={64}
          color="#CBD5E1"
        />
        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Save items you love by tapping the heart icon.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.gridItem}
            onPress={() => handlePressProduct(item)}
          >
            <Pressable
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <MaterialCommunityIcons
                name="heart"
                size={22}
                color="#DA1C4C"
              />
            </Pressable>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.img }}
                resizeMode="contain"
                style={styles.productImage}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.brandName} numberOfLines={1}>
                {item.brand || "Nimbusurf"}
              </Text>
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                ${Number(item.price || 0).toFixed(2)}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    padding: 24,
  },
  emptyTitle: {
    marginTop: 16,
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
  gridContent: {
    padding: 2,
    paddingBottom: 32,
  },
  gridItem: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    padding: 1,
    minHeight: 300,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 999,
    padding: 6,
  },
  imageWrapper: {
    backgroundColor: "#FFFFFF",
    marginBottom: 4,
  },
  productImage: {
    height: 240,
    width: "100%",
  },
  infoWrapper: {
    paddingLeft: 16,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  brandName: {
    color: "#0B0B0B",
    fontSize: 13,
    fontWeight: "700",
  },
  productName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
  productPrice: {
    color: "#0B0B0B",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 2,
  },
});