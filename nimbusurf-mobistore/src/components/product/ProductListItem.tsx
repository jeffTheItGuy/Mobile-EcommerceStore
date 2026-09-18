import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

type ProductListItemProduct = {
  id: string | number;
  name: string;
  img: string;
  price: number | string;
  offer?: string;
};

type ProductListItemProps = {
  product: ProductListItemProduct;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const formatCurrency = (price: number | string) => {
  const parsed =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^0-9.]/g, ""));

  return `$${Number(parsed || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function ProductListItem({
  product,
  onPress,
  style,
}: ProductListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Image
        source={{ uri: product.img }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>

        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        {product.offer ? (
          <Text style={styles.offer}>{product.offer}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  image: {
    width: 96,
    height: 110,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
    gap: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#0F172A",
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  offer: {
    fontSize: 12,
    fontWeight: "700",
    color: "#10B981",
  },
});
