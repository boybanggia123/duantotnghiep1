import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Inter } from "next/font/google";
import "../../public/bootstrap/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../public/css/header.css";
import "../../public/css/footer.css";
import "../../public/css/cart.css";
import "../../public/css/style.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Thêm thẻ link để chèn css cho page*/}
        <link href="css/style-info.css" rel="stylesheet" />
        <link href="css/style-dangnhap.css" rel="stylesheet" />
        <link href="css/style-dangky.css" rel="stylesheet" />
        {/* Thêm thẻ link để chèn css cho page*/}
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
