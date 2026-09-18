import type { NavigatorScreenParams } from "@react-navigation/native";

// ─── Shared Param Shapes ──────────────────────────────────────────
export type ProductParams = {
  id: string | number;
  name: string;
  img: string;
  type?: string;
  price: number | string;
};

export type ProductListParams = {
  categoryType?: string;
};

export type CheckoutSuccessParams = {
  total: number;
  paymentMethod?: string;
};

// ─── Home Stack ───────────────────────────────────────────────────
export type HomeStackParamList = {
  Home: undefined;
  ProductList: ProductListParams | undefined;
  Product: ProductParams;
};

// ─── Categories Stack ─────────────────────────────────────────────
export type CategoriesStackParamList = {
  Categories: undefined;
  ProductList: ProductListParams | undefined;
  Product: ProductParams;
};

// ─── Wishlist Stack ───────────────────────────────────────────────
export type WishlistStackParamList = {
  Wishlist: undefined;
  Product: ProductParams;
};

// ─── Cart Stack ───────────────────────────────────────────────────
export type CartStackParamList = {
  Cart: ProductParams | undefined;
  Checkout: undefined;
  CheckoutSuccess: CheckoutSuccessParams;
};

// ─── Account Stack ────────────────────────────────────────────────
export type AccountStackParamList = {
  Login: undefined;
  Address: undefined;
};

// ─── Root Tab Navigator ───────────────────────────────────────────
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  CategoriesTab: NavigatorScreenParams<CategoriesStackParamList> | undefined;
  WishlistTab: NavigatorScreenParams<WishlistStackParamList> | undefined;
  CartTab: NavigatorScreenParams<CartStackParamList> | undefined;
  AccountTab: NavigatorScreenParams<AccountStackParamList> | undefined;
};

// ─── Root Stack ───────────────────────────────────────────────────
export type RootStackParamList = {
  Splash: undefined;
  HomeTabs: NavigatorScreenParams<MainTabParamList> | undefined;
};

// ─── Legacy alias ─────────────────────────────────────────────────
export type MenuAndProductListStackParamList = CategoriesStackParamList;