"use client";
import { useState, useEffect } from "react";
import ProductsCategory from "../../components/ProductsCategory";
export default function ProductPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]); // Trạng thái lưu dữ liệu sản phẩm
  const [categories, setCategories] = useState([]); // Trạng thái lưu danh mục
  const [selectedCategories, setSelectedCategories] = useState([]); // Trạng thái danh mục đã chọn (mảng)
  const [selectedSizes, setSelectedSizes] = useState([]); // Trạng thái kích thước đã chọn (mảng)
  const [minPrice, setMinPrice] = useState(""); // Trạng thái giá tối thiểu
  const [maxPrice, setMaxPrice] = useState(""); // Trạng thái giá tối đa
  const [sortOption, setSortOption] = useState("asc"); // Trạng thái sắp xếp

  // Hàm mở/đóng menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch danh mục và sản phẩm từ API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3000/products", {
        cache: "no-store",
      });
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories", {
        cache: "no-store",
      });
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  // Hàm xử lý lọc sản phẩm theo danh mục, giá và sắp xếp
  const handleSortAndFilter = (products) => {
    let filteredProducts = products;

    // Lọc theo danh mục
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    // Lọc theo kích thước
    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedSizes.some((size) => product.size.includes(size))
      );
    }


    // Lọc theo giá
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    // Sắp xếp sản phẩm theo giá
    return filteredProducts.sort((a, b) => {
      return sortOption === "asc" ? a.price - b.price : b.price - a.price;
    });
  };

  // Sự kiện chọn danh mục
  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      ); // Bỏ chọn nếu đã chọn trước đó
    } else {
      setSelectedCategories([...selectedCategories, categoryId]); // Thêm vào danh mục đã chọn
    }
  };

  // Sự kiện chọn kích thước
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size)); // Bỏ chọn nếu đã chọn trước đó
    } else {
      setSelectedSizes([...selectedSizes, size]); // Thêm vào kích thước đã chọn
    }
  };

  // Sự kiện thay đổi giá
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Sự kiện thay đổi sắp xếp
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container-fluid m-0">
      <div className="row">
        {/* Nút mở menu trên mobile */}
        <button
          className="btn btn-primary m-0 d-md-none mb-3"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "Close Filter" : "Open Filter"}
        </button>

        {/* Bộ lọc bên trái */}
        <div
          className={`col-md-2 custom-filter-section m-0 rounded-0 ${
            isMenuOpen ? "d-block" : "d-none"
          } d-md-block`}
        >
          <div className="Categories_phai">REFINE BY</div>

          {/* Danh mục */}
          <div className="custom-filter">
            <h6>Category</h6>
            <ul className="list-unstyled">
              {categories.map((category) => (
                <li key={category._id}>
                  <input
                    className="input_checkbox"
                    type="checkbox"
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  <label htmlFor={category._id} className="label_trai ms-0">
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <hr />

          {/* Kích thước */}
          <div className="custom-filter">
            <h6>Size</h6>
            <ul className="list-unstyled">
              {["S", "M", "L", "XL","40","41","42"].map((size) => (
                <li key={size}>
                  <input
                    className="input_checkbox"
                    type="checkbox"
                    id={`size${size}`}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  <label htmlFor={`size${size}`} className="label_trai ms-0">
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <hr />

          {/* Màu sắc */}
        </div>

        {/* Lưới sản phẩm bên phải */}
        <div className="col-md-10 custom-product-section">
          <div className="d-flex mt-3 justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
            <div className="Products_show">DANH SÁCH SẢN PHẨM</div>
            <div className="d-flex flex-column flex-md-row gap-2 align-items-center mt-2 mt-md-0">
              <div className="price-filter d-flex align-items-center">
                <label htmlFor="minPrice" className="me-2">
                  Price range:
                </label>
                <input
                  type="number"
                  id="minPrice"
                  className="form-control rounded-0"
                  placeholder="Min"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  style={{ width: "100px", height: "28px", fontSize: ".75rem" }}
                />
                <span className="mx-2">-</span>
                <input
                  type="number"
                  id="maxPrice"
                  className="form-control rounded-0"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  style={{ width: "100px", height: "28px", fontSize: ".75rem" }}
                />
              </div>
              <select
                className="form-select form-select-sm custom-select mt-2 mt-md-0 rounded-0"
                onChange={handleSortChange}
              >
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>
          </div>

          {/* Lưới sản phẩm */}
          <div className="row g-4 custom-product-grid">
            <ProductsCategory data={handleSortAndFilter(products)} />
          </div>
        </div>
      </div>
    </div>
  );
}
