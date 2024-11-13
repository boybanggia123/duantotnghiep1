import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state với dữ liệu từ localStorage nếu có
const initialState = {
  items: typeof window !== 'undefined' && localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [], // Kiểm tra nếu có window mới dùng localStorage
};

// Slice cart để xử lý các hành động liên quan đến giỏ hàng
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item._id === action.payload.item._id &&
          item.size === action.payload.size
      );

      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
        existingItem.quantity =
          Number(existingItem.quantity) + Number(action.payload.quantity);
      } else {
        // Thêm sản phẩm mới vào giỏ
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity,
          size: action.payload.size, // Lưu kích thước
        });
      }

      // Cập nhật lại localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Xóa sản phẩm khỏi giỏ
    removeFromCart: (state, action) => {
      const { _id, size } = action.payload;
      // Xóa sản phẩm có _id và size khớp
      state.items = state.items.filter(
        (item) => !(item._id === _id && item.size === size)
      );

      // Cập nhật lại localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Cập nhật số lượng của sản phẩm trong giỏ
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }

      // Cập nhật lại localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Xóa tất cả sản phẩm trong giỏ
    clearCart: (state) => {
      state.items = [];
      // Cập nhật lại localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    // Đồng bộ giỏ hàng từ localStorage vào Redux (Khi đăng nhập)
    syncCartItems: (state) => {
      if (typeof window !== 'undefined') {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
          state.items = JSON.parse(cartItems);
        }
      }
    },

    // Dọn sạch giỏ hàng khi đăng xuất
    clearCartOnLogout: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems"); 
    },
  },
});

// Export các hành động để sử dụng ở các nơi khác trong ứng dụng
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart, syncCartItems, clearCartOnLogout } = cartSlice.actions;

export default cartSlice;
