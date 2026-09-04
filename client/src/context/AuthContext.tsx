import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/api';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const payload = res.data?.data || res.data;
      const accessToken = payload.accessToken || payload.token;
      const userData = payload.user;

      if (accessToken) {
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
      }
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }

      return { success: true, message: res.data?.message || 'Login successful', user: userData };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Login failed',
      };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await apiClient.post('/auth/register', { name, email, password });
      const payload = res.data?.data || res.data;
      const accessToken = payload.accessToken || payload.token;
      const userData = payload.user;

      if (accessToken) {
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
      }
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }

      return { success: true, message: res.data?.message || 'Account created successfully' };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || err.response?.data?.error?.message || err.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
    try {
      apiClient.post('/auth/logout');
    } catch {}
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
