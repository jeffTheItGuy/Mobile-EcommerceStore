import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import AddressNavigator from "./AddressNavigator";
import LoginNavigator from "./LoginNavigator";
import ProductListNavigator from "./ProductListNavigator";
import MenuNavigator from "./MenuNavigator";

import type { AppDrawerParamList } from "./types";

const Drawer = createDrawerNavigator<AppDrawerParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          drawerActiveTintColor: "#7C3AED",
          drawerInactiveTintColor: "#0F172A",
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
          },
        }}
      >
        <Drawer.Screen
          name="HomePage"
          component={HomeNavigator}
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />

        <Drawer.Screen
          name="Categories"
          component={MenuNavigator}
          options={{
            drawerLabel: "Categories",
            title: "Categories",
          }}
        />

        <Drawer.Screen
          name="ProductList"
          component={ProductListNavigator}
          options={{
            drawerLabel: "Products",
            title: "Products",
          }}
        />

        <Drawer.Screen
          name="Address"
          component={AddressNavigator}
          options={{
            drawerLabel: "Address",
            title: "Address",
          }}
        />

        <Drawer.Screen
          name="Login"
          component={LoginNavigator}
          options={{
            drawerLabel: "Login",
            title: "Login",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
