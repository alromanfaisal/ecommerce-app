// app/components/common/footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
              Your Store
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Shop</h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4"><a href="/collection" className="hover:underline">Collection</a></li>
                <li><a href="/new-arrivals" className="hover:underline">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-600 font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()} Your Store. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}