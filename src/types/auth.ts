export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate?: string;
  gender?: 'male' | 'female';
  address?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}