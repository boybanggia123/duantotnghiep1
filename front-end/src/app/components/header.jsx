"use client";
import { fetchCart } from "../../redux/slices/cartslice";
import { useSelector, useDispatch } from "react-redux";
// import Countdown from "../components/Countdown";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import SignInModal from "../dangnhap/page";
import SignUpModal from "../dangky/page";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Header() {
  const { items = [] } = useSelector((state) => state.cart || {});
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > lastScrollPos && currentScrollPos > 50) {
        setIsVisible(false); // Ẩn header khi cuộn xuống
      } else {
        setIsVisible(true); // Hiện header khi cuộn lên
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  useEffect(() => {
    setCartCount(items.length); // Cập nhật số lượng từ
  }, [items]);

  useEffect(() => {
    setFavouriteCount(favouriteItems.length); // Cập nhật số lượng yêu thích
  }, [favouriteItems]);

  const { data: categories } = useSWR(
    "http://localhost:3000/categories",
    fetcher
  );

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
            dispatch(fetchCart(data._id)); // Lấy giỏ hàng khi người dùng đăng nhập
            setCartCount(items.length); // Cập nhật số lượng từ
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [dispatch]);

  return (
    <>
    <div>
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
            <img src="https://res.cloudinary.com/dwrp82bhy/image/upload/v1732089666/logo_fashion_guzen3.png" alt="logo" />
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
            <Search />
            <div className="d-flex grid gap-3 mt-3 ms-4 align-items-center">
              <div className="position-relative user-icon-container">
                <Link href={"/appinfo/info"} className="text-decoration-none">
                  {isLoggedIn ? <span className="ms-3">{userName}</span> : null}
                  <i className="bi bi-person-circle icon-h"></i>
                </Link>
                {!isLoggedIn && (
                  <div className="user-dropdown">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#signInModal"
                      onClick={() => true} // Mở modal khi nhấn Đăng nhập
                      className="btn btn-primary btn-sm w-100 mb-1"
                    >
                      Đăng nhập
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#signUpModal"
                      onClick={() => true} // Mở modal khi nhấn Đăng nhập
                      className="btn btn-secondary btn-sm w-100"
                    >
                      Đăng ký
                    </button>
                    {/* <Link
                      href="/dangky"
                      className="btn btn-secondary btn-sm w-100"
                    >
                      Đăng ký
                    </Link> */}
                  </div>
                )}
                <SignInModal />
                <SignUpModal />
              </div>

              <div>
                <i className="bi bi-suit-heart icon-h"></i>
              </div>
              <div className="cart-icon-container">
                <Link href={"/cart"} className="d-flex align-items-center">
                  <i className="bi bi-basket icon-h"></i>
                  {cartCount > 0 && (
                    <span className="cart-quantity-badge">{cartCount}</span>
                  )}
                   </Link>
                </div>
                <div className="fav-icon-container">
                  <Link
                    href={"/yeuthich"}
                    className="heart_item d-flex align-items-center"
                  >
                    <i className="bi bi-suit-heart "></i>
                    {favouriteCount > 0 && (
                      <span className="fav-quantity">{favouriteCount}</span>
                    )}
                  </Link>
                </div>
                <div className="cart-icon-container">
                  <Link
                    href={"/cart"}
                    className="cart_item d-flex align-items-center"
                  >
                    <i className="bi bi-basket "></i>
                    {cartCount > 0 && (
                      <span className="cart-quantity-badge">{cartCount}</span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <SignInModal />
    </>
  );
}
