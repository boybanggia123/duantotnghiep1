import Link from "next/link";
export default function Dashboard() {
  return (
    <>
      <h1 className="title">Bảng dữ liệu</h1>
      <ul className="breadcrumbs">
        <li>
          <Link href={"#"}>Trang chủ</Link>
        </li>
        <li className="divider">/</li>
        <li>
          <Link href={"#"} className="active">
            Bảng dữ liệu
          </Link>
        </li>
      </ul>
      <div className="info-data">
        <div className="card">
          <div className="head">
            <div>
              <h2>1500</h2>
              <p>Vận chuyển</p>
            </div>
            <i className="bx bx-trending-up icon"></i>
          </div>
          <span className="progress" data-value="40%"></span>
          <span className="label">40%</span>
        </div>
        <div className="card">
          <div className="head">
            <div>
              <h2>234</h2>
              <p>Số hàng bán được</p>
            </div>
            <i className="bx bx-trending-down icon down"></i>
          </div>
          <span className="progress" data-value="60%"></span>
          <span className="label">60%</span>
        </div>
        <div className="card">
          <div className="head">
            <div>
              <h2>465</h2>
              <p>Số lượt xem trang</p>
            </div>
            <i className="bx bx-trending-up icon"></i>
          </div>
          <span className="progress" data-value="30%"></span>
          <span className="label">30%</span>
        </div>
        <div className="card">
          <div className="head">
            <div>
              <h2>235</h2>
              <p>Khách hàng</p>
            </div>
            <i className="bx bx-trending-up icon"></i>
          </div>
          <span className="progress" data-value="80%"></span>
          <span className="label">80%</span>
        </div>
      </div>
      <div className="data">
        <div className="content-data">
          <div className="head">
            <h3>Sơ đồ</h3>
            <div className="menu">
              <i className="bx bx-dots-horizontal-rounded icon"></i>
              <ul className="menu-link">
                <li>
                  <Link href={"#"}>Sửa</Link>
                </li>
                <li>
                  <Link href={"#"}>Lưu</Link>
                </li>
                <li>
                  <Link href={"#"}>Xóa</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="chart">
            <div id="chart"></div>
          </div>
        </div>
        <div className="content-data">
          <div className="head">
            <h3>Bình luận</h3>
            <div className="menu">
              <i className="bx bx-dots-horizontal-rounded icon"></i>
              <ul className="menu-link">
                <li>
                  <Link href={"#"}>Sửa</Link>
                </li>
                <li>
                  <Link href={"#"}>Lưu</Link>
                </li>
                <li>
                  <Link href={"#"}>Xóa</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="chat-box">
            <p className="day">
              <span>Hôm nay</span>
            </p>
            <div className="msg">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div className="chat">
                <div className="profile">
                  <span className="username">Alan</span>
                  <span className="time">18:30</span>
                </div>
                <p>Xin chào</p>
              </div>
            </div>
            <div className="msg me">
              <div className="chat">
                <div className="profile">
                  <span className="time">18:30</span>
                </div>
                <p>
                Bản thân công ty đã là một công ty rất thành công. Và cô ấy
                  rèn luyện trí óc để lựa chọn niềm vui thay vì nỗi đau
                  Anh ấy sẽ đổ lỗi cho chúng tôi về những rắc rối! KHÔNG
                </p>
              </div>
            </div>
            <div className="msg me">
              <div className="chat">
                <div className="profile">
                  <span className="time">18:30</span>
                </div>
                <p>
                Bản thân công ty đã là một công ty rất thành công. Cô ấy, kiến ​​trúc sư!

                </p>
              </div>
            </div>
            <div className="msg me">
              <div className="chat">
                <div className="profile">
                  <span className="time">18:30</span>
                </div>
                <p>Cảm ơn bạn rất nhiều, đó là một nỗi đau.
</p>
              </div>
            </div>
          </div>
          <form action="#">
            <div className="form-group">
              <input type="text" placeholder="Nhắn..." />
              <button type="submit" className="btn-send">
                <i className="bx bxs-send"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
