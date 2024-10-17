import Link from "next/link";

export default function SignUp() {
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign up</h2>
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
                      </label>
                      <input
                        type="password"
                        id="password"
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

                  <div className="d-flex justify-content-center text-center mt-4 pt-1 gap-4">
                    <a href="#!" className="text-dark">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#!" className="text-dark">
                      <i className="fa fa-google"></i>
                    </a>
                    <a href="#!" className="text-dark">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
