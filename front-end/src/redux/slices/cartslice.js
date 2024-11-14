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
          "Cache-Control": "no-store",
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId, size }, thunkAPI) => {
    try {
      const response = await axios.delete("http://localhost:3000/cart", {
        data: { userId, productId, size },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk để cập nhật số lượng sản phẩm trong giỏ
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity, size }, thunkAPI) => {
    try {
      // Chỉnh lại URL cho chính xác, giả sử API chạy trên http://localhost:5000
      const response = await axios.put(
        `http://localhost:3000/cart`, // URL chính xác trỏ đến API PUT đã viết trong backend
        { userId, productId, quantity, size }
      );
      return response.data; // Trả về giỏ hàng đã được cập nhật từ API
    } catch (error) {
      // Xử lý lỗi và trả về giá trị reject với dữ liệu lỗi từ API
      return thunkAPI.rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    syncCartItems: (state) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, syncCartItems,setCart } = cartSlice.actions;
export default cartSlice.reducer;
