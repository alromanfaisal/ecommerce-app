
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Collection from "./collection/page";
import NewArrivals from "./new_arival/page";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Collection />
        <NewArrivals />
        {children}
        <Footer />
      </body>
    </html>
  );
}
