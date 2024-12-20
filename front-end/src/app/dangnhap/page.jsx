"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

export default function DangNhapPage() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname(); // Dùng usePathname để lấy đường dẫn

  useEffect(() => {
    if (pathname === "/dangnhap") {
      setShowModal(true);
    }
  }, [pathname]);

  return (
    <div>
      <div
        className="modal fade"
        id="signInModal"
        tabIndex="-1"
        aria-labelledby="signInModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <img className="login_img" src="/img/logo_fashion.png" alt="" />
            <div className="modal-header">
              <h5 className="modal-title" id="signInModalLabel">
                Đăng nhập
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link href="/auth/email" className="text-body">
                    Forgot password?
                  </Link>
                </div>

                <div className="login_text text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg"
                    disabled={formik.isSubmitting}
                  >
                    Đăng nhập
                  </button>
                  {formik.errors.general && (
                    <div className="text-danger mt-2">
                      {formik.errors.general}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <p className="small fw-bold mb-0">
                Bạn chưa có tài khoản?{" "}
                <Link href="/dangky" className="link-danger">
                  Đăng ký
                </Link>
              </p>
              <button
                type="button"
                className="login_dong btn"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
