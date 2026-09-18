export type Product = {
  id: number | string;
  name: string;
  brand_name?: string;
  brand?: string;
  price: number | string;
  offer?: string;
  img: string;
  type: string;
  description?: string;
};

export type ProductDetailParams = {
  id: number | string;
  name: string;
  img: string;
  type?: string;
  price: number | string;
};

export type TrendingShoe = {
  id: number;
  name: string;
  img: any; // `require()` returns a number locally, or string for remote URLs
  bgColor: string;
  type: string;
  price: string;
  sizes: number[];
};

export type HomeProduct = {
  id: number | string;
  name: string;
  img: string;
  type?: string;
  price?: number | string;
  brand?: string;
  offer?: string;
};
