import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, SIZES } from "../../../constants";
import type { HomeProduct } from "../hooks/useHomeData";

type RecentlyViewedSectionProps = {
  data: HomeProduct[];
  onPressItem: (item: HomeProduct) => void;
};

const formatProductPrice = (price?: number | string) => {
  if (price === undefined || price === null) {
    return "";
  }

  if (typeof price === "number") {
    return `₹${price}`;
  }

  if (price.includes("$")) {
    const cleaned = price.replace("$", "");
    const parsed = Number(cleaned);

    if (Number.isNaN(parsed)) {
      return price;
    }

    return `₹${Math.round(parsed)}`;
  }

  if (price.includes("₹")) {
    return price;
  }

  return `₹${price}`;
};

function RecentlyViewedRow({
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
      style={styles.row}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.img }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          {formatProductPrice(item.price)}
        </Text>

        <Text style={styles.offer}>30% Off</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function RecentlyViewedSection({
  data,
  onPressItem,
}: RecentlyViewedSectionProps) {
  if (!data.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recently Viewed</Text>

      <View style={styles.list}>
        {data.map((item) => (
          <RecentlyViewedRow
            key={String(item.id)}
            item={item}
            onPress={() => onPressItem(item)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: SIZES.base,
  },

  list: {
    gap: SIZES.base,
  },

  row: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EDF2F7",
    padding: SIZES.base,
  },

  imageWrapper: {
    width: 110,
    height: 120,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  details: {
    flex: 1,
    marginLeft: SIZES.radius,
    justifyContent: "center",
    gap: 6,
  },

  name: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },

  price: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "800",
  },

  offer: {
    color: "#00964D",
    fontSize: 12,
    fontWeight: "700",
  },
});
