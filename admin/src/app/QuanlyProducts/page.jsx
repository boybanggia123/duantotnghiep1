"use client";
import React from "react";
import Link from "next/link";

export default function QuanlyProducts() {
  return (
    <>
      <h1 className="title">Quản lý Products</h1>
      <div className="add-title">
        <ul className="breadcrumbs">
          <li>
            <Link href={"#"}>Home</Link>
          </li>
          <li className="divider">/</li>
          <li>
            <Link href={"#"} className="active">
              Products
            </Link>
          </li>
        </ul>
        <Link href={"#"} className="add">
          Thêm sản phẩm
        </Link>
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
                  <th>ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Danh mục</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div className="author-info">
                      <img
                        src="/img/pant4.webp"
                        alt="John Michael"
                        className="avatarProduct"
                      />
                    </div>
                  </td>
                  <td>
                    <small>Aó khoác nam dù</small>
                  </td>
                  <td>
                    <p>$900</p>
                  </td>
                  <td>
                    <p>240</p>
                  </td>
                  <td>
                    <small>Aó khác nam</small>
                  </td>
                  <td>
                    <small>áo được làm từ vải</small>
                  </td>
                  <td>
                    <Link href={"#"} className="edit-link">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link href={"#"} className="delete-link">
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
                <tr />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
