import { delay } from "./client";
import type { Category } from "../types";

const categories: Category[] = [
  {
    id: "women",
    name: "Women's Fashion",
  },
  {
    id: "men",
    name: "Men's Fashion",
  },
  {
    id: "kids",
    name: "Kids' Fashion",
  },
  {
    id: "beauty",
    name: "Beauty",
  },
  {
    id: "jewellery",
    name: "Jewellery",
  },
  {
    id: "home-furnishings",
    name: "Home Furnishings",
  },
];

export async function getCategories(): Promise<Category[]> {
  await delay(150);

  return categories;
}

export async function getCategoryById(
  id: string
): Promise<Category | null> {
  return categories.find((category) => category.id === id) ?? null;
}
