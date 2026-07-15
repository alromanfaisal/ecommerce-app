// app/cart/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function CartPage() {
  const { items, totalPrice, increaseQty, decreaseQty, removeItem, isLoading } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const handleRemove = async (productId: number, name: string) => {
    await removeItem(productId);
    showToast(`${name} removed from cart`, "error");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading your cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">You haven't added anything to your cart yet.</p>
        <Link href="/collection" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const price = item.product.discount_price ?? item.product.price;
          return (
            <div key={item.productId} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-sm text-gray-500">${price} × {item.quantity}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQty(item.productId)} className="w-8 h-8 border rounded-md hover:bg-gray-100 font-bold">−</button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button onClick={() => increaseQty(item.productId)} className="w-8 h-8 border rounded-md hover:bg-gray-100 font-bold">+</button>
              </div>

              <p className="w-20 text-right font-semibold">${price * item.quantity}</p>

              <button
                onClick={() => handleRemove(item.productId, item.product.name)}
                className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <span className="text-xl font-bold">Total: ${totalPrice}</span>
        <button
          onClick={() => router.push("/checkout")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}