// components/Comments.js
import { useState } from "react";

export default function Comments({ userComments, rating, handleStarClick }) {
  return (
    <div>
      {/* Phần chi tiết sản phẩm */}
      <div className="comment-section mt-4">
        <h5 className="comment-title mb-3">Nhận xét</h5>

        <div className="comments-box p-3 rounded bg-light">
          {userComments.map((review, index) => (
            <div key={index} className="review-item mb-3">
              <div className="d-flex align-items-center mb-2">
                <img
                  src="/img/user1.jpg"
                  alt="Người dùng"
                  className="user-avatar me-2"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div>
                  <strong className="user-name">{review.userId}</strong>
                  <span
                    className="user-date d-block text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {review.date}
                  </span>
                </div>
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
              {index < userComments.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
      {/* Phần form bình luận và đánh giá */}
      <div className="comment-form-section mt-5 mb-5">
        <h5 className="comment-title mb-3">Gửi đánh giá của bạn</h5>

        <form className="p-3 bg-light rounded">
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
            <textarea className="form-control" rows="3"></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Gửi đánh giá
          </button>
        </form>
      </div>
    </div>
  );
}
