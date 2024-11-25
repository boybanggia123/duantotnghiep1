"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function QuanlyCategories() {
  const [data, setData] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories", {
      cache: "no-store",
    });
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      const res = await fetch(`http://localhost:3000/deletecategory/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.message) {
        fetchCategories();
      }
    }
  };

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
        <Link href={"QuanlyCategories/addCategory"} className="add">
          Thêm danh mục
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
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="tableProduct">
                {data.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="author-info">
                        <div>
                          <small>{category.name}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="sdt">{category.description}</p>
                    </td>
                    <td>
                      <Link
                        href={`QuanlyCategories/editCategory/${category._id}`}
                        className="edit-link"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link
                        href={"#"}
                        className="delete-link"
                        onClick={() => deleteCategory(category._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
