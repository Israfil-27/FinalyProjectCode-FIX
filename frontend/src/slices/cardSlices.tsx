import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, CartState } from "../components/types/type";
import { updateCart } from "../utils/CardUtils";

const cartItemstring: string | null = localStorage.getItem("cart");
const initialState: CartState = cartItemstring
  ? JSON.parse(cartItemstring)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: any) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x: any) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFormCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFormCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;