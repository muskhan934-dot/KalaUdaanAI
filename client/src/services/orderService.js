import { readJSON, writeJSON } from "../utils/storage";
const KEY = "kalaudaan-orders";
export const statuses = ["New", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];
export function getOrders() { return readJSON(KEY, [{ id: "KA-2026-0018", productId: "p1", productName: "Terracotta Heritage Vase", price: 899, date: "08 Sep 2026", delivery: "14 Sep 2026", status: "Delivered", customer: "Ananya Rao" }]); }
export function updateOrderStatus(id, status) { const next = getOrders().map((o) => o.id === id ? { ...o, status } : o); writeJSON(KEY, next); return next; }
