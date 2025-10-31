import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import authReducer from './authSlice';
import { productApi } from "../api/productApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productApi.middleware),
});