import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { resolveImage } from "../../../constants/images";

import { COLORS, SIZES } from "../../../constants";

type ProductGalleryProps = {
  img: string;
};

export default function ProductGallery({ img }: ProductGalleryProps) {
  return (
    <View style={styles.galleryContainer}>
      <Image
        source={resolveImage(img)}
        resizeMode="contain"
        style={styles.galleryImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    height: 500,
    padding: 2,
    backgroundColor: "#fafafa",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
});
