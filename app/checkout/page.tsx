// app/checkout/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);

    // TODO: এখানে আসল অর্ডার ব্যাকএন্ডে সেভ করার লজিক বসবে
    console.log("Order placed:", { name, phone, address, items, totalPrice });

    setTimeout(() => {
      clearCart();
      showToast("Order placed successfully!");
      router.push("/");
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500">Add some products to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6 order-2 md:order-1">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-medium">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-4 order-1 md:order-2">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={placing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition disabled:opacity-50"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </section>
  );
}