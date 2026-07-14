// app/context/CartContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { getProductById, Product } from "@/lib/products";
import { useAuth } from "./AuthContext";

const API_URL = "http://localhost:8080";

// Frontend এ দেখানোর জন্য — product info যোগ করে দেওয়া হয়েছে lookup করে
export type CartItem = {
  cartItemId: number | null; // backend এ সেভ থাকা row এর id (guest হলে null)
  productId: number;
  quantity: number;
  product: Product;
};

// Backend থেকে যেভাবে raw ডেটা আসে
type RawCartItem = {
  id: number;
  product_id: number;
  quantity: number;
};

// Guest cart এ localStorage এ যা সেভ থাকে
type GuestCartItem = {
  productId: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  increaseQty: (productId: number) => Promise<void>;
  decreaseQty: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = "my-store-guest-cart";

function loadGuestCart(): GuestCartItem[] {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGuestCart(items: GuestCartItem[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function toDisplayItems(raw: { productId: number; quantity: number; cartItemId: number | null }[]): CartItem[] {
  return raw
    .map((r) => {
      const product = getProductById(r.productId);
      if (!product) return null;
      return { cartItemId: r.cartItemId, productId: r.productId, quantity: r.quantity, product };
    })
    .filter((item): item is CartItem => item !== null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, isLoading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const previousToken = useRef<string | null>(null);

  const authHeaders = (): HeadersInit => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  // Backend থেকে fresh cart লোড করা
  const fetchServerCart = async () => {
    const res = await fetch(`${API_URL}/api/cart`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch cart");
    const raw: RawCartItem[] = await res.json();
    setItems(
      toDisplayItems(
        raw.map((r) => ({ productId: r.product_id, quantity: r.quantity, cartItemId: r.id }))
      )
    );
  };

  // Guest cart (localStorage) থেকে লোড করা
  const loadFromGuestStorage = () => {
    const guest = loadGuestCart();
    setItems(
      toDisplayItems(guest.map((g) => ({ productId: g.productId, quantity: g.quantity, cartItemId: null })))
    );
  };

  useEffect(() => {
    if (authLoading) return; // AuthContext এখনো localStorage থেকে session লোড করছে, অপেক্ষা করি

    const run = async () => {
      setIsLoading(true);

      const justLoggedIn = !previousToken.current && token;

      if (token && justLoggedIn) {
        // ইউজার এইমাত্র লগইন করলো — guest cart এর আইটেমগুলো backend এ merge করি
        const guestItems = loadGuestCart();
        for (const g of guestItems) {
          for (let i = 0; i < g.quantity; i++) {
            await fetch(`${API_URL}/api/cart`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({ product_id: g.productId }),
            });
          }
        }
        localStorage.removeItem(GUEST_CART_KEY); // merge শেষ, guest cart খালি করে দেওয়া
        await fetchServerCart();
      } else if (token) {
        await fetchServerCart();
      } else {
        loadFromGuestStorage();
      }

      previousToken.current = token;
      setIsLoading(false);
    };

    run().catch((err) => {
      console.error("Cart load failed:", err);
      setIsLoading(false);
    });
  }, [token, authLoading]);

  const addItem = async (product: Product) => {
    if (token) {
      await fetch(`${API_URL}/api/cart`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ product_id: product.id }),
      });
      await fetchServerCart();
    } else {
      const guest = loadGuestCart();
      const existing = guest.find((g) => g.productId === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        guest.push({ productId: product.id, quantity: 1 });
      }
      saveGuestCart(guest);
      loadFromGuestStorage();
    }
  };

  const removeItem = async (productId: number) => {
    if (token) {
      const item = items.find((i) => i.productId === productId);
      if (!item?.cartItemId) return;
      await fetch(`${API_URL}/api/cart/${item.cartItemId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      await fetchServerCart();
    } else {
      const guest = loadGuestCart().filter((g) => g.productId !== productId);
      saveGuestCart(guest);
      loadFromGuestStorage();
    }
  };

  const updateQty = async (productId: number, delta: number) => {
    if (token) {
      const item = items.find((i) => i.productId === productId);
      if (!item?.cartItemId) return;
      const newQty = item.quantity + delta;
      await fetch(`${API_URL}/api/cart/${item.cartItemId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ quantity: newQty }),
      });
      await fetchServerCart();
    } else {
      const guest = loadGuestCart();
      const existing = guest.find((g) => g.productId === productId);
      if (!existing) return;
      existing.quantity += delta;
      const filtered = guest.filter((g) => g.quantity > 0);
      saveGuestCart(filtered);
      loadFromGuestStorage();
    }
  };

  const increaseQty = (productId: number) => updateQty(productId, 1);
  const decreaseQty = (productId: number) => updateQty(productId, -1);

  const clearCart = async () => {
    if (token) {
      await fetch(`${API_URL}/api/cart`, { method: "DELETE", headers: authHeaders() });
      setItems([]);
    } else {
      localStorage.removeItem(GUEST_CART_KEY);
      setItems([]);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalPrice, isLoading, addItem, removeItem, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}