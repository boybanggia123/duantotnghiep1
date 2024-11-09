"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import ProductsCategory from "../../components/ProductsCategory";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductByCategoryPage() {
  const { id } = useParams();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: products, error } = useSWR(
    `http://localhost:3000/products/${id}`,
    fetcher
  );

  if (error) return <div>Error loading products...</div>;
  if (!products) return <div>Loading...</div>;

  // Hàm xử lý lọc và sắp xếp
  const handleSortAndFilter = () => {
    let filtered = [...products];
    if (minPrice) filtered = filtered.filter((p) => p.price >= parseInt(minPrice));
    if (maxPrice) filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));

    return filtered.sort((a, b) =>
      sortOption === "asc" ? a.price - b.price : b.price - a.price
    );
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      {/* Banner */}
      <div className="banner-1">
        <div className="video-container">
          <Link href={"/"}>
            <video
              autoPlay
              muted
              loop
              playsInline
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

      {/* Bộ lọc và sản phẩm */}
      <div className="container-fluid">
        <div className="row">
          {/* Nút mở menu trên mobile */}
          <button
            className="btn btn-primary d-md-none mb-3"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "Close Filter" : "Open Filter"}
          </button>

          {/* Bộ lọc */}
          <div
            className={`col-md-2 ${
              isMenuOpen ? "d-block" : "d-none"
            } d-md-block`}
          >
            <h6>Filters</h6>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Lưới sản phẩm */}
          <div className="col-md-10">
            <h6>Products</h6>
            <div className="row">
              <ProductsCategory data={handleSortAndFilter()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
