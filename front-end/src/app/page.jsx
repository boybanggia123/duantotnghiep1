import Link from "next/link";
import ProductsHome from "./components/ProductsHome";
export default async function Home() {
  const res = await fetch("http://localhost:3000/products", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return (
    <>
      <div>
        {/* banner */}
        <div className="banner-1">
          <div className="video-container">
            <Link href={"/"}>
              <video
                autoPlay
                muted
                loop
                playsInline
                data-testid="video-banner"
                aria-label="30/40/50 hero"
                poster="https://cdn.shopify.com/s/files/1/0293/9277/files/ENGLISH_DESKTOP_STILL.png?v=1727818039"
              >
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/9a0ee408478e4613b6400169e7746598.mp4"
                  type="video/mp4"
                />
              </video>
            </Link>
          </div>
        </div>
        <div className="banner-1">
          <img src="img/banner1.3.webp" alt="" className="img-fluid w-100" />
        </div>
        {/* banner */}

        {/* list shoes */}
        <div className="grid-container my-2">
          <div className="row g-2">
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes4.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes2.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes3.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* list shoes */}

        {/* body */}
        <div className="container main-body custom-container">
          <h2 className="text_h2 text-uppercase">shop the latest</h2>
          <div className="d-flex flex-wrap gap-2 mb-3 button_new">
            <button>
              {" "}
              <Link href={"#"} className="btn-outline-dark">
                New in
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Sale
              </Link>
            </button>
            <button>
              {" "}
              <Link href={"#"} className="btn-outline-dark">
                Dresses
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Jeans
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Sets
              </Link>
            </button>
          </div>

          <div className="row">
            <ProductsHome data={data} />
            {/* <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$70.99</del>
                    <p>$39.99</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$60.00</del>
                    <p>40.00</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$99.99</del>
                    <p>$79.99</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$100.99</del>
                    <p>$89.99</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$50.99</del>
                    <p>$39.99</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$80.00</del>
                    <p>$49.00</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 mb-2 p-1">
              <div className="sup-h">
                <div className="w-img">
                  <img src="img/pant1.webp" alt="" className="img-fluid" />
                  <button className="sup-wimg fw-medium">Quick Add</button>
                </div>
                <div className="mt-2 fw-medium">
                  <div className="d-flex justify-content-between">
                    <Link href={""} className="namesup">
                      Take The Edge Off Cropped Blazer - Ivory
                    </Link>
                    <svg
                      className="icon-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="price">
                    <del>$39.99</del>
                    <p>$39.99</p>
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          <div className="text-center my-3">
            <button className="btn btn-dark">Load more</button>
          </div>
        </div>
        {/* body */}
      </div>
    </>
  );
}
