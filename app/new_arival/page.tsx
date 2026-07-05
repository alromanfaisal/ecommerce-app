'use client';

import Image from "next/image";

export default function NewArrivals() {
  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/new1.png" alt="New Product 1" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">New Product One</h3>
          <p className="text-sm text-gray-600">Freshly added to our store.</p>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add to Cart</button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/new2.png" alt="New Product 2" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">New Product Two</h3>
          <p className="text-sm text-gray-600">Latest arrival in stock.</p>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add to Cart</button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/new3.png" alt="New Product 3" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">New Product Three</h3>
          <p className="text-sm text-gray-600">Hot new release.</p>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add to Cart</button>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <Image src="/images/new4.png" alt="New Product 4" width={300} height={200} className="rounded-md" />
          <h3 className="mt-4 text-lg font-semibold">New Product Four</h3>
          <p className="text-sm text-gray-600">Just arrived today.</p>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
