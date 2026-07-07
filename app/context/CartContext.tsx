// app/context/CartContext.tsx
'use client';

import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import { Product } from "@/lib/products";

export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number; // discountPrice থাকলে সেটা, নাহলে regular price
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "INCREASE_QTY"; id: number }
  | { type: "DECREASE_QTY"; id: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      const price = action.product.discountPrice ?? action.product.price;
      return {
        items: [
          ...state.items,
          { id: action.product.id, name: action.product.name, image: action.product.image, price, quantity: 1 },
        ],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.id) };

    case "INCREASE_QTY":
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case "DECREASE_QTY":
      return {
        items: state.items
          .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "LOAD_CART":
      return { items: action.items };

    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "my-store-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // প্রথমবার লোড হওয়ার সময় localStorage থেকে কার্ট পড়ে আনা
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: "LOAD_CART", items: JSON.parse(saved) });
      }
    } catch (err) {
      console.error("Failed to load cart from storage:", err);
    }
  }, []);

  // প্রতিবার state বদলালে localStorage এ সেভ করা
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    totalItems,
    totalPrice,
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    increaseQty: (id) => dispatch({ type: "INCREASE_QTY", id }),
    decreaseQty: (id) => dispatch({ type: "DECREASE_QTY", id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}