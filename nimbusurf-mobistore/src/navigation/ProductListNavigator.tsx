import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "../features/products/screens/ProductListScreen";
import CategoriesScreen from "../features/categories/screens/CategoriesScreen";
import ProductDetailScreen from "../features/product/screens/ProductDetailScreen";
import CartScreen from "../features/cart/screens/CartScreen";
import AddressFormScreen from "../features/address/screens/AddressFormScreen";
import CheckoutScreen from "../features/checkout/screens/CheckoutScreen";
import CheckoutSuccessScreen from "../features/checkout/screens/CheckoutSuccessScreen";
import type { MenuAndProductListStackParamList } from "./types";

const Stack =
  createNativeStackNavigator<MenuAndProductListStackParamList>();

export default function ProductListNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={({ route }) => ({
          title: route.params?.categoryType ?? "Products",
        })}
      />
      <Stack.Screen
        name="Category"
        component={CategoriesScreen}
        options={{
          title: "Categories",
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.name ?? "Product",
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "My Bag",
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressFormScreen}
        options={{
          title: "Address",
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: "Checkout",
        }}
      />
      <Stack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          title: "Order Confirmed",
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
