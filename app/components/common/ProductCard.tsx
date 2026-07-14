// app/components/common/ProductCard.tsx
'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const hasDiscount = typeof product.discountPrice === "number";

  const handleAddToCart = async () => {
    await addItem(product);
    showToast("Added to cart successfully!");
  };

  const handleBuyNow = async () => {
    await addItem(product);
    showToast("Redirecting to checkout...", "info");
    router.push("/checkout");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>

        <div className="mt-2 flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-red-600">${product.discountPrice}</span>
              <span className="text-sm text-gray-400 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-800">${product.price}</span>
          )}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 font-medium transition"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}