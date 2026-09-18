import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../../constants";
import type { TrendingProduct } from "../hooks/useHomeData";

type TrendingSectionProps = {
  data: TrendingProduct[];
  onPressItem?: (item: TrendingProduct) => void;
};

const formatPrice = (price: string) => {
  if (price.includes("$")) {
    return price;
  }
  return `$${price}`;
};

function TrendingCard({
  item,
  onPress,
}: {
  item: TrendingProduct;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { backgroundColor: item.bgColor }]}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardType}>{item.type}</Text>
        <Text numberOfLines={2} style={styles.cardName}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.cardPrice}>
            {formatPrice(item.price)}
          </Text>
          {item.discount ? (
            <Text style={styles.cardDiscount}>{item.discount}</Text>
          ) : null}
        </View>
      </View>
      <Image
        source={item.img}
        resizeMode="contain"
        style={styles.cardImage}
      />
    </TouchableOpacity>
  );
}

export default function TrendingSection({
  data,
  onPressItem,
}: TrendingSectionProps) {
  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trending</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => `trend-${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TrendingCard
            item={item}
            onPress={() => onPressItem?.(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: SIZES.base,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.black,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.base,
  },
  listContent: {
    paddingHorizontal: SIZES.padding,
    gap: SIZES.base,
  },
  card: {
    width: 180,
    height: 240,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: SIZES.base,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: SIZES.radius,
  },
  cardType: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 6,
  },
  cardName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardPrice: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  cardDiscount: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "600",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  cardImage: {
    position: "absolute",
    top: 28,
    right: -12,
    width: 130,
    height: 90,
    transform: [{ rotate: "-15deg" }],
  },
});