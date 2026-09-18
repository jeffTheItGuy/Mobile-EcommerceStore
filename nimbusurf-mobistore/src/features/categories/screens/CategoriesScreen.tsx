import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { COLORS } from "../../../constants";
import CategoryList from "../components/CategoryList";
import type { Category } from "../../../types/product";
import type { MenuAndProductListStackParamList } from "../../../types/navigation";

type NavigationProp = NativeStackNavigationProp<
  MenuAndProductListStackParamList,
  "Category"
>;

const CATEGORIES: Category[] = [
  { id: 1, name: "Women's Fashion", bgColor: "#BF012C" },
  { id: 2, name: "Men's Fashion", bgColor: "#BF012C" },
  { id: 3, name: "Kids' Fashion", bgColor: "#BF012C" },
  { id: 4, name: "Beauty", bgColor: "#BF012C" },
  { id: 5, name: "Jewellery", bgColor: "#BF012C" },
  { id: 6, name: "Home Furnishings", bgColor: "#BF012C" },
];

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [categories] = useState<Category[]>(CATEGORIES);

  const handlePressCategory = useCallback(
    (category: Category) => {
      navigation.navigate("ProductList", {
        categoryType: category.name,
      });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <CategoryList data={categories} onPressCategory={handlePressCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
