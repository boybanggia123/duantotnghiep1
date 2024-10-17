import Link from "next/link";

export default function SignIn() {
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
                </div>
            </div>
            </div>
        </section>
    );
}