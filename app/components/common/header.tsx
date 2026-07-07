// app/components/common/header.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b shadow-sm">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <Image src="/images/logoo.png" alt="Logo" width={120} height={40} className="cursor-pointer" />
        </Link>

        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/collection" className="hover:text-blue-600">Collection</Link>
          <Link href="/new-arrivals" className="hover:text-blue-600">New Arrivals</Link>
          <Link href="/sale" className="hover:text-blue-600">Sale</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
        </nav>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link href="/login">
          <button className="px-4 py-1 text-sm font-medium border rounded-md hover:bg-blue-600 hover:text-white">
            Login
          </button>
        </Link>

        {/* Cart icon + badge */}
        <Link href="/cart" className="relative">
          <Image src="/images/cart.png" alt="Cart" width={40} height={40} className="cursor-pointer" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}