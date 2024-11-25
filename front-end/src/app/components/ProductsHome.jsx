// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToFavourites,
//   removeFromFavourites,
// } from "../../redux/slices/favouriteSlice"; // Import action

// function ProductsHome(props) {
//   const dispatch = useDispatch(); // Khởi tạo dispatch
//   const favouriteItems = useSelector((state) => state.favourites.items); // Lấy danh sách yêu thích từ Redux
//   const [currentPage, setCurrentPage] = useState(1); // State quản lý trang hiện tại
//   const itemsPerPage = 16; // Số lượng sản phẩm hiển thị mỗi trang
//   const [favouriteIds, setFavouriteIds] = useState(new Set()); // Thêm trạng thái để quản lý sản phẩm yêu thích
//   const [notification, setNotification] = useState({ message: "", type: "" }); // Thêm trạng thái để quản lý thông báo
//   const { setFavouriteCount } = props; // Nhận prop để cập nhật số lượng yêu thích

//   // Cập nhật favouriteIds khi component mount
//   useEffect(() => {
//     const ids = new Set(favouriteItems.map((item) => item._id)); // Lấy danh sách ID từ sản phẩm yêu thích
//     setFavouriteIds(ids); // Cập nhật favouriteIds
//   }, [favouriteItems]);

//   // Tính toán sản phẩm hiện tại để hiển thị
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

//   // Tính tổng số trang
//   const totalPages = Math.ceil(props.data.length / itemsPerPage);

//   // Hàm chuyển trang
//   const paginate = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   // Hàm để xử lý việc yêu thích sản phẩm
//   const toggleFavourite = (product) => {
//     setFavouriteIds((prev) => {
//       const newFavourites = new Set(prev);
//       if (newFavourites.has(product._id)) {
//         newFavourites.delete(product._id); // Nếu đã yêu thích, xóa khỏi danh sách
//         dispatch(removeFromFavourites(product)); // Gọi action xóa sản phẩm yêu thích
//         setNotification({
//           message: "Đã xóa khỏi mục yêu thích!",
//           type: "error",
//         }); // Cập nhật thông báo
//       } else {
//         newFavourites.add(product._id); // Nếu chưa yêu thích, thêm vào danh sách
//         dispatch(addToFavourites(product)); // Gọi action thêm sản phẩm yêu thích
//         setNotification({
//           message: "Đã thêm vào mục yêu thích!",
//           type: "success",
//         }); // Cập nhật thông báo
//       }
//       return newFavourites;
//     });

//     // Xóa thông báo sau 3 giây
//     setTimeout(() => {
//       setNotification({ message: "", type: "" });
//     }, 3000);
//   };

//   // Thêm lớp 'show' vào thông báo
//   const notificationClass = notification.message
//     ? `notification show ${notification.type}`
//     : "notification";

//   // const handleAddToFavorites = (product) => {
//   //   // Logic to add product to favorites
//   //   setFavouriteCount(prevCount => prevCount + 1); // Update favorite count
//   // };

//   return (
//     <>
//       {notification.message && (
//         <div className={notificationClass}>{notification.message}</div>
//       )}{" "}
//       {/* Hiển thị thông báo */}
//       {currentItems.map((product) => {
//         const { _id, name, image, price, discountedPrice, hot } = product;
//         const isFavourite = favouriteIds.has(_id); // Kiểm tra xem sản phẩm có được yêu thích không
//         return (
//           <div
//             className="product position-relative border col-sm-6 col-md-4 col-lg-3 mb-4"
//             key={_id}
//           >
//             <div className="sup-h">
//               <div className="w-img gray-background">
//                 <Link href={`/chitiet/${_id}`}>
//                   <img
//                     src={`${image}`}
//                     // src={`img/${image}`}

