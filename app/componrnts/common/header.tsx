'use client';

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b shadow-sm">
      {/* বামে Logo + Navigation */}
      <div className="flex items-center space-x-8">
        {/* Logo as Home Button */}
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

      {/* ডানে Search + Login + Cart */}
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
        {/* Cart as Add to Cart Button */}
        <Link href="/cart">
          <Image src="/images/cart.png" alt="Cart" width={40} height={400} className="cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}
