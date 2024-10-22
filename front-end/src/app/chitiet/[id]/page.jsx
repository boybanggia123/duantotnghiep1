// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart } from "@/redux/slices/cartslice";
// import { useState } from "react";
// import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// export default function Detail({ params }) {
//   // const [size, setSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   console.log(cart);
//   const {
//     data: product,
//     error,
//     isLoading,
//   } = useSWR(`http://localhost:3000/productdetail/${params.id}`, fetcher, {
//     refreshInterval: 6000,
//   });

//   if (error) return <div>Lỗi load dữ liệu.</div>;
//   if (isLoading) return <div>Đang tải</div>;
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="row">
//           {/* Left Column: Product Images */}
//           <div className="col-md-6">
//             <div className="product-container">
//               <div className="thumbnail-images mb-3 d-flex flex-column">
//                 {/* Thumbnail Images */}
//                 <img
//                   src={`${product.image}`}
//                   alt={product.name}
//                   className="mb-2"
//                 />
//                 <img
//                   src={`${product.image}`}
//                   alt={product.name}
//                   className="mb-2"
//                 />
//                 <img
//                   src={`${product.image}`}
//                   alt={product.name}
//                   className="mb-2"
//                 />
//               </div>
//               <div className="main-product-image">
//                 {/* Main Product Image */}
//                 <img
//                   src={`${product.image}`}
//                   alt={product.name}
//                   className="product-image w-100"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Product Details */}
//           <div className="col-md-5 ms-5">
//             <h1 className="mb-3 h3">{product.name}</h1>
//             <p className="price">
//               <strong className="h4">${product.price}</strong>{" "}
//               <span className="old-price text-muted">
//                 ${product.discountedPrice}
//               </span>
//               {/* <span className="badge bg-danger ms-2">17% OFF</span> */}
//             </p>
//             <p className="text-muted">
//               {product.description} <strong>Affirm</strong>
//             </p>

//             {/* Color Options */}
//             <div className="mb-3">
//               <h5 className="mb-2">Color: Rose</h5>
//               <div className="color-options d-flex">
//                 <button
//                   className="color-btn bg-secondary rounded-circle me-2"
//                   style={{ width: "30px", height: "30px" }}
//                 ></button>
//                 <button
//                   className="color-btn bg-light rounded-circle me-2"
//                   style={{ width: "30px", height: "30px" }}
//                 ></button>
//                 <button
//                   className="color-btn bg-pink rounded-circle"
//                   style={{ width: "30px", height: "30px" }}
//                 ></button>
//               </div>
//             </div>

//             {/* Size Options */}
//             <div className="size-buttons mb-3">
//               <h5 className="mb-2">Size</h5>
//               <button className="btn btn-outline-secondary me-2">
//                 {product.size}
//               </button>
//               {/* <button className="btn btn-outline-secondary me-2">M</button>
//               <button className="btn btn-outline-secondary me-2">L</button>
//               <button className="btn btn-outline-secondary me-2">XL</button> */}
//             </div>

//             {/* Add to Bag Button */}
//             <input
//               min="1"
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//             <button
//               className="btn btn-dark btn-lg w-100 mt-3"
//               onClick={() =>
//                 dispatch(addToCart({ item: product, quantity: quantity }))
//               }
//             >
//               Add to bag
//             </button>

//             {/* Product Details */}
//             <div className="product-details mt-4">
//               <h5>Product Details</h5>
//               <p className="text-muted">
//                 The Day Dreamer Cozy Pant Set offers a snug fit for lounging or
//                 casual wear. Featuring a soft material and relaxed fit, it's
//                 perfect for any occasion.
//               </p>

//               <h5>30-day Returns: Store Credit</h5>
//               <p className="text-muted">
//                 If you're not satisfied, return it within 30 days for store
//                 credit.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Similar Products Section */}
//         <div className="container mt-5">
//           <h4 className="h4">Similar Products</h4>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="card">
//                 <img
//                   src="img/pant1.webp"
//                   className="card-img-top"
//                   alt="Product 1"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Product Name 1</h5>
//                   <p className="card-text">$29.99</p>
//                   <a href="#" className="btn btn-primary">
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card">
//                 <img
//                   src="img/pantzoom1.webp"
//                   className="card-img-top"
//                   alt="Product 2"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Product Name 2</h5>
//                   <p className="card-text">$34.99</p>
//                   <a href="#" className="btn btn-primary">
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card">
//                 <img
//                   src="img/pantzoom3.webp"
//                   className="card-img-top"
//                   alt="Product 3"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Product Name 3</h5>
//                   <p className="card-text">$24.99</p>
//                   <a href="#" className="btn btn-primary">
//                     View Details
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Comment Section */}
//         <div className="container mt-5">
//           <h4 className="h4">Leave a Comment</h4>
//           <form id="commentForm">
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 placeholder="Your Name"
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="comment" className="form-label">
//                 Comment
//               </label>
//               <textarea
//                 className="form-control"
//                 id="comment"
//                 rows="3"
//                 placeholder="Write your comment"
//                 required
//               ></textarea>
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Post Comment
//             </button>
//           </form>

//           {/* Comments Display */}
//           <div className="comments mt-5">
//             <h4 className="h4">Comments</h4>
//             <div className="comment mb-3">
//               <strong>John Doe</strong>
//               <p>This outfit is amazing! Highly recommend it.</p>
//             </div>
//             <div className="comment mb-3">
//               <strong>Jane Smith</strong>
//               <p>I bought this set and it's worth every penny!</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import ProductDetail from "../../components/ProductDetail";

// Giả sử bạn lấy dữ liệu sản phẩm qua API hoặc từ props
const productData = {
  id: 1,
  name: "She Stands Out Tummy Control Bootcut Jeans - Medium Wash",
  price: 27.99,
  discountedPrice: 39.99,
  description: "Comfortable bootcut jeans designed to fit perfectly.",
  image: "img/aothun/aothun10.jpg",
};

export default function ProductPage() {
  return <ProductDetail product={productData} />;
}
