import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

export const TOKEN_TIME_OUT = 600 * 1000;

const persistConfig = {
  key: "token",
  storage,
};
const slice = createSlice({
  name: "token",
  initialState: {
    accessToken: null,
    isLogin: false,
    userId: null,
    nickname: null,
    email: null,
    userRole: [],
  },
  reducers: {
    setToken: (state, action) => {
      console.log(action.payload);
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickName;
      state.email = action.payload.email;
      state.userRole = action.payload.roles;
      state.isLogin = true;
    },
    removeToken: (state) => {
      state.accessToken = null;
      state.userId = null;
      state.nickname = null;
      state.email = null;
      state.userRole = null;
      state.isLogin = false;
    },
  },
});

const reducers = combineReducers({
  token: slice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const { setToken, removeToken } = slice.actions;

export default persistedReducer;

// const initialState = {
//   isLogin: false,
//   accessToken: null,
//   expireTime: null,
//   userId: null,
//   userName: null,
//   userRole: null,
// };

// const tokenSlice = createSlice({
//   name: "token",
//   initialState,
//   reducers: {
//     setToken(state, action) {
//       const { accessToken, expireTime, userId, userName, userRole } =
//         action.payload;
//       state.isLogin = true;
//       state.accessToken = accessToken;
//       state.expireTime = expireTime;
//       state.userId = userId;
//       state.userName = userName;
//       state.userRole = userRole;
//     },
//     removeToken(state) {
//       state.isLogin = false;
//       state.accessToken = null;
//       state.expireTime = null;
//       state.userId = null;
//       state.userName = null;
//       state.userRole = null;
//     },
//   },
// });

// export const { setToken, removeToken } = tokenSlice.actions;

// export default tokenSlice.reducer;
