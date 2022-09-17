import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { userSlice } from "./userSlice";
import { postSlice } from "./postSlice";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
  router: connectRouter(history),
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  collapsed: true,
});

const middlewares = [routerMiddleware(history), logger];

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});
