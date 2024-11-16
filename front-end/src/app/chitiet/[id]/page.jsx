"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useRef } from "react"; // Thêm import useRef
import ProductsHome from "../../components/ProductsHome";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [currentIndex, setCurrentIndex] = useState(0); // Thêm state để theo dõi chỉ số sản phẩm hiện tại
  // const [data, setData] = useState([]); // Khởi tạo state cho dữ liệu
  console.log(cart);

  const handleNext = () => {
    if (currentIndex < relatedProducts.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:3000/products", {
  //       cache: "no-store",
  //     });
  //     const result = await res.json();
  //     setData(result); // Cập nhật state với dữ liệu nhận được
  //   };

  //   fetchData(); // Gọi hàm fetchData
  // }, []); // Chạy một lần khi component được mount
  
  const { data: product, error, isLoading } = useSWR(
    `http://localhost:3000/productdetail/${params.id}`,
    fetcher,
    { refreshInterval: 6000 }
  );
  
  const [relatedProducts, setRelatedProducts] = useState([]); // Khởi tạo state cho sản phẩm liên quan
  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (product && product.categoryId) { // Kiểm tra nếu product đã được khởi tạo và có categoryId
        const res = await fetch(`http://localhost:3000/products?categoryId=${product.categoryId}`);
        const result = await res.json();
        setRelatedProducts(result.filter(item => item._id !== product._id)); // Lọc bỏ sản phẩm hiện tại
      }
    };
  
    fetchRelatedProducts(); // Gọi hàm fetchRelatedProducts khi sản phẩm thay đổi
  }, [product]); // Chạy lại khi product thay đổi
  
  if (error) return <div>Lỗi tải dữ liệu.</div>;
  if (isLoading) return <div>Đang tải...</div>;

  const handleSizeClick = (size) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");
      return;
    }
    dispatch(addToCart({ item: product, quantity, size: selectedSize }));
    setNotification("Đã thêm sản phẩm vào giỏ hàng!");
    setTimeout(() => setNotification(""), 3000);
  };

  

  return (
    <div className="container mt-3">
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="Detail">
            <Link href="/">Home</Link>
          </li>
          <li className="item_detail">
            <i className="fa-solid fa-chevron-right"></i>
          </li>
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
                src={`http://localhost:3000/${product.image}`}
                alt="Hình thu nhỏ 1"
                className="mb-2"
              />
              <img
                src={`http://localhost:3000/${product.image}`}
                alt="Hình thu nhỏ 2"
                className="mb-2"
              />
              <img
                src={`http://localhost:3000/${product.image}`}
                alt="Hình thu nhỏ 3"
                className="mb-2"
              />
            </div>
            <div className="main-product-image">
              <img
                src={`http://localhost:3000/${product.image}`}
                alt="Hình sản phẩm chính"
                className="w-100"
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="name_detail">{product.name}</div>
          {/* <span className="icon-favourite" onClick={() => toggleFavourite(product)}>
            <svg
              className={`icon-svg ${isFavourite ? 'active' : ''}`}  // Thêm lớp 'active' nếu sản phẩm được yêu thích
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span> */}
          <p className="price_giam mb-2">
            <div className="gia_detail">
              {product.discountedPrice > 0 ? (
                <>
                  ${(product.price - (product.price * product.discountedPrice / 100))}{" "}
                  <del className="price_goc">${product.price}</del>
                </>
              ) : (
                <span className="price_goc" style={{color: "#9d2226", fontSize: "1rem"}}>${product.price}</span>
              )}
            </div>
            <div className="text-warning_1 fs-6">
              ★★★★☆<span className="sl_ratings">(3)</span>
            </div>
          </p>

          <div className="mb-3">
            <h6 className="name_detail">Màu sắc</h6>
            <div className="d-flex">
              <div className="color-btn bg-secondary rounded-circle me-2" style={{ width: "20px", height: "20px" }}></div>
              <div className="color-btn bg-danger rounded-circle me-2" style={{ width: "20px", height: "20px" }}></div>
              <div className="color-btn bg-primary rounded-circle" style={{ width: "20px", height: "20px" }}></div>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="mb-2 name_detail">Kích thước</h6>
            <div className="size_detail d-flex flex-wrap">
              {product.size && product.size.length > 0 ? (
                product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`size_button ${selectedSize === size ? "active" : ""}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>Không có kích thước nào</p>
              )}
            </div>
          </div>

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
              className="form-control"
            />
          </div>

          <button className="button_detail" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>

          {/* Hiển thị thông báo */}
          {notification && (
            <div className="alert alert-success mt-2" role="alert">
              {notification}
            </div>
          )}

          <div className="mt-4">
            <h6>Thông tin sản phẩm</h6>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Phần đánh giá sản phẩm */}
      <div className="ratings-section d-flex justify-content-between pt-4">
        <div className="align-items-center">
          <div className="danhgia">4.7/5</div>
          <div className="text-warning fs-2">★★★★☆</div>
          <span className="view_ratings">(3 đánh giá)</span>
        </div>

        {/* <div className="rating-bar">
          {Array.from({ length: 5 }, (_, i) => (
            <div className="d-flex align-items-center mb-1" key={i}>
              <span className="me-2">{5 - i} ★</span>
              <div className="progress flex-grow-1 me-2" style={{ width: `${(2 / 3) * 100}%` }}>
                <div className="progress-bar bg-warning" style={{ width: `${(i === 2 ? 50 : 0)}%` }}></div>
              </div>
              <span>{i === 2 ? 2 : 0}</span>
            </div>
          ))}
        </div> */}

      </div>

      <div className="comment-section mt-4">
        <h5 className="comment-title">Nhận xét</h5>
        <div className="comment-item">
          <div className="user-info">
            <img src="https://cdn-icons-png.flaticon.com/512/219/219986.png" width={50} alt="Người dùng" className="user-avatar" />
            <strong className="user-name d-inline-block m-2">Nguyễn Văn A</strong>
            <span className="user-date">02/10/2024</span>
          </div>
          <div className="user-comment">
            <p>Rất hài lòng với sản phẩm này!</p>
          </div>
        </div>
        <div className="comment-item">
          <div className="user-info">
            <img src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" width={50} alt="Người dùng" className="user-avatar" />
            <strong className="user-name d-inline-block m-2">Trần Thị B</strong>
            <span className="user-date">01/10/2024</span>
          </div>
          <div className="user-comment">
            <p>Sản phẩm chất lượng tốt.</p>
          </div>
        </div>
      </div>
      <div className="recommended-section mt-5 mb-3 detail-page">
        <p className="h5">Recommended for you</p>
        <div className="d-flex align-items-center gap-3">
          <button className="btn-prev" onClick={handlePrev} disabled={currentIndex === 0}><i class="bi bi-chevron-compact-left"></i></button> {/* Mũi tên trái */}
          <div className="row">
            {relatedProducts.slice(currentIndex, currentIndex + 4).map(product => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <ProductsHome data={[product]} /> {/* Hiển thị từng sản phẩm */}
              </div>
            ))}
          </div>
          <button className="btn-next" onClick={handleNext} disabled={currentIndex >= relatedProducts.length - 4}><i class="bi bi-chevron-compact-right"></i></button> {/* Mũi tên phải */}
        </div>
      </div>
    </div>
  );
}
