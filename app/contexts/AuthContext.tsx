'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { loginUser, registerUser, signOut, resetPassword } from '../firebase/auth';

// 定義認證上下文類型
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
}

// 創建認證上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 定義認證提供者屬性
interface AuthProviderProps {
  children: ReactNode;
}

// 認證提供者組件
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 監聽認證狀態變化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 登入功能
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await loginUser(email, password);
    } catch (error) {
      console.error('登入失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 註冊功能
  const register = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      await registerUser(email, password, displayName);
    } catch (error) {
      console.error('註冊失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 登出功能
  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error('登出失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 重設密碼功能
  const resetUserPassword = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.error('重設密碼失敗：', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 使用認證上下文的自定義 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
}; 