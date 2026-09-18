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

type ProductCardProduct = {
  id: string | number;
  name: string;
  img: string;
  price: number | string;
  brand?: string;
  offer?: string;
};

type ProductCardProps = {
  product: ProductCardProduct;
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

export default function ProductCard({
  product,
  onPress,
  style,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Image
        source={{ uri: product.img }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {product.brand ? (
          <Text style={styles.brand}>{product.brand}</Text>
        ) : null}

        <Text numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>

          {product.offer ? (
            <Text style={styles.offer}>{product.offer}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: "100%",
    height: 190,
    backgroundColor: "#F1F5F9",
  },
  content: {
    padding: 12,
    gap: 4,
  },
  brand: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: "#64748B",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: "#0F172A",
  },
  bottomRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
