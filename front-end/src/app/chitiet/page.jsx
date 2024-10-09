export default function Detail() {
  return (
    <>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <div class="product-container">
              <div class="thumbnail-images">
                <img src="img/pant1.webp" alt="Thumbnail 1" />
                <img src="img/pantzoom1.webp" alt="Thumbnail 2" />
                <img src="img/pantzoom3.webp" alt="Thumbnail 3" />
              </div>
              <div>
                <img
                  src="img/pant1.webp"
                  alt="Product Image"
                  class="product-image"
                />
              </div>
            </div>
          </div>

          <div class="col-md-5 ms-5">
            <h1>Denise Cut Out Maxi Dress - Black</h1>
            <p class="price">
              $29.99 <span class="old-price">$42.99</span>{" "}
              <span class="badge bg-danger">30% OFF</span>
            </p>
            <p>or 4 payments starting at $7.50</p>
            <div class="size-buttons">
              <button class="btn btn-outline-secondary">XS</button>
              <button class="btn btn-outline-secondary">S</button>
              <button class="btn btn-outline-secondary">M</button>
              <button class="btn btn-outline-secondary">L</button>
              <button class="btn btn-outline-secondary">XL</button>
            </div>

            <button class="btn btn-dark btn-lg w-100 mt-3">Add to bag</button>

            <div class="product-details">
              <h5>Product Details</h5>
              <p>
                This dress features a chic cut-out design that is perfect for
                any occasion.
              </p>

              <h5>30-day Returns: Store Credit</h5>
              <div class="returns-info">
                <img src="img/pant1.webp" alt="Returns Icon" />
                <p>
                  If you're not satisfied, return it within 30 days for store
                  credit.
                </p>
              </div>
            </div>

            <div class="container mt-5">
              <h4>Similar Products</h4>
              <div class="row">
                <div class="col-md-4">
                  <div class="card">
                    <img
                      src="path_to_image_1.jpg"
                      class="card-img-top"
                      alt="Product 1"
                    />
                    <div class="card-body">
                      <h5 class="card-title">Product Name 1</h5>
                      <p class="card-text">$29.99</p>
                      <a href="#" class="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card">
                    <img
                      src="path_to_image_2.jpg"
                      class="card-img-top"
                      alt="Product 2"
                    />
                    <div class="card-body">
                      <h5 class="card-title">Product Name 2</h5>
                      <p class="card-text">$34.99</p>
                      <a href="#" class="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card">
                    <img
                      src="path_to_image_3.jpg"
                      class="card-img-top"
                      alt="Product 3"
                    />
                    <div class="card-body">
                      <h5 class="card-title">Product Name 3</h5>
                      <p class="card-text">$24.99</p>
                      <a href="#" class="btn btn-primary">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container  mt-5">
          <div class="row">
            <div class="col-md-12">
              <h4>Leave a Comment</h4>
              <form id="commentForm">
                <div class="mb-3">
                  <label for="name" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="comment" class="form-label">
                    Comment
                  </label>
                  <textarea
                    class="form-control"
                    id="comment"
                    rows="3"
                    placeholder="Write your comment"
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                  Post Comment
                </button>
              </form>

              <div class="comments mt-5">
                <h4>Comments</h4>
                <div class="comment mb-3">
                  <strong>John Doe</strong>
                  <p>This dress is amazing! Highly recommend it.</p>
                </div>
                <div class="comment mb-3">
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
