import { createSlice } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenReducer = createSlice({
  name: "authToken",
  initialState: {
    isLogin: false,
    accessToken: null,
    expireTime: null,
    userId: null,
    userName: null,
    userRole: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.isLogin = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    removeToken: (state) => {
      state.isLogin = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { setToken, removeToken, authentication } = tokenReducer.actions;

export default tokenReducer.reducer;
