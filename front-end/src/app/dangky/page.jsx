import Link from "next/link";

export default function SignUp() {
    return (
        <section class="gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card">
                <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
                    <p class=" mb-5">Please fill in your information completely</p>
                    <form>
                        <div data-mdb-input-init class="form-outline form-white mb-4">
                        <label class="form-label d-block text-start">
                            Fill in your email
                        </label>
                        <input type="email" id="email" formControlName="email" class="form-control form-control-lg" placeholder="Email" />
                        </div>

                        <div data-mdb-input-init class="form-outline form-white mb-4">
                        <label class="form-label d-block text-start">
                            Fill in your full name
                        </label>
                        <input type="text" id="fullname" formControlName="fullname" class="form-control form-control-lg" placeholder="Full name" />
                        </div>

                        <div data-mdb-input-init class="form-outline form-white mb-4">
                        <label class="form-label d-block text-start">
                            Fill in your username
                        </label>
                        <input type="text" id="username" formControlName="username" class="form-control form-control-lg" placeholder="Username" />
                        </div>

                        <div data-mdb-input-init class="form-outline form-white mb-4">
                        <label class="form-label d-block text-start">
                            Fill in your password
                        </label>
                        <input type="password" id="password" formControlName="password" class="form-control form-control-lg" placeholder="Password" />
                        </div>

                        <div data-mdb-input-init class="form-outline form-white mb-4">
                        <label class="form-label d-block text-start">
                            Fill in your confirm password
                        </label>
                        <input type="password" id="passConfirm" formControlName="passConfirm" class="form-control form-control-lg" placeholder="Confirm password" />
                        </div>
                    </form>
                    <p class="small mb-5 pb-lg-2"><a href="#!" class="text-dark">Forgot password?</a></p>

                    <button type="submit" class="btn btn-danger btn-lg px-5" 
                    routerLink="/dang_nhap">Đăng ký
                    </button> 
                    
                    <div class="d-flex justify-content-center text-center mt-4 pt-1 gap-4">
                        <a href="#!" class="text-dark"><i class="fa fa-facebook"></i></a>
                        <a href="#!" class="text-dark"><i class="fa fa-google"></i></a>
                        <a href="#!" class="text-dark"> <i class="fa fa-linkedin"></i></a>
                    </div>

                    </div>

                    <div>
                    <p class="mb-0">Bạn đã có tài khoản? <a href="#!" routerLink="/dang_nhap"  class="text-danger fw-bold">Đăng nhập</a>
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