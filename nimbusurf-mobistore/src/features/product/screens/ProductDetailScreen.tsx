import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductActions from "../components/ProductActions";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../../cart/hooks/useCart";
import {
  useWishlistStore,
  useIsWishlisted,
} from "../../../stores/wishlistStore";
import type { ProductDetailParams } from "../../../types/product";

export default function ProductDetailScreen() {
  // Use untyped navigation to avoid param list mismatches
  // while the navigation structure is being restructured
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as ProductDetailParams;

  const { product, discountValue, discountedPrice, originalPrice } =
    useProduct(params);

  const { addItem } = useCart();
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useIsWishlisted(String(product.id));

  const handleAddToBag = useCallback(() => {
    addItem({
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });

    // Navigate to the Cart tab's Cart screen
    // React Navigation bubbles this up to the parent Tab navigator
    navigation.navigate("CartTab", { screen: "Cart" });
  }, [addItem, navigation, product]);

  const handleToggleWishlist = useCallback(() => {
    toggleWishlistItem({
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: product.price,
    });
  }, [toggleWishlistItem, product]);

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
        onAddToBag={handleAddToBag}
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
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