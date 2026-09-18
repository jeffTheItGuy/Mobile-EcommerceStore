import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { HOME_PRODUCTS, ScreenProduct } from "./mockData";

const formatPrice = (price: number) => {
  return `₹${Number(price || 0).toLocaleString("en-IN")}`;
};

export default function HomeScreen({ navigation }: any) {
  const openProduct = (product: ScreenProduct) => {
    navigation.navigate("Product", {
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Nimbusurf Mobi Store</Text>
        <Text style={styles.heroSubtitle}>
          Discover premium fashion products
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Trending</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={HOME_PRODUCTS}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <Pressable
            style={styles.trendingCard}
            onPress={() => openProduct(item)}
          >
            <Image source={{ uri: item.img }} style={styles.trendingImage} />

            <View style={styles.trendingDetails}>
              <Text numberOfLines={1} style={styles.trendingBrand}>
                {item.brand}
              </Text>

              <Text numberOfLines={2} style={styles.trendingName}>
                {item.name}
              </Text>

              <Text style={styles.trendingPrice}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </Pressable>
        )}
      />

      <Text style={styles.sectionTitle}>Recently Viewed</Text>

      <View style={styles.recentList}>
        {HOME_PRODUCTS.map((item) => (
          <Pressable
            key={`recent-${item.id}`}
            style={styles.recentCard}
            onPress={() => openProduct(item)}
          >
            <Image source={{ uri: item.img }} style={styles.recentImage} />

            <View style={styles.recentDetails}>
              <Text numberOfLines={2} style={styles.recentName}>
                {item.name}
              </Text>

              <Text style={styles.recentPrice}>
                {formatPrice(item.price)}
              </Text>

              <Text style={styles.recentOffer}>{item.offer}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  hero: {
    margin: 16,
    borderRadius: 24,
    padding: 20,
    backgroundColor: "#7C3AED",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  heroSubtitle: {
    marginTop: 6,
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  trendingCard: {
    width: 190,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  trendingImage: {
    width: "100%",
    height: 210,
    backgroundColor: "#F1F5F9",
  },
  trendingDetails: {
    padding: 12,
    gap: 4,
  },
  trendingBrand: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  trendingName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  trendingPrice: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },
  recentList: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  recentCard: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
  },
  recentImage: {
    width: 100,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
  },
  recentDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
    gap: 6,
  },
  recentName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  recentPrice: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
  },
  recentOffer: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "700",
  },
});
