// app/about/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Learn more about our dealership, mission, and commitment to quality vehicles.",
};

export default function AboutPage() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-20 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Trusted by drivers worldwide — we make finding your next car simple, transparent, and reliable.
        </p>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              We started with a simple goal: make buying a car online as easy and trustworthy
              as buying anything else. Every vehicle listed on our platform is carefully
              inspected and verified, so you can shop with confidence from anywhere in the world.
            </p>
          </div>
          <div className="relative w-full h-[260px] rounded-xl overflow-hidden bg-gray-100">
            <Image
              src="/images/about-hero.png"
              alt="Our dealership"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              1
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Verified Quality</h3>
            <p className="text-sm text-gray-500">
              Every car goes through a multi-point inspection before it's listed.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              2
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Transparent Pricing</h3>
            <p className="text-sm text-gray-500">
              No hidden fees. What you see is what you pay.
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              3
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Worldwide Support</h3>
            <p className="text-sm text-gray-500">
              Our team is here to help you, wherever you're buying from.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-xl py-12 px-6">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Ready to find your car?</h2>
          <p className="text-gray-500 mb-6">Browse our full collection of quality vehicles.</p>
          <Link
            href="/collection"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition"
          >
            View Collection →
          </Link>
        </div>
      </div>
    </section>
  );
}