"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slices/cartslice";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js"; // Nhập loadStripe

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
import PayButton from "../components/PayButton";
export default function Cart() {
  const [isMounted, setIsMounted] = useState(false);
  const cartItems = useSelector((state) => state.cart.items) || [];
  const router = useRouter();
  const dispatch = useDispatch();
  const [customerEmail, setCustomerEmail] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    // Lấy email từ localStorage
    const email = localStorage.getItem("customerEmail");
    setCustomerEmail(email); // Cập nhật state với email lấy được
  }, []);

  const total = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  const imageUrl = "http://localhost:3000/images/";

  return (
    <>
      <div className="container mt-2">
        <span className="cart-giohang mt-4">MY BAG </span>
        {isMounted && <span> ({cartItems.length} Item)</span>}
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card-1 mb-4">
              {isMounted &&
                cartItems.map((item) => (
                  <div className="row" key={item._id}>
                    <div className="col-4 col-sm-3 col-md-2 product-image-container">
                      <img
                        src={`${imageUrl}/${item.image}`}
                        className="img-fluid product-image"
                        alt="Product Image"
                      />
                      <div
                        className="remove-icon"
                        onClick={() =>
                          dispatch(
                            removeFromCart({ _id: item._id, size: item.size })
                          )
                        }
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </div>
                    </div>

                    <div className="col-8 col-sm-9 col-md-10">
                      <Link href="#">{item.name}</Link>
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
                              const newQuantity = Math.max(
                                1,
                                item.quantity - 1
                              );
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  quantity: newQuantity,
                                })
                              );
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
                              const newQuantity = Math.max(
                                1,
                                parseInt(e.target.value)
                              );
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  quantity: newQuantity,
                                })
                              );
                            }}
                          />

                          <button
                            className="btn btn-outline-secondary-1"
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  quantity: newQuantity,
                                })
                              );
                            }}
                          >
                            +
                          </button>
                        </div>

                        <Link href="#" className="text-danger">
                          Move to Wishlist <i className="fa-solid fa-heart"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="recommended-section mt-4">
              <h5>SẢN PHẨM LIÊN QUAN</h5>
              {/* Thêm sản phẩm liên quan ở đây */}
            </div>
          </div>
          {isMounted && (
            <div className="col-lg-4 col-md-12">
              <div className="card p-3 mb-3 ">
                <div className="mb-3 text-center">
                  <p className="text-danger mb-2">
                    Nhập mã giảm giá <strong>FREECASH</strong>
                  </p>
                  <div className="codegiamgia input-group-2">
                    <input
                      type="text"
                      className="form-control"
                      id="discountCode"
                      placeholder="Enter discount code"
                    />
                    <button className="btn btn-success" type="submit">
                      Apply
                    </button>
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
                  <span className="Total">Total</span>
                  <span className="tongtien">
                    {total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </span>
                <PayButton cartItems={cartItems} />
                <div className="mt-3">
                  <Link href="/" className="text-center">
                    Quay về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
