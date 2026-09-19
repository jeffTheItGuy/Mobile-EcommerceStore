import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextStyle,
} from "react-native";
import { resolveImage } from "../../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../../constants";
import type { Product } from "../../../types/product";

type ProductGridProps = {
  data: Product[];
  onPressProduct: (product: Product) => void;
};

function ProductGridItem({
  item,
  onPress,
}: {
  item: Product;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      {item.offer ? (
        <View style={styles.offerBadge}>
          <MaterialCommunityIcons
            name="tag"
            size={12}
            color={COLORS.white}
          />
          <Text style={styles.offerBadgeText}>{item.offer}</Text>
        </View>
      ) : null}

      <View style={styles.imageWrapper}>
        <Image
          source={resolveImage(item.img)}
          resizeMode="contain"
          style={styles.productImage}
        />
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.brandName} numberOfLines={1}>
          {item.brand_name}
        </Text>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          {`$${Number(item.price || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductGrid({
  data,
  onPressProduct,
}: ProductGridProps) {
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductGridItem
          item={item}
          onPress={() => onPressProduct(item)}
        />
      )}
      contentContainerStyle={styles.gridContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  gridContent: {
    padding: 2,
  },
  gridItem: {
    width: "50%",
    backgroundColor: COLORS.white,
    padding: 1,
    minHeight: 300,
  },
  offerBadge: {
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DA1C4C",
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offerBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700" as TextStyle["fontWeight"],
  },
  imageWrapper: {
    flex: 7,
    backgroundColor: COLORS.white,
    marginBottom: 4,
  },
  productImage: {
    height: 240,
    width: "100%",
  },
  infoWrapper: {
    flex: 3,
    paddingLeft: 16,
    paddingTop: 8,
    backgroundColor: COLORS.white,
  },
  brandName: {
    color: COLORS.cat_title_color,
    fontSize: 13,
    fontWeight: "700" as TextStyle["fontWeight"],
  },
  productName: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: "500" as TextStyle["fontWeight"],
    marginTop: 2,
  },
  productPrice: {
    color: COLORS.cat_title_color,
    fontSize: 14,
    fontWeight: "800" as TextStyle["fontWeight"],
    marginTop: 2,
  },
});