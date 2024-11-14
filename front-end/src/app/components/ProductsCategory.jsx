"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/slices/favouriteSlice"; // Import action

function ProductsHome(props) {
  const [currentPage, setCurrentPage] = useState(1); // State quản lý trang hiện tại
  const itemsPerPage = 12; // Số lượng sản phẩm hiển thị mỗi trang

  // Tính toán sản phẩm hiện tại để hiển thị
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(props.data.length / itemsPerPage);

  // Hàm chuyển trang
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      {currentItems.map((product) => {
        const { _id, name, image, price, discountedPrice, hot } = product;
        return (
          // col-12 col-sm-6 col-md-4 col-lg-3
          <div className="product rounded position-relative border" key={_id}>
            <div className="sup-h">
              <div className="w-img gray-background">
                <Link href={`/chitiet/${_id}`}>
                  <img
                    src={`${image}`}
                    // src={`img/${image}`}
                    alt={name}
                    className="img-fluid img-gray"
                  />
                </Link>
                <button className="sup-wimg fw-medium">Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <Link href={""} className="namesup">
                    {name}
                  </Link>
                  <span className="icon-favourite">
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                </div>
                <span className="price">
                  {discountedPrice > 0 ? (
                    <>
                      <p className="priceSale">
                        ${price - (price * discountedPrice) / 100}
                      </p>
                      <del>${price}</del>
                    </>
                  ) : (
                    <p className="priceSale">${price}</p>
                  )}
                </span>
              </div>
            </div>
            {discountedPrice > 0 && (
              <p className="discount position-absolute">
                {discountedPrice}% OFF
              </p>
            )}
            {hot && <p className="hot position-absolute">HOT</p>}
          </div>
        );
      })}
      {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="btn btn-outline-dark"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`btn ${
              currentPage === index + 1 ? "btn-dark" : "btn-outline-dark"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className="btn btn-outline-dark"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </>
  );
}

export default ProductsHome;
