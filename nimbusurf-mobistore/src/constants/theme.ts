import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#00509d",
  black: "#0B0B0B",
  white: "#FFFFFF",
  gray: "#64748B",
  lightGray: "#F8FAFC",
  light2: "#CBD5E1",
  border: "#EDF2F7",
  success: "#00964D",
  danger: "#B91C1C",
  cat_title_color: "#0B0B0B",
};

export const SIZES = {
  base: 8,
  radius: 14,
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
};
