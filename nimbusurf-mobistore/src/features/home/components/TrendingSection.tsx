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
import type { TrendingShoe } from "../hooks/useHomeData";

type TrendingSectionProps = {
  data: TrendingShoe[];
  onPressItem?: (item: TrendingShoe) => void;
};

const formatShoePrice = (price: string) => {
  if (price.includes("$")) {
    return price;
  }

  return `₹${price}`;
};

function TrendingCard({
  item,
  onPress,
}: {
  item: TrendingShoe;
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

        <Text style={styles.cardPrice}>
          {formatShoePrice(item.price)}
        </Text>
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
        keyExtractor={(item) => String(item.id)}
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

  cardPrice: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },

  cardImage: {
    position: "absolute",
    top: 28,
    right: -12,
    width: 130,
    height: 90,
    transform: [
      {
        rotate: "-15deg",
      },
    ],
  },
});
