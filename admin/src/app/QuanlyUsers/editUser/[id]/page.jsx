"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function EditUser({ params }) {
  const router = useRouter();
  const id = params.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu chi tiết người dùng
    const getUser = async () => {
      const res = await fetch(`http://localhost:3000/userdetail/${id}`);
      const data = await res.json();
      setUser(data);
      // Đặt giá trị cho form nếu có
      setValue("avatar", data.avatar);
      setValue("fullname", data.fullname);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("address", data.address);
      setValue("createdAt", data.createdAt);
      setValue("role", data.role);
      setValue("dateOfBirth", data.dateOfBirth);
      setValue("password", data.password);
    };
    if (id) {
      getUser();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    // Tạo FormData để gửi file và các trường dữ liệu
    const formData = new FormData();

    // Chỉ gửi các trường có thay đổi hoặc có giá trị
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== user[key]) {
        formData.append(key, data[key]);
      }
    }

    // Nếu có ảnh avatar, gửi ảnh lên server
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    const res = await fetch(`http://localhost:3000/updateuser/${id}`, {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();
    if (!result.error) {
      router.push("/QuanlyUsers");
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <h1 className="title">Quản lý Users</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link href="/addUser" className="active">
              User Edit
            </Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="form_adduser">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="form-group-1">
              <label>Avatar</label>
              <input type="file" name="avatar" {...register("avatar")} />
              {errors.avatar && (
                <div className="errors">{errors.avatar.message}</div>
              )}
            </div>

            <div className="form-group-1">
              <label>Họ & Tên</label>
              <input
                type="text"
                name="fullname"
                placeholder="Họ & Tên"
                {...register("fullname")}
              />
              {errors.fullname && (
                <div className="errors">{errors.fullname.message}</div>
              )}
            </div>

            <div className="form-group-1">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Điền Email"
                {...register("email")}
              />
              {errors.email && (
                <div className="errors">{errors.email.message}</div>
              )}
            </div>

            <div className="form-group-1">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                placeholder="Điền SĐT"
                {...register("phone")}
              />
              {errors.phone && (
                <div className="errors">{errors.phone.message}</div>
              )}
            </div>

            <div className="form-group-1">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                placeholder="Điền Địa chỉ nhà?"
                {...register("address")}
              />
              {errors.address && (
                <div className="errors">{errors.address.message}</div>
              )}
            </div>

            <div className="form-group-1">
              <label>Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <div className="errors">{errors.dateOfBirth.message}</div>
              )}
            </div>

            <div className="form-group-1">
              <label>Quyền</label>
              <select name="role" {...register("role")}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <div className="errors">{errors.role.message}</div>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Cập nhật tài khoản
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
