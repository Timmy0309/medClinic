import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    appointments: appointmentsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем не сериализуемые значения в определенных action типах
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;