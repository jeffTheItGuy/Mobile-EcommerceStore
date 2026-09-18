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
import type { HomeProduct } from "../hooks/useHomeData";

type TrendingClothesSectionProps = {
  data: HomeProduct[];
  onPressItem: (item: HomeProduct) => void;
};

const formatProductPrice = (price?: number | string) => {
  if (price === undefined || price === null) {
    return "";
  }
  if (typeof price === "number") {
    return `$${price}`;
  }
  if (price.includes("$")) {
    const cleaned = price.replace("$", "");
    const parsed = Number(cleaned);
    if (Number.isNaN(parsed)) {
      return price;
    }
    return `$${Math.round(parsed)}`;
  }
  if (price.includes("$")) {
    return price;
  }
  return `$${price}`;
};

function TrendingClothesCard({
  item,
  onPress,
}: {
  item: HomeProduct;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={{ uri: item.img }}
        resizeMode="cover"
        style={styles.cardImage}
      />
      <View style={styles.cardDetails}>
        <Text numberOfLines={2} style={styles.cardName}>
          {item.name}
        </Text>
        <Text style={styles.cardPrice}>
          {formatProductPrice(item.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function TrendingClothesSection({
  data,
  onPressItem,
}: TrendingClothesSectionProps) {
  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>New Arrivals</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => `clothes-${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TrendingClothesCard
            item={item}
            onPress={() => onPressItem(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: SIZES.padding,
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
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#EDF2F7",
    overflow: "hidden",
    marginRight: SIZES.base,
  },
  cardImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#F8FAFC",
  },
  cardDetails: {
    padding: SIZES.base,
    gap: 6,
  },
  cardName: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  cardPrice: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "800",
  },
});
