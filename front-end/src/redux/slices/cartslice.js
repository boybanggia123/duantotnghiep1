import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

// Async thunk để lấy giỏ hàng từ server
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/${userId}`, {
        headers: {
          "Cache-Control": "no-store", // Yêu cầu không sử dụng cache
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size }, thunkAPI) => {
    if (!userId) {
      console.error("userId is missing");
      return thunkAPI.rejectWithValue({ message: "userId is required" });
    }

    try {
      const response = await axios.post(`http://localhost:3000/cart/${userId}/add`, { productId, quantity, size });
      return response.data; // Trả về giỏ hàng đã được cập nhật từ API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId, size }, thunkAPI) => {
    try {
      const response = await axios.delete("http://localhost:3000/cart", {
        data: {userId, productId, size } // Sử dụng data thay vì params
      });
      return response.data; // Trả về giỏ hàng đã được cập nhật từ API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk để cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity, size }, thunkAPI) => {
    if (!userId) {
      return thunkAPI.rejectWithValue("userId không hợp lệ");
    }

    try {
      // Chỉnh lại URL cho chính xác
      const response = await axios.put(
        `http://localhost:3000/cart`, 
        { userId, productId, quantity, size }
      );
      return response.data; // Trả về giỏ hàng đã được cập nhật từ API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Mảng lưu các sản phẩm trong giỏ
    loading: false,
    status: 'null',
    error: null,
    userDetail: null, // Thêm userDetail để lưu thông tin người dùng
    products: [], // Thêm sản phẩm để lưu danh sách sản phẩm
  },
  reducers: {
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        item => item.productId !== productId || item.size !== size
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Cập nhật giỏ hàng từ server
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Cập nhật giỏ hàng sau khi thêm sản phẩm
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     // Remove from cart
     .addCase(removeFromCart.pending, (state) => {
      state.loading = true;
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      // Cập nhật lại giỏ hàng sau khi xóa
      state.items = action.payload;
    })
    .addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


      // Update cart item quantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Cập nhật giỏ hàng sau khi thay đổi số lượng
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
