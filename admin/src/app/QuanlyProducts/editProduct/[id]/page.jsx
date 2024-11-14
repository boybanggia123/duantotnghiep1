"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function EditProduct({ params }) {
  const router = useRouter();
  const id = params.id; // Nhận id từ params trong Next.js.

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null); // Để lưu thông tin sản phẩm
<<<<<<< HEAD
=======
  const [isProductLoaded, setIsProductLoaded] = useState(false); // Cờ kiểm soát sản phẩm đã được tải chưa
>>>>>>> 92edceaf3caffa300f7fcc6bbe0bc8075b204b11

  // Lấy danh mục sản phẩm
  useEffect(() => {
    const getCategories = async () => {
<<<<<<< HEAD
      const res = await fetch('http://localhost:3000/categories');
=======
      const res = await fetch("http://localhost:3000/categories");
>>>>>>> 92edceaf3caffa300f7fcc6bbe0bc8075b204b11
      const data = await res.json();
      setCategories(data);
    };
    getCategories();

    // Lấy thông tin sản phẩm cần sửa
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3000/productdetail/${id}`);
      const data = await res.json();
      setProduct(data);
<<<<<<< HEAD
    };

    if (id) {
      getProduct(); // Lấy thông tin sản phẩm khi có id
    }
  }, [id]); // Chỉ cần theo dõi id thôi
=======
      setIsProductLoaded(true); 
    };

    if (id) {
      getProduct(); 
    }
  }, [id]); 

>>>>>>> 92edceaf3caffa300f7fcc6bbe0bc8075b204b11

  const formik = useFormik({
    initialValues: {
      image: null,
      name: "",
      description: "",
      price: "",
      discountedPrice: "",
      size: [],
      quantity: 0,
      status: "out of stock",
      hot: false,
      categoryId: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed().required("Vui lòng thêm hình ảnh"),
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
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
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
        const res = await fetch(`http://localhost:3000/uploads/updateproduct/${id}`, {
          method: "PUT",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Sản phẩm đã tồn tại") {
            setFieldError("name", "Sản phẩm đã tồn tại");
          } else {
            throw new Error(errorData.message || "Cập nhật sản phẩm thất bại");
          }
        }

        alert("Cập nhật sản phẩm thành công");
<<<<<<< HEAD
        router.push("/QuanlyProducts"); // Quay về danh sách sản phẩm sau khi cập nhật
=======
        router.push("/QuanlyProducts"); 
>>>>>>> 92edceaf3caffa300f7fcc6bbe0bc8075b204b11
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

<<<<<<< HEAD
  // Đảm bảo khi thông tin sản phẩm được tải xong, form sẽ được cập nhật
  useEffect(() => {
    if (product && formik.setFieldValue) {
      formik.setFieldValue('name', product.name);
      formik.setFieldValue('price', product.price);
      formik.setFieldValue('description', product.description);
      formik.setFieldValue('categoryId', product.categoryId);
      formik.setFieldValue('discountedPrice', product.discountedPrice);
      formik.setFieldValue('size', product.size);
      formik.setFieldValue('quantity', product.quantity);
      formik.setFieldValue('status', product.status);
      formik.setFieldValue('hot', product.hot);
    }
  }, [product, formik]);

=======

  useEffect(() => {
    if (isProductLoaded && product) {
      formik.setValues({
        image: product.image || null,
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        discountedPrice: product.discountedPrice || "",
        size: product.size || [],
        quantity: product.quantity || 0,
        status: product.status || "out of stock",
        hot: product.hot || false,
        categoryId: product.categoryId || "",
      });
    }
  }, [isProductLoaded, product]); 

  if (!isProductLoaded) {
    return <p>Đang tải dữ liệu...</p>;
  }
>>>>>>> 92edceaf3caffa300f7fcc6bbe0bc8075b204b11
  return (
    <>
      <h1 className="title">Quản lý Sản phẩm</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li><Link href="/">Home</Link></li>
          <li className="divider">/</li>
          <li><Link href="/addProduct" className="active">Sửa sản phẩm</Link></li>
        </ul>
      </div>
      <div className="container-add">
        <div className="form_addproduct-add">
          <form onSubmit={formik.handleSubmit}>
            {/* Các trường input tương tự như trang AddProduct */}
            <div className="form-groupadd-1">
              <label>Hình ảnh</label>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  formik.setFieldValue("image", file);
                }}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="error">{formik.errors.image}</div>
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
              {formik.touched.discountedPrice && formik.errors.discountedPrice && (
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
              <label >Sản phẩm hot</label>
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

            <button className="buttonadd" type="submit" disabled={formik.isSubmitting}>
              Cập nhật Sản phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

