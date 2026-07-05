'use client';

import Image from "next/image";

export default function Collection() {
  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/product1.png" alt="Product 1" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">Product One</h3>
          <p className="text-sm text-gray-600">Short description of product one.</p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/product2.png" alt="Product 2" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">Product Two</h3>
          <p className="text-sm text-gray-600">Short description of product two.</p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/product3.png" alt="Product 3" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">Product Three</h3>
          <p className="text-sm text-gray-600">Short description of product three.</p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/product4.png" alt="Product 4" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">Product Four</h3>
          <p className="text-sm text-gray-600">Short description of product four.</p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
