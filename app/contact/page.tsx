'use client';

import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // 清除該欄位的錯誤
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '請輸入訊息內容';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');
    
    try {
      // 在此處實作實際的表單提交邏輯
      // 例如透過 API 發送資料到後端
      await new Promise(resolve => setTimeout(resolve, 1500)); // 模擬 API 呼叫
      
      // 重設表單
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('提交表單失敗：', error);
      setSubmitError('提交表單失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">聯絡我們</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">聯絡資訊</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">地址</p>
                    <p className="text-gray-600">台北市大安區復興南路一段100號5樓</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">電話</p>
                    <p className="text-gray-600">(02) 2345-6789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">電子郵件</p>
                    <p className="text-gray-600">info@cookielove.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">營業時間</p>
                    <p className="text-gray-600">週一至週五: 10:00 - 19:00</p>
                    <p className="text-gray-600">週六至週日: 11:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">我們的位置</h2>
              <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center">
                <p className="text-gray-600">地圖將在這裡顯示</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">聯絡表單</h2>
            
            {submitSuccess && (
              <div className="bg-success bg-opacity-20 text-success p-4 rounded-lg mb-6">
                謝謝您的訊息！我們將盡快回覆您。
              </div>
            )}
            
            {submitError && (
              <div className="bg-error bg-opacity-20 text-error p-4 rounded-lg mb-6">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-error' : 'border-gray-300'
                    }`}
                    placeholder="請輸入您的姓名"
                  />
                  {errors.name && (
                    <p className="mt-1 text-error text-sm">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    電子郵件 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    電話
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="請輸入您的電話"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    主旨
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">請選擇主旨</option>
                    <option value="訂單問題">訂單問題</option>
                    <option value="產品諮詢">產品諮詢</option>
                    <option value="合作提案">合作提案</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  訊息內容 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.message ? 'border-error' : 'border-gray-300'
                  }`}
                  placeholder="請輸入您的訊息"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-error text-sm">{errors.message}</p>
                )}
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary py-2 px-6 rounded-lg"
                >
                  {isSubmitting ? '提交中...' : '送出訊息'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
