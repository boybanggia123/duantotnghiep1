"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";  // Import the js-cookie library

export default function InfoBill() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userId, setUserId] = useState(null); // Add state to store userId

  useEffect(() => {
    // Retrieve the JWT token from cookies
    const token = Cookies.get("token");  // Replace with your cookie name for the token

    if (token) {
      // Decode the JWT token (you can use jwt-decode or manually if you prefer)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token

      setUserId(decodedToken.userId); // Set the userId from the decoded token
    }
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:3000/stripe/orderuser/${userId}`);
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [userId]); // Fetch orders when userId is available

  const handleOrderClick = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/stripe/orders/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data); // Cập nhật thông tin chi tiết đơn hàng
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="col-9">
      <div className="container mt-3">
        <h2>Thông tin mua hàng</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.shipping.name}</td>
                  <td>{order.shipping.email}</td>
                  <td>{order.shipping.address.line1}, {order.shipping.address.city}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleOrderClick(order._id)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Không có đơn hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedOrder && (
          <div className="order-details mt-4 p-4 border border-muted rounded">
            <h3>Chi tiết đơn hàng</h3>
            <p><strong>Địa chỉ giao hàng:</strong> {selectedOrder.shipping.address.line1}, {selectedOrder.shipping.address.city}, {selectedOrder.shipping.country}</p>
            <p><strong>Email:</strong> {selectedOrder.shipping.email}</p>
            <p><strong>Số điện thoại:</strong> {selectedOrder.shipping.phone || "Không có thông tin"}</p>
            <p><strong>Trạng thái giao hàng:</strong> {selectedOrder.shipping.delivery_status}</p>
            <p><strong>Trạng thái thanh toán:</strong> {selectedOrder.shipping.payment_status}</p>
            <p><strong>Sản phẩm:</strong> {selectedOrder.products.map((product) => (
              <div key={product._id}>
                <p><strong>{product.name}</strong></p>
                <ul>
                  <li>Size: {product.size}</li>
                  <li>Giá: {product.price} VND</li>
                  <li>Subtotal: {product.subtotal} VND</li>
                  <li>Discount: {product.discount} VND</li>
                </ul>
              </div>
            ))}</p>
            <p><strong>Mã khuyến mãi:</strong> {selectedOrder.products[0].couponId || "Không có"}</p>
            <p><strong>Tổng tiền thanh toán:</strong> {selectedOrder.total} VND</p>

            <hr />
            <h4>Thông tin thanh toán</h4>
            <p><strong>Payment Intent ID:</strong> {selectedOrder.paymentIntentId}</p>
            <p><strong>Customer ID:</strong> {selectedOrder.customeId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
