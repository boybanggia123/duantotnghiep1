"use client";
import React, { useState, useEffect } from "react";

export default function InfoPage() {
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
  const [tokenValue, setTokenValue] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  // Lấy token và fetch thông tin người dùng
  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      // Nếu không có token, chuyển hướng về trang đăng nhập
      window.location.href = "/dangnhap";
      return;
    }

    setTokenValue(token);

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/detailuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser((prev) => ({
          ...prev,
          ...data,
          avatarUrl: `http://localhost:3000/img/${data.avatar}`,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Xử lý thay đổi file ảnh đại diện
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Cập nhật thông tin người dùng
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
      formData.append("avatar", selectedFile);
    }

    try {
      const res = await fetch("http://localhost:3000/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Cập nhật thông tin thành công!");
        setUser((prev) => ({
          ...prev,
          avatar: data.updatedUser?.avatar || prev.avatar,
          avatarUrl: `http://localhost:3000/img/${data.updatedUser?.avatar || prev.avatar}`,
        }));
      } else {
        alert(data.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row">
      <div className="col-5">
        <form onSubmit={handleUpdateUser}>
          <h5 className="fw-bold">Hồ Sơ Của Tôi</h5>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <h5>THÔNG TIN LIÊN HỆ</h5>
          <div id="form-info" className="flex-column d-flex gap-3">
            <div className="username">
              <label>Tên của bạn</label>
              <input
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="email">
              <label>Địa chỉ email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="phone">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="address">
              <label>Địa chỉ nhận hàng</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="gender">
              <label>Giới tính</label>
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
              <label>Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-primary">Lưu lại</button>
        </form>
      </div>
      <div id="box-avatar" className="col-4">
        <div className="avatar-wrapper">
          <img
            id="avatar-img"
            src={avatarPreview || user.avatarUrl}
            alt="Avatar"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <label htmlFor="avatar-input" className="avatar-overlay" style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "24px", color: "white" }}>+</span>
          </label>
          <input
            type="file"
            id="avatar-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
