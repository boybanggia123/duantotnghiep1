export default function Header() {
  return (
    <>
      <div className="promotion-bar">
        <span>FREE 1-DAY SHIPPING</span>
        <span className="small-text">
          ON ORDERS OVER $100! GET IT TOMORROW!
        </span>
        <div className="countdown">
          <span>10</span>h :<span>12</span>m :<span>01</span>s
        </div>
        <a href="/shop" className="shop-now">
          SHOP NOW
        </a>
      </div>

      <nav class="d-flex justify-content-between mx-5">
        <div className="d-flex ">
          <img src="img/Fashion-Nova-Logo.png" alt="" className="logo" />
          <ul className="text-uppercase d-flex grid gap-3 mt-4 fw-bold  list-h">
            <li className="li-h">Women</li>
            <li className="li-h">Plus+curve</li>
            <li className="li-h">Men</li>
            <li className="li-h ">Kids</li>
            <li className="li-h">beauty</li>
          </ul>
        </div>

        <div className=" d-flex ">
          <div>
            <form class="d-flex mt-4 " role="search">
              <input
                placeholder=""
                class="input-h"
                name="text"
                autocomplete="off"
                type="text"
              />
            </form>
          </div>
          <div className=" d-flex grid gap-3 mt-4 ms-4">
            <div>
              <i class="bi bi-person-circle icon-h   "></i>
            </div>
            <div>
              {" "}
              <i class="bi bi-suit-heart icon-h"></i>
            </div>
            <div>
              <i class="bi bi-basket icon-h"></i>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-start mx-5 mb-4 ">
        <div className="text-uppercase a-h fw-bolder ">
          <a href=""> new in</a>
          <a href="" className="color-s">
            {" "}
            Sale
          </a>
          <a href=""> dresses</a>
          <a href=""> clothing</a>
          <a href=""> tops</a>
          <a href=""> nova luxe</a>
        </div>
      </div>
    </>
  );
}
