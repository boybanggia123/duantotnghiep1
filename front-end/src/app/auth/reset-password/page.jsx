"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PasswordResetForm from "../../components/PasswordResetForm";
import SignInModal from "@/app/components/SignInModal";

export default function ResetPasswordPage() {
  const [showModal, setShowModal] = useState(false); // Quản lý trạng thái modal
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handlePasswordSubmit = async (newPassword) => {
    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
<<<<<<< HEAD
        alert(data.message);  // Nếu thành công, hiển thị thông báo thành công
        router.push("/"); // Điều hướng tới trang đăng nhập
=======
        alert(data.message); // Nếu thành công, hiển thị thông báo thành công
        setShowModal(true);
>>>>>>> 5782ca3b2c0b949f09af7a4d8467932d5f7732df
      } else {
        alert(data.message); // Nếu có lỗi, hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return email ? (
    <>
      <PasswordResetForm onSubmit={handlePasswordSubmit} />
      <SignInModal showModal={showModal} setShowModal={setShowModal} />
    </>
  ) : (
    <p>Loading...</p>
  );
}
