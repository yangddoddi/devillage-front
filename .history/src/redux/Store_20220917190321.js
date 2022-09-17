import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

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
    reducer: {

    }
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});
