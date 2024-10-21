"use client";
import React, { useState } from "react";

const ProductDetail = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("0");
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([
    { name: "John Doe", comment: "This product is amazing!", rating: 5 },
    {
      name: "Jane Smith",
      comment: "Great quality and fits perfectly!",
      rating: 4,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newName && newComment) {
      const updatedComments = [
        ...comments,
        { name: newName, comment: newComment, rating: newRating },
      ];
      setComments(updatedComments);
      setNewComment("");
      setNewName("");
      setNewRating(5);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Product Images */}
        <div className="col-md-7">
          <div className="product-container">
            <div className="thumbnail-images d-flex flex-column mb-3">
              <img src={product.image} alt="Thumbnail 1" className="mb-2" />
              <img src={product.image} alt="Thumbnail 2" className="mb-2" />
              <img src={product.image} alt="Thumbnail 3" className="mb-2" />
            </div>
            <div className="main-product-image">
              <img src={product.image} alt="Main Product" className="w-100" />
            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="col-md-5">
          <h1 className="mb-3 h4">{product.name}</h1>
          <p className="price h4 text-danger mb-2">
            ${product.price}{" "}
            <span className="text-muted text-decoration-line-through">
              ${product.discountedPrice}
            </span>
          </p>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            or 4 payments starting at $7.00 with <strong>Affirm</strong>
          </p>

          {/* Color Options */}
          <div className="mb-3">
            <h6 className="mb-2">Color: Medium Wash</h6>
            <div className="d-flex">
              <div
                className="color-btn bg-secondary rounded-circle me-2"
                style={{ width: "30px", height: "30px" }}
              ></div>
              <div
                className="color-btn bg-light rounded-circle me-2"
                style={{ width: "30px", height: "30px" }}
              ></div>
              <div
                className="color-btn bg-primary rounded-circle"
                style={{ width: "30px", height: "30px" }}
              ></div>
            </div>
          </div>

          {/* Size Options */}
          <div className="mb-3">
            <h6 className="mb-2">Size</h6>
            <div className="d-flex flex-wrap">
              {["0", "7", "15", "20 Plus"].map((size) => (
                <button
                  key={size}
                  className={`btn me-2 mb-2 ${
                    selectedSize === size ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                  style={{ width: "50px", height: "50px" }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag Button */}
          <div className="mb-3">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />
          </div>

          <button className="btn btn-dark btn-lg w-100">Add to bag</button>

          {/* Product Details */}
          <div className="mt-4">
            <h6>Product Details</h6>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              The Day Dreamer Cozy Pant Set offers a snug fit for lounging or
              casual wear. Featuring a soft material and relaxed fit, it's
              perfect for any occasion.
            </p>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="mt-5">
        <h4 className="h4">Ratings</h4>
        <div className="d-flex align-items-center">
          <strong className="me-2" style={{ fontSize: "1.5rem" }}>
            4.5
          </strong>
          <span className="me-2 text-warning">★★★★☆</span>
          <span>({comments.length} reviews)</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h4 className="h4">Comments</h4>
        {comments.map((comment, index) => (
          <div key={index} className="comment mb-3">
            <strong>{comment.name}</strong>{" "}
            <span className="ms-2">({comment.rating} stars)</span>
            <p>{comment.comment}</p>
          </div>
        ))}

        {/* Comment Form */}
        <form onSubmit={handleAddComment} className="mt-4">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
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
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control"
              placeholder="Your comment"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="form-control"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} stars
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
