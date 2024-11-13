// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    email: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      const { userId, email, role, fullname } = action.payload;
      console.log("Redux User ID:", userId);
      state.userId = userId;
      state.email = email;
      state.isAuthenticated = true;
      state.role = role;
      state.fullname = fullname;
    },
    clearUser: (state) => {
      state.userId = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
