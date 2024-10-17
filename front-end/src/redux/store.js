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