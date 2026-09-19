import React from "react";
import {
  Image,
  View,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

type AppImageProps = {
  source: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  borderRadius?: number;
  resizeMode?: "cover" | "contain" | "center";
};

export default function AppImage({
  source,
  containerStyle,
  imageStyle,
  borderRadius = 20,
  resizeMode = "cover",
}: AppImageProps) {
  return (
    <View
      style={[
        {
          borderRadius,
          overflow: "hidden",
          backgroundColor: "#EFEDE8",
        },
        containerStyle,
      ]}
    >
      <Image
        source={source}
        resizeMode={resizeMode}
        style={[
          {
            width: "100%",
            height: "100%",
          },
          imageStyle,
        ]}
      />
    </View>
  );
}