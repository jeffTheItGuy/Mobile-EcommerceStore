import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

type CategoryListItemProps = {
  category: {
    id: string | number;
    name: string;
  };
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function CategoryListItem({
  category,
  onPress,
  style,
}: CategoryListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.name}>{category.name}</Text>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  arrow: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7C3AED",
  },
});
