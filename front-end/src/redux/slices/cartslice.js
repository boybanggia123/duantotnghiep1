import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: typeof window !== 'undefined' && localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [], // Kiểm tra nếu có window mới dùng localStorage
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Tìm sản phẩm đã có trong giỏ dựa trên cả mã sản phẩm và kích thước
            const existingItem = state.items.find(
                (item) =>
                    item._id === action.payload.item._id &&
                    item.size === action.payload.size
            );

            if (existingItem) {
                // Nếu sản phẩm có cùng size đã tồn tại, cập nhật số lượng
                existingItem.quantity = Number(existingItem.quantity) + Number(action.payload.quantity);
            } else {
                // Thêm sản phẩm mới vào giỏ với kích thước đã chọn
                state.items.push({
                    ...action.payload.item,
                    quantity: action.payload.quantity,
                    size: action.payload.size, // Lưu kích thước
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const { _id, size } = action.payload;
            // Chỉ xóa sản phẩm có _id và kích thước khớp
            state.items = state.items.filter(
              (item) => !(item._id === _id && item.size === size)
            );
            localStorage.setItem("cartItems", JSON.stringify(state.items));
          },
        updateCartItemQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice;
