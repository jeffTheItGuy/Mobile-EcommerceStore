import React, { useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../../constants";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../../../types/product";
import type { MenuAndProductListStackParamList } from "../../../navigation/types";

type NavigationProp = NativeStackNavigationProp<
  MenuAndProductListStackParamList,
  "ProductList"
>;

type RouteParams = RouteProp<
  MenuAndProductListStackParamList,
  "ProductList"
>;

export default function ProductListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const categoryType = route.params?.categoryType;

  const { products, isLoading, error, refetch } = useProducts(categoryType);

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

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProductGrid data={products} onPressProduct={handlePressProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  errorText: {
    color: COLORS.black,
    ...FONTS.body3,
    textAlign: "center",
  },
});
