<<<<<<< HEAD
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/dangnhap", request.url));
  }

  // Gọi đến API xác thực token
  const res = await fetch("http://localhost:3000/checktoken", {
=======
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token'); 

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Gọi đến API xác thực token
  const res = await fetch('http://localhost:3000/checktoken', {
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
<<<<<<< HEAD

  if (!res.ok) {
    return NextResponse.redirect(new URL("/dangnhap", request.url));
=======
  

  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', request.url));
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
  }

  // Nếu token hợp lệ, cho phép yêu cầu tiếp tục
  return NextResponse.next();
}

export const config = {
<<<<<<< HEAD
  matcher: "/info",
=======
  matcher: '/info'
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
};
