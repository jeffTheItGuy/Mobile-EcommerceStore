import type { Category } from "../types/category";

export const CategoriesData: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1461896836934-bd45ba24e304?w=400&h=300&fit=crop&q=80",
    subcategories: [
      { id: "fitness-equipment", name: "Fitness Equipment" },
      { id: "camping-hiking", name: "Camping & Hiking" },
      { id: "athletic-clothing", name: "Athletic Clothing" },
    ],
  },
  {
    id: "deals",
    name: "Deals & Clearance",
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop&q=80",
    subcategories: [
      { id: "price-drops", name: "Price Drops" },
      { id: "bundles", name: "Bundles" },
      { id: "seasonal-sale", name: "Seasonal Sale" },
    ],
  },
];