//                     alt={name}
//                     className="img-fluid img-gray"
//                   />
//                 </Link>
//                 <button className="sup-wimg fw-medium">Quick Add</button>
//               </div>
//               <div className="mt-2 fw-medium">
//                 <div className="d-flex justify-content-between">
//                   <Link href={""} className="namesup">
//                     {name}
//                   </Link>
//                   <span
//                     className="icon-favourite"
//                     onClick={() => toggleFavourite(product)}
//                   >
//                     <svg
//                       className={`icon-svg ${isFavourite ? "active" : ""}`} // Thêm lớp 'active' nếu sản phẩm được yêu thích
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//                     </svg>
//                   </span>
//                 </div>
//                 <span className="price">
//                   {discountedPrice > 0 ? (
//                     <>
//                       <p className="priceSale">
//                         ${price - (price * discountedPrice) / 100}
//                       </p>
//                       <del>${price}</del>
//                     </>
//                   ) : (
//                     <p className="priceSale">${price}</p>
//                   )}
//                 </span>
//               </div>
//             </div>
//             {discountedPrice > 0 && (
//               <p className="discount position-absolute">
//                 {discountedPrice}% OFF
//               </p>
//             )}
//             {hot && <p className="hot position-absolute">HOT</p>}
//           </div>
//         );
//       })}
//     </>
//   );
// }

// export default ProductsHome;
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/slices/favouriteSlice";
import "../../../public/css/loading.css";

function ProductsHome(props) {
  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.favourites.items);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [favouriteIds, setFavouriteIds] = useState(new Set());
  const [notification, setNotification] = useState({ message: "", type: "" });
  const { setFavouriteCount } = props;

  // Thêm trạng thái loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    setTimeout(() => {
      setIsLoading(false); // Dữ liệu đã tải xong
    }, 1000); // 2 giây
  }, []);

  useEffect(() => {
    const ids = new Set(favouriteItems.map((item) => item._id));
    setFavouriteIds(ids);
  }, [favouriteItems]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(props.data.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleFavourite = (product) => {
    setFavouriteIds((prev) => {
      const newFavourites = new Set(prev);
      if (newFavourites.has(product._id)) {
        newFavourites.delete(product._id);
        dispatch(removeFromFavourites(product));
        setNotification({
          message: "Đã xóa khỏi mục yêu thích!",
          type: "error",
        });
      } else {
        newFavourites.add(product._id);
        dispatch(addToFavourites(product));
        setNotification({
          message: "Đã thêm vào mục yêu thích!",
          type: "success",
        });
      }
      return newFavourites;
    });

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const notificationClass = notification.message
    ? `notification show ${notification.type}`
    : "notification";

  if (isLoading) {
    // Hiển thị loading khi đang tải
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {notification.message && (
        <div className={notificationClass}>{notification.message}</div>
      )}
      {currentItems.map((product) => {
        const { _id, name, image, price, discountedPrice, hot } = product;
        const isFavourite = favouriteIds.has(_id);
        return (
          <div
            className="product position-relative col-sm-6 m-0 col-md-4 col-lg-3"
            key={_id}
          >
            <div className="sup-h">
              <div className="w-img gray-background">
                <Link href={`/chitiet/${_id}`}>
                  <img
                    src={`${image}`}
                    alt={name}
                    className="img-fluid img-gray"
                  />
                </Link>
                {/* <button className="sup-wimg fw-medium">Quick Add</button> */}
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <Link href={""} className="namesup">
                    {name}
                  </Link>
                  <span
                    className="icon-favourite"
                    onClick={() => toggleFavourite(product)}
                  >
                    <svg
                      className={`icon-svg ${isFavourite ? "active" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                </div>
                <span className="price">
                  {discountedPrice > 0 ? (
                    <>
                      <p className="priceSale">
                        ${price - (price * discountedPrice) / 100}
                      </p>
                      <del>${price}</del>
                    </>
                  ) : (
                    <p className="priceSale">${price}</p>
                  )}
                </span>
              </div>
            </div>
            {discountedPrice > 0 && (
              <p className="discount position-absolute">
                {discountedPrice}% OFF
              </p>
            )}
            {hot && <p className="hot position-absolute">HOT</p>}
          </div>
        );
      })}
    </>
  );
}

export default ProductsHome;
