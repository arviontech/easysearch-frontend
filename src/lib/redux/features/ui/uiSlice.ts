import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  language: "en" | "bn";
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  modals: {
    loginOpen: boolean;
    signupOpen: boolean;
    bookingOpen: boolean;
  };
  notifications: Array<{
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  language: "en",
  theme: "system",
  sidebarOpen: true,
  mobileMenuOpen: false,
  modals: {
    loginOpen: false,
    signupOpen: false,
    bookingOpen: false,
  },
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "bn">) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<keyof UIState["modals"]>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof UIState["modals"]>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      state.modals = {
        loginOpen: false,
        signupOpen: false,
        bookingOpen: false,
      };
    },
    addNotification: (
      state,
      action: PayloadAction<{
        type: "success" | "error" | "warning" | "info";
        message: string;
      }>,
    ) => {
      state.notifications.push({
        id: `${Date.now()}-${Math.random()}`,
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setLanguage,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
