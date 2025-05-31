import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import type { RootState } from '../index';
import { User, LoginCredentials, RegisterData } from '../../types/auth';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Асинхронный thunk для авторизации
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка входа. Проверьте логин и пароль.');
    }
  }
);

// Асинхронный thunk для регистрации
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации. Попробуйте еще раз.');
    }
  }
);

// Асинхронный thunk для проверки статуса авторизации
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.checkAuth();
      return response;
    } catch (error) {
      return rejectWithValue('Сессия истекла или пользователь не авторизован');
    }
  }
);

// Асинхронный thunk для выхода из системы
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return null;
    } catch (error) {
      return rejectWithValue('Ошибка при выходе из системы');
    }
  }
);

// Асинхронный thunk для обновления профиля пользователя
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await authApi.updateProfile(userData);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении профиля');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Обработка logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Обработка updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;

// Селекторы
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;