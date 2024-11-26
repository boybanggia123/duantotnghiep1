"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";

export default function DetailCommets() {
  return (
    <>
      <h1 className="title">Quản lý Bình luận</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li>
            <Link href={"#"}>Home</Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link href={"#"} className="active">
              Chi tiết
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
                  <th>Nội dung</th>
                  <th>Ngày BL</th>
                  <th>Người BL</th>
                  <th>Đánh giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Hàng chất lượng</td>
                  <td>2018-04-24</td>
                  <td>Nhựt Hào</td>
                  <td>
                    <div className="raiting_commets">★★★★☆</div>
                  </td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail/`}
                      className="commet_detail_delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Hàng chất lượng</td>
                  <td>2018-04-24</td>
                  <td>Nhựt Hào</td>
                  <td>
                    <div className="raiting_commets">★★★★☆</div>
                  </td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail/`}
                      className="commet_detail_delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Hàng chất lượng</td>
                  <td>2018-04-24</td>
                  <td>Nhựt Hào</td>
                  <td>
                    <div className="raiting_commets">★★★★☆</div>
                  </td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail/`}
                      className="commet_detail_delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Hàng chất lượng</td>
                  <td>2018-04-24</td>
                  <td>Nhựt Hào</td>
                  <td>
                    <div className="raiting_commets">★★★★☆</div>
                  </td>
                  <td>
                    <Link
                      href={`/QuanlyComments/detail/`}
                      className="commet_detail_delete"
                    >
                      <i className="fa-solid fa-trash"></i>
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
