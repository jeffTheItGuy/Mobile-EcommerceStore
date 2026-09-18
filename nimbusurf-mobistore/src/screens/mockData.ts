export type ScreenProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  offer: string;
  img: string;
  type: string;
};

export type ScreenCategory = {
  id: number;
  name: string;
};

export const HOME_PRODUCTS: ScreenProduct[] = [
  {
    id: 1,
    name: "Rangriti Blue Printed A-Line Dress",
    brand: "Rangriti",
    price: 1079,
    offer: "40% Off",
    img: "https://img.tatacliq.com/images/i6/437Wx649H/MP000000007288363_437Wx649H_20200716044236.jpeg",
    type: "women",
  },
  {
    id: 2,
    name: "GAP Purple Full Length Shirt Dress",
    brand: "GAP",
    price: 2098,
    offer: "45% Off",
    img: "https://img.tatacliq.com/images/i7/437Wx649H/MP000000009096587_437Wx649H_202103170225581.jpeg",
    type: "women",
  },
  {
    id: 3,
    name: "PlusS Mustard Floral Print Dress",
    brand: "PlusS",
    price: 809,
    offer: "70% Off",
    img: "https://img.tatacliq.com/images/i6/437Wx649H/MP000000005559578_437Wx649H_20200122195119.jpeg",
    type: "women",
  },
  {
    id: 4,
    name: "PlusS Yellow Printed Below Knee Dress",
    brand: "PlusS",
    price: 689,
    offer: "70% Off",
    img: "https://img.tatacliq.com/images/i3/437Wx649H/MP000000004774937_437Wx649H_20190512205828.jpeg",
    type: "women",
  },
];

export const CATEGORY_LIST: ScreenCategory[] = [
  {
    id: 1,
    name: "Women's Fashion",
  },
  {
    id: 2,
    name: "Men's Fashion",
  },
  {
    id: 3,
    name: "Kids' Fashion",
  },
  {
    id: 4,
    name: "Beauty",
  },
  {
    id: 5,
    name: "Jewellery",
  },
  {
    id: 6,
    name: "Home Furnishings",
  },
];

export const PRODUCT_LIST: ScreenProduct[] = [
  {
    id: 101,
    name: "Rangriti Blue Printed A-Line Dress",
    brand: "Rangriti",
    price: 1079,
    offer: "40% Off",
    img: "https://img.tatacliq.com/images/i6/437Wx649H/MP000000007288363_437Wx649H_20200716044236.jpeg",
    type: "women",
  },
  {
    id: 102,
    name: "GAP Purple Full Length Shirt Dress",
    brand: "GAP",
    price: 2098,
    offer: "45% Off",
    img: "https://img.tatacliq.com/images/i7/437Wx649H/MP000000009096587_437Wx649H_202103170225581.jpeg",
    type: "women",
  },
  {
    id: 103,
    name: "PlusS Mustard Floral Print Dress",
    brand: "PlusS",
    price: 809,
    offer: "70% Off",
    img: "https://img.tatacliq.com/images/i6/437Wx649H/MP000000005559578_437Wx649H_20200122195119.jpeg",
    type: "women",
  },
  {
    id: 104,
    name: "PlusS Yellow Printed Below Knee Dress",
    brand: "PlusS",
    price: 689,
    offer: "70% Off",
    img: "https://img.tatacliq.com/images/i3/437Wx649H/MP000000004774937_437Wx649H_20190512205828.jpeg",
    type: "women",
  },
  {
    id: 105,
    name: "Men's Casual Shirt",
    brand: "Nimbusurf",
    price: 1299,
    offer: "25% Off",
    img: "https://img.tatacliq.com/images/i7/437Wx649H/MP000000009096587_437Wx649H_202103170225581.jpeg",
    type: "men",
  },
  {
    id: 106,
    name: "Kids Party Dress",
    brand: "Kids Club",
    price: 799,
    offer: "30% Off",
    img: "https://img.tatacliq.com/images/i3/437Wx649H/MP000000004774937_437Wx649H_20190512205828.jpeg",
    type: "kids",
  },
];
