// app/layout.tsx
import type { Metadata } from "next";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Store Name",
  description: "Premium items, curated for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}