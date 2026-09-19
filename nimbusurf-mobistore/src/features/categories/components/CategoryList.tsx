import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { resolveImage } from "../../../constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../../../constants";
import type { Category } from "../../../types/category";

type CategoryListProps = {
  data: Category[];
  onPressCategory: (category: Category) => void;
};

function CategoryItem({
  item,
  onPress,
}: {
  item: Category;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Image
          source={resolveImage(item.img)}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.itemLabelWrapper}>
          <Text style={styles.itemLabel}>{item.name}</Text>
          <Text style={styles.subcategoryPreview}>
            {item.subcategories.map((s) => s.name).join(" · ")}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={COLORS.light2}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function CategoryList({
  data,
  onPressCategory,
}: CategoryListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CategoryItem item={item} onPress={() => onPressCategory(item)} />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: SIZES.base,
  },
  itemContainer: {
    marginHorizontal: SIZES.base,
    marginVertical: 4,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    ...FONTS.box_shadow,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    minHeight: 72,
    gap: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  itemLabelWrapper: {
    flex: 1,
    gap: 3,
  },
  itemLabel: {
    color: COLORS.cat_title_color,
    ...FONTS.cat_title_text,
  },
  subcategoryPreview: {
    fontSize: 12,
    color: "#64748B",
  },
});
