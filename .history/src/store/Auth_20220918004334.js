import { createSlice } from "@reduxjs/toolkit";

export const TOKEN_TIME_OUT = 600 * 1000;

export const tokenReducer = createSlice({
  name: "authToken",
  initialState: {
    authentication: false,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.authentication = true;
      state.accessToken = action.playload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    removeToken: (state) => {
      state.authentication = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { setToken, removeToken, authentication } = tokenReducer.actions;

export default tokenReducer.reducer;
