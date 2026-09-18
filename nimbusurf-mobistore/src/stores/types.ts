export type ProductInput = {
  id: string | number;
  name: string;
  img: string;
  type?: string;
  price: string | number;
  brand?: string;
  offer?: string;
};

export type Product = {
  id: string;
  name: string;
  img: string;
  type?: string;
  price: number;
  brand?: string;
  offer?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  line1: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export type AddressInput = Omit<Address, "id" | "isDefault"> & {
  id?: string;
  isDefault?: boolean;
};

export type User = {
  id: string;
  phone: string;
  name?: string;
  email?: string;
};

export type WishlistItem = Product;
