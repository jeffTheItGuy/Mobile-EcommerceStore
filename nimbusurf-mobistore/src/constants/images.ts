// src/constants/images.ts
import type { ImageSourcePropType } from "react-native";

/**
 * Pre-downloaded image assets (bundled with the app).
 *
 * 1. Run `./scripts/download-assets.sh` from the project root to fill
 *    /assets/images.
 * 2. Restart Metro with a clean cache: `npx expo start -c`.
 *
 * Data files store the registry KEY as a string (e.g. "product_e1") so
 * values can safely be persisted (cart/wishlist). At render time call
 * resolveImage() to obtain a valid <Image source>.
 */
export const LOCAL_IMAGES: Record<string, ImageSourcePropType> = {
  // ── Categories ────────────────────────────────────────────────
  category_electronics: require("../../assets/images/category_electronics.jpg"),
  category_apparel: require("../../assets/images/category_apparel.jpg"),
  category_home_living: require("../../assets/images/category_home_living.jpg"),
  category_health_beauty: require("../../assets/images/category_health_beauty.jpg"),
  category_sports_outdoors: require("../../assets/images/category_sports_outdoors.jpg"),
  category_deals: require("../../assets/images/category_deals.jpg"),

  // ── Products ──────────────────────────────────────────────────
  product_e1: require("../../assets/images/product_e1.jpg"),
  product_e2: require("../../assets/images/product_e2.jpg"),
  product_e3: require("../../assets/images/product_e3.jpg"),
  product_e4: require("../../assets/images/product_e4.jpg"),
  product_a1: require("../../assets/images/product_a1.jpg"),
  product_a2: require("../../assets/images/product_a2.jpg"),
  product_a3: require("../../assets/images/product_a3.jpg"),
  product_a4: require("../../assets/images/product_a4.jpg"),
  product_a5: require("../../assets/images/product_a5.jpg"),
  product_a6: require("../../assets/images/product_a6.jpg"),
  product_h1: require("../../assets/images/product_h1.jpg"),
  product_h2: require("../../assets/images/product_h2.jpg"),
  product_h3: require("../../assets/images/product_h3.jpg"),
  product_h4: require("../../assets/images/product_h4.jpg"),
  product_b1: require("../../assets/images/product_b1.jpg"),
  product_b2: require("../../assets/images/product_b2.jpg"),
  product_b3: require("../../assets/images/product_b3.jpg"),
  product_b4: require("../../assets/images/product_b4.jpg"),
  product_s1: require("../../assets/images/product_s1.jpg"),
  product_s2: require("../../assets/images/product_s2.jpg"),
  product_s3: require("../../assets/images/product_s3.jpg"),
  product_s4: require("../../assets/images/product_s4.jpg"),
  product_d1: require("../../assets/images/product_d1.jpg"),
  product_d2: require("../../assets/images/product_d2.jpg"),
  product_d3: require("../../assets/images/product_d3.jpg"),
  product_d4: require("../../assets/images/product_d4.jpg"),

  // ── Trending ──────────────────────────────────────────────────
  trending_1: require("../../assets/images/trending_1.jpg"),
  trending_2: require("../../assets/images/trending_2.jpg"),
  trending_3: require("../../assets/images/trending_3.jpg"),
  trending_4: require("../../assets/images/trending_4.jpg"),
  trending_5: require("../../assets/images/trending_5.jpg"),

  // ── API fallback products ─────────────────────────────────────
  fallback_1: require("../../assets/images/fallback_1.jpg"),
  fallback_2: require("../../assets/images/fallback_2.jpg"),
  fallback_3: require("../../assets/images/fallback_3.jpg"),
  fallback_4: require("../../assets/images/fallback_4.jpg"),
};

export type ResolvedImageSource = ImageSourcePropType | { uri: string };

/**
 * Resolves an image reference into a valid <Image source>.
 * - require()'d asset (number)  → returned as-is
 * - known local key             → bundled asset
 * - anything else               → treated as a remote URI (legacy fallback)
 */
export function resolveImage(
  img?: string | number | null
): ResolvedImageSource {
  if (typeof img === "number") {
    return img;
  }
  if (!img) {
    return { uri: "" };
  }
  const local = LOCAL_IMAGES[img];
  if (local) {
    return local;
  }
  return { uri: img };
}