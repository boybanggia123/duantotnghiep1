"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function addCategory() {

    

      const handleAddProduct = async (values, { setSubmitting, setFieldError }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);

        try {
          const res = await fetch("http://localhost:3000/uploads/addcategory", {
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
          router.push("/QuanlyCategories");
        } catch (error) {
          setFieldError("general", error.message);
        } finally {
          setSubmitting(false);
        }
      };
     

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
     
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Tên sản phẩm không quá 100 ký tự")
        .required("Vui lòng nhập tên sản phẩm"),
      description: Yup.string().required("Vui lòng nhập mô tả sản phẩm"),
      
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
      </div>
      <div className="container-add">
        <div className="form_addproduct-add">
          <form onSubmit={formik.handleSubmit}>

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
            <button className="buttonadd" type="submit" disabled={formik.isSubmitting}>
              Thêm Sản phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
