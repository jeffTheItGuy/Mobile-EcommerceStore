import React from "react";
import { Pressable } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeTabs from "./HomeTabs";

import {
  SplashScreen,
  CategoriesScreen,
  ProductListScreen,
  ProductDetailScreen,
  CartScreen,
} from "../screens";

import type { HomeStackParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splashscreen">
      <Stack.Screen
        name="Splashscreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={({ navigation }) => ({
          title: "Nimbusurf",
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 20,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{
                marginLeft: 12,
                marginRight: 8,
              }}
            >
              <MaterialCommunityIcons
                name="menu"
                size={26}
                color="#0F172A"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                console.log("Search pressed");
              }}
              style={{
                marginRight: 12,
              }}
            >
              <MaterialCommunityIcons
                name="magnify"
                size={26}
                color="#0F172A"
              />
            </Pressable>
          ),
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
        name="ProductList"
        component={ProductListScreen}
        options={({ route }) => ({
          title: route.params?.categoryType ?? "Products",
        })}
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
    </Stack.Navigator>
  );
}
