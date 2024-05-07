import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  userInfo: string | null;
}

const userInfoStringOrNull: string | null = localStorage.getItem("userInfo");
const initialState: UserState = {
  userInfo: userInfoStringOrNull ? JSON.parse(userInfoStringOrNull) : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string | null>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
