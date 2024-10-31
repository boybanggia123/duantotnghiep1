"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slices/cartslice";
import Link from "next/link";

export default function Cart() {
  const [isMounted, setIsMounted] = useState(false); // Cờ để xác định khi nào client-side đã mount
  const cartItems = useSelector((state) => state.cart.items) || [];

  useEffect(() => {
    // Khi client-side đã mount
    setIsMounted(true);
  }, []);

  const dispatch = useDispatch();

  // Tính toán tổng số tiền
  const total = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <>
      <div className="container mt-2">
        <span className="cart-giohang mt-4">MY BAG </span>
        {/* Chỉ render sau khi client-side đã mount */}
        {isMounted && <span> ({cartItems.length} Item)</span>}
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card-1 mb-4">
              {isMounted &&
                cartItems.map((item) => (
                  <div className="row" key={item._id}>
                    <div className="col-4 col-sm-3 col-md-2 product-image-container">
                      <img
                        src={`/img/${item.image}`}
                        className="img-fluid product-image"
                        alt="Product Image"
                      />
                      {/* Icon thùng rác */}
                      <div
                        className="remove-icon"
                        onClick={() =>
                          dispatch(
                            removeFromCart({ _id: item._id, size: item.size })
                          )
                        }
                      >
                        <i class="fa-regular fa-trash-can"></i>
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
                          {/* Nút trừ (-) */}
                          <button
                            className="btn btn-outline-secondary-1"
                            onClick={() => {
                              const newQuantity = Math.max(
                                1,
                                item.quantity - 1
                              ); // Không cho nhỏ hơn 1
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

                          {/* Input số lượng */}
                          <input
                            type="number"
                            className="form-control-2"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = Math.max(
                                1,
                                parseInt(e.target.value)
                              ); // Không cho số lượng nhỏ hơn 1
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  quantity: newQuantity,
                                })
                              );
                            }}
                          />

                          {/* Nút cộng (+) */}
                          <button
                            className="btn btn-outline-secondary-1"
                            onClick={() => {
                              const newQuantity = item.quantity + 1; // Tăng số lượng
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

                        {/* Link Move to Wishlist */}
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
              <div className="row mt-4">
                <div className="col-6 col-sm-4 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith1.webp"
                      className="img-fluid mb-2"
                      alt="Rec 1"
                    />
                    <p>$12.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith2.webp"
                      className="img-fluid mb-2"
                      alt="Rec 2"
                    />
                    <p>$15.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith1.webp"
                      className="img-fluid mb-2"
                      alt="Rec 3"
                    />
                    <p>$10.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith2.webp"
                      className="img-fluid mb-2"
                      alt="Rec 4"
                    />
                    <p>$20.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <img
                      src="img/itwith1.webp"
                      className="img-fluid mb-2"
                      alt="Rec 1"
                    />
                    <p>$12.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith2.webp"
                      className="img-fluid mb-2"
                      alt="Rec 2"
                    />
                    <p>$15.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith1.webp"
                      className="img-fluid mb-2"
                      alt="Rec 3"
                    />
                    <p>$10.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/itwith2.webp"
                      className="img-fluid mb-2"
                      alt="Rec 4"
                    />
                    <p>$20.00</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-outline-secondary w-100 mb-4">
                Load More
              </button>
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
                    <span>{total}</span>
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
                  <span className="tongtien">{total}</span>
                </span>
                <button className="btn btn-dark w-100 mt-3">
                  <Link href={"/checkout"}>Tiến hành thanh toán</Link>
                </button>
                <div className="text-center">
                  <p className="text-muted small mt-2">
                    Tùy chọn thanh toán nhanh có sẵn khi thanh toán
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link href="" className="logothanhtoan">
                      <i className="fa-brands fa-cc-paypal me-3"></i>
                      <i className="fa-brands fa-cc-apple-pay me-3"></i>
                      <i className="fa-brands fa-cc-amazon-pay me-3"></i>
                      <i className="fa-solid fa-credit-card"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
