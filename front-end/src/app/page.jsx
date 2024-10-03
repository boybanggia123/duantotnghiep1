import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div>
        {/* banner */}
        <div className="banner-1">
          <div>
            <img src="img/banner1.1.webp" alt="" />
          </div>
          <button type="button" class=" fw-bolder text-uppercase bt-h">
            Shop now
          </button>
        </div>

        <div className="banner-1">
          <img src="img/banner1.2.webp" alt="" />
        </div>
        <div className="banner-1">
          <img src="img/banner1.3.webp" alt="" />
        </div>
        {/* banner */}
        {/* lis shoes */}

        <div className=" d-flex justify-content-around gap-1 ">
          <div className=" shoens">
            <div>
              <img src="img/shoes.webp" alt="" />
            </div>
            <button type="button" class=" fw-bolder text-uppercase bt-h2">
              Shop boost
            </button>
          </div>
          <div className=" shoens">
            <div>
              <img src="img/shoes4.webp" alt="" />
            </div>
            <button type="button" class=" fw-bolder text-uppercase bt-h2">
              Shop boost
            </button>
          </div>
          <div className=" shoens">
            <div>
              <img src="img/shoes2.webp" alt="" />
            </div>
            <button type="button" class=" fw-bolder text-uppercase bt-h2">
              Shop boost
            </button>
          </div>
          <div className=" shoens">
            <div>
              <img src="img/shoes3.webp" alt="" />
            </div>
            <button type="button" class=" fw-bolder text-uppercase bt-h2">
              Shop boost
            </button>
          </div>
        </div>

        {/* lis shoes */}
        {/* body */}

        <div className="container main-body">
          <h2 className=" text-uppercase fw-bolder">shop the latest</h2>
          <div className="d-flex justify-content-start gap-4 list-b2 ">
            <div className="list-bf">
              <button>new in</button>
            </div>
            <div className="list-bc">
              <button> sale</button>
            </div>
            <div className="list-bc">
              <button>dresses</button>
            </div>
            <div className="list-bc">
              <button>jeans</button>
            </div>
            <div className="list-bc">
              <button>sets</button>
            </div>
          </div>
          <div className="main mt-3">
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
            <div className="sup-h">
              <div className="w-img">
                <img src="img/pant1.webp" alt="" />
                <button className="sup-wimg fw-medium"> Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <a href="" className="namesup">
                    Take The Edge Off Cropped Blazer - Ivory
                  </a>
                  <svg
                    class="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">$39.99</span>
                <div className="sup-price">
                  <a href="">
                    Save $150 When You Spend $300! Use Code: FREECASH
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="button-body my-3 ">
            <button className="mt-5"> Loard more</button>
          </div>
        </div>

        {/* body */}
      </div>
    </>
  );
}
