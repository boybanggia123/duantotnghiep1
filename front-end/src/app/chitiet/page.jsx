export default function Detail() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="product-container">
              <div className="thumbnail-images">
                <img src="img/pant1.webp" alt="Thumbnail 1" />
                <img src="img/pantzoom1.webp" alt="Thumbnail 2" />
                <img src="img/pantzoom3.webp" alt="Thumbnail 3" />
              </div>
              <div>
                <img
                  src="img/pant1.webp"
                  alt="Product Image"
                  className="product-image"
                />
              </div>
            </div>
          </div>

          <div className="col-md-5 ms-5">
            <h1>Denise Cut Out Maxi Dress - Black</h1>
            <p className="price">
              $29.99 <span className="old-price">$42.99</span>{" "}
              <span className="badge bg-danger">30% OFF</span>
            </p>
            <p>or 4 payments starting at $7.50</p>
            <div className="size-buttons">
              <button className="btn btn-outline-secondary">XS</button>
              <button className="btn btn-outline-secondary">S</button>
              <button className="btn btn-outline-secondary">M</button>
              <button className="btn btn-outline-secondary">L</button>
              <button className="btn btn-outline-secondary">XL</button>
            </div>

            <button className="btn btn-dark btn-lg w-100 mt-3">
              Add to bag
            </button>

            <div className="product-details">
              <h5>Product Details</h5>
              <p>
                This dress features a chic cut-out design that is perfect for
                any occasion.
              </p>

              <h5>30-day Returns: Store Credit</h5>
              <div className="returns-info">
                <img src="img/pant1.webp" alt="Returns Icon" />
                <p>
                  If you're not satisfied, return it within 30 days for store
                  credit.
                </p>
              </div>
            </div>

            <div className="container mt-5">
              <h4>Similar Products</h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="path_to_image_1.jpg"
                      className="card-img-top"
                      alt="Product 1"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Product Name 1</h5>
                      <p className="card-text">$29.99</p>
                      <a href="#" className="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="path_to_image_2.jpg"
                      className="card-img-top"
                      alt="Product 2"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Product Name 2</h5>
                      <p className="card-text">$34.99</p>
                      <a href="#" className="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="path_to_image_3.jpg"
                      className="card-img-top"
                      alt="Product 3"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Product Name 3</h5>
                      <p className="card-text">$24.99</p>
                      <a href="#" className="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container  mt-5">
          <div className="row">
            <div className="col-md-12">
              <h4>Leave a Comment</h4>
              <form id="commentForm">
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="comment" className="form-label">
                    Comment
                  </label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    placeholder="Write your comment"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Post Comment
                </button>
              </form>

              <div className="comments mt-5">
                <h4>Comments</h4>
                <div className="comment mb-3">
                  <strong>John Doe</strong>
                  <p>This dress is amazing! Highly recommend it.</p>
                </div>
                <div className="comment mb-3">
                  <strong>Jane Smith</strong>
                  <p>I bought this and it's worth every penny!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
