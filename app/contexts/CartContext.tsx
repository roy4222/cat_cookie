'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Cart, CartItem, getUserCart, addToCart, removeFromCart, updateCartItemQuantity, clearCart } from '../firebase/cart';

// 定義購物車上下文類型
interface CartContextType {
  cart: Cart;
  loading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateItemQuantity: (productId: string, quantity: number) => Promise<void>;
  clearAllItems: () => Promise<void>;
  itemCount: number;
}

// 創建購物車上下文
const CartContext = createContext<CartContextType | undefined>(undefined);

// 定義購物車提供者屬性
interface CartProviderProps {
  children: ReactNode;
}

// 購物車提供者組件
export const CartProvider = ({ children }: CartProviderProps) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart>({ items: {}, total: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  // 計算購物車中的總商品數量
  const itemCount = Object.values(cart.items).reduce(
    (count, item) => count + item.quantity, 
    0
  );

  // 當用戶變化時，獲取購物車數據
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const userCart = await getUserCart(user?.uid);
        setCart(userCart);
      } catch (error) {
        console.error('獲取購物車失敗：', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // 添加商品到購物車
  const addItem = async (item: CartItem) => {
    setLoading(true);
    try {
      const updatedCart = await addToCart(item, user?.uid);
      setCart(updatedCart);
    } catch (error) {
      console.error('添加商品失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 從購物車移除商品
  const removeItem = async (productId: string) => {
    setLoading(true);
    try {
      const updatedCart = await removeFromCart(productId, user?.uid);
      setCart(updatedCart);
    } catch (error) {
      console.error('移除商品失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 更新購物車中的商品數量
  const updateItemQuantity = async (productId: string, quantity: number) => {
    setLoading(true);
    try {
      const updatedCart = await updateCartItemQuantity(productId, quantity, user?.uid);
      setCart(updatedCart);
    } catch (error) {
      console.error('更新商品數量失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 清空購物車
  const clearAllItems = async () => {
    setLoading(true);
    try {
      await clearCart(user?.uid);
      setCart({ items: {}, total: 0 });
    } catch (error) {
      console.error('清空購物車失敗：', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    loading,
    addItem,
    removeItem,
    updateItemQuantity,
    clearAllItems,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 使用購物車上下文的自定義 Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart 必須在 CartProvider 內使用');
  }
  return context;
}; 