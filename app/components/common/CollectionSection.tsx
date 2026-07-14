// app/components/common/CollectionSection.tsx
'use client';
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function CollectionSection() {
  const featured = ALL_PRODUCTS.slice(0, 4);

  return (
    <section id="collection" className="px-6 py-20 bg-gray-50 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/collection"
          className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          See More Collection →
        </Link>
      </div>
    </section>
  );
}