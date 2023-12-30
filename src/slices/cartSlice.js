// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCart: false,
  },
  reducers: {
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        state.items = state.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity || 1 }
            : item
        );
        toast.success("Cart updated!");
      } else {
        action.payload.quantity = 1;
        state.items.push(action.payload);
        toast.success("Cart updated!");
      }
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success("Cart updated!");
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== existingItem.id
          );
        }
        existingItem.quantity -= 1;
        toast.success("Cart updated!");
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setShowCart,
} = cartSlice.actions;
export default cartSlice.reducer;
