// app/page.tsx
import CollectionSection from "./components/common/CollectionSection";


export default function Home() {
  return (
    <div>
      {/* Hero Welcome Banner */}
      <div className="bg-slate-900 text-white py-24 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Our Store</h1>
        <p className="text-lg opacity-80">Hi! This is a running project...</p>
      </div>

      {/* এটা হোমপেজে শুধু প্রথম ৪টি প্রোডাক্ট আর See More বাটন দেখাবে */}
      <CollectionSection />
    </div>
  );
}