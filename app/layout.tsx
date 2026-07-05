
import Header from "./componrnts/common/header";
import Footer from "./componrnts/common/footer";
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
