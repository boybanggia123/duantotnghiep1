"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Info() {
<<<<<<< HEAD
  const [user, setUser] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    avatar: "",
    role: "",
    createdAt: "",
    gender: "",
    dateOfBirth: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Lấy token từ cookie ở browser
  const token = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  const tokenValue = token?.split("=")[1];

  // Nếu không có token, chuyển hướng tới trang đăng nhập
  if (!tokenValue) {
    window.location.href = "/dangnhap";
  }

  // Lấy thông tin user bằng token
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("http://localhost:3000/detailuser", {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      const data = await res.json();
      setUser(data);
    };

    if (tokenValue) {
      getUser();
    }
  }, [tokenValue]);

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", user.fullname);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("gender", user.gender);
    formData.append("dateOfBirth", user.dateOfBirth);
    if (selectedFile) {
      formData.append("avatar", selectedFile); // Thêm file hình ảnh vào form data
    }

    const response = await fetch("http://localhost:3000/updateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data);
    // Cập nhật lại thông tin người dùng sau khi cập nhật thành công
    if (response.ok) {
      setUser((prevUser) => ({
        ...prevUser,
        avatar: data.updatedUser.avatar, // Cập nhật lại ảnh đại diện nếu có thay đổi
      }));
    }
  };

  // Hàm xử lý tải lên ảnh đại diện
  const handleUploadAvatar = () => {
    if (!selectedFile) {
      alert("Vui lòng chọn một hình ảnh để tải lên.");
      return;
    }
    handleUpdateUser(new Event("submit"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/dangnhap";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Link href={"/"} id="back-home" className="fw-bold d-flex gap-1">
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
            <button onClick={handleLogout} className="btn btn-link">
              Đăng xuất
            </button>
=======
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
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
          </div>
        </div>
        <div className="col-5">
          <form onSubmit={handleUpdateUser}>
            <div className="">
              <div id="my-info">
                <h5 className="fw-bold">Hồ Sơ Của Tôi</h5>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              </div>
              <h5>THÔNG TIN LIÊN HỆ</h5>
              <div id="form-info" className="flex-column d-flex gap-3">
                <div className="username">
                  <label htmlFor="">Tên của bạn</label> <br />
                  <input
                    type="text"
                    name="fullname"
                    value={user.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="email">
                  <label htmlFor="">Địa chỉ email</label> <br />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="phone">
                  <label htmlFor="">Số điện thoại</label> <br />
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-100"
                  required
                />
                <div className="gender">
                  <label htmlFor="">Giới tính</label> <br />
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={user.gender === "male"}
                      onChange={handleChange}
                    />{" "}
                    Nam
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={user.gender === "female"}
                      onChange={handleChange}
                    />{" "}
                    Nữ
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={user.gender === "other"}
                      onChange={handleChange}
                    />{" "}
                    Khác
                  </div>
                </div>
                <div className="birthday">
                  <label htmlFor="">Ngày sinh</label> <br />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="save-info d-flex justify-content-between align-items-center">
                <button id="btn-save" className="">
                  Lưu lại
                </button>
                <div className="reset-pass fs-6">
                  <i className="bi bi-key-fill"></i>
                  <a href="" className="text-decoration-underline">
                    Đặt lại mật khẩu của bạn
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-4">
          <div
            id="box-avatar"
            className="flex-column d-flex align-items-center gap-4"
          >
            <div>
              <img
                src={`http://localhost:3000/images/${user.avatar}`}
                alt="Avatar"
              />
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUploadAvatar}>Chọn ảnh đại diện</button>
          </div>
        </div>
      </div>
    </div>
  );
}
