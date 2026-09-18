import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressFormScreen from "../features/address/screens/AddressFormScreen";
import type { AddressStackParamList } from "./types";

const Stack = createNativeStackNavigator<AddressStackParamList>();

export default function AddressNavigator() {
  return (
    <Stack.Navigator initialRouteName="Address">
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
