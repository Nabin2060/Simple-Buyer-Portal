import api from './api';
import type { AuthResponse, ApiResponse, User } from '../types';

export const authService = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password });
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    this.clearLocal();
  },

  async getMe(): Promise<ApiResponse<User>> {
    const { data } = await api.get<ApiResponse<User>>('/auth/me');
    return data;
  },

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  initialUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  clearLocal() {
    localStorage.removeItem('user');
  },

  // Redundant but kept for interface consistency if needed, returns true if we think we have a session
  isProbablyAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  },
};
