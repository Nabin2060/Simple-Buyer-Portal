import axios from 'axios';
import { toast } from 'sonner';
import { FRONTEND_MESSAGES } from '../utils/messages.constants';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Crucial for sending cookies automatically
});

// No longer need manual request interceptor for tokens if using cookies
// api.interceptors.request.use((config) => { ... });

// Global response handler using Toast
api.interceptors.response.use(
  (response) => {
    // Automatically show success toast for mutations (POST, PUT, DELETE)
    if (response.config.method !== 'get' && response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || FRONTEND_MESSAGES.ERRORS.DEFAULT;
    const status = error.response?.status;
    const url = error.config?.url || '';

    // Determine if this is an auth page request (login/register)
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register');
    
    // Show error toast for:
    // 1. Auth routes (login/register) - always show (wrong password, user exists, etc.)
    // 2. Non-auth routes - show except for 401 (session expired) and 404
    if (isAuthRoute || (status !== 401 && status !== 404)) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
