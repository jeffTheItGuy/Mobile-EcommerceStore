import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

import { COLORS } from "../../../constants";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductActions from "../components/ProductActions";
import { useProduct } from "../hooks/useProduct";
import type {
  MenuAndProductListStackParamList,
} from "../../../types/navigation";
import type { ProductDetailParams } from "../../../types/product";

type NavigationProp = NativeStackNavigationProp<
  MenuAndProductListStackParamList,
  "Product"
>;

type RouteParams = RouteProp<
  MenuAndProductListStackParamList,
  "Product"
>;

export default function ProductDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();

  const params = route.params as ProductDetailParams;

  const { product, discountValue, discountedPrice, originalPrice } =
    useProduct(params);

  const navigateToCart = useCallback(() => {
    navigation.navigate("Cart", {
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });
  }, [navigation, product]);

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <View style={styles.scrollContent}>
        <ProductGallery img={product.img} />
        <ProductInfo
          name={product.name}
          price={originalPrice}
          discountValue={discountValue}
          discountedPrice={discountedPrice}
        />
      </View>

      {/* Fixed Bottom Actions */}
      <ProductActions
        onAddToBag={navigateToCart}
        onBuyNow={navigateToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  scrollContent: {
    flex: 1,
  },
});
