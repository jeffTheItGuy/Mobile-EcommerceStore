import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { CATEGORY_LIST, ScreenCategory } from "./mockData";

export default function CategoriesScreen({ navigation }: any) {
  const openCategory = (category: ScreenCategory) => {
    navigation.navigate("ProductList", {
      categoryType: category.name,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORY_LIST}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.categoryCard}
            onPress={() => openCategory(item)}
          >
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.arrow}>→</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  arrow: {
    fontSize: 18,
    color: "#7C3AED",
    fontWeight: "800",
  },
});
