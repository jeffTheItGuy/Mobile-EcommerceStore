// src/data/CategoriesData.ts
import type { Category } from "../types/category";

export const CategoriesData: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    img: "category_electronics",
    subcategories: [
      { id: "phones", name: "Phones & Accessories" },
      { id: "computers", name: "Computers" },
      { id: "audio", name: "Audio" },
      { id: "smart-home", name: "Smart Home" },
    ],
  },
  {
    id: "apparel",
    name: "Apparel & Fashion",
    img: "category_apparel",
    subcategories: [
      { id: "mens-clothing", name: "Men's Clothing" },
      { id: "womens-clothing", name: "Women's Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "accessories", name: "Accessories" },
    ],
  },
  {
    id: "home-living",
    name: "Home & Living",
    img: "category_home_living",
    subcategories: [
      { id: "furniture", name: "Furniture" },
      { id: "kitchenware", name: "Kitchenware" },
      { id: "decor", name: "Decor" },
      { id: "bedding-bath", name: "Bedding & Bath" },
    ],
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    img: "category_health_beauty",
    subcategories: [
      { id: "skincare", name: "Skincare" },
      { id: "makeup", name: "Makeup" },
      { id: "haircare", name: "Haircare" },
      { id: "wellness", name: "Wellness" },
    ],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    img: "category_sports_outdoors",
    subcategories: [
      { id: "fitness-equipment", name: "Fitness Equipment" },
      { id: "camping-hiking", name: "Camping & Hiking" },
      { id: "athletic-clothing", name: "Athletic Clothing" },
    ],
  },
  {
    id: "deals",
    name: "Deals & Clearance",
    img: "category_deals",
    subcategories: [
      { id: "price-drops", name: "Price Drops" },
      { id: "bundles", name: "Bundles" },
      { id: "seasonal-sale", name: "Seasonal Sale" },
    ],
  },
];