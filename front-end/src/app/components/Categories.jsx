"use client";
import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Categories = () => {
  const { data: categories } = useSWR(
    "http://localhost:3000/categories",
    fetcher
  );

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6; // Số danh mục hiển thị mỗi lần

  const handleNext = () => {
    if (categories && startIndex + itemsPerPage < categories.length) {
      setStartIndex(startIndex + 1); // Chuyển qua danh mục kế tiếp
    }
  };
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1); // Chuyển về danh mục trước
    }
  };

  return (
    <div className="container my-4 position-relative">
      <h4 className="text-center mb-4">Danh mục sản phẩm </h4>
      <div className="d-flex align-items-center justify-content-center">
        {/* Nút trái */}
        <button
          className="category-btn prev-btn button_category"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        {/* Danh mục */}
        <div className="d-flex overflow-hidden w-100">
          <div
            className="d-flex transition-transform"
            style={{
              transform: `translateX(-${(startIndex * 100) / itemsPerPage}%)`,
              width: `${categories?.length * (100 / itemsPerPage)}%`,
            }}
          >
            {categories &&
              categories.map((category) => (
                <div
                  key={category.id}
                  className="category-item text-center flex-shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <Link href={`/category/${category._id}`}>
                    <div className="category-circle">
                      <img
                        src={`/img/${category.image}`}
                        alt={category.name}
                        className="img-fluid"
                      />
                    </div>
                    <p>{category.name}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Nút phải */}
        <button
          className="button_category category-btn next-btn"
          onClick={handleNext}
          disabled={
            categories && startIndex + itemsPerPage >= categories.length
          }
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Categories;
