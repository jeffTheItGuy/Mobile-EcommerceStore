import type { NavigatorScreenParams } from "@react-navigation/native";
import type { ProductDetailParams } from "./product";

export type ProductListParams = {
  categoryType?: string;
};

export type CheckoutSuccessParams = {
  total: number;
  paymentMethod?: string;
};

/**
 * Root Stack Navigator
 * This covers the main app flow we built.
 */
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Categories: undefined;
  ProductList: ProductListParams | undefined;
  Product: ProductDetailParams;
  Cart: ProductDetailParams | undefined;
  Login: undefined;
  Address: undefined;
  Checkout: undefined;
  CheckoutSuccess: CheckoutSuccessParams;
};

/**
 * Alias to support the feature modules (like useProducts, ProductDetailScreen)
 * that referenced this specific name earlier.
 */
export type MenuAndProductListStackParamList = RootStackParamList;

/**
 * Bottom Tab Navigator (Optional, if you decide to wrap Home/Categories in tabs later)
 */
export type MainTabParamList = {
  HomeTab: undefined;
  CategoriesTab: undefined;
  AccountTab: undefined;
  BagTab: undefined;
};
