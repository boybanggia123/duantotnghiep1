import Link from "next/link";

export default function SignIn() {
    return (
        <section class="vh-100 vw-100">
            <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                <img id="banner-login" src="img/banner-login.png"
                    class="img-fluid" alt="Sample image"/>
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                    <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-floating mx-1">
                            <i class="bi bi-facebook"></i>
                        </button>
  
                        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-floating mx-1">
                            <i class="bi bi-google"></i>
                        </button>
  
                        <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-floating mx-1">
                            <i class="bi bi-linkedin"></i>
                        </button>
                    </div>
        
                    <div class="divider d-flex align-items-center my-4">
                    <p class="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>
        
                    <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form3Example3">Email address or username</label>
                    <input type="email" id="email" name="email" ngModel required email class="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                    </div>
        
                    <div data-mdb-input-init class="form-outline mb-3">
                    <label class="form-label" for="form3Example4">Password</label>
                    <input type="password" id="password" name="password" ngModel required class="form-control form-control-lg"
                        placeholder="Enter password" minlength="6" />
                    </div>
        
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check mb-0">
                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label class="form-check-label" for="form2Example3">
                        Remember me
                        </label>
                    </div>
                    <a href="#!" class="text-body">Forgot password?</a>
                    </div>
        
                    <div class="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" class="btn btn-danger btn-lg" routerLink="/quan_ly"
                        >Đăng nhập
                        </button>

                    <p class="small fw-bold mt-2 pt-1 mb-0">Bạn chưa có tài khoản? <a href="#!" routerLink="/dang_ky"
                        class="link-danger">Đăng ký</a></p>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </section>
    );
}