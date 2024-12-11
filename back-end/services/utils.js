const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function createBillPDF(data) {
  // Tạo thư mục lưu hóa đơn nếu chưa tồn tại
  const invoiceDir = path.join(__dirname, 'invoices');
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }

  // Khởi tạo tài liệu PDF
  const doc = new PDFDocument({ margin: 50 });

  // Đường dẫn tới phông chữ tùy chỉnh
  const fontPath = path.join(__dirname, '../fonts/DejaVuSans.ttf');
  if (fs.existsSync(fontPath)) {
    doc.font(fontPath); // Sử dụng phông chữ tùy chỉnh nếu có
  } else {
    doc.font('Helvetica'); // Sử dụng phông chữ mặc định nếu không tìm thấy
  }

  // Đường dẫn lưu file PDF
  const filePath = path.join(invoiceDir, `invoice-${data.payment_intent}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  // Header: Tiêu đề hóa đơn
  doc
    .fontSize(20)
    .text('HÓA ĐƠN THANH TOÁN', { align: 'center', underline: true })
    .moveDown();

  // Thông tin khách hàng và hóa đơn
  const shipping = data.shipping || {};
  const address = shipping.address || {};

  doc
  .fontSize(12)
  .text(`Mã đơn hàng: ${data.paymentIntentId || 'N/A'}`)
  .text(`Tên khách hàng: ${shipping.name || 'N/A'}`)
  .text(`Email: ${shipping.email || 'N/A'}`)
  .text(`Địa chỉ giao hàng: ${address.line1 || 'N/A'}, ${address.city || 'N/A'}`)
  .text(`Số tiền thanh toán: ${(data.amount_total).toLocaleString('vi-VN')|| "N/A"}`)
  .text(`Ngày thanh toán: ${new Date().toLocaleDateString('vi-VN')}`)
  .moveDown();

  // Chi tiết sản phẩm
  const products = data.products || [];
  doc.fontSize(14).text('Chi tiết sản phẩm:', { underline: true }).moveDown();

  products.forEach((product, index) => {
    doc
      .fontSize(12)
      .text(
        `${index + 1}. ${product.description || 'N/A'} - Số lượng: ${product.quantity || 'N/A'} - Giá: ${(product.price / 100).toLocaleString('vi-VN')} USD`
      );
  });

  // Tổng cộng
  doc
    .moveDown()
    .fontSize(14)
    .text(`Tổng cộng: ${(data.amount_total / 100).toLocaleString('vi-VN')} USD`, { align: 'right' });

  // Footer: Lời cảm ơn
  doc
    .moveDown()
    .fontSize(10)
    .text('Cảm ơn bạn đã mua hàng tại FashionVerse!', { align: 'center' });

  // Kết thúc tài liệu PDF
  doc.end();

  return filePath;
}

module.exports = { createBillPDF };
