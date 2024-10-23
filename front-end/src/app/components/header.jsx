"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Countdown from "../components/Countdown";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      setIsLoggedIn(true);

      fetch("http://localhost:3000/detailuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          return response.json();
        })
        .then((data) => {
          if (data?.fullname) {
            setUserName(data.fullname);
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
          <Countdown initialSeconds={3721} />
        </div>
        <Link
          href="/shop"
          className="shop-now d-block d-md-inline-block mt-2 mt-md-0"
        >
          SHOP NOW
        </Link>
      </div>

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
                <span className="input-group-text search-icon-left">
                  <Link href="#">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </span>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Tìm kiếm"
                />
                <span className="input-group-text search-icon-right">
                  <Link href="#">
                    <i className="fa-solid fa-camera"></i>
                  </Link>
                </span>
              </div>
            </form>
            <div className="d-flex grid gap-3 mt-3 ms-4 align-items-center">
              <div>
                {isLoggedIn ? (
                  <Link href="/info">
                    <span className="ms-3">{userName}</span>
                    <i className="bi bi-person-circle icon-h"></i>
                  </Link>
                ) : (
                  <Link href="/dangnhap">
                    <i className="bi bi-person-circle icon-h"></i>
                  </Link>
                )}
              </div>
              <div>
                <i className="bi bi-suit-heart icon-h"></i>
              </div>
              <div>
                <Link href="/cart">
                  <i className="bi bi-basket icon-h"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
