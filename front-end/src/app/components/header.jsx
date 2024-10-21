"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Kiểm tra cookie có chứa token không
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));
    if (token) {
      setIsLoggedIn(true);

      // Tìm cookie chứa thông tin người dùng
      fetch("http://localhost:3000/detailuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.split("=")[1]}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.fullname) {
            setUserName(data.fullname); // Cập nhật tên người dùng
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="promotion-bar">
        <span>FREE 1-DAY SHIPPING</span>
        <span className="small-text">
          ON ORDERS OVER $100! GET IT TOMORROW!
        </span>
        <div className="countdown">
          <span>10</span>h :<span>12</span>m :<span>01</span>s
        </div>
        <a href="/shop" className="shop-now">
          SHOP NOW
        </a>
      </div>

      <nav className="d-flex justify-content-between mx-5">
        <div className="d-flex">
          <img src="img/Fashion-Nova-Logo.png" alt="" className="logo" />
          <ul className="text-uppercase d-flex grid gap-3 mt-4 fw-bold list-h">
            <li className="li-h">Women</li>
            <li className="li-h">Plus+curve</li>
            <li className="li-h">Men</li>
            <li className="li-h">Kids</li>
            <li className="li-h">Beauty</li>
          </ul>
        </div>

        <div className="d-flex">
          <div>
            <form className="d-flex mt-4" role="search">
              <input
                placeholder=""
                className="input-h"
                name="text"
                autoComplete="off"
                type="text"
              />
            </form>
          </div>
          <div className="d-flex grid gap-3 mt-4 ms-4">
            <div>
              {isLoggedIn ? (
                // Nếu người dùng đã đăng nhập, hiển thị tên và liên kết đến trang thông tin
                <Link href="/info">
                  <span className="ms-3">{userName}</span>
                  <i className="bi bi-person-circle icon-h"></i>
                </Link>
              ) : (
                // Nếu chưa đăng nhập, hiển thị biểu tượng đăng nhập
                <Link href="/dangnhap">
                  <i className="bi bi-person-circle icon-h"></i>
                </Link>
              )}
            </div>
            <div>
              <i className="bi bi-suit-heart icon-h"></i>
            </div>
            <div>
              <i className="bi bi-basket icon-h"></i>
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-start mx-5 mb-4">
        <div className="text-uppercase a-h fw-bolder">
          <a href="">New In</a>
          <a href="" className="color-s">
            Sale
          </a>
          <a href="">Dresses</a>
          <a href="">Clothing</a>
          <a href="">Tops</a>
          <a href="">Nova Luxe</a>
        </div>
      </div>
    </>
  );
}
