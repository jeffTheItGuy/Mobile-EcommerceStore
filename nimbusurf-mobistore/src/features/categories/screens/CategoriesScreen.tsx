import React, { useCallback } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../../../constants";
import CategoryList from "../components/CategoryList";
import { useCategories } from "../hooks/useCategories";
import type { Category } from "../../../types/category";
import type { MenuAndProductListStackParamList } from "../../../navigation/types";

type NavigationProp = NativeStackNavigationProp<
  MenuAndProductListStackParamList,
  "Category"
>;

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { categories, isLoading, error } = useCategories();

  const handlePressCategory = useCallback(
    (category: Category) => {
      navigation.navigate("ProductList", {
        categoryType: category.name,
      });
    },
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryList
        data={categories}
        onPressCategory={handlePressCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    padding: 24,
  },
  errorText: {
    color: COLORS.black,
    fontSize: 14,
    textAlign: "center",
  },
});
