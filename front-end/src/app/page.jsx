"use client";
import { useState, useEffect } from "react"; // Thêm import useState\
import Link from "next/link";
import ProductsHome from "./components/ProductsHome";
import Loadmore from "./components/Loadmore";

export default function Home() {
  const [data, setData] = useState([]); // Khởi tạo state cho dữ liệu
  const [filter, setFilter] = useState("all"); // Thêm state để quản lý bộ lọc
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
  console.log(data);

  return (
    <>
      <div>
        {/* banner */}
        <div className="banner-1">
          <div className="video-container">
            <Link href={"/"}>
              <video
                autoPlay
                muted
                loop
                playsInline
                data-testid="video-banner"
                aria-label="30/40/50 hero"
                poster="https://cdn.shopify.com/s/files/1/0293/9277/files/ENGLISH_DESKTOP_STILL.png?v=1727818039"
              >
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/75589e7ba86043039b077baa855ec68a.mp4"
                  type="video/mp4"
                />
              </video>
            </Link>
          </div>
        </div>
        <div className="banner-1">
          <img src="img/banner1.3.webp" alt="" className="img-fluid w-100" />
        </div>
        {/* banner */}

        {/* list shoes */}
        <div className="grid-container my-2">
          <div className="row g-2">
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes4.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes2.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes3.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* list shoes */}

        {/* body */}
        <div className="container main-body custom-container">
          <h2 className="text_h2 text-uppercase">shop the latest</h2>
          <div className="d-flex flex-wrap gap-2 mb-3 button_new">
            <button onClick={() => handleFilterChange("all")}>
              <Link href={"#"} className="btn-outline-dark">
                All
              </Link>
            </button>
            <button onClick={() => handleFilterChange("hot")}>
              <Link href={"#"} className="btn-outline-dark">
                Hot
              </Link>
            </button>
            <button onClick={() => handleFilterChange("sale")}>
              <Link href={"#"} className="btn-outline-dark">
                Sale
              </Link>
            </button>
          </div>

          <div className="row">
            {/* <ProductsHome data={data} /> */}
            <ProductsHome
              data={data.filter((product) =>
                filter === "hot"
                  ? product.hot
                  : filter === "sale"
                  ? product.discountedPrice > 0
                  : true
              )}
            />{" "}
            {/* Cập nhật để lọc sản phẩm */}
          </div>
          <Loadmore />
        </div>
        {/* body */}
      </div>
    </>
  );
}
