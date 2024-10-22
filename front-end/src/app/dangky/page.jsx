"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
<<<<<<< HEAD
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .max(30, "Họ và tên không quá 30 kí tự")
        .required("Vui lòng nhập họ tên"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone phải là 10 chữ số")
        .required("Vui lòng nhập số điện thoại"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: values.fullname,
            phone: values.phone,
            email: values.email,
            password: values.password,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        }
        alert("Đăng ký thành công");
        router.push("/dangnhap");
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

=======
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
<<<<<<< HEAD
                  <p className="mb-5">
                    Please fill in your information completely
                  </p>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <label className="form-label d-block text-start">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="form-control form-control-lg"
                        placeholder="Full name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullname}
                      />
                      {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="text-danger">
                          {formik.errors.fullname}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label d-block text-start">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control form-control-lg"
                        placeholder="Phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                      ) : null}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label d-block text-start">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label d-block text-start">
                        Password
=======
                  <p className=" mb-5">
                    Please fill in your information completely
                  </p>
                  <form>
                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <label className="form-label d-block text-start">
                        Fill in your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        formControlName="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <label className="form-label d-block text-start">
                        Fill in your full name
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        formControlName="fullname"
                        className="form-control form-control-lg"
                        placeholder="Full name"
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <label className="form-label d-block text-start">
                        Fill in your username
                      </label>
                      <input
                        type="text"
                        id="username"
                        formControlName="username"
                        className="form-control form-control-lg"
                        placeholder="Username"
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <label className="form-label d-block text-start">
                        Fill in your password
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
                      </label>
                      <input
                        type="password"
                        id="password"
<<<<<<< HEAD
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label d-block text-start">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        className="form-control form-control-lg"
                        placeholder="Confirm password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                      />
                      {formik.touched.rePassword && formik.errors.rePassword ? (
                        <div className="text-danger">
                          {formik.errors.rePassword}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger btn-lg px-5"
                      disabled={formik.isSubmitting}
                    >
                      Đăng ký
                    </button>

                    {formik.errors.general && (
                      <div className="text-danger mt-3">
                        {formik.errors.general}
                      </div>
                    )}
                  </form>

                  <p className="small mt-3">
                    <Link href="/forgot-password" className="text-dark">
                      Forgot password?
                    </Link>
                  </p>

=======
                        formControlName="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <label className="form-label d-block text-start">
                        Fill in your confirm password
                      </label>
                      <input
                        type="password"
                        id="passConfirm"
                        formControlName="passConfirm"
                        className="form-control form-control-lg"
                        placeholder="Confirm password"
                      />
                    </div>
                  </form>
                  <p className="small mb-5 pb-lg-2">
                    <a href="#!" className="text-dark">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    type="submit"
                    className="btn btn-danger btn-lg px-5"
                    routerLink="/dang_nhap"
                  >
                    Đăng ký
                  </button>

>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
                  <div className="d-flex justify-content-center text-center mt-4 pt-1 gap-4">
                    <a href="#!" className="text-dark">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#!" className="text-dark">
                      <i className="fa fa-google"></i>
                    </a>
                    <a href="#!" className="text-dark">
<<<<<<< HEAD
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>

                  <p className="mb-0 mt-3">
                    Bạn đã có tài khoản?{" "}
                    <Link href="/dangnhap" className="text-danger fw-bold">
                      Đăng nhập
                    </Link>
                  </p>
                </div>
=======
                      {" "}
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Bạn đã có tài khoản?{" "}
                    <a
                      href="#!"
                      routerLink="/dang_nhap"
                      className="text-danger fw-bold"
                    >
                      Đăng nhập
                    </a>
                  </p>
                </div>
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
