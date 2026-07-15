// app/layout.tsx
import type { Metadata } from "next";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import "./globals.css";
<html lang="en" suppressHydrationWarning></html>

export const metadata: Metadata = {
  title: "Your Store Name",
  description: "Premium items, curated for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}