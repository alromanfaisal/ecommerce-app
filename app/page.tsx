// app/page.tsx
import { getAllProducts } from "@/lib/api";
import CollectionSection from "./components/common/CollectionSection";

export default async function Home() {
  const products = await getAllProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      <div className="bg-slate-900 text-white py-24 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Our Store</h1>
        <p className="text-lg opacity-80">Hi! This is a running project...</p>
      </div>

      <CollectionSection products={featured} />
    </div>
  );
}