"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function EditProduct({ params }) {
  const router = useRouter();
  const id = params.id;

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [isProductLoaded, setIsProductLoaded] = useState(false);
<<<<<<< HEAD
  const [isVisible, setIsVisible] = useState(true);
  const [oldImage, setOldImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);  // State lưu ảnh phụ
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  
=======
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  // Lấy danh mục sản phẩm
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    getCategories();

    // Lấy thông tin sản phẩm cần sửa
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3000/productdetail/${id}`);
      const data = await res.json();
      setProduct(data);
      setIsProductLoaded(true);
    };

    if (id) {
      getProduct();
    }
  }, [id]);
<<<<<<< HEAD
  
 
  

  

  useEffect(() => {
    if (product && product.image) {
      setOldImage(product.image); // Đảm bảo set ảnh cũ từ product
    }
  }, [product]); // Cập nhật lại oldImage khi product thay đổi

  
=======
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df

  

<<<<<<< HEAD
console.log("Old Image:", oldImage);


    const formik = useFormik({
      initialValues: {
        image: null,
        additionalImages: [],
        name: "",
        description: "",
        price: "",
        discountedPrice: "",
        size: [],
        quantity: 0,
        status: "out of stock",
        hot: false,
        categoryId: "",
        color: [],
        reviews: [],
      },
      validationSchema: Yup.object({
        image: Yup.mixed().required("Vui lòng thêm hình ảnh"),
        additionalImages: Yup.array().of(Yup.mixed()).optional(),
        name: Yup.string().max(100, "Tên sản phẩm không quá 100 ký tự").required("Vui lòng nhập tên sản phẩm"),
        description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
        price: Yup.number().required("Giá sản phẩm là bắt buộc"),
        discountedPrice: Yup.number().optional(),
        size: Yup.array().min(1, "Vui lòng chọn ít nhất một kích thước"),
        quantity: Yup.number().required("Vui lòng nhập số lượng sản phẩm"),
        status: Yup.string().required("Vui lòng chọn trạng thái sản phẩm"),
        hot: Yup.boolean(),
        categoryId: Yup.string().required("Vui lòng chọn danh mục sản phẩm"),
        color: Yup.array().of(Yup.string().required("Vui lòng nhập màu sắc")),
      }),
      onSubmit: async (values, { setSubmitting, setFieldError }) => {
        const imageToSend = values.image || oldImage;

        const formData = new FormData();
        formData.append("image", imageToSend);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("discountedPrice", values.discountedPrice);
        formData.append("size", JSON.stringify(values.size));
        formData.append("quantity", values.quantity);
        formData.append("status", values.status);
        formData.append("hot", values.hot);
        formData.append("categoryId", values.categoryId);
        formData.append("reviews", JSON.stringify(values.reviews));
        formData.append("color", JSON.stringify(values.color));

        // Gộp ảnh cũ và ảnh mới
        const allAdditionalImages = [
          ...(product?.additionalImages || []), // Ảnh cũ
          ...additionalImages, // Ảnh mới
        ];
        
        // Đảm bảo các giá trị trong mảng là file hoặc URL, tránh thêm `undefined`
        const filteredImages = allAdditionalImages.filter(Boolean);
        
        filteredImages.forEach((image) => {
          formData.append("additionalImages", image);
        });

        try {
          const res = await fetch(
            `http://localhost:3000/uploads/updateproduct/${id}`,
            {
              method: "PUT",
              body: formData,
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            if (res.status === 400 && errorData.message === "Sản phẩm đã tồn tại") {
              setFieldError("name", "Sản phẩm đã tồn tại");
            } else {
              throw new Error(errorData.message || "Cập nhật sản phẩm thất bại");
            }
=======
      try {
        const res = await fetch(
          `http://localhost:3000/uploads/updateproduct/${id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          if (
            res.status === 400 &&
            errorData.message === "Sản phẩm đã tồn tại"
          ) {
            setFieldError("name", "Sản phẩm đã tồn tại");
          } else {
            throw new Error(errorData.message || "Cập nhật sản phẩm thất bại");
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
          }

          alert("Cập nhật sản phẩm thành công");
          router.push("/QuanlyProducts");
        } catch (error) {
          setFieldError("general", error.message);
        } finally {
          setSubmitting(false);
        }
      },
    });

<<<<<<< HEAD

  
 
  

=======
        alert("Cập nhật sản phẩm thành công");
        router.push("/QuanlyProducts");
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
  useEffect(() => {
    if (isProductLoaded && product) {
      formik.setValues({
        image: product.image || null,
        additionalImages: product.additionalImages || [],
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        discountedPrice: product.discountedPrice || "",
        size: product.size || [],
        quantity: product.quantity || 0,
        status: product.status || "out of stock",
        hot: product.hot || false,
        categoryId: product.categoryId || "",
        reviews: product.reviews || [], // Gán reviews từ product
        color: product.color || [],
      });
    }
  }, [isProductLoaded, product]);
<<<<<<< HEAD

  const handleAdditionalImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
  
    setAdditionalImages((prevImages) => [...prevImages, ...files]);
    setAdditionalImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };
  
  const handleRemoveAdditionalImage = (index, isOldImage) => {
    // Ngừng form submission trong khi xóa ảnh
    event.preventDefault();
  
    // Hiển thị modal xác nhận với sweetalert2
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa ảnh này?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng chọn "Đồng ý", thực hiện xóa ảnh và cập nhật trạng thái sau
        if (isOldImage) {
          // Xóa ảnh cũ trong `product`
          const updatedOldImages = product.additionalImages.filter((_, i) => i !== index);
          setProduct((prev) => ({
            ...prev,
            additionalImages: updatedOldImages,
          }));
        } else {
          // Xóa ảnh mới trong `additionalImages`
          const updatedNewImages = additionalImages.filter((_, i) => i !== index);
          const updatedNewPreviews = additionalImagePreviews.filter((_, i) => i !== index);
          setAdditionalImages(updatedNewImages);
          setAdditionalImagePreviews(updatedNewPreviews);
        }
    
        // Hiển thị thông báo thành công
        Swal.fire('Đã xóa!', 'Ảnh đã bị xóa thành công.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Nếu người dùng chọn "Hủy", không làm gì cả
        Swal.fire('Đã hủy', 'Ảnh không bị xóa.', 'error');
      }
    });
  };
  
  

  const handleEditReview = (index, newComment, newRating) => {
    const updatedReviews = [...formik.values.reviews];
    updatedReviews[index].comment = newComment;
    updatedReviews[index].rating = newRating;
    formik.setFieldValue("reviews", updatedReviews);
  };

  const handleToggleHideReview = (index) => {
    const updatedReviews = [...formik.values.reviews];
    updatedReviews[index].isHidden = !updatedReviews[index].isHidden;
    formik.setFieldValue("reviews", updatedReviews);
  };

  const handleRatingChange = (index, rating) => {
    const updatedReviews = [...formik.values.reviews];
    updatedReviews[index].rating = rating;
    formik.setFieldValue("reviews", updatedReviews);
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file); // Set file mới vào formik
      setImagePreview(URL.createObjectURL(file)); // Tạo preview ảnh mới
    }
  };
  
=======
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df

  if (!isProductLoaded) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <>
      <h1 className="title">Quản lý Sản phẩm</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link href="/addProduct" className="active">
              Sửa sản phẩm
            </Link>
          </li>
        </ul>
      </div>
      <div className="container-add mt-3">
        <div className="form_addproduct-add">
          <form onSubmit={formik.handleSubmit}>
            {/* Các trường input tương tự như trang AddProduct */}
            <div className="form-groupadd-1">
            <label>Hình ảnh</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="error">{formik.errors.image}</div>
            )}

            {/* Hiển thị ảnh cũ nếu có */}
            {oldImage && (
              <div>
                <p>Ảnh cũ:</p>
                <img
                  src={oldImage}
                  alt="Old Product"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}

            {/* Hiển thị ảnh mới nếu người dùng chọn ảnh mới */}
            {imagePreview && (
              <div>
                <p>Ảnh mới:</p>
                <img
                  src={imagePreview}
                  alt="New Product"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}

            {/* Nếu không có ảnh mới được chọn, hiển thị ảnh cũ */}
            {!imagePreview && !formik.values.image && !oldImage && (
              <p>No image available</p>
            )}
          </div>
          
          <div className="form-groupadd-1">
      <label>Ảnh phụ</label>
      <input
        type="file"
        multiple
        name="additionalImages"
        onChange={handleAdditionalImageChange}
      />
      {formik.touched.additionalImages && formik.errors.additionalImages && (
        <div className="error">{formik.errors.additionalImages}</div>
      )}

      {/* Hiển thị preview ảnh phụ mới */}
      <div className="additional-images-preview">
        {additionalImagePreviews.map((preview, index) => (
          <div key={index} className="additional-image-item">
            <img
              src={preview}
              alt={`Additional Preview ${index + 1}`}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                margin: "5px",
                position: "relative",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveAdditionalImage(index, false)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Hiển thị ảnh phụ cũ nếu có */}
              {product.additionalImages && product.additionalImages.length > 0 && (
          <div>
            <p>Ảnh phụ cũ:</p>
            {product.additionalImages.map((image, index) => (
              <div key={index} className="additional-image-item">
                <img
                  src={image}
                  alt={`Old Additional Image ${index + 1}`}
                  style={{ maxWidth: "100px", maxHeight: "100px", margin: "5px" }}
                />
                <button
                  onClick={() => handleRemoveAdditionalImage(index, true)}
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
    </div>



            <div className="form-groupadd-1">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Tên sản phẩm"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-groupadd-1">
              <label>Mô tả</label>
              <input
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Mô tả sản phẩm"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
            </div>

            <div className="form-groupadd-1">
              <label>Giá sản phẩm</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Giá sản phẩm"
              />
              {formik.touched.price && formik.errors.price && (
                <div className="error">{formik.errors.price}</div>
              )}
            </div>

            <div className="form-groupadd-1">
              <label>Giá giảm giá</label>
              <input
                type="number"
                name="discountedPrice"
                value={formik.values.discountedPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Giá giảm giá (tùy chọn)"
              />
              {formik.touched.discountedPrice &&
                formik.errors.discountedPrice && (
                  <div className="error">{formik.errors.discountedPrice}</div>
                )}
            </div>

            <div className="form-groupadd-1">
              <label>Kích thước</label>
              <input
                type="text"
                name="size"
                value={formik.values.size.join(", ")}
                onChange={(e) => {
                  formik.setFieldValue("size", e.target.value.split(","));
                }}
                onBlur={formik.handleBlur}
                placeholder="Các kích thước (Cách nhau bằng dấu phẩy)"
              />
              {formik.touched.size && formik.errors.size && (
                <div className="error">{formik.errors.size}</div>
              )}
            </div>

            <div className="form-groupadd-1">
                <label htmlFor="newColor">Màu sản phẩm</label>

                {/* Input để thêm màu mới */}
                <div className="color-input-container">
                  <input
                    id="newColor"
                    type="text"
                    placeholder="Nhập màu (ví dụ: #000000 hoặc black)"
                    value={formik.values.newColor || ""}
                    onChange={(e) => formik.setFieldValue("newColor", e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-color-btn"
                    onClick={() => {
                      const newColor = formik.values.newColor?.trim();
                      if (newColor && !formik.values.color.includes(newColor)) {
                        formik.setFieldValue("color", [...formik.values.color, newColor]);
                        formik.setFieldValue("newColor", ""); // Xóa input sau khi thêm
                      }
                    }}
                  >
                    Thêm
                  </button>
                </div>

                {/* Hiển thị các màu đã thêm */}
                <div className="color-list-container">
                  {formik.values.color.map((color, index) => (
                    <div key={index} className="color-item">
                      {/* Ô màu */}
                      <div
                        className="color-box"
                        style={{ backgroundColor: color }}
                        title={color} // Tooltip để hiển thị tên/mã màu
                      ></div>
                      {/* Nút xóa */}
                      <button
                        type="button"
                        className="remove-color-btn"
                        onClick={() =>
                          formik.setFieldValue(
                            "color",
                            formik.values.color.filter((_, i) => i !== index)
                          )
                        }
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>

                {/* Hiển thị lỗi nếu có */}
                {formik.touched.color && formik.errors.color && (
                  <div className="error">{formik.errors.color}</div>
                )}
              </div>


            <div className="form-groupadd-1">
              <label>Số lượng</label>
              <input
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Số lượng sản phẩm"
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="error">{formik.errors.quantity}</div>
              )}
            </div>

            <div className="form-groupadd-1">
              <label>Trạng thái</label>
              <select
                className="select-status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="out of stock">Hết hàng</option>
                <option value="in stock">Còn hàng</option>
              </select>
            </div>

            <div className="form-groupadd-1">
              <label>Danh mục</label>
              <select
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <div className="error">{formik.errors.categoryId}</div>
              )}
            </div>

            <div className="form-groupadd-1">
              <label>Sản phẩm nổi bật</label>
              <input
<<<<<<< HEAD
              className="checkboxpro"
=======
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
                type="checkbox"
                name="hot"
                checked={formik.values.hot}
                onChange={formik.handleChange}
              />
            </div>

<<<<<<< HEAD
            <div className="form-group">
          <label>Bình luận</label>
          <div>
            {formik.values.reviews.map((review, index) => (
              <div
                key={index}
                className={`review-item ${review.isHidden ? "review-hidden" : ""}`}
              >
                <div className="d-flex justify-content-between">
                  <strong>{review.userName}</strong>
                  <span className="badge badge-warning">{review.rating}⭐</span>
                </div>

                {/* Chỉnh sửa bình luận trực tiếp */}
                <textarea
                  value={review.comment}
                  onChange={(e) =>
                    handleEditReview(index, e.target.value, review.rating)
                  }
                  className="form-control"
                  rows="3"
                ></textarea>

                {/* Chỉnh sửa đánh giá sao */}
                <div className="rating">
                  <span
                    className={`star ${review.rating >= 1 ? "filled" : ""}`}
                    onMouseEnter={() => handleRatingChange(index, 1)}
                  >
                    ★
                  </span>
                  <span
                    className={`star ${review.rating >= 2 ? "filled" : ""}`}
                    onMouseEnter={() => handleRatingChange(index, 2)}
                  >
                    ★
                  </span>
                  <span
                    className={`star ${review.rating >= 3 ? "filled" : ""}`}
                    onMouseEnter={() => handleRatingChange(index, 3)}
                  >
                    ★
                  </span>
                  <span
                    className={`star ${review.rating >= 4 ? "filled" : ""}`}
                    onMouseEnter={() => handleRatingChange(index, 4)}
                  >
                    ★
                  </span>
                  <span
                    className={`star ${review.rating >= 5 ? "filled" : ""}`}
                    onMouseEnter={() => handleRatingChange(index, 5)}
                  >
                    ★
                  </span>
                </div>

                {/* Thay đổi nút ẩn hiển thị */}
                {isVisible ? (
                    <>
                      <FaEye onClick={toggleVisibility} style={{ cursor: 'pointer', marginRight: '10px' }} />
                      <span>Hiển thị bình luận</span>
                    </>
                  ) : (
                    <>
                      <FaEyeSlash onClick={toggleVisibility} style={{ cursor: 'pointer', marginRight: '10px' }} />
                      <span>Đã ẩn bình luận</span>
                    </>
                  )}
                      </div>
                    ))}
                  </div>
                </div>

=======
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
            <button type="submit" disabled={formik.isSubmitting}>
              Cập nhật sản phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
