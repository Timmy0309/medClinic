import authReducer, {
  clearError,
  login,
  logout,
} from './authSlice';
import type { AuthState } from './authSlice';
import { User } from '../../types/auth';

// Мокаем localStorage
beforeEach(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

// Начальное состояние
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

describe('authSlice', () => {
  it('should return initial state by default', () => {
    const result = authReducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError: AuthState = {
      ...initialState,
      error: 'Some error',
    };
    const result = authReducer(stateWithError, clearError());
    expect(result.error).toBeNull();
  });

  it('should handle login.pending', () => {
    const action = { type: login.pending.type };
    const result = authReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      password: '123456',
      firstName: 'Test',
      lastName: 'User',
      phone: '1234567890',
    };
    const action = { type: login.fulfilled.type, payload: { user } };
    const result = authReducer(initialState, action);
    expect(result.user).toEqual(user);
    expect(result.isAuthenticated).toBe(true);
    expect(result.loading).toBe(false);
  });

  it('should handle login.rejected', () => {
    const action = {
      type: login.rejected.type,
      payload: 'Ошибка входа',
    };
    const result = authReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка входа');
  });

  it('should handle logout.fulfilled', () => {
    const loggedInState: AuthState = {
      user: {
        id: '1',
        email: 'test@example.com',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      },
      isAuthenticated: true,
      loading: false,
      error: null,
    };
    const action = { type: logout.fulfilled.type };
    const result = authReducer(loggedInState, action);
    expect(result.user).toBeNull();
    expect(result.isAuthenticated).toBe(false);
  });
});
