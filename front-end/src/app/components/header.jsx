import React from "react";
import Link from "next/link";
import Countdown from "../components/Countdown";

export default function Header() {
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

      <nav className="navbar navbar-expand-lg navbar-light mx-3 mx-md-3">
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
            </div>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-start mx-3 mx-md-3 pl-2 pl-md-4 flex-wrap">
        <div className="text-capitalize d-flex flex-wrap gap-2 gap-md-4 p-2">
          <Link href={"/sanpham"}>new in</Link>
          <Link href={"#"}>clothing</Link>
          <Link href={"#"}>halloween</Link>
          <Link href={"#"}>dresses</Link>
          <Link href={"#"}>matching sets</Link>
          <Link href={"#"}>tops</Link>
          <Link href={"#"}>jeans</Link>
          <Link href={"#"}>bottoms</Link>
        </div>
      </div>
      <hr className=" m-0 p-0" />
    </>
  );
}
