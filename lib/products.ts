// lib/products.ts
export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number; // থাকলে Sale আইটেম হিসেবে ধরা হবে
  isNew?: boolean;        // true হলে New Arrivals এ দেখাবে
};

export const ALL_PRODUCTS: Product[] = [
  { id: 1, name: "Product One", description: "Short description.", image: "/images/product1.png", price: 1200 },
  { id: 2, name: "Product Two", description: "Short description.", image: "/images/product2.png", price: 1500, isNew: true },
  { id: 3, name: "Product Three", description: "Short description.", image: "/images/product3.png", price: 900, discountPrice: 700 },
  { id: 4, name: "Product Four", description: "Short description.", image: "/images/product4.png", price: 2000, isNew: true },
  { id: 5, name: "Product Five", description: "Full page exclusive item.", image: "/images/product5.png", price: 1800, discountPrice: 1400 },
  { id: 6, name: "Product Six", description: "Full page exclusive item.", image: "/images/product6.png", price: 2500, isNew: true },
  { id: 7, name: "Product Seven", description: "Full page exclusive item.", image: "/images/product7.png", price: 3000 },
  { id: 8, name: "Product Eight", description: "Full page exclusive item.", image: "/images/product8.png", price: 2200, discountPrice: 1800 },
  { id: 9, name: "Product Nine", description: "Full page exclusive item.", image: "/images/product9.png", price: 2700, isNew: true },
  { id: 10, name: "Product Ten", description: "Full page exclusive item.", image: "/images/product10.png", price: 3200, isNew: true },
  { id: 11, name: "Product Eleven", description: "Full page exclusive item.", image: "/images/product11.png", price: 3500, discountPrice: 3000 },
  { id: 12, name: "Product Twelve", description: "Full page exclusive item.", image: "/images/product12.png", price: 4000 },
  { id: 13, name: "Product Thirteen", description: "Full page exclusive item.", image: "/images/product13.png", price: 4500, isNew: true },
  { id: 14, name: "Product Fourteen", description: "Full page exclusive item.", image: "/images/product14.png", price: 5000, discountPrice: 4500 },
  { id: 15, name: "Product Fifteen", description: "Full page exclusive item.", image: "/images/product15.png", price: 5500, isNew: true },
  { id: 16, name: "Product Sixteen", description: "Full page exclusive item.", image: "/images/product16.png", price: 6000, isNew: true }
];