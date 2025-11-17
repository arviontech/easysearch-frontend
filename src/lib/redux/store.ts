import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import { houseRentApi } from "./api/houseRentApi";
import { hostelRentApi } from "./api/hostelRentApi";
import { userApi } from "./api/userApi";
import { categoryApi } from "./api/categoryApi";

// Create the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  [houseRentApi.reducerPath]: houseRentApi.reducer,
  [hostelRentApi.reducerPath]: hostelRentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(
        houseRentApi.middleware,
        hostelRentApi.middleware,
        userApi.middleware,
        categoryApi.middleware,
      ),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
