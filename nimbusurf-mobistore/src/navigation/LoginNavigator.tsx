import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/screens/LoginScreen";
import type { LoginStackParamList } from "./types";

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
    </Stack.Navigator>
  );
}
