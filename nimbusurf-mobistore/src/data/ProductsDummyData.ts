import type { Product } from "../types/product";

export const ProductsDummyData: Product[] = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 1499,
    brand_name: "Nimbusurf",
    offer: "30% OFF",
    img: "https://picsum.photos/seed/dress1/400/500",
    type: "women",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 2499,
    brand_name: "Nimbusurf",
    offer: "25% OFF",
    img: "https://picsum.photos/seed/jacket1/400/500",
    type: "men",
  },
  {
    id: 3,
    name: "Kids Cotton Tee",
    price: 599,
    brand_name: "Nimbusurf",
    offer: "10% OFF",
    img: "https://picsum.photos/seed/kids1/400/500",
    type: "kids",
  },
];
