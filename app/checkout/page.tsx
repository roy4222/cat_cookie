'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

// 運費計算函數
const calculateShippingFee = (subtotal: number): number => {
  return subtotal >= 1000 ? 0 : 60; // 訂單金額 >= 1000 免運費，否則運費 60 元
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading, clearAllItems } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    paymentMethod: 'credit_card',
    shippingMethod: 'standard',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // 購物車小計
  const subtotal = cart.total;
  
  // 運費
  const shippingFee = calculateShippingFee(subtotal);
  
  // 總金額
  const total = subtotal + shippingFee;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除該欄位的錯誤
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = '請輸入姓名';
    }
    
    if (!formData.email.trim()) {
      errors.email = '請輸入電子郵件';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '請輸入有效的電子郵件地址';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = '請輸入手機號碼';
    } else if (!/^(09)[0-9]{8}$/.test(formData.phone)) {
      errors.phone = '請輸入有效的手機號碼（例如：0912345678）';
    }
    
    if (!formData.address.trim()) {
      errors.address = '請輸入配送地址';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 這裡將來會實作實際的訂單提交邏輯
      // 模擬下單流程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 生成訂單編號
      const randomOrderNumber = `ORD${Date.now().toString().slice(-8)}`;
      setOrderNumber(randomOrderNumber);
      
      // 清空購物車
      await clearAllItems();
      
      // 設置訂單完成狀態
      setOrderComplete(true);
    } catch (error) {
      console.error('訂單提交失敗：', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 如果用戶未登入，導向登入頁面
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
  
  // 如果購物車為空
  if (!loading && Object.keys(cart.items).length === 0 && !orderComplete) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">結帳</h1>
        <div className="bg-white rounded-lg shadow-md p-8 my-8">
          <p className="text-xl mb-6">您的購物車是空的，無法結帳</p>
          <Link href="/products" className="btn-primary py-2 px-6 rounded-lg">
            繼續購物
          </Link>
        </div>
      </div>
    );
  }
  
  // 訂單完成頁面
  if (orderComplete) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="bg-success bg-opacity-20 p-8 rounded-lg mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-success mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">訂單已完成</h1>
          <p className="text-xl mb-2">感謝您的購買！</p>
          <p className="mb-6">訂單編號: <span className="font-semibold">{orderNumber}</span></p>
          
          <p className="mb-8">我們已將訂單確認信發送至您的電子郵件 {formData.email}，您可以在會員中心查看訂單狀態。</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="btn-primary py-2 px-6 rounded-lg">
              繼續購物
            </Link>
            <Link href="/profile" className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg">
              查看訂單
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-bold mb-8">結帳</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">加載中...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 結帳表單 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">配送資訊</h2>
              
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
                        formErrors.name ? 'border-error' : 'border-gray-300'
                      }`}
                      placeholder="請輸入收件人姓名"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-error text-sm">{formErrors.name}</p>
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
                        formErrors.email ? 'border-error' : 'border-gray-300'
                      }`}
                      placeholder="請輸入電子郵件"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-error text-sm">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      手機號碼 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        formErrors.phone ? 'border-error' : 'border-gray-300'
                      }`}
                      placeholder="請輸入手機號碼"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-error text-sm">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      配送地址 *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        formErrors.address ? 'border-error' : 'border-gray-300'
                      }`}
                      placeholder="請輸入完整配送地址"
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-error text-sm">{formErrors.address}</p>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-xl font-semibold mb-6">付款方式</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit_card"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="credit_card" className="ml-2 block text-sm font-medium text-gray-700">
                        信用卡付款
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="atm"
                        name="paymentMethod"
                        value="atm"
                        checked={formData.paymentMethod === 'atm'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="atm" className="ml-2 block text-sm font-medium text-gray-700">
                        ATM 轉帳
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="convenience_store"
                        name="paymentMethod"
                        value="convenience_store"
                        checked={formData.paymentMethod === 'convenience_store'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="convenience_store" className="ml-2 block text-sm font-medium text-gray-700">
                        超商付款
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-xl font-semibold mb-6">配送方式</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="standard" className="ml-2 block text-sm font-medium text-gray-700">
                        標準配送（3-5 個工作天）
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="express"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="express" className="ml-2 block text-sm font-medium text-gray-700">
                        快速配送（1-2 個工作天 +$100）
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 rounded-lg text-lg"
                  >
                    {isSubmitting ? '處理中...' : '完成訂購'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* 訂單摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">訂單摘要</h2>
              
              <div className="divide-y">
                {Object.values(cart.items).map((item) => (
                  <div key={item.productId} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">小計</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">運費</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? '免運費' : `$${shippingFee}`}
                  </span>
                </div>
                
                {formData.shippingMethod === 'express' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">快速配送費用</span>
                    <span className="font-medium">$100</span>
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>總計</span>
                    <span>${total + (formData.shippingMethod === 'express' ? 100 : 0)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Link href="/cart" className="text-primary hover:text-primary-dark text-sm">
                  返回購物車
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 