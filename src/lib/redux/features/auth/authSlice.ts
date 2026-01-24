import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "HOST" | "CUSTOMER" | "DOCTOR" | "CATERING_SERVICE";
  contactNumber?: string;
  profilePhoto?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action): action is { type: 'persist/REHYDRATE'; payload: any } => 
          action.type === 'persist/REHYDRATE',
        (state, action) => {
          // Handle rehydration - override state with persisted state
          if (action.payload) {
            return {
              ...initialState,
              ...action.payload,
              isAuthenticated: !!action.payload.user,
            };
          }
        }
      );
  },
});

export const { setUser, setToken, setLoading, setError, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
