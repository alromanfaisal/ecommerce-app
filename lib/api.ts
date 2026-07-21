// lib/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  discount_price?: number;
  is_new: boolean;
};

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function getProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// লগইন-প্রয়োজনীয় (protected) endpoint কল করার জন্য — 401 এলে স্বয়ংক্রিয়ভাবে
// পুরো অ্যাপকে জানিয়ে দেয় যে session expire হয়ে গেছে (logout + redirect হ্যান্ডেল হবে AuthContext থেকে)
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, options);

  if (res.status === 401 && typeof window !== "undefined") {
    window.dispatchEvent(new Event("session-expired"));
  }

  return res;
}