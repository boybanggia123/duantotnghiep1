"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import "../../public/css/products.css";
import "../../public/css/style.css";
import "../../public/css/formmodal.css";
import Script from "next/script";
import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const inter = Inter({ subsets: ["latin"] });
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
=======
import { useRouter } from "next/navigation";
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df

export default function RootLayout({ children }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();
<<<<<<< HEAD

  useEffect(() => {
    // Lắng nghe sự kiện từ server
    socket.on('notification', (message) => {
      console.log('Thông báo mới:', message);
      setNotificationCount(prevCount => prevCount + 1); // Tăng số thông báo
    });

    // Dọn dẹp kết nối khi component bị hủy
    return () => {
      socket.off('notification');
    };
  }, []);


  useEffect(() => {
   
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);



  const handleLogout = () =>{
    document.cookie = "token=; path=/; max-age=-1";

    router.push('http://localhost:3001');
  }
=======
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=-1";

    router.push("http://localhost:3001/");
  };
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <Script src="js/script.js"></Script>
      </head>
      <body className={inter.className}>
        <section id="sidebar" className="row">
          <Link href={"#"} className="brand">
            <i className="bx bxs-smile icon"></i> FASHIONVERSE
          </Link>
          <ul className="side-menu">
            <li>
              <Link href={"/"}>
                <i className="fa-solid fa-gauge icon"></i> Bảng dữ liệu
              </Link>
            </li>
            <li className="divider" data-text="main">
              Chính
            </li>
            <li>
              <Link href={"/QuanlyUsers"}>
                <i className="fa-solid fa-users-line icon"></i> Quản lý khách hàng
              </Link>
            </li>
            <li>
              <Link href={"/QuanlyProducts"}>
                <i className="fa-solid fa-shirt icon"></i> Quản lý Sản Phẩm
              </Link>
            </li>
            <li>
              <Link href={"/QuanlyCategories"}>
                <i className="fa-solid fa-layer-group icon"></i> Quản lý
                Danh mục
              </Link>
            </li>
            <li>
              <Link href={"/QuanlyComments"}>
                <i className="fa-solid fa-comment icon"></i> Quản lý Bình luận
              </Link>
            </li>
            <li>
              <Link href={"#"}>
<<<<<<< HEAD
                <i className="fa-solid fa-comment icon"></i> Quản lý Comments
              </Link>
            </li>
            <li>
              <Link href={"/Quanlydonhang"}>
                <i className="fa-solid fa-briefcase icon"></i> Quản lý Order
=======
                <i className="fa-solid fa-briefcase icon"></i> Quản lý đơn hàng
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <i className="fa-solid fa-chart-area icon"></i>Biểu đồ
              </Link>
            </li>
            <li className="divider" data-text="table and forms">
              Bảng và biểu mẫu
            </li>
            <li>
              <Link href={"#"}>
                <i className="bx bx-table icon"></i> Bảng
              </Link>
            </li>
          </ul>
        </section>
        <section id="content">
          <nav>
            <i className="bx bx-menu toggle-sidebar"></i>
            <form action="#">
              <div className="form-group">
                <input type="text" placeholder="Tìm kiếm..." />
                <i className="bx bx-search icon"></i>
              </div>
            </form>
            <Link href={"#"} className="nav-link">
              <i className="bx bxs-bell icon"></i>
              <span className="badge">{notificationCount}</span>
            </Link>
            <Link href={"#"} className="nav-link">
              <i className="bx bxs-message-square-dots icon"></i>
              <span className="badge">8</span>
            </Link>
            <span className="divider"></span>
            <div className="profile">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <ul className="profile-link">
                <li>
                  <Link href={"#"}>
                    <i className="bx bxs-user-circle icon"></i> Hồ sơ
                  </Link>
                </li>
                <li>
                  <Link href={"#"}>
                    <i className="bx bxs-cog"></i> Cài đặt
                  </Link>
                </li>
                <li>
                  <Link
                    href={"#"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <i className="bx bxs-log-out-circle"></i> Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main className="row">{children}</main>
        </section>
      </body>
    </html>
  );
}
