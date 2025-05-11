'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { validateForm } from '../../utils/validation';

export default function ForgotPasswordPage() {
  const { resetUserPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // 清除錯誤訊息
    if (errors.email) {
      setErrors({});
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 表單驗證
    const validationErrors = validateForm({ email }, {
      email: ['required', 'email'],
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setResetError('');
    setResetSuccess(false);
    
    try {
      await resetUserPassword(email);
      setResetSuccess(true);
    } catch (error: any) {
      console.error('重設密碼失敗：', error);
      
      // 處理常見的重設密碼錯誤
      if (error.code === 'auth/user-not-found') {
        setResetError('找不到該電子郵件的使用者');
      } else {
        setResetError('重設密碼失敗，請稍後再試');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container-custom py-16 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">忘記密碼</h1>
      
      {resetError && (
        <div className="bg-error bg-opacity-20 text-error p-4 rounded-lg mb-6">
          {resetError}
        </div>
      )}
      
      {resetSuccess ? (
        <div className="bg-success bg-opacity-20 text-success p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">重設密碼郵件已發送</h2>
          <p className="mb-4">
            我們已將重設密碼的連結發送到您的電子郵件 {email}。請檢查您的收件匣，並按照郵件中的指示進行操作。
          </p>
          <Link href="/auth/login" className="btn-primary inline-block">
            返回登入
          </Link>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            請輸入您註冊時使用的電子郵件地址，我們將向您發送重設密碼的連結。
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                電子郵件
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-error' : 'border-gray-300'
                }`}
                placeholder="請輸入您的電子郵件"
              />
              {errors.email && (
                <p className="mt-1 text-error text-sm">{errors.email}</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-2 px-4 rounded-lg"
              >
                {isLoading ? '發送中...' : '發送重設密碼連結'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <Link href="/auth/login" className="text-primary hover:text-primary-dark">
                返回登入
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
} 