// lib/api.ts
export const API_URL = "http://localhost:8080";

export type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  discount_price?: number;
  is_new: boolean;
};

// সব প্রোডাক্ট আনার ফাংশন — Server ও Client দুই জায়গা থেকেই ব্যবহার করা যাবে
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store", // সবসময় fresh ডেটা আনবে, পুরোনো cache দেখাবে না
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

// একটা নির্দিষ্ট প্রোডাক্ট আনার ফাংশন
export async function getProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}