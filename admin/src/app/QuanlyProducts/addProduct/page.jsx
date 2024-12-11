"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    getCategories();
  }, []);

<<<<<<< HEAD
  const [mainImage, setMainImage] = useState(null);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
          const res = await fetch('http://localhost:3000/categories');
          const data = await res.json();
          setCategories(data);
        };
        getCategories();
      }, []);

      const handleAddProduct = async (values, { setSubmitting, setFieldError }) => {
        const formData = new FormData();
        formData.append("image", mainImage);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("discountedPrice", values.discountedPrice);
        formData.append("size", JSON.stringify(values.size));
        formData.append("quantity", values.quantity);
        formData.append("status", values.status);
        formData.append("hot", values.hot);
        formData.append("categoryId", values.categoryId);
        formData.append("color", JSON.stringify(values.color));
        if (values.additionalImages) {
          Array.from(values.additionalImages).forEach((image) => {
              formData.append("images", image);  // Thêm ảnh phụ vào mảng images
          });
      }
        
        try {
          const res = await fetch("http://localhost:3000/uploads/addproduct", {
            method: "POST",
            body: formData,
          });
          if (!res.ok) {
            const errorData = await res.json();
            if (res.status === 400 && errorData.message === "Sản phẩm đã tồn tại") {
              setFieldError("name", "Sản phẩm đã tồn tại");
            } else {
              throw new Error(errorData.message || "Thêm sản phẩm thất bại");
            }
          }
          alert("Thêm sản phẩm thành công");
          router.push("/QuanlyProducts");
        } catch (error) {
          setFieldError("general", error.message);
        } finally {
          setSubmitting(false);
=======
  const handleAddProduct = async (values, { setSubmitting, setFieldError }) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discountedPrice", values.discountedPrice);
    formData.append("size", JSON.stringify(values.size));
    formData.append("quantity", values.quantity);
    formData.append("status", values.status);
    formData.append("hot", values.hot);
    formData.append("categoryId", values.categoryId);

    try {
      const res = await fetch("http://localhost:3000/uploads/addproduct", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 400 && errorData.message === "Sản phẩm đã tồn tại") {
          setFieldError("name", "Sản phẩm đã tồn tại");
        } else {
          throw new Error(errorData.message || "Thêm sản phẩm thất bại");
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
        }
      }
      alert("Thêm sản phẩm thành công");
      router.push("/QuanlyProducts");
    } catch (error) {
      setFieldError("general", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      image: null,
      additionalImages: [],
      preview: null,
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
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required("Vui lòng thêm hình ảnh"),
      additionalImages: Yup.array().of(Yup.mixed().required("Vui lòng thêm hình ảnh phụ")).optional(),
      name: Yup.string()
        .max(100, "Tên sản phẩm không quá 100 ký tự")
        .required("Vui lòng nhập tên sản phẩm"),
      description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
      price: Yup.number().required("Giá sản phẩm là bắt buộc"),
      discountedPrice: Yup.number().optional(),
      size: Yup.array().min(1, "Vui lòng chọn ít nhất một kích thước"),
      quantity: Yup.number().required("Vui lòng nhập số lượng sản phẩm"),
      status: Yup.string().required("Vui lòng chọn trạng thái sản phẩm"),
      hot: Yup.boolean(),
      categoryId: Yup.string().required("Vui lòng chọn danh mục sản phẩm"),
      color: Yup.array()
    .of(Yup.string()) // Định nghĩa mảng chứa các chuỗi
    .min(1, "Vui lòng thêm ít nhất một màu"),
    }),
    onSubmit: handleAddProduct,
  });

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
              Sản phẩm thêm mới
            </Link>
          </li>
        </ul>
        <div>
        <button
                className="btn btn-secondary"
                type="button"
                onClick={() => router.push("/QuanlyProducts")} 
              >
                Quay về
              </button>
        </div>
      </div>
      <div className="container-add mt-3">
        <div className="form_addproduct-add">
          <form onSubmit={formik.handleSubmit}>
          <div className="form-groupadd-1">
                <label>Hình ảnh</label>
                {formik.values.image && typeof formik.values.image !== "string" && (
                  <div>
                    <img
                      src={formik.values.preview || ""}
                      alt="Preview"
                      style={{ width: "200px", height: "auto", marginBottom: "10px" }}
                    />
                    <button
                      type="button"
                      className='add-color-btn ms-3'
                      onClick={() => {
                        formik.setFieldValue("image", null); // Xóa ảnh đã chọn
                        formik.setFieldValue("preview", null); // Xóa bản xem trước
                      }}
                    >
                      Đổi ảnh khác
                    </button>
                  </div>
                )}
                {!formik.values.image && (
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          formik.setFieldValue("preview", reader.result); // Gán URL xem trước
                        };
                        reader.readAsDataURL(file);
                        formik.setFieldValue("image", file); // Gán file ảnh
                      }
                    }}
                  />
                )}
                {formik.touched.image && formik.errors.image && (
                  <div className="error">{formik.errors.image}</div>
                )}
              </div>
              <div className="form-groupadd-1">
                <label htmlFor="additionalImages">Hình ảnh phụ:</label>
                
                {/* Input để chọn ảnh */}
                <input
                  type="file"
                  id="additionalImages"
                  name="additionalImages"
                  onChange={(event) => {
                    const files = event.currentTarget.files;
                    if (files) {
                      // Thêm các ảnh mới vào mảng hiện tại mà không xóa ảnh cũ
                      formik.setFieldValue(
                        "additionalImages",
                        [...formik.values.additionalImages, ...files]
                      );
                    }
                  }}
                  multiple
                />

                {/* Hiển thị ảnh phụ đã chọn */}
                {formik.values.additionalImages && formik.values.additionalImages.length > 0 && (
                  <div>
                    {Array.from(formik.values.additionalImages).map((image, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          style={{ width: "100px", height: "auto" }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newAdditionalImages = [...formik.values.additionalImages];
                            newAdditionalImages.splice(index, 1); // Xóa ảnh khỏi mảng
                            formik.setFieldValue("additionalImages", newAdditionalImages);
                          }}
                          className="remove-image-btn"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {formik.errors.additionalImages && formik.touched.additionalImages && (
                  <div>{formik.errors.additionalImages}</div>
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
                    onChange={(e) => formik.setFieldValue("newColor", e.target.value.trim())}
                  />
                  <button
                    type="button"
                    className="add-color-btn"
                    onClick={() => {
                      const newColor = formik.values.newColor?.trim();

                      // Hàm kiểm tra xem màu có hợp lệ hay không
                      const isValidColor = (color) => {
                        const s = new Option().style;
                        s.color = color;
                        return s.color !== ""; 
                      };

                      // Kiểm tra giá trị hợp lệ trước khi thêm
                      if (newColor && isValidColor(newColor)) {
                        if (!formik.values.color.includes(newColor)) {
                          formik.setFieldValue("color", [...formik.values.color, newColor]); // Thêm màu hợp lệ
                          formik.setFieldValue("newColor", ""); // Xóa input sau khi thêm
                        } else {
                          alert("Màu này đã tồn tại!");
                        }
                      } else {
                        alert("Vui lòng nhập mã màu hợp lệ (VD: #000000) hoặc tên màu (VD: red).");
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
              {formik.touched.status && formik.errors.status && (
                <div className="error">{formik.errors.status}</div>
              )}
            </div>

            <div className="form-groupadd-1">
              <label>Sản phẩm hot</label>
              <input
                className="checkboxpro"
                type="checkbox"
                name="hot"
                checked={formik.values.hot}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-groupadd-1">
              <label>Danh mục</label>
              <select
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="Chọn danh mục" />
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Đang tải danh mục...</option>
                )}
              </select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <div className="error">{formik.errors.categoryId}</div>
              )}
            </div>
            

            <button
              className="buttonadd"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Thêm Sản phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
