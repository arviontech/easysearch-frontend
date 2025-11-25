
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import uiReducer from './features/ui/uiSlice'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ui: uiReducer,
    auth: authReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch