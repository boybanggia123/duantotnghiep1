import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk lấy giỏ hàng từ server
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
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size }, thunkAPI) => {
    if (!userId) {
      return thunkAPI.rejectWithValue({ message: "User is not logged in" });
    }
    try {
      const response = await axios.post("http://localhost:3000/cart", {
        userId,
        productId,
        quantity,
        size,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error adding to cart");
    }
  }
);


// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId, size }, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/cart`, {
        data: { userId, productId, size },
      });
      return { productId, size };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "lỗi khi xóa sản phẩm");
    }
  }
);

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ userId, productId, quantity, size }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/cart`, {
        userId,
        productId,
        quantity,
        size,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "lỗi khi cập nhật");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
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
      // addToCart
      // Khi thêm sản phẩm thành công
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";

        const existingItem = state.items.find(
          (item) =>
            item.id === action.payload.productId && item.size === action.payload.size
        );

        if (existingItem) {
          // Nếu sản phẩm đã có trong giỏ, tăng số lượng
          existingItem.quantity += action.payload.quantity;
        } else {
          // Thêm sản phẩm mới vào giỏ
          state.items.push({
            id: action.payload.productId,
            name: action.payload.name, // Đảm bảo backend trả về `name` và các thông tin cần thiết
            image: action.payload.image,
            size: action.payload.size,
            price: action.payload.price,
            discountedPrice: action.payload.discountedPrice,
            quantity: action.payload.quantity,
          });
        }
      })
      // Khi thêm sản phẩm thất bại
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) =>
            !(item.productId === action.payload.productId && item.size === action.payload.size)
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const item = state.items.find(
          (item) =>
            item.productId === action.payload.productId && item.size === action.payload.size
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
