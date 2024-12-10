
export default function Contact() {
    return (
      <div className="container my-5">
        <div className="row">
          {/* Contact Form Column */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">LIÊN HỆ</h2>
            
            <form>
              <div className="form-group mb-3">
                <label htmlFor="name">Tên</label>
                <input type="text" className="form-control" id="name" placeholder="Nhập tên đầy đủ của bạn" required />
              </div>
  
              <div className="form-group mb-3">
                <label htmlFor="email">Email </label>
                <input type="email" className="form-control" id="email" placeholder="Nhập email của bạn" required />
              </div>
  
              <div className="form-group mb-3">
                <label htmlFor="phone">Số điện thoại </label>
                <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại của bạn" />
              </div>
  
              <div className="form-group mb-3">
                <label htmlFor="subject">Vấn đề</label>
                <input type="text" className="form-control" id="subject" placeholder="Nhập vấn đề của bạn" required />
              </div>
  
              <div className="form-group mb-3">
                <label htmlFor="message">Lời nhắn</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Viết lời nhắn của bạn cho chúng tôi" required></textarea>
              </div>
  
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="newsletter" />
                <label className="form-check-label" htmlFor="newsletter">
                  Đăng ký nhận hồi đáp của chúng tôi
                </label>
              </div>
  
              <button type="submit" className="btn btn-primary btn-lg w-100 mt-3" style={{ backgroundColor: 'black', color: 'white' }}>Gửi</button>
            </form>
          </div>
  
          {/* Google Map and Contact Info Column */}
          <div className="col-md-6">
            <h2 className="text-center mb-4">ĐỊA CHỈ</h2>
            <div className="embed-responsive embed-responsive-16by9 mb-4">
              <iframe
                title="Google Map - Công Viên Phần Mềm Quang Trung"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5742661921823!2d106.624209!3d10.852994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnhu4duIFBo4bq_biBN4bqvbsOgbSBRdWFuZyBUcnVuZw!5e0!3m2!1svi!2s!4v1698888729941!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-center">
              <p><strong>Số điện thoại:</strong> 0123456789- <strong>Hotline:</strong> 1900 9999</p>
              <p><strong>Email:</strong> <a href="mailto:fashionverse@gmail.com">fashionverse@gmail.com</a></p>
              <p><strong>Website:</strong> <a href="#" target="_blank" rel="noopener noreferrer">fashionverse</a></p>
              <p><strong>Fanpage:</strong> <a href="#" target="_blank" rel="noopener noreferrer">https://facebook.com/fashionverse</a></p>
              <div className="d-flex justify-content-center mt-3">
                <a href="#" className="mx-2"><i className="fab fa-facebook"></i></a>
                <a href="#youtube" className="mx-2"><i className="fab fa-youtube"></i></a>
                <a href="#instagram" className="mx-2"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  