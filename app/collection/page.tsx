'use client';
import Image from "next/image";
import Link from "next/link"; // লিঙ্ক ব্যবহারের জন্য ইমপোর্ট করুন

const PRODUCTS = [
  { id: 1, name: "Product One", description: "Short description.", image: "/images/product1.png" },
  { id: 2, name: "Product Two", description: "Short description.", image: "/images/product2.png" },
  { id: 3, name: "Product Three", description: "Short description.", image: "/images/product3.png" },
  { id: 4, name: "Product Four", description: "Short description.", image: "/images/product4.png" },
  { id: 5, name: "Product Five", description: "This will show on full page.", image: "/images/product5.png" },
  { id: 6, name: "Product Six", description: "This will show on full page.", image: "/images/product6.png" },
];

export default function CollectionSection() {
  // হোমপেজে শুধু প্রথম ৪টি প্রোডাক্ট দেখানোর জন্য .slice(0, 4) ব্যবহার করা হয়েছে
  const homepageProducts = PRODUCTS.slice(0, 4);

  return (
    <section id="collection" className="px-6 py-20 bg-gray-50 scroll-mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {homepageProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <div>
              <div className="relative w-full h-[200px] overflow-hidden rounded-md">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button>
          </div>
        ))}
      </div>

      {/* 👑 প্রফেশনাল See More বাটন */}
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