"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // Thêm state để lưu size đã chọn
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`http://localhost:3000/productdetail/${params.id}`, fetcher, {
    refreshInterval: 6000,
  });

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (isLoading) return <div>Đang tải</div>;
  // Hàm xử lý khi người dùng chọn size
  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(""); // Nếu size đã được chọn, bỏ chọn khi nhấn lần nữa
    } else {
      setSelectedSize(size); // Chọn size mới
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="Detail">
              <Link href="#">Detail</Link>
            </li>
            <li className="item_detail">
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li className="Detail active" aria-current="page">
              {product.name}
            </li>
          </ol>
        </div>
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="product-container">
              <div className="thumbnail-images d-flex flex-column">
                <img
                  src={`/${product.image}`} // Sử dụng URL gốc nếu cần
                  alt="Thumbnail 1"
                  className="mb-2"
                />
                <img
                  src={`/${product.image}`}
                  alt="Thumbnail 2"
                  className="mb-2"
                />
                <img
                  src={`/${product.image}`}
                  alt="Thumbnail 3"
                  className="mb-2"
                />
              </div>
              <div className="main-product-image">
                <img
                  src={`/${product.image}`}
                  alt="Main Product"
                  className="w-100"
                />
              </div>
            </div>
          </div>

          {/* Cột phải: Thông tin sản phẩm */}
          <div className="col-md-4">
            <div className="name_detail">{product.name}</div>
            <p className="price_giam mb-2">
              <div className="gia_detail">
                ${product.discountedPrice}{" "}
                <del className="price_goc">${product.price}</del>
              </div>
              <div className=" text-warning_1 fs-6">
                ★★★★☆<span className="sl_ratings">(3)</span>
              </div>
            </p>

            {/* Tùy chọn màu sắc */}
            <div className="mb-3">
              <h6 className="name_detail">Color</h6>
              <div className="d-flex">
                <div
                  className="color-btn bg-secondary rounded-circle me-2"
                  style={{ width: "20px", height: "20px" }}
                ></div>
                <div
                  className="color-btn bg-danger rounded-circle me-2"
                  style={{ width: "20px", height: "20px" }}
                ></div>
                <div
                  className="color-btn bg-primary rounded-circle"
                  style={{ width: "20px", height: "20px" }}
                ></div>
              </div>
            </div>

            {/* Tùy chọn kích thước */}
            <div className="mb-3">
              <h6 className="mb-2 name_detail">Size</h6>
              <div className="size_detail d-flex flex-wrap">
                {product.size && product.size.length > 0 ? (
                  product.size.map((size, index) => (
                    <button
                      key={index}
                      className={`size_button ${
                        selectedSize === size ? "active" : ""
                      }`}
                      onClick={() => handleSizeClick(size)} // Khi chọn size, lưu size vào state
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p>Không có size nào</p>
                )}
              </div>
            </div>

            {/* Số lượng và nút thêm vào giỏ */}
            <div className="mb-3">
              <label className="name_detail" htmlFor="quantity">
                Số lượng
              </label>
              <input
                style={{ width: "80px", marginTop: "10px" }}
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control "
              />
            </div>

            <button
              className="button_detail"
              onClick={() => {
                if (!selectedSize) {
                  alert("Vui lòng chọn size trước khi thêm vào giỏ hàng.");
                  return;
                }
                dispatch(
                  addToCart({
                    item: product,
                    quantity: quantity,
                    size: selectedSize, // Thêm size vào giỏ hàng
                  })
                );
              }}
            >
              Thêm vào giỏ hàng
            </button>

            {/* Thông tin sản phẩm */}
            <div className="mt-4">
              <h6>Thông tin sản phẩm</h6>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="ratings-section d-flex justify-content-between pt-4">
          <div className="align-items-center">
            <div className="danhgia">4.7/5</div>
            <div className="text-warning fs-2">★★★★☆</div>
            <span className="view_ratings">(3 reviews)</span>
          </div>

          <div className="rating-bar">
            <div className="d-flex align-items-center mb-1">
              <span className="me-2">5 ★</span>
              <div
                className="progress flex-grow-1 me-2"
                style={{ width: "300px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <span>2</span>
            </div>
            <div className="d-flex align-items-center mb-1">
              <span className="me-2">4 ★</span>
              <div
                className="progress flex-grow-1 me-2"
                style={{ width: "150px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <span>1</span>
            </div>
            <div className="d-flex align-items-center mb-1">
              <span className="me-2">3 ★</span>
              <div
                className="progress flex-grow-1 me-2"
                style={{ width: "150px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <span>0</span>
            </div>
            <div className="d-flex align-items-center mb-1">
              <span className="me-2">2 ★</span>
              <div
                className="progress flex-grow-1 me-2"
                style={{ width: "150px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <span>0</span>
            </div>
            <div className="d-flex align-items-center mb-1">
              <span className="me-2">1 ★</span>
              <div
                className="progress flex-grow-1 me-2"
                style={{ width: "150px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section mt-4">
          <h4 className="h5">Reviews</h4>
          {/* Bình luận hiện tại */}
          <div className="review-item mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-warning">★★★★★</span>
                <strong className="ms-2">Nhựt Hào</strong>
                <span className="ms-2">Ngày 22-10-2024</span>
              </div>
            </div>
            <p className="mt-2">Sản phẩm như six</p>
            <div className="text-muted">Size Purchased: S | Size: S</div>
          </div>
          <div className="review-item mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-warning">★★★★★</span>
                <strong className="ms-2">Minh Quân</strong>
                <span className="ms-2">Ngày 22-10-2024</span>
              </div>
            </div>
            <p className="mt-2">Sản phẩm tốt lắm</p>
            <div className="text-muted">Size Purchased: S | Size: S</div>
          </div>
          <div className="review-item mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-warning">★★★★★</span>
                <strong className="ms-2">Thành</strong>
                <span className="ms-2">Ngày 22-10-2024</span>
              </div>
            </div>
            <p className="mt-2">Sản phẩm tốt lắm em</p>
            <div className="text-muted">Size Purchased: S | Size: S</div>
          </div>

          {/* Form bình luận */}
          <form className="mt-4">
            <h5>Để lại đánh giá</h5>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                rows="3"
                className="form-control"
                placeholder="Your comment"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="rating">Rating</label>
              <select id="rating" className="form-control">
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            <button type="submit" className="btn btn-dark mb-4">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
