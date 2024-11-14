import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Giải mã token JWT
const decodeToken = (token) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const PayButton = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Lấy token từ cookie
    const token = Cookies.get("token");
  
    if (token) {
      // Giải mã token để lấy thông tin người dùng (ví dụ userId)
      const decoded = decodeToken(token);
      console.log("Decoded token:", decoded);
      setUserId(decoded?.userId); // Lưu userId vào state
    }
  }, []); // Chạy chỉ một lần khi component mount
  
  useEffect(() => {
    // Kiểm tra nếu có userId trước khi gửi yêu cầu API
    if (userId) {
      axios
        .get(`http://localhost:3000/cart/${userId}`)
        .then((res) => {
          console.log("Cart items from API:", res.data); // Kiểm tra dữ liệu trả về
          setCartItems(res.data); // Giả sử backend trả về một mảng giỏ hàng trực tiếp
        })
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [userId]); // Chạy lại khi userId thay đổi
  

  const handleCheckout = async () => {
    const token = Cookies.get("token");
    console.log("Token:", token); // Kiểm tra token
    console.log("Cart Items:", cartItems); // Kiểm tra giỏ hàng
    console.log("User ID:", userId); // Kiểm tra userId từ state
  
    if (!token || !cartItems || cartItems.length === 0 || !userId) {
      alert("Vui lòng kiểm tra thông tin trước khi thanh toán.");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await axios.post(
        `http://localhost:3000/stripe/create-checkout-session`,
        {
          cartItems,
          userId, // Sử dụng userId lấy từ state
          couponId: couponCode || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (res.data.url) {
        window.location.href = res.data.url;

      } else {
        alert("Không thể tạo phiên thanh toán.");
      }
    } catch (err) {
      console.error("Lỗi khi tạo phiên thanh toán:", err);
  
      if (err.response?.data?.message) {
        alert(`Lỗi: ${err.response.data.message}`);
      } else {
        alert("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <input
        type="text"
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="form-control mt-3"
      />
      <button
        className="btn btn-dark w-100 mt-3"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Checkout"}
      </button>
    </>
  );
};

export default PayButton;
