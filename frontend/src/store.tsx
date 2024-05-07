import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apislices.tsx";
import cartSliceReducer from "./slices/cardSlices.tsx"
import authSlicesReducer from "./slices/authSlices.tsx"
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSlicesReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});
export default store;
