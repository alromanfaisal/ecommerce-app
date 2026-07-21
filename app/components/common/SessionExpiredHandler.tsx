// app/components/common/SessionExpiredHandler.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../../context/ToastContext";

export default function SessionExpiredHandler() {
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const handleSessionExpired = () => {
      showToast("Your session has expired. Please log in again.", "error");
      router.push("/login");
    };

    window.addEventListener("session-expired", handleSessionExpired);
    return () => window.removeEventListener("session-expired", handleSessionExpired);
  }, [router, showToast]);

  return null; // এটা কোনো UI রেন্ডার করে না, শুধু পেছনে event শুনতে থাকে
}