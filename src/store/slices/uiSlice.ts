import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface UiState {
  mobileMenuOpen: boolean;
  notifications: Notification[];
  isLoading: boolean;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  notifications: [],
  isLoading: false,
};

let nextNotificationId = 0;

// Функция для сброса счетчика (только для тестов)
export const resetNotificationCounter = () => {
  nextNotificationId = 0;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = String(nextNotificationId++);
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  addNotification,
  removeNotification,
  setLoading,
} = uiSlice.actions;

// Селекторы
export const selectMobileMenuOpen = (state: RootState) => state.ui.mobileMenuOpen;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectIsLoading = (state: RootState) => state.ui.isLoading;

export default uiSlice.reducer;