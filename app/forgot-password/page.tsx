// app/forgot-password/page.tsx
'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { useToast } from "../context/ToastContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        showToast("Something went wrong. Please try again.", "error");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      showToast("Could not connect to server.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Forgot Password?</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        {submitted ? (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              If an account exists with that email, a reset link has been sent.
              Please check your inbox (and spam folder).
            </p>
            <Link href="/login" className="text-indigo-600 font-semibold">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="text-center text-sm text-gray-600">
              <Link href="/login" className="text-indigo-600 font-semibold">Back to Login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}