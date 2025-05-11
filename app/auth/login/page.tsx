'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { validateForm } from '../../utils/validation';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // 清除錯誤訊息
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 表單驗證
    const validationErrors = validateForm(formData, {
      email: ['required', 'email'],
      password: ['required'],
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (error: any) {
      console.error('登入失敗：', error);
      
      // 處理常見的登入錯誤
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError('電子郵件或密碼不正確');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('登入嘗試次數過多，請稍後再試');
      } else {
        setLoginError('登入失敗，請稍後再試');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // 處理 Google 登入
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setLoginError('');
    
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (error: any) {
      console.error('Google 登入失敗：', error);
      setLoginError('Google 登入失敗，請稍後再試');
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  return (
    <div className="container-custom py-16 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">會員登入</h1>
      
      {loginError && (
        <div className="bg-error bg-opacity-20 text-error p-4 rounded-lg mb-6">
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            電子郵件
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={formData.email}
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
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            密碼
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.password ? 'border-error' : 'border-gray-300'
            }`}
            placeholder="請輸入您的密碼"
          />
          {errors.password && (
            <p className="mt-1 text-error text-sm">{errors.password}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm">
              記住我
            </label>
          </div>
          
          <div className="text-sm">
            <Link href="/auth/forgot-password" className="text-primary hover:text-primary-dark">
              忘記密碼？
            </Link>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-2 px-4 rounded-lg"
          >
            {isLoading ? '登入中...' : '登入'}
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">或使用</span>
          </div>
        </div>
        
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex justify-center items-center space-x-2 border border-gray-300 rounded-lg py-2 px-4 bg-white hover:bg-gray-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="#FFC107"
              />
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="#FF3D00"
                mask="url(#google-mark-a)"
              />
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="#4CAF50"
                mask="url(#google-mark-b)"
              />
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="#1976D2"
                mask="url(#google-mark-c)"
              />
            </svg>
            <span>{isGoogleLoading ? '登入中...' : '使用 Google 帳號登入'}</span>
          </button>
        </div>
        
        <div className="text-center mt-4">
          <p>
            還不是會員？{' '}
            <Link href="/auth/register" className="text-primary hover:text-primary-dark">
              立即註冊
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 