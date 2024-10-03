import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Inter } from "next/font/google";
import "../../public/bootstrap/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
