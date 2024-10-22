"use client";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignIn() {
<<<<<<< HEAD
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
      password: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

        const token = data.token;
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          window.location.href = "http://localhost:3002";
        } else {
          alert("đăng nhập thành công");
          window.location.href = "/";
        }
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="vh-100 vw-100">
      <div className="container-fluid h-custom ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5 supimg-dn">
            <img
              id="banner-login"
              src="img/banner-login.jpg"
              className="img-fluid  "
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  className="btn btn-dark btn-floating mx-1"
                >
                  <i className="bi bi-facebook"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-floating mx-1"
                >
                  <i className="bi bi-google"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-floating mx-1"
                >
                  <i className="bi bi-linkedin"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address or username
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
=======
    return (
        <section className="vh-100 vw-100">
            <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                <img id="banner-login" src="img/banner-login.png"
                    className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                        <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-floating mx-1">
                            <i className="bi bi-facebook"></i>
                        </button>
  
                        <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-floating mx-1">
                            <i className="bi bi-google"></i>
                        </button>
  
                        <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-floating mx-1">
                            <i className="bi bi-linkedin"></i>
                        </button>
                    </div>
        
                    <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>
        
                    <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="form3Example3">Email address or username</label>
                    <input type="email" id="email" name="email" ngModel required email className="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                    </div>
        
                    <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" for="form3Example4">Password</label>
                    <input type="password" id="password" name="password" ngModel required className="form-control form-control-lg"
                        placeholder="Enter password" minlength="6" />
                    </div>
        
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label className="form-check-label" for="form2Example3">
                        Remember me
                        </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                    </div>
        
                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-danger btn-lg" routerLink="/quan_ly"
                        >Đăng nhập
                        </button>

                    <p className="small fw-bold mt-2 pt-1 mb-0">Bạn chưa có tài khoản? <a href="#!" routerLink="/dang_ky"
                        className="link-danger">Đăng ký</a></p>
                    </div>
                </form>
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-danger btn-lg"
                  disabled={formik.isSubmitting}
                >
                  Đăng nhập
                </button>
                {formik.errors.general && (
                  <div className="text-danger mt-2">
                    {formik.errors.general}
                  </div>
                )}
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Bạn chưa có tài khoản?{" "}
                  <Link href={"/dangky"} className="link-danger">
                    Đăng ký
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
