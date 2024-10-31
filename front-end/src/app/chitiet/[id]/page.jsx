"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [notification, setNotification] = useState(""); // Thêm state để quản lý thông báo
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

  if (error) return <div>Lỗi tải dữ liệu.</div>;
  if (isLoading) return <div>Đang tải...</div>;

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");
      return;
    }
    dispatch(
      addToCart({
        item: product,
        quantity: quantity,
        size: selectedSize,
      })
    );
    setNotification("Đã thêm sản phẩm vào giỏ hàng!"); // Thiết lập thông báo khi thêm vào giỏ
    setTimeout(() => {
      setNotification(""); // Xóa thông báo sau 3 giây
    }, 3000);
  };

  return (
    <>
      <div className="container mt-3">
        <div aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="Detail">
              <Link href="#">Chi tiết</Link>
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
                  src={`/img/${product.image}`}
                  alt="Hình thu nhỏ 1"
                  className="mb-2"
                />
                <img
                  src={`/img/${product.image}`}
                  alt="Hình thu nhỏ 2"
                  className="mb-2"
                />
                <img
                  src={`/img/${product.image}`}
                  alt="Hình thu nhỏ 3"
                  className="mb-2"
                />
              </div>
              <div className="main-product-image">
                <img
                  src={`/img/${product.image}`}
                  alt="Hình sản phẩm chính"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ratings-section d-flex justify-content-between pt-4">
          <div className="align-items-center">
            <div className="danhgia">4.7/5</div>
            <div className="text-warning fs-2">★★★★☆</div>
            <span className="view_ratings">(3 đánh giá)</span>
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

        <div className="comment-section mt-4">
          <h5 className="comment-title">Nhận xét</h5>
          <div className="comment-item">
            <div className="user-info">
              <img
                src="/images/user.png"
                alt="Người dùng"
                className="user-avatar"
              />
              <strong className="user-name">Nguyễn Văn A</strong>
              <span className="user-date">02/10/2024</span>
            </div>
            <div className="user-comment">
              <p>Rất hài lòng với sản phẩm này!</p>
            </div>
          </div>
          <div className="comment-item">
            <div className="user-info">
              <img
                src="/images/user.png"
                alt="Người dùng"
                className="user-avatar"
              />
              <strong className="user-name">Trần Thị B</strong>
              <span className="user-date">01/10/2024</span>
            </div>
            <div className="user-comment">
              <p>Sản phẩm rất chất lượng, sẽ mua tiếp!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
