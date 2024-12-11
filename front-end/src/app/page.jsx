"use client";
import { useState, useEffect } from "react"; // Thêm import useState
import ProductsHome from "./components/ProductsHome";
import Categories from "./components/Categories";
import Banner from "./components/Banner";
import Link from "next/link";

export default async function Home() {


  
  // Fetch dữ liệu bất đồng bộ
  const res = await fetch("http://localhost:3000/products", {
    cache: "no-store",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/products", {
        cache: "no-store",
      });
      const result = await res.json();
      setData(result); // Cập nhật state với dữ liệu nhận được
    };

    fetchData(); // Gọi hàm fetchData
  }, []); // Chạy một lần khi component được mount

  const handleFilterChange = (filterType) => {
    setFilter(filterType); // Cập nhật bộ lọc khi nhấn nút
  };

  return (
    <>
      <div>
        {/* bannner */}
        <Banner />
        {/* end banner */}

        {/* danh muc */}
        <Categories />
        {/* end danh muc */}

        {/* body */}
        <div className="container-xl main-body custom-container">
          <div className="text_h2 text-uppercase mb-1">Mua sắm ngay!</div>
          <div className="d-flex flex-wrap gap-2 mb-3 button_new">
            <button
              onClick={() => handleFilterChange("all")}
              className={`btn btn-outline-dark ${
                filter === "all" ? "active" : ""
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => handleFilterChange("hot")}
              className={`btn btn-outline-dark ${
                filter === "hot" ? "active" : ""
              }`}
            >
              Hot
            </button>
            <button
              onClick={() => handleFilterChange("sale")}
              className={`btn btn-outline-dark ${
                filter === "sale" ? "active" : ""
              }`}
            >
              Sale
            </button>
          </div>

          <div className="row">
            <ProductsHome
              data={data.filter((product) =>
                filter === "hot"
                  ? product.hot
                  : filter === "sale"
                  ? product.discountedPrice > 0
                  : true
              )}
            />
          </div>
          <Link href={"/sanpham"} className="namesup">
            <div className="text-center my-3">
              <button className="btn load-more-btn">Xem thêm</button>
            </div>
          </Link>
        </div>
        {/* body */}
      </div>
    </>
  );
}
