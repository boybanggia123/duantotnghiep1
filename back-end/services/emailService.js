// emailService.js

const nodemailer = require('nodemailer');
const { getEmailQueue } = require('./emailQueue');

// Khởi tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fashionverse112@gmail.com',
    pass: 'xczyubpahutsqivm',
  },
});

async function sendEmail(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email đã được gửi:', info.response);
    return info;
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    throw error;
  }
}
// Xử lý công việc từ hàng đợi và gửi email
async function processEmailQueue() {
  try {
    console.log("Bắt đầu xử lý hàng đợi email...");

    await require('./emailQueue').initializeRedis(); // Đảm bảo Redis đã được khởi tạo
   

    const emailQueue = getEmailQueue(); // Lấy email queue
   

    emailQueue.process('send-email', async (job) => {
      console.log("Xử lý công việc 'send-email'...");
      const { userEmail, billDetails, attachments } = job.data;

      const mailOptions = {
        from: "fashionverse112@gmail.com",
        to: userEmail,
        subject: "Hóa đơn thanh toán",
        html: `
          <h3>Hóa đơn của bạn đã được thanh toán thành công.</h3>
          <p>Dưới đây là chi tiết đơn hàng:</p>
          <ul>
            <li>Mã đơn hàng: ${billDetails.orderId}</li>
            <li>Tổng số tiền: $${billDetails.amount}</li>
            <li>Mã giảm giá: ${billDetails.coupon || 'Không có'}</li>
            <li>Sản phẩm:</li>
            <ul>
              ${billDetails.products
                .flatMap(item => item.products)
                .map(
                  (product) =>
                    `<li>
                      <strong>${product.description}</strong> 
                      - Số lượng: ${product.quantity}, Giá: ${product.price.toLocaleString('vi-VN')}đ
                    </li>`
                )
                .join('')}
            </ul>
            <li>Địa chỉ giao hàng: ${billDetails.shippingAddress.line1}, ${billDetails.shippingAddress.city}, ${billDetails.shippingAddress.country}</li>
          </ul>
        `,
        attachments: attachments,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email đã được gửi thành công đến ${userEmail}`);
      } catch (error) {
        console.error(`Lỗi khi gửi email cho ${userEmail}: ${error.message}`);
      }
    });

    emailQueue.process('send-admin-email', async (job) => {
      console.log("Xử lý công việc 'send-admin-email'...");
      const { adminEmail, orderDetails } = job.data;

      const mailOptions = {
        from: "fashionverse112@gmail.com",
        to: adminEmail,
        subject: "Thông báo đơn hàng mới",
        html: `
          <h3>Có đơn hàng mới đang chờ thanh toán</h3>
          <p>Dưới đây là chi tiết đơn hàng:</p>
          <ul>
            <li>Mã đơn hàng: ${orderDetails._id}</li>
            <li>Khách hàng: ${orderDetails.shipping.name}</li>
            <li>Email khách hàng: ${orderDetails.shipping.email}</li>
            <li>Tổng số tiền: ${orderDetails.total.toLocaleString('vi-VN')}đ</li>
            <li>Sản phẩm:</li>
            <ul>
              ${orderDetails.products
                .map(
                  (product) => `
                    <li>
                      <strong>${product.name}</strong> 
                      - Số lượng: ${product.quantity}, 
                      Giá: ${product.price.toLocaleString('vi-VN')}đ
                    </li>`
                )
                .join('')}
            </ul>
            <li>Địa chỉ giao hàng: ${orderDetails.shipping.address.line1}, ${orderDetails.shipping.address.city}, ${orderDetails.shipping.address.country}</li>
            <li>Phone: ${orderDetails.shipping.phone}</li>
          </ul>
        `,
      };
      

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email thông báo đơn hàng mới đã được gửi đến admin (${adminEmail})`);
      } catch (error) {
        console.error(`Lỗi khi gửi email tới admin (${adminEmail}): ${error.message}`);
      }
    });

    

  } catch (error) {
    console.error("Lỗi trong khi xử lý hàng đợi email:", error.message);
  }
}


module.exports = {processEmailQueue,sendEmail}
