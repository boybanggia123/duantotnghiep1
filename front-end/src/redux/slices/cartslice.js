<<<<<<< HEAD
//cartslices
import { createSlice, payLoadAction } from '@reduxjs/toolkit';

const initialState = {
    items: [],
}
=======
import { createSlice } from '@reduxjs/toolkit';

<<<<<<< HEAD
// const initialState = {
//     items: JSON.parse(localStorage.getItem('cartItems')) || [],
// };
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
=======
const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
};
>>>>>>> b70a5267de376ac330a8bc940585fa69b80bf6a9

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item._id === action.payload.item._id);
<<<<<<< HEAD

            if (existingItem) {
                existingItem.quantity =Number(existingItem.quantity)+ Number(action.payload.quantity);
            } else {
                state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const item = state.items.find((item) => item._id === action.payload._id);

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
=======
            if (existingItem) {
                existingItem.quantity = Number(existingItem.quantity) + Number(action.payload.quantity);
            } else {
                state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
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
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

<<<<<<< HEAD
export default cartSlice;
=======
export default cartSlice;
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
