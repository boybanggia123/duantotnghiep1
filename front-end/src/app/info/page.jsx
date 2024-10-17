import Link from "next/link";

export default function Info() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-3">
                <Link href={'/'} id="back-home" className="fw-bold d-flex gap-1">
                    <i className="bi bi-arrow-left"></i>
                    <span>Quay lại trang chủ</span>
                </Link>
                <ul id="list-nav-info" className="nav flex-column gap-3">
                    <li className="fw-bold d-flex gap-1">
                        <i className="bi bi-pencil-square"></i>
                        <span>Thông tin của tôi</span>
                    </li>
                    <li className="fw-bold d-flex gap-1">
                        <i className="bi bi-receipt-cutoff"></i>
                        <span>Đơn hàng của tôi</span>
                    </li>
                    <li className="fw-bold d-flex gap-1">
                        <i className="bi bi-bell-fill"></i>
                        <span>Thông báo</span>
                    </li>
                    <li className="fw-bold d-flex gap-1">
                        <i className="bi bi-telephone-fill"></i>
                        <span>Trung tâm trợ giúp</span>
                    </li>
                </ul>
                <div id="log-out" className="d-flex gap-1 text-danger fw-bold">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Đăng xuất</span>
                </div>
            </div>
            <div className="col-5">
                <div id='my-info' className="">
                    <h5 className="fw-bold">Hồ Sơ Của Tôi</h5>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <h5>THÔNG TIN LIÊN HỆ</h5>
                <div id='form-info' className="flex-column d-flex gap-3"> 
                    <div className="username">
                        <label htmlFor="">Tên của bạn</label> <br />
                        <input type="text" className="w-100" value={"Đạt Nguyễn Tấn"} />
                    </div>
                    <div className="email">
                        <label htmlFor="">Địa chỉ email</label> <br />
                        <input type="text" className="w-100" value={"datnt***24@gmail.com"} />
                    </div>
                    <div className="phone">
                        <label htmlFor="">Số điện thoại</label> <br />
                        <input type="text" className="w-100" value={"+84964620344"} />
                    </div>
                    <div className="address">
                        <label htmlFor="">Địa chỉ nhận hàng</label> <br />
                        <input type="text" className="w-100" value={"Hẻm tổ 4, KP 1, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh"} />
                    </div>
                    <div className="gender">
                        <label htmlFor="">Giới tính</label> <br />
                        <div className="d-flex gap-2">
                            <input type="radio" name="gender" /> Nam
                            <input type="radio" name="gender" /> Nữ
                            <input type="radio" name="gender" /> Khác
                        </div>
                    </div>
                    <div className="birthday">
                        <label htmlFor="">Ngày sinh</label> <br />
                        <input type="date" name="" id="" />
                    </div>
                </div>
                <div className="save-info d-flex justify-content-between align-items-center">
                    <button id="btn-save" className="">Lưu lại</button>
                    <div className="reset-pass fs-6">
                        <i className="bi bi-key-fill"></i>
                        <a href="" className="text-decoration-underline"> Đặt lại mật khẩu của bạn</a>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div id="box-avatar" className="flex-column d-flex align-items-center gap-4">
                    <div>
                        <img src="img/Avatar/avt.jpg" alt="" />
                    </div>
                    <button>Chọn ảnh đại diện</button>
                </div>
            </div>
          </div>
        </div>
    );
}