"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";

export default function QuanlyComments() {
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  //   // Lấy dữ liệu bình luận từ API
  //   const fetchComments = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/comments", {
  //         cache: "no-store",
  //       });
  //       const data = await res.json();
  //       setCommentsData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Lỗi khi tải dữ liệu bình luận:", error);
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchComments();
  //   }, []);

  return (
    <>
      <h1 className="title">Quản lý Bình luận</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li>
            <Link href={"#"}>Trang chủ</Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link href={"#"} className="active">
              Bình luận
            </Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h6>Table</h6>
          </div>
          <div className="table-wrapper">
            <table className="authors-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Sản phẩm</th>
                  <th>Tổng BL</th>
                  <th>Mới nhất</th>
                  <th>Cũ nhất</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Aó khác nam</td>
                  <td>4</td>
                  <td>2018-04-24</td>
                  <td>2018-04-24</td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail_commets`}
                      className="commet_detail"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Aó khác nam</td>
                  <td>4</td>
                  <td>2018-04-24</td>
                  <td>2018-04-24</td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail_commets`}
                      className="commet_detail"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Aó khác nam</td>
                  <td>4</td>
                  <td>2018-04-24</td>
                  <td>2018-04-24</td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail_commets`}
                      className="commet_detail"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Aó khác nam</td>
                  <td>4</td>
                  <td>2018-04-24</td>
                  <td>2018-04-24</td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail_commets`}
                      className="commet_detail"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
