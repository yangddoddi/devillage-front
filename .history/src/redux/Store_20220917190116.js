import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const logger = createLogger({
//   collapsed: true,
// });

// const middlewares = [routerMiddleware(history), logger];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});
