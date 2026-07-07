// app/new-arrivals/page.tsx
'use client';
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "../components/common/ProductCard";

export default function NewArrivalsPage() {
  const newProducts = ALL_PRODUCTS.filter((p) => p.isNew);

  return (
    <section className="px-6 py-12 bg-white min-h-screen">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">← Back to Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
      <p className="text-gray-500 mb-10">Fresh additions to our collection, just for you.</p>

      {newProducts.length === 0 ? (
        <p className="text-gray-400">No new arrivals right now — check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}