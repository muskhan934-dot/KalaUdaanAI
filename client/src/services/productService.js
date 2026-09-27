import { productData } from "../data/catalog";
import { readJSON, writeJSON } from "../utils/storage";

export const PRODUCT_KEY = "kalaudaan-products";
export const WISHLIST_KEY = "kalaudaan-wishlist";
export const CART_KEY = "kalaudaan-cart";

// Normalize legacy/localStorage product data so older prototype records cannot
// crash React when a field was stored as a string instead of an array.
export function normalizeProduct(product = {}) {
  const toArray = (value) => {
    if (Array.isArray(value)) return value.filter(Boolean).map(String);
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return [];
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
      } catch {}
      return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
    }
    if (value && typeof value === "object") return Object.values(value).filter(Boolean).map(String);
    return [];
  };

  return {
    ...product,
    tags: toArray(product.tags),
    colors: toArray(product.colors),
    occasion: toArray(product.occasion),
    price: Number(product.price) || 0,
    stock: Number(product.stock) || 0,
  };
}

export function getCustomProducts() {
  const stored = readJSON(PRODUCT_KEY, []);
  return Array.isArray(stored) ? stored.map(normalizeProduct) : [];
}

export function getAllProducts() {
  return [...getCustomProducts(), ...productData.map(normalizeProduct)];
}

export function saveProduct(product) {
  const normalized = normalizeProduct(product);
  const current = getCustomProducts();
  const existingIndex = current.findIndex((p) => p.id === normalized.id);
  const next = existingIndex >= 0
    ? current.map((p, i) => i === existingIndex ? normalized : p)
    : [normalized, ...current];
  writeJSON(PRODUCT_KEY, next);
  return normalized;
}

export function removeProduct(id) {
  writeJSON(PRODUCT_KEY, getCustomProducts().filter((p) => p.id !== id));
}

export function getWishlist() {
  const value = readJSON(WISHLIST_KEY, []);
  if (!Array.isArray(value)) return [];
  const next = [...new Set(value.filter(Boolean).map(String))];
  if (JSON.stringify(next) !== JSON.stringify(value)) writeJSON(WISHLIST_KEY, next);
  return next;
}

export function toggleWishlist(id) {
  const current = getWishlist();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  writeJSON(WISHLIST_KEY, next);
  try {
    window.dispatchEvent(new CustomEvent("kalaudaan:cart-wishlist", { detail: { type: "wishlist", value: next } }));
  } catch {}
  return next;
}

export function getCart() {
  const value = readJSON(CART_KEY, []);
  if (!Array.isArray(value)) return [];
  const merged = new Map();
  value.map((product) => normalizeProduct(product)).forEach((product) => {
    if (!product.id) return;
    const previous = merged.get(product.id);
    merged.set(product.id, previous ? { ...product, qty: (previous.qty || 1) + (product.qty || 1) } : { ...product, qty: Math.max(1, Number(product.qty) || 1) });
  });
  const next = [...merged.values()];
  if (JSON.stringify(next) !== JSON.stringify(value)) writeJSON(CART_KEY, next);
  return next;
}

export function addToCart(product) {
  const normalized = normalizeProduct(product);
  const current = getCart();
  const idx = current.findIndex((p) => p.id === normalized.id);
  const next = idx >= 0
    ? current.map((p, i) => i === idx ? { ...p, qty: (p.qty || 1) + 1 } : p)
    : [...current, { ...normalized, qty: 1 }];
  writeJSON(CART_KEY, next);
  try {
    window.dispatchEvent(new CustomEvent("kalaudaan:cart-wishlist", { detail: { type: "cart", value: next } }));
  } catch {}
  return next;
}

export function removeFromCart(id) {
  const next = getCart().filter((p) => p.id !== id);
  writeJSON(CART_KEY, next);
  try {
    window.dispatchEvent(new CustomEvent("kalaudaan:cart-wishlist", { detail: { type: "cart", value: next } }));
  } catch {}
  return next;
}
