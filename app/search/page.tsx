// app/search/page.tsx
import Link from "next/link";
import Fuse from "fuse.js";
import { getAllProducts } from "@/lib/api";
import ProductCard from "../components/common/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const allProducts = await getAllProducts();

  let results: typeof allProducts = [];

  if (query) {
    const fuse = new Fuse(allProducts, {
      keys: ["name", "description"],
      threshold: 0.4, // 0 = হুবহু মিল লাগবে, 1 = প্রায় সবকিছু মিলবে — 0.4 একটা ভালো ব্যালেন্স
      ignoreLocation: true, // শব্দের যেকোনো জায়গায় মিল খুঁজবে, শুরুতেই থাকতে হবে না
    });
    results = fuse.search(query).map((result) => result.item);
  }

  return (
    <section className="px-6 py-12 bg-white min-h-screen">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">← Back to Home</Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-500 mb-10">
        {query ? (
          <>Showing results for <span className="font-semibold text-gray-700">&quot;{q}&quot;</span></>
        ) : (
          "Enter a search term above to find cars."
        )}
      </p>

      {query && results.length === 0 && (
        <p className="text-gray-400">No cars matched your search. Try a different keyword.</p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}