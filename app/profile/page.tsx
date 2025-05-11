'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { validateForm } from '../utils/validation';
import { updateDocument, getDocument } from '../firebase/firestore';

// 用戶資料接口
interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    displayName: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  
  // 當用戶變化時，獲取用戶資料
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }
      
      setIsLoading(true);
      
      try {
        const userProfile = await getDocument<UserProfile>('users', user.uid);
        
        if (userProfile) {
          setFormData({
            displayName: userProfile.displayName || user.displayName || '',
            email: userProfile.email || user.email || '',
            phone: userProfile.phone || '',
            address: userProfile.address || '',
          });
        } else {
          // 如果用戶資料不存在，使用 Firebase Auth 的資料
          setFormData({
            displayName: user.displayName || '',
            email: user.email || '',
            phone: '',
            address: '',
          });
        }
      } catch (error) {
        console.error('獲取用戶資料失敗：', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // 清除錯誤訊息和成功訊息
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    setUpdateSuccess(false);
    setUpdateError('');
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      return;
    }
    
    // 表單驗證
    const validationErrors = validateForm(formData as Record<string, string>, {
      displayName: ['required', 'name'],
      phone: ['phone'],
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setUpdateSuccess(false);
    setUpdateError('');
    
    try {
      await updateDocument<Partial<UserProfile>>('users', user.uid, {
        displayName: formData.displayName,
        phone: formData.phone,
        address: formData.address,
      });
      
      setUpdateSuccess(true);
    } catch (error) {
      console.error('更新用戶資料失敗：', error);
      setUpdateError('更新資料失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('登出失敗：', error);
    }
  };
  
  // 如果未登入，顯示提示訊息
  if (!user) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-semibold mb-6">請先登入</h1>
        <button
          onClick={() => router.push('/auth/login')}
          className="btn-primary py-2 px-4 rounded-lg"
        >
          前往登入
        </button>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-16 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">會員資料</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition"
        >
          登出
        </button>
      </div>
      
      {updateError && (
        <div className="bg-error bg-opacity-20 text-error p-4 rounded-lg mb-6">
          {updateError}
        </div>
      )}
      
      {updateSuccess && (
        <div className="bg-success bg-opacity-20 text-success p-4 rounded-lg mb-6">
          會員資料更新成功！
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                姓名
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                value={formData.displayName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.displayName ? 'border-error' : 'border-gray-300'
                }`}
                placeholder="請輸入您的姓名"
              />
              {errors.displayName && (
                <p className="mt-1 text-error text-sm">{errors.displayName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                電子郵件 (不可修改)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                手機號碼
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-error' : 'border-gray-300'
                }`}
                placeholder="請輸入您的手機號碼 (例如：0912345678)"
              />
              {errors.phone && (
                <p className="mt-1 text-error text-sm">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                配送地址
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="請輸入您的配送地址"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-2 px-4 rounded-lg"
            >
              {isLoading ? '更新中...' : '更新資料'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">訂單歷史</h2>
        <p className="text-gray-500 italic">目前尚無訂單記錄</p>
      </div>
    </div>
  );
} 