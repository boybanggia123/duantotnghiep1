<<<<<<< HEAD
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
=======
import React from "react";
import Link from "next/link";
import Countdown from "../components/Countdown";
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3

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
      <div className="promotion-bar p-2 text-center text-md-start">
        <span>FREE 1-DAY SHIPPING</span>
        <span className="small-text d-none d-md-inline">
          ON ORDERS OVER $100! GET IT TOMORROW!
        </span>
        <div className="countdown d-inline d-md-block">
          <Countdown initialSeconds={3721} />{" "}
          {/* Bắt đầu từ 3721 giây (1 giờ, 2 phút, 1 giây) */}
        </div>
        <Link
          href="/shop"
          className="shop-now d-block d-md-inline-block mt-2 mt-md-0"
        >
          SHOP NOW
        </Link>
      </div>

<<<<<<< HEAD
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
=======
      <nav className="navbar navbar-expand-lg navbar-light mx-3 mx-md-5">
        <div className="container-fluid m-0 p-1">
          <Link className="navbar-brand" href={"/"}>
            <img src="/img/logo_fashion.png" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* <ul className="text-uppercase d-flex grid gap-3 mt-3 fw-bold  list-h"></ul> */}
            <ul className="navbar-nav text-uppercase fw-bold list-h me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" href="#">
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Plus+Curve
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Kids
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Beauty
                </Link>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <div className="input-group">
                {/* Biểu tượng tìm kiếm bên trái */}
                <span
                  className="input-group-text search-icon-left"
                  id="search-addon-left"
                >
                  <Link href={"#"}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </span>
                {/* Trường nhập liệu */}
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                {/* Biểu tượng bên phải */}
                <span
                  className="input-group-text search-icon-right"
                  id="search-addon-right"
                >
                  <Link href={"#"}>
                    <i className="fa-solid fa-camera"></i>{" "}
                  </Link>
                </span>
              </div>
            </form>
            <div className="d-flex grid gap-3 mt-3 ms-4 align-items-center">
              <div>
                <i className="bi bi-person-circle icon-h"></i>
              </div>
              <div>
                <i className="bi bi-suit-heart icon-h"></i>
              </div>
              <div>
                <Link href={"/cart"}>
                  <i className="bi bi-basket icon-h"></i>
                </Link>
              </div>
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
            </div>
          </div>
        </div>
      </nav>

<<<<<<< HEAD
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
=======
      <div className="d-flex justify-content-start mx-3 mx-md-5 pl-2 pl-md-4 flex-wrap">
        <div className="text-capitalize d-flex flex-wrap gap-2 gap-md-4 p-2">
          <Link href={"#"}>new in</Link>
          <Link href={"#"}>clothing</Link>
          <Link href={"#"}>halloween</Link>
          <Link href={"#"}>dresses</Link>
          <Link href={"#"}>matching sets</Link>
          <Link href={"#"}>tops</Link>
          <Link href={"#"}>jeans</Link>
          <Link href={"#"}>bottoms</Link>
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
        </div>
      </div>
    </>
  );
}
