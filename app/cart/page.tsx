'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

// 運費計算函數
const calculateShippingFee = (subtotal: number): number => {
  return subtotal >= 1000 ? 0 : 60; // 訂單金額 >= 1000 免運費，否則運費 60 元
};

export default function CartPage() {
  const router = useRouter();
  const { cart, loading, updateItemQuantity, removeItem, clearAllItems } = useCart();
  const { user } = useAuth();
  
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  // 購物車小計
  const subtotal = cart.total;
  
  // 運費
  const shippingFee = calculateShippingFee(subtotal);
  
  // 總金額
  const total = subtotal + shippingFee;
  
  // 更新商品數量
  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    try {
      await updateItemQuantity(productId, newQuantity);
    } catch (error) {
      console.error('更新商品數量失敗：', error);
    }
  };
  
  // 移除商品
  const handleRemoveItem = async (productId: string) => {
    try {
      await removeItem(productId);
    } catch (error) {
      console.error('移除商品失敗：', error);
    }
  };
  
  // 清空購物車
  const handleClearCart = async () => {
    try {
      await clearAllItems();
    } catch (error) {
      console.error('清空購物車失敗：', error);
    }
  };
  
  // 結帳
  const handleCheckout = async () => {
    // 如果未登入，導向登入頁面
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setCheckoutLoading(true);
    
    // 結帳邏輯將在後續實現
    // 這裡僅做模擬
    setTimeout(() => {
      router.push('/checkout');
      setCheckoutLoading(false);
    }, 1000);
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
  if (!loading && Object.keys(cart.items).length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">您的購物車</h1>
        <div className="bg-white rounded-lg shadow-md p-8 my-8">
          <p className="text-xl mb-6">您的購物車是空的</p>
          <Link href="/products" className="btn-primary py-2 px-6 rounded-lg">
            繼續購物
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-bold mb-8">您的購物車</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">加載中...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 購物車商品列表 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">商品</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">數量</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">價格</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">小計</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.values(cart.items).map((item) => (
                    <tr key={item.productId}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 bg-cream flex items-center justify-center rounded">
                            <span className="text-sm text-primary-dark">產品圖片</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-500">
                        ${item.price}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-500">
                        ${item.price * item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          移除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="px-6 py-4 border-t border-gray-200">
                <button 
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  清空購物車
                </button>
              </div>
            </div>
          </div>
          
          {/* 訂單摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">訂單摘要</h2>
              
              <div className="space-y-3 mb-6">
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
                
                {shippingFee > 0 && (
                  <div className="text-xs text-gray-500">
                    訂單滿 $1,000 即可享有免運費
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>總計</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full btn-primary py-2 rounded-lg"
              >
                {checkoutLoading ? '處理中...' : '結帳'}
              </button>
              
              <div className="mt-4">
                <Link href="/products" className="text-primary hover:text-primary-dark text-sm">
                  繼續購物
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 