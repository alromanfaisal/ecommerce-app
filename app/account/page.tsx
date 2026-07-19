// app/account/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const API_URL = "http://localhost:8080";

export default function AccountPage() {
  const { token, user, isLoading: authLoading, updateUser } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      router.push("/login");
      return;
    }
    // প্রথমে যা AuthContext এ আছে সেটা দিয়ে ফর্ম পূরণ করে দেওয়া (দ্রুত দেখানোর জন্য)
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [token, authLoading, user, router]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Name cannot be empty", "error");
      return;
    }
    setSavingProfile(true);

    try {
      const res = await fetch(`${API_URL}/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        showToast(errorText || "Failed to update profile", "error");
        setSavingProfile(false);
        return;
      }

      updateUser({ name }); // Header এ সাথে সাথে নতুন নাম দেখানোর জন্য
      showToast("Profile updated successfully!");
    } catch (err) {
      showToast("Could not connect to server", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }
    setSavingPassword(true);

    try {
      const res = await fetch(`${API_URL}/api/me/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        showToast(errorText || "Failed to update password", "error");
        setSavingPassword(false);
        return;
      }

      showToast("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      showToast("Could not connect to server", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Manage My Account</h1>

      {/* Profile Info */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="font-semibold text-lg mb-4 text-gray-800">Profile Information</h2>
        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>
          <button
            type="submit"
            disabled={savingProfile}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition disabled:opacity-50"
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Password Change */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-lg mb-4 text-gray-800">Change Password</h2>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            disabled={savingPassword}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition disabled:opacity-50"
          >
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
}