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
  { id: 1, name: "Toyota Prius", description: "Model 2026", image: "/images/Toyota-prius-2026.png", price: 5000000, isNew: true },
  { id: 2, name: "Toyota Yaris", description: "Model 2026", image: "/images/Toyota-yaris-2026.png", price: 3000000, isNew: true },
  { id: 3, name: "Toyota prius", description: "Model 2022", image: "/images/Toyota-prius-2022.png", price: 2500000, discountPrice: 2000000 },
  { id: 4, name: "Toyota Rav4", description: "Model 2026", image: "/images/Toyota-rav4-2026.png", price: 6000000, isNew: true },
  { id: 5, name: "Toyota Yaris", description: "Model 2020", image: "/images/Toyota-yaris-2020.png", price: 1800000, discountPrice: 1400000 },
  { id: 6, name: "Toyota Fortunar", description: "Model 2026", image: "/images/Toyota-fortunar-2026.png", price: 2500000, isNew: true },
  { id: 7, name: "Product Seven", description: "Full page exclusive item.", image: "/images/product7.png", price: 3000000 },
  { id: 8, name: "Toyota Rav4", description: "Model 2020", image: "/images/Toyota-rav4-2020.png", price: 2200000, discountPrice: 1800000 },
  { id: 9, name: "Product Nine", description: "Full page exclusive item.", image: "/images/product9.png", price: 2700000, isNew: true },
  { id: 10, name: "Product Ten", description: "Full page exclusive item.", image: "/images/product10.png", price: 3200000, isNew: true },
  { id: 11, name: "Toyota Fielder", description: "Model 2020", image: "/images/Toyota-fielder-2020.png", price: 3500000, discountPrice: 3000000 },
  { id: 12, name: "Product Twelve", description: "Full page exclusive item.", image: "/images/product12.png", price: 4000000 },
  { id: 13, name: "Product Thirteen", description: "Full page exclusive item.", image: "/images/product13.png", price: 4500000, isNew: true },
  { id: 14, name: "Product Fourteen", description: "Full page exclusive item.", image: "/images/product14.png", price: 5000000, discountPrice: 4500000 },
  { id: 15, name: "Product Fifteen", description: "Full page exclusive item.", image: "/images/product15.png", price: 5500000, isNew: true },
  { id: 16, name: "Product Sixteen", description: "Full page exclusive item.", image: "/images/product16.png", price: 6000000, isNew: true }
  
];