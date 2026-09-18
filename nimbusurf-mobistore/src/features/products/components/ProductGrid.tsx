import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, FONTS, SIZES, icons } from "../../../constants";
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
      {/* Offer Badge */}
      <View style={styles.offerBadge}>
        <Image
          source={icons.discount_tag}
          resizeMode="contain"
          style={styles.offerBadgeImage}
        />
        <Text style={styles.offerBadgeText}>{item.offer}</Text>
      </View>

      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.img }}
          resizeMode="contain"
          style={styles.productImage}
        />
      </View>

      {/* Product Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.brandName} numberOfLines={1}>
          {item.brand_name}
        </Text>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductGrid({ data, onPressProduct }: ProductGridProps) {
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
  },
  offerBadgeImage: {
    height: 20,
    width: 60,
    position: "absolute",
  },
  offerBadgeText: {
    color: COLORS.white,
    ...FONTS.prod_list_offer_title_text,
    paddingLeft: 8,
    zIndex: 20,
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
    ...FONTS.prod_list_brand_title_text,
  },
  productName: {
    color: COLORS.black,
    ...FONTS.prod_list_title_text,
    marginTop: 2,
  },
  productPrice: {
    color: COLORS.cat_title_color,
    ...FONTS.prod_list_price_text,
    marginTop: 2,
  },
});
