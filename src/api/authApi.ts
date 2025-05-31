import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth';

// Ключи для localStorage
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
const USERS_KEY = 'mock_users';

// Имитация задержки для API
const DELAY = 500;

// Получение сохранённых пользователей
const getStoredUsers = (): User[] & { password: string }[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Сохранение пользователей
const saveUsers = (users: typeof mockUsers) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Инициализация списка пользователей
let mockUsers = getStoredUsers();

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    const user = mockUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const { password, ...userWithoutPassword } = user;
    const token = `mock-jwt-token-${Math.random()}`;

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userWithoutPassword));

    return {
      user: userWithoutPassword as User,
      token,
    };
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    if (mockUsers.some((u) => u.email === userData.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      ...userData,
    };

    mockUsers.push(newUser);
    saveUsers(mockUsers);

    const { password, ...userWithoutPassword } = newUser;
    const token = `mock-jwt-token-${Math.random()}`;

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userWithoutPassword));

    return {
      user: userWithoutPassword as User,
      token,
    };
  },

  checkAuth: async (): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);

    if (!token || !userData) {
      throw new Error('Не авторизован');
    }

    return {
      user: JSON.parse(userData),
      token,
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  },

  updateProfile: async (userData: Partial<User>): Promise<{ user: User }> => {
    await new Promise((resolve) => setTimeout(resolve, DELAY));

    const storedUserData = localStorage.getItem(USER_DATA_KEY);
    if (!storedUserData) {
      throw new Error('Пользователь не найден');
    }

    const currentUser = JSON.parse(storedUserData);
    const updatedUser = { ...currentUser, ...userData };

    const userIndex = mockUsers.findIndex((u) => u.id === currentUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      saveUsers(mockUsers);
    }

    localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));

    return { user: updatedUser };
  },

  // Вспомогательная функция — можно вызывать из консоли для сброса
  resetMockUsers: () => {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    mockUsers = [];
  },
};
