// app/collection/page.tsx
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import ProductCard from "../components/common/ProductCard";

export default async function CollectionPage() {
  const products = await getAllProducts();

  return (
    <section className="px-6 py-12 bg-white min-h-screen">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">← Back to Home</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">All Collections</h1>
      <p className="text-gray-500 mb-10">Explore our entire catalogue of premium items.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}