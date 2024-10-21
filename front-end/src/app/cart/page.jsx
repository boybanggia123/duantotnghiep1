"use client";
import Link from "next/link";
import React from "react";

export default function Cart() {
  return (
    <>
      <div className="container mt-2">
        <span className="cart-giohang mt-4">MY BAG </span>
        <span>(1 Item)</span>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card-1 mb-4">
              <div className="row">
                <div className="col-4 col-sm-3 col-md-2">
                  <img
                    src="img/itwith1.webp"
                    className="img-fluid"
                    alt="Product Image"
                  />
                </div>
                <div className="col-8 col-sm-9 col-md-10">
                  <Link href="#">Quiet Luxury Vest Top - Black</Link>
                  <p className="mb-0">$24.99</p>
                  <p className="text-danger mb-2">
                    Tiết kiệm $150 khi bạn chi $300! Mã sử ​​dụng: FREECASH
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    <select className="form-select">
                      <option>Size: S</option>
                      <option>Size: M</option>
                      <option>Size: L</option>
                    </select>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-secondary-1">-</button>
                      <input
                        type="number"
                        className="form-control-2"
                        value="1"
                        readOnly
                      />
                      <button className="btn btn-outline-secondary-1">+</button>
                    </div>
                    <Link href="#" className="text-danger">
                      Move to Wishlist <i className="fa-solid fa-heart"></i>
                    </Link>
                  </div>
                </div>
              </div>
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
          <div className="col-lg-4 col-md-12">
            <div className="card p-3">
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
                  <button className="btn btn-success">Apply</button>
                </div>
              </div>
              <hr />
              <ul className="list-unstyled mb-2">
                <li className="d-flex justify-content-between">
                  <span>Tổng phụ</span>
                  <span>$24.99</span>
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
                <span className="tongtien">$24.99</span>
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
        </div>
      </div>
    </>
  );
}
