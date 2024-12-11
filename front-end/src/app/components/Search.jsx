"use client";

import React, { useState, useEffect } from "react";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!keyword) {
      return;
    }
    setLoading(true);
    setError(null);
    setProducts([]);
    try {
      const response = await fetch(
        `http://localhost:3000/search?key=${encodeURIComponent(keyword)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không tìm thấy sản phẩm");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
      setError("Đã có lỗi xảy ra trong quá trình tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyword) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      window.location.href = `/sanpham`;
    }
  };

  return (
    <div className="flex-column position-relative">
      <form
        className="d-flex gap-3"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="input-group">
          <span
            className="input-group-text search-icon-left"
            id="search-addon-left"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tên sản phẩm..."
            className="form-control search-input"
          />
          <span
            className="input-group-text search-icon-right"
            id="search-addon-right"
          >
            <i className="fa-solid fa-camera"></i>
          </span>
        </div>
      </form>

      {loading && <p className="mb-0">Đang tìm kiếm...</p>}
      {error && (
        <p className="mb-0 text-danger">
          {error}
        </p>
      )}

      {products.length > 0 && keyword && (
        <div className="card mt-2 rounded flex-column justify-content-between align-items-center gap-2 position-absolute z-1 p-2">
          {products.map((product) => (
            <a
              key={product._id}
              href={`/chitiet/${product._id}`}
              className="d-flex justify-content-start align-items-center product-item gap-3"
            >
              <div className="product-image">
                <img
                  className="img-fluid"
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: "100px" }}
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <p className="mb-0">{product.name}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && !error && keyword && products.length === 0 && (
        <p className="mb-0">Không có sản phẩm nào</p>
      )}
    </div>
  );
};

export default Search;