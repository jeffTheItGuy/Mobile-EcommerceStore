import type { NavigatorScreenParams } from "@react-navigation/native";

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

export type HomeTabParamList = {
  Home: undefined;
  Category: undefined;
  Brand: undefined;
  Account: undefined;
  MyBag: undefined;
};

export type HomeStackParamList = {
  Splashscreen: undefined;
  HomeTabs: NavigatorScreenParams<HomeTabParamList> | undefined;
  Category: undefined;
  ProductList: ProductListParams | undefined;
  Product: ProductParams;
  Cart: ProductParams | undefined;
};

export type AddressStackParamList = {
  Address: undefined;
};

export type LoginStackParamList = {
  Login: undefined;
};

export type MenuAndProductListStackParamList = {
  Category: undefined;
  ProductList: ProductListParams | undefined;
  Product: ProductParams;
  Cart: ProductParams | undefined;
  Address: undefined;
};

export type AppDrawerParamList = {
  HomePage: NavigatorScreenParams<HomeStackParamList> | undefined;
  Address: NavigatorScreenParams<AddressStackParamList> | undefined;
  Login: NavigatorScreenParams<LoginStackParamList> | undefined;
  ProductList: NavigatorScreenParams<MenuAndProductListStackParamList> | undefined;
  Categories: NavigatorScreenParams<MenuAndProductListStackParamList> | undefined;
};
