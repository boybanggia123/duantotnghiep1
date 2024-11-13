// // redux/slices/userSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     email: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.email = action.payload.email;
//       state.isAuthenticated = true;
//     },
//     clearUser: (state) => {
//       state.email = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    isAuthenticated: false,
    userId: null, // Thêm trường userId
  },
  reducers: {
    setUser: (state, action) => {
      // Lưu thông tin userId và email khi đăng nhập
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.userId = action.payload.userId; // Lưu userId vào state

      // Lưu userId vào cookie (hoặc localStorage nếu bạn muốn)
      Cookies.set("userId", action.payload.userId);
    },
    clearUser: (state) => {
      // Xóa thông tin người dùng khi đăng xuất
      state.email = null;
      state.isAuthenticated = false;
      state.userId = null;

      // Xóa thông tin userId khỏi cookie
      Cookies.remove("userId");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
