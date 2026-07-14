// app/components/common/header.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // মেনুর বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    showToast("Logged out successfully");
    router.push("/");
  };

  const firstName = user?.name.split(" ")[0] ?? "";

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

        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border rounded-md hover:bg-gray-50 transition"
            >
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {firstName.charAt(0).toUpperCase()}
              </span>
              <span>{firstName.toUpperCase()}'S ACCOUNT</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Manage My Account
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Orders
                </Link>

                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="px-4 py-1 text-sm font-medium border rounded-md hover:bg-blue-600 hover:text-white">
              Login
            </button>
          </Link>
        )}

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