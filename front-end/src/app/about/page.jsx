"use client";

export default function About() {
  return (
    <div className="container my-5 position-relative">
      <div className="text-center mb-4">
        <h2 className="display-4 font-weight-bold">Về chúng tôi</h2>
        <p className="sub-header text-uppercase">
        Lời giới thiệu | Fashion Verse | Chúng tôi là ai ?
        </p>
        <div
          className="horizontal-line mx-auto bg-danger"
          style={{ width: "100px", height: "2px" }}
        ></div>
      </div>
      <div
        id="imageCarousel"
        className="carousel slide mt-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#imageCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <video
              className="d-block w-100 rounded"
              controls
              autoPlay
              muted
              loop
              style={{ maxHeight: "500px" }}
            >
              <source src="img/Fashion.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="carousel-item">
            <img
              src="img/Fashion Veser.png"
              className="d-block w-100 rounded"
              alt="Fashion Veser 2"
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#imageCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#imageCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="text-center mt-4">
        <p>
        Fashion Verse 2024 không chỉ bao gồm các thiết kế trang phục cực kỳ thiết thực, từ những chiếc váy bodycon thanh lịch đến những bộ vest chuyên nghiệp, mà còn có nhiều phụ kiện đi kèm, chẳng hạn như túi xách, giày dép, trang sức và khăn quàng cổ. Mỗi sản phẩm đều được lựa chọn cẩn thận, đảm bảo chất lượng và sự đổi mới, mang đến cho mọi phụ nữ vẻ ngoài hoàn hảo từ đầu đến chân.
        </p>
      </div>

      <div className="mt-5">
        <h4 className="text-center font-weight-bold">GIỚI THIỆU VỀ SẢN PHẨM</h4>
        <div
          className="horizontal-line mx-auto bg-danger"
          style={{ width: "100px", height: "2px" }}
        ></div>
        <p className="text-center mt-3">
        Fashion Verse 2024 cung cấp các sản phẩm thời trang được thiết kế với sự chú ý tỉ mỉ đến từng chi tiết. Từ trang phục công sở thanh lịch, năng động đến trang phục dạo phố thoải mái, chúng tôi tập trung vào việc may đo chính xác, kết hợp màu sắc sáng tạo và lựa chọn chất liệu cao cấp để đảm bảo rằng mỗi sản phẩm đều mang lại sự thoải mái và phong cách. Ngoài ra, các phụ kiện như túi xách, giày dép và trang sức được chế tác cẩn thận để nâng tầm bất kỳ trang phục nào. Chúng tôi không chỉ cung cấp nhiều loại sản phẩm cho phụ nữ mà Fashion Verse còn cung cấp nhiều lựa chọn thời trang đa dạng cho nam giới và trẻ em, đáp ứng nhiều phong cách và nhu cầu khác nhau.
        </p>
      </div>

      <div className="mt-5">
        <h4 className="text-center font-weight-bold">GIỚI THIỆU KHÁCH HÀNG</h4>
        <div
          className="horizontal-line mx-auto bg-danger"
          style={{ width: "100px", height: "2px" }}
        ></div>
        <p className="text-center mt-3">
        Khách hàng của Fashion Verse không chỉ là những người đam mê thời trang mà còn là những người tìm kiếm sự đổi mới trong từng bộ trang phục, từ trang phục công sở chuyên nghiệp đến trang phục dạo phố thoải mái. Dù là nam hay nữ, người lớn hay trẻ em, Fashion Verse tự hào là điểm đến lý tưởng cho những ai muốn thể hiện cá tính và phong cách sống của mình qua từng món đồ thời trang.
        </p>
      </div>

      <div className="container my-5 position-relative">
        <div className="text-center mb-4">
          <h4 className="text-center font-weight-bold">GIỚI THIỆU VỀ BỘ SƯU TẬP</h4>
          <div
            className="horizontal-line mx-auto bg-danger"
            style={{ width: "100px", height: "2px" }}
          ></div>
        </div>

        <div className="row align-items-center featured">
          <div className="col-md-5 mb-3 mb-md-0">
            <img
              src="img/colection.webp"
              alt="Thong dong"
              className="img-fluid rounded"
              style={{ maxWidth: "100%", height: "300px" }}
            />
          </div>
          <div className="col-md-7">
            <div className="text-content text-start">
              <h2 className="mb-3 font-weight-bold">
              “Lời tri ân Giáng sinh” - Fashion Verse

              </h2>
              <p>
              Để chào mừng Giáng sinh, Fashion Verse giới thiệu bộ sưu tập “Christmas Tribute”, với những thiết kế thanh lịch và phong cách thể hiện tinh thần lễ hội. Những bộ trang phục sang trọng này, bao gồm áo sơ mi, váy và vest, hoàn hảo cho cả bối cảnh chuyên nghiệp và các buổi tụ họp bình thường, cho phép bạn ăn mừng mùa lễ theo phong cách. Với màu sắc nhẹ nhàng và chất liệu vải cao cấp, bộ sưu tập này đảm bảo bạn cảm thấy tự tin và duyên dáng trong suốt lễ hội Giáng sinh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
