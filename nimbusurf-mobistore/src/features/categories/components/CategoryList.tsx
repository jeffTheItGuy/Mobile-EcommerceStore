import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS, FONTS, SIZES, icons } from "../../../constants";
import type { Category } from "../../../types/product";

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
        <View style={styles.itemLabelWrapper}>
          <Text style={styles.itemLabel}>{item.name}</Text>
        </View>

        <View style={styles.itemArrowWrapper}>
          <Image source={icons.right_arrow} style={styles.itemArrow} />
        </View>
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
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          onPress={() => onPressCategory(item)}
        />
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
    borderRadius: 8,
    ...FONTS.box_shadow,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    minHeight: 60,
  },
  itemLabelWrapper: {
    flex: 1,
    alignItems: "flex-start",
  },
  itemLabel: {
    color: COLORS.cat_title_color,
    ...FONTS.cat_title_text,
  },
  itemArrowWrapper: {
    alignItems: "flex-end",
  },
  itemArrow: {
    height: 20,
    width: 20,
    tintColor: COLORS.light2,
  },
});
