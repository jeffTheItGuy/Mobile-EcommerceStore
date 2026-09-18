export type Product = {
  id: string;
  name: string;
  img: string;
  type?: string;
  price: number;
  brand?: string;
  offer?: string;
};

export type Category = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  phone: string;
  name?: string;
};

export type CartItem = {
  id: string;
  name: string;
  img: string;
  type?: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
};
