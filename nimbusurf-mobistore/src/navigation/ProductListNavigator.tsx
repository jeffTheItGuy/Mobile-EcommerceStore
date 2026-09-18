import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  ProductListScreen,
  CategoriesScreen,
  ProductDetailScreen,
  CartScreen,
  AddressFormScreen,
} from "../screens";

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
    </Stack.Navigator>
  );
}
