"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../../../redux/slices/cartslice";
import SignInModal from "@/app/components/SignInModal";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
<<<<<<< HEAD
import { useRouter,useParams } from "next/navigation";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
=======
import { useRouter } from "next/navigation";
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function Detail({ params }) {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); // Nội dung bình luận
  const [userComments, setUserComments] = useState([]); // Lưu danh sách bình luận

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [notification, setNotification] = useState("");
  const cart = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái modal

  const [editReview, setEditReview] = useState(null); // Bình luận hiện tại đang chỉnh sửa

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  console.log(cart);

  // Hàm xử lý mở modal và gán dữ liệu bình luận
  const handleEditComment = (review) => {
    setEditReview(review);
    const modal = new bootstrap.Modal(
      document.getElementById("editCommentModal")
    );
    modal.show();
  };

  // Hàm xử lý sửa bình luận
  const handleUpdateComment = async (e) => {
    e.preventDefault();

    if (!editReview) return;

    const { rating, comment } = editReview;
    const { createdAt } = editReview; // Lấy thời gian tạo bình luận

    try {
      // Gửi yêu cầu PUT tới API sửa bình luận
      const response = await axios.put(
        `http://localhost:3000/productreview/${params.id}`, // Đảm bảo bạn truyền đúng productId vào đây
        { createdAt, rating, comment } // Dữ liệu cần sửa
      );

      if (response.status === 200) {
        // Cập nhật lại danh sách bình luận sau khi sửa
        const updatedReviews = userComments.map((review) =>
          review.createdAt === createdAt
            ? { ...review, rating, comment }
            : review
        );
        setUserComments(updatedReviews);

        // Đóng modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("editCommentModal")
        );
        modal.hide();

        // Hiển thị thông báo thành công
        alert("Bình luận đã được cập nhật.");
      }
    } catch (error) {
      console.error("Lỗi khi sửa bình luận:", error);
      alert(
        error.response?.data?.message || "Có lỗi xảy ra khi sửa bình luận."
      );
    }
  };

  //chọn rating 1-5*
  const handleStarClick = (star) => {
    setRating(rating === star ? 0 : star);
  };
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(
    id ? `http://localhost:3000/productdetail/${id}` : null,
    fetcher,
    {
      refreshInterval: 6000,
    }
  );
  useEffect(() => {
    if (product) {
      // Lấy danh sách bình luận của sản phẩm khi có dữ liệu sản phẩm
      setUserComments(product.reviews || []);
    }
  }, [product]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const response = await axios.get("http://localhost:3000/detailuser", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const fetchedUserId = response.data._id;
          if (fetchedUserId) {
            setUserId(fetchedUserId);
            dispatch(fetchCart(fetchedUserId));
          }
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);
  const handleDeleteComment = async (createdAt) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/productreview/${params.id}`,
        {
          data: { createdAt },
        }
      );
      if (response.status === 200) {
        // Xóa bình luận khỏi trạng thái local
        setUserComments(
          userComments.filter((review) => review.createdAt !== createdAt)
        );
        alert("Bình luận đã được xóa thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      alert("Lỗi khi xóa bình luận");
    }
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Vui lòng chọn đánh giá và viết bình luận.");
      return;
    }

    if (!user) {
      alert("Vui lòng đăng nhập để gửi đánh giá.");
      setShowModal(true); // Hiển thị modal đăng nhập nếu chưa đăng nhập
      return;
    }

    // Kiểm tra nếu người dùng đã đánh giá
    const existingReview = userComments.find(
      (review) => review.userId === user._id
    );

    if (existingReview) {
      alert("Bạn chỉ được đánh giá sản phẩm này một lần.");
      return;
    }

    try {
      const userId = user._id; // Lấy userId từ state
      const response = await axios.post(
        `http://localhost:3000/productreview/${params.id}`,
        {
          userId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Token của người dùng
          },
        }
      );

      if (response.status === 200) {
        alert("Đánh giá và bình luận đã được gửi thành công!");
        setUserComments([
          ...userComments,
          { userId, rating, comment, createdAt: new Date() },
        ]);
        setRating(0); // Reset rating
        setComment(""); // Reset comment
        setTimeout(() => setNotification(""), 3000);
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
    }
  };

  if (error) return <div>Lỗi tải dữ liệu.</div>;
  if (isLoading) return <div>Đang tải...</div>;
  const handleSizeClick = (size) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };
  const handleAddToCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      setShowModal(true);
      return;
    }
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product._id,
          quantity,
          size: selectedSize,
        })
      );
      dispatch(fetchCart(userId));
      setNotification("Đã thêm sản phẩm vào giỏ hàng!");
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  {
    /* Hàm tính điểm trung bình */
  }
  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return (totalRating / comments.length).toFixed(1); // Lấy điểm trung bình đến 1 chữ số thập phân
  };

  {
    /* Hàm render sao */
  }
  const renderStars = (averageRating) => {
    // Đảm bảo fullStars là một số hợp lệ
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    // Kiểm tra đầy đủ giá trị và tránh lỗi
    if (Number.isNaN(fullStars) || fullStars < 0 || fullStars > 5) {
      console.error("Invalid fullStars value:", fullStars);
      return null; // Trả về null nếu fullStars không hợp lệ
    }

    return (
      <>
        {[...Array(fullStars > 0 ? fullStars : 0)].map((_, index) => (
          <span key={index} className="text-warning">
            ★
          </span>
        ))}
        {halfStar && <span className="text-warning">★</span>}
        {[...Array(emptyStars > 0 ? emptyStars : 0)].map((_, index) => (
          <span key={index} className="text-muted">
            ★
          </span>
        ))}
      </>
    );
  };

  {
    /* Hàm lấy số lượng đánh giá cho mỗi sao */
  }
  const getRatingCount = (comments, rating) => {
    return comments.filter((review) => review.rating === rating).length;
  };
  return (
    <div className="container">
      <div aria-label="breadcrumb" className="mt-3">
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
                src={`${product.image}`}
                alt="Hình thu nhỏ 1"
                className="mb-2"
              />
              <img
                src={`${product.image}`}
                alt="Hình thu nhỏ 2"
                className="mb-2"
              />
              <img
                src={`${product.image}`}
                alt="Hình thu nhỏ 3"
                className="mb-2"
              />
            </div>
            <div className="main-product-image">
              <img
                src={`${product.image}`}
                alt="Hình sản phẩm chính"
                className="w-100"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="name_detail">{product.name}</div>
          <div className="price_giam mb-2">
            <div className="gia_detail">
              ${product.discountedPrice}{" "}
              <del className="price_goc">${product.price}</del>
            </div>
            <div className="text-warning_1 fs-6">
              ★★★★☆<span className="sl_ratings">(3)</span>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="name_detail">Màu sắc</h6>
            <div className="d-flex">
              {product.color && product.color.length > 0 ? (
                product.color.map((color, index) => (
                  <div
                    key={index}
                    className="color-btn"
                    style={{
                      backgroundColor: color.toLowerCase(), // Áp dụng màu sắc từ dữ liệu
                      width: "20px",
                      border: "1px solid #f1eeee",
                      height: "20px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></div>
                ))
              ) : (
                <p>Không có màu sắc nào</p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <h6 className="mb-2 name_detail">Kích thước</h6>
            <div className="size_detail d-flex flex-wrap">
              {product.size && product.size.length > 0 ? (
                product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`size_button ${
                      selectedSize === size ? "active" : ""
                    }`}
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
          {/* Hiển thị thông báo */}
          {notification && (
            <div className="alert alert-success mt-2" role="alert">
              {notification}
            </div>
          )}
          <button
            className="button_detail"
            onClick={() => handleAddToCart("M", 1)}
          >
            Thêm vào giỏ hàng
          </button>

          <div className="mt-4">
            <h6>Thông tin sản phẩm</h6>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              {product.description}
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* hiển thị đánh giá */}
        <div className="ratings-section d-flex flex-column flex-md-row align-items-center pt-4">
          <div className="text-center mb-3 mb-md-0" style={{ width: "150px" }}>
            {/* Hiển thị điểm trung bình của đánh giá */}
            <div className="display-5 font-weight-bold text-dark">
              {calculateAverageRating(userComments)}/5
            </div>
            <div className="text-warning fs-3">
              {/* Hiển thị sao theo điểm trung bình */}
              {renderStars(calculateAverageRating(userComments))}
            </div>
            {/* Hiển thị số lượng đánh giá */}
            <span className="text-muted">({userComments.length} đánh giá)</span>
          </div>
          <div className="rating-bars flex-grow-1 ms-md-4 w-100">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div className="d-flex align-items-center mb-1" key={index}>
                <span className="me-2">{rating} ★</span>
                <div
                  className="progress flex-grow-1 me-2"
                  style={{ height: "8px" }}
                >
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{
                      width: `${
                        (getRatingCount(userComments, rating) /
                          userComments.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{getRatingCount(userComments, rating)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Phần hiển thị bình luận */}
        <div className="comment-section mt-4">
          <h5 className="comment-title mb-3">Nhận xét</h5>
          <div className="comments-box p-3 rounded bg-light">
            {userComments.map((review, index) => (
              <div key={index} className="review-item mb-3">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={review.userImage}
                    alt="Người dùng"
                    className="user-avatar me-2"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <strong className="user-name">{review.userName}</strong>
                    <span
                      className="user-date d-block text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {review.date}
                    </span>
                  </div>
                  {userId === review.userId && (
                    <>
                      <button
                        className="btn btn-light btn-sm ms-auto"
                        title="Sửa bình luận"
                        onClick={() => handleEditComment(review)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        className="btn btn-light btn-sm ms-2"
                        title="Xóa bình luận"
                        onClick={() => handleDeleteComment(review.createdAt)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </>
                  )}
                </div>
                <div className="user-rating mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`me-1 ${
                        star <= review.rating ? "text-warning" : "text-muted"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="user-comment">
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal sửa bình luận */}
        <div
          className="modal fade"
          id="editCommentModal"
          tabIndex="-1"
          aria-labelledby="editCommentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editCommentModalLabel">
                  Sửa bình luận
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateComment}>
                  <div className="mb-3">
                    <label htmlFor="editRating" className="form-label">
                      Số sao
                    </label>
                    <div className="d-flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fa-star ${
                            star <= (editReview?.rating || 0)
                              ? "fa-solid text-warning"
                              : "fa-regular"
                          }`}
                          style={{ cursor: "pointer", fontSize: "24px" }}
                          onClick={() =>
                            setEditReview({ ...editReview, rating: star })
                          }
                        ></i>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editComment" className="form-label">
                      Bình luận
                    </label>
                    <textarea
                      id="editComment"
                      rows="4"
                      className="form-control"
                      value={editReview?.comment || ""}
                      onChange={(e) =>
                        setEditReview({
                          ...editReview,
                          comment: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Phần form bình luận và đánh giá */}
        <div className="comment-form-section mt-5 mb-5">
          <h5 className="comment-title mb-3">Gửi đánh giá của bạn</h5>
          {userComments.some((review) => review.userId === user?._id) ? (
            // Hiển thị thông báo nếu đã đánh giá
            <div className="alert alert-info">
              Bạn đã gửi đánh giá cho sản phẩm này. Cảm ơn bạn!
            </div>
          ) : (
            // Hiển thị form đánh giá nếu chưa đánh giá
            <form
              className="p-3 bg-light rounded"
              onSubmit={handleSubmitReview}
            >
              <div className="mb-3">
                <label className="form-label">Chọn số sao:</label>
                <div className="rating-input d-flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className={`btn btn-sm me-1 ${
                        star <= rating ? "btn-warning" : "btn-outline-warning"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Viết nhận xét của bạn:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Gửi đánh giá
              </button>
            </form>
          )}
        </div>
      </div>
      <SignInModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
