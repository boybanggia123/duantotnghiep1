"use client";
import { useState, useEffect } from 'react';
import React from "react";
import Link from "next/link";

export default function QuanlyCategories() {

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
   

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/categories", {
      cache: 'no-store'
    });
    const newData = await res.json();
    setData(newData);
  };


  useEffect(() => {
    fetchProducts();
    
  }, []);


  

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
        <Link href="/QuanlyCategories/addCategory" className="add">
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
                  <th>Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
              {data.length > 0 ? (
                  data.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      
                      <td><small>{product.name}</small></td>
                      <td><small>{product.description}</small></td>
                      <td>
                        <Link href={`QuanlyProducts/editProduct/${product._id}`} className="edit-link">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link href={"#"} className="delete-link" onClick={() => deleteProduct(product._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Đang tải dữ liệu...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
