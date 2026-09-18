import {
  getJsonItem,
  setJsonItem,
} from "../storage/asyncStorage";

import type { CartItem, Order, OrderStatus } from "../types";

const ORDERS_STORAGE_KEY = "nimbusurf.orders";

export async function getOrders(): Promise<Order[]> {
  const orders = await getJsonItem<Order[]>(ORDERS_STORAGE_KEY);

  return orders ?? [];
}

export async function getOrderById(
  id: string
): Promise<Order | null> {
  const orders = await getOrders();

  return orders.find((order) => order.id === id) ?? null;
}

export async function createOrder(
  items: CartItem[],
  total: number,
  status: OrderStatus = "pending"
): Promise<Order> {
  const orders = await getOrders();

  const order: Order = {
    id: `order_${Date.now()}`,
    items,
    total,
    status,
    createdAt: new Date().toISOString(),
  };

  const updatedOrders = [order, ...orders];

  await setJsonItem(ORDERS_STORAGE_KEY, updatedOrders);

  return order;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order[]> {
  const orders = await getOrders();

  const updatedOrders = orders.map((order) =>
    order.id === id
      ? {
          ...order,
          status,
        }
      : order
  );

  await setJsonItem(ORDERS_STORAGE_KEY, updatedOrders);

  return updatedOrders;
}

export async function clearOrders(): Promise<void> {
  await setJsonItem(ORDERS_STORAGE_KEY, []);
}
