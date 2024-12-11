"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  removeFromCart,
  updateCartItemQuantity,
  fetchCart,
} from "../../redux/slices/cartslice";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
import PayButton from "../components/PayButton";

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.cart || {});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const response = await axios.get("http://localhost:3000/detailuser", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const fetchedUserId = response.data._id;
          if (fetchedUserId) {
            setUserId(fetchedUserId);
            dispatch(fetchCart(fetchedUserId));
          }
        }
      } catch (err) {
        console.error("Lỗi khi tìm nạp dữ liệu người dùng:", err);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleRemoveItem = async (item) => {
    try {
      await dispatch(
        removeFromCart({
          userId,
          productId: item.productId,
          size: item.size,
        })
      );
      dispatch(fetchCart(userId));
    } catch (err) {
      console.error("Lỗi khi xóa mục:", err);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(
        updateCartItemQuantity({
          userId,
          productId: item.productId,
          quantity: newQuantity,
          size: item.size,
        })
      );
      dispatch(fetchCart(userId));
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
    }
  };



  return (
    <div className="container mt-2">
      <span className="cart-giohang mt-4">Giỏ hàng của tôi </span>
      <span> ({items.length} item)</span>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="card-1 mb-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  className="row mb-3"
                  key={`${item._id}-${item.productId}-${item.size}`}
                >
                  <div className="col-4 col-sm-3 col-md-2 product-image-container">
                    <img
                      src={`${item.image}`}
                      className="img-fluid product-image"
                      alt="Product Image"
                    />
                    <div
                      className="remove-icon"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </div>
                  </div>

                  <div className="col-8 col-sm-9 col-md-10">
                    <Link href={""}>{item.name}</Link>
                    <span className="cart_price">
                      <p className="cart_discountedPrice">
                        ${item.discountedPrice}
                      </p>
                      <del className="cart_goc">${item.price}</del>
                    </span>
                    <div className="d-flex align-items-center mb-2">
                      <select className="form-select">
                        <option>{item.size}</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary-1"
                          onClick={() => {
                            handleQuantityChange(item, item.quantity - 1);
                          }}
                        >
                          -
                        </button>

                        <input
                          type="number"
                          className="form-control-2"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            handleQuantityChange(
                              item,
                              parseInt(e.target.value)
                            );
                          }}
                        />

                        <button
                          className="btn btn-outline-secondary-1"
                          onClick={() => {
                            handleQuantityChange(item, item.quantity + 1);
                          }}
                        >
                          +
                        </button>
                      </div>

                      <Link href="#" className="text-danger">
                        Chọn vào danh sách yêu thích <i className="fa-solid fa-heart"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Giỏ hàng của bạn đang trống.</p>
            )}
          </div>
          <div className="recommended-section mt-4">
            <h5>SẢN PHẨM LIÊN QUAN</h5>
            <div className="row mt-4">
              {[
                "aokhoac1",
                "aokhoac2",
                "aokhoac1",
                "aokhoac2",
                "aokhoac1",
                "aokhoac2",
                "aokhoac1",
                "aokhoac2",
              ].map((item, index) => (
                <div className="col-6 col-sm-4 col-md-3 mb-4" key={index}>
                  <div className="text-center">
                    <img
                      src={`img/${item}.jpg`}
                      className="img-fluid mb-2"
                      alt={`Rec ${index + 1}`}
                    />
                    <p>${(index + 1) * 5}.00</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline-secondary w-100 mb-4">
              Xem thêm
            </button>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card p-3 mb-3">
            <div className="mb-3 text-center">
              <p className="text-danger mb-2">
                Nhập mã giảm giá <strong>FREECASH</strong>
              </p>
              <div className="codegiamgia input-group-2">
                <PayButton items={items} />
              </div>
            </div>
            <hr />
            <ul className="list-unstyled mb-2">
              <li className="d-flex justify-content-between">
                <span>Tổng phụ</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Vận chuyển ước tính</span>
                <span>Được tính khi thanh toán</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Thuế ước tính</span>
                <span>Được tính khi thanh toán</span>
              </li>
            </ul>
            <hr />
            <span className="d-flex justify-content-between">
              <span className="Total">Tổng giá</span>
              <span className="tongtien">
                {total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </span>

            <div className="mt-3">
              <Link href="/" className="text-center">
                Quay về trang chủ
              </Link>
            </div>
          </div>
          <PayButton items={items} />
        </div>
      </div>
    </div>
  );
}
