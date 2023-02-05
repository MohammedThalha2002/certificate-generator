import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
    password: "",
    isLogin: false,
  },
  reducers: {
    addUserAndPassword: (state, action) => {
      const { user, password } = action.payload;
      state.user = user;
      state.password = password;
    },
    changeUserState: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { addUserAndPassword, changeUserState } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectPass = (state) => state.auth.password;

export default authSlice.reducer;
