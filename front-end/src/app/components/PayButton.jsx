"use client"
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.user);
  const [couponCode, setCouponCode] = useState("");

  const handleCheckout = () => {
    const token = Cookies.get("token"); 
  
    axios
      .post(
        `http://localhost:3000/stripe/create-checkout-session`,
        {
          cartItems,
          userId: user._id,
          couponId: couponCode || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token để xác thực (nếu cần)
          },
      
        }
         
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
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
        onClick={() => handleCheckout()}
      >
        {" "}
        Checkout
      </button>
    </>
  );
};

export default PayButton;
