// import hàm cấu hình Store từ thư viện redux toolkit
import { configureStore } from "@reduxjs/toolkit";
// import slice Couter từ file counterslice
import counterReducer from "./slices/couterslice";
// Tạo và cấu hình store
<<<<<<< HEAD
import cartSlice from "./slices/cartslice.js";
import userReducer from "./slices/userSlice";
import favouriteReducer from './slices/favouriteSlice'; // Import favouritesSlice
=======
import cartSlice from './slices/cartslice';
import userReducer from './slices/userSlice';


>>>>>>> 16db798c41636f66c45ff1b68ab0e0f2b3445528
export const store = configureStore({
  reducer: {
    // Lưu slice Counter vào store
    counter: counterReducer,
    cart: cartSlice,
    user: userReducer,
    favourites: favouriteReducer, // Thêm favouritesReducer
  },
});

export default store;
