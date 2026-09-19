import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#4F46E5",
  black: "#121212",
  white: "#FFFFFF",
  gray: "#6B7280",
  lightGray: "#F6F4F1",
  light2: "#D6D3CD",
  border: "#E8E6E1",
  success: "#16A34A",
  danger: "#E11D48",
  cat_title_color: "#121212",
};

export const SIZES = {
  base: 8,
  radius: 20,
  padding: 24,
  width,
  height,
};

export const FONTS = {
  body1: { fontSize: 16, lineHeight: 22 },
  body2: { fontSize: 14, lineHeight: 20 },
  body3: { fontSize: 12, lineHeight: 16 },
  body4: { fontSize: 10, lineHeight: 14 },
  checkout_btn_text: { fontSize: 16, lineHeight: 22 },
  big_button_text: { fontSize: 15, fontWeight: "700", letterSpacing: 1 },
  cat_title_text: { fontSize: 16, fontWeight: "600" },
  prod_list_title_text: { fontSize: 14, fontWeight: "500" },
  prod_list_brand_title_text: { fontSize: 13, fontWeight: "700" },
  prod_list_price_text: { fontSize: 14, fontWeight: "800" },
  prod_list_offer_title_text: { fontSize: 12, fontWeight: "700" },
  product_title_text: { fontSize: 18, fontWeight: "700" },
  product_sub_title_text: { fontSize: 14, fontWeight: "500" },
  box_shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;