<<<<<<< HEAD
// import hàm cấu hình Store từ thư viện redux toolkit
import { configureStore } from '@reduxjs/toolkit';
// import slice Couter từ file counterslice
import counterReducer from './slices/couterslice';
// Tạo và cấu hình store
import cartSlice from './slices/cartslice.js';
export const store = configureStore({
  reducer: {
    // Lưu slice Counter vào store
    counter: counterReducer,
    cart: cartSlice.reducer,
  },
});
=======
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslice.js';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        user: userReducer,
    }
});
export default store;
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
