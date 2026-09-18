export type CartItem = {
  id: string;
  name: string;
  img: string;
  type?: string;
  price: number;
  quantity: number;
};

export type CartSummary = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  count: number;
};
