// app/orders/page.tsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { API_URL, authFetch } from "@/lib/api";

type OrderItem = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const { token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await authFetch(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        setError("Could not load your orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token, authLoading, router]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
        <p className="text-gray-500 mb-6">You haven&apos;t placed any orders.</p>
        <Link href="/collection" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <p className="font-semibold text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm text-gray-600">
                  <span>{item.product_name} × {item.quantity}</span>
                  <span className="font-medium">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <p>Shipping to: {order.address}</p>
                <p>Phone: {order.phone}</p>
              </div>
              <p className="text-lg font-bold text-gray-800">${order.total_price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}