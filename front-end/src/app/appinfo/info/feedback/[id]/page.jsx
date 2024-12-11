'use client';  // Đảm bảo sử dụng client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/router';

const FeedbackPage = ({ params }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const { id } = params;  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason) {
      setError('Please provide a reason for returning the product');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/stripe/orders/return/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),  // Gửi lý do trả hàng
      });

      if (!response.ok) {
        throw new Error('Failed to submit return request');
      }

      alert('Return request submitted successfully');
      // Redirect or other actions
    } catch (error) {
      setError('Error submitting return request');
    }
  };

  return (
    <div className="col-9">
      <h2>Yêu cầu trả hàng</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Lý do trả hàng:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            placeholder="Nhập lý do trả hàng tại đây"
          />
        </div>
        <button type="submit">Gửi yêu cầu trả hàng</button>
      </form>
    
    </div>
  );
};

export default FeedbackPage;
