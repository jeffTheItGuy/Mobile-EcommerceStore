import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../features/home/screens/HomeScreen";
import CategoriesScreen from "../features/categories/screens/CategoriesScreen";
import ProductListScreen from "../features/products/screens/ProductListScreen";
import ProductDetailScreen from "../features/product/screens/ProductDetailScreen";
import CartScreen from "../features/cart/screens/CartScreen";
import CheckoutScreen from "../features/checkout/screens/CheckoutScreen";
import CheckoutSuccessScreen from "../features/checkout/screens/CheckoutSuccessScreen";
import LoginScreen from "../features/auth/screens/LoginScreen";
import AddressFormScreen from "../features/address/screens/AddressFormScreen";
import WishlistScreen from "../features/wishlist/screens/WishlistScreen";

import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlistStore";

import type {
  HomeStackParamList,
  CategoriesStackParamList,
  WishlistStackParamList,
  CartStackParamList,
  AccountStackParamList,
  MainTabParamList,
} from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();
const WishlistStack = createNativeStackNavigator<WishlistStackParamList>();
const CartStack = createNativeStackNavigator<CartStackParamList>();
const AccountStack = createNativeStackNavigator<AccountStackParamList>();

// ─── Home Stack ───────────────────────────────────────────────────
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={({ route }) => ({
          title: route.params?.categoryType ?? "Products",
        })}
      />

      <HomeStack.Screen
        name="Product"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.name ?? "Product",
        })}
      />
    </HomeStack.Navigator>
  );
}

// ─── Categories Stack ─────────────────────────────────────────────
function CategoriesStackNavigator() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Categories" }}
      />

      <CategoriesStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={({ route }) => ({
          title: route.params?.categoryType ?? "Products",
        })}
      />

      <CategoriesStack.Screen
        name="Product"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.name ?? "Product",
        })}
      />
    </CategoriesStack.Navigator>
  );
}

// ─── Wishlist Stack ───────────────────────────────────────────────
function WishlistStackNavigator() {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ title: "Wishlist" }}
      />

      <WishlistStack.Screen
        name="Product"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.name ?? "Product",
        })}
      />
    </WishlistStack.Navigator>
  );
}

// ─── Cart Stack ───────────────────────────────────────────────────
function CartStackNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "My Bag" }}
      />

      <CartStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout" }}
      />

      <CartStack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          title: "Order Confirmed",
          headerLeft: () => null,
        }}
      />
    </CartStack.Navigator>
  );
}

// ─── Account Stack ────────────────────────────────────────────────
function AccountStackNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Account" }}
      />

      <AccountStack.Screen
        name="Address"
        component={AddressFormScreen}
        options={{ title: "Address" }}
      />
    </AccountStack.Navigator>
  );
}

// ─── Main Tab Navigator ───────────────────────────────────────────
export default function MainTabs() {
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C3AED",
        tabBarInactiveTintColor: "#0F172A",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesStackNavigator}
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted-square"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="WishlistTab"
        component={WishlistStackNavigator}
        options={{
          title: "Wishlist",
          tabBarBadge: wishlistCount > 0 ? wishlistCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartStackNavigator}
        options={{
          title: "Cart",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AccountTab"
        component={AccountStackNavigator}
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}