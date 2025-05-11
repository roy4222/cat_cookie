// 購物車相關的 Firebase 功能
import { 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';
import { firestore } from './config';
import { getCurrentUser } from './auth';

// 購物車商品接口
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

// 購物車接口
export interface Cart {
  items: { [productId: string]: CartItem };
  total: number;
}

// 獲取使用者購物車引用路徑
const getUserCartPath = (userId: string) => {
  return `carts/${userId}`;
};

// 初始化空購物車
const emptyCart: Cart = {
  items: {},
  total: 0
};

// 獲取使用者購物車
export const getUserCart = async (userId?: string): Promise<Cart> => {
  try {
    // 如果沒有提供 userId，嘗試從當前登入的使用者獲取
    const currentUser = getCurrentUser();
    const uid = userId || (currentUser ? currentUser.uid : null);
    
    if (!uid) {
      return emptyCart;
    }
    
    const cartDocRef = doc(firestore, getUserCartPath(uid));
    const cartDocSnap = await getDoc(cartDocRef);
    
    if (cartDocSnap.exists()) {
      return cartDocSnap.data() as Cart;
    } else {
      return emptyCart;
    }
  } catch (error: unknown) {
    console.error('獲取購物車失敗：', error);
    return emptyCart;
  }
};

// 更新使用者購物車
export const updateUserCart = async (cart: Cart, userId?: string): Promise<void> => {
  try {
    const currentUser = getCurrentUser();
    const uid = userId || (currentUser ? currentUser.uid : null);
    
    if (!uid) {
      throw new Error('未登入的使用者無法更新購物車');
    }
    
    const cartDocRef = doc(firestore, getUserCartPath(uid));
    await setDoc(cartDocRef, cart);
  } catch (error: unknown) {
    console.error('更新購物車失敗：', error);
    throw error;
  }
};

// 添加商品到購物車
export const addToCart = async (
  item: CartItem,
  userId?: string
): Promise<Cart> => {
  try {
    const currentUser = getCurrentUser();
    const uid = userId || (currentUser ? currentUser.uid : null);
    
    if (!uid) {
      throw new Error('未登入的使用者無法添加商品到購物車');
    }
    
    const cart = await getUserCart(uid);
    const existingItem = cart.items[item.productId];
    
    if (existingItem) {
      // 如果商品已存在，更新數量
      existingItem.quantity += item.quantity;
      cart.items[item.productId] = existingItem;
    } else {
      // 如果商品不存在，添加新商品
      cart.items[item.productId] = item;
    }
    
    // 重新計算總金額
    cart.total = calculateCartTotal(cart);
    
    // 更新購物車
    await updateUserCart(cart, uid);
    
    return cart;
  } catch (error: unknown) {
    console.error('添加商品到購物車失敗：', error);
    throw error;
  }
};

// 從購物車移除商品
export const removeFromCart = async (
  productId: string,
  userId?: string
): Promise<Cart> => {
  try {
    const currentUser = getCurrentUser();
    const uid = userId || (currentUser ? currentUser.uid : null);
    
    if (!uid) {
      throw new Error('未登入的使用者無法從購物車移除商品');
    }
    
    const cart = await getUserCart(uid);
    
    if (cart.items[productId]) {
      // 刪除商品
      delete cart.items[productId];
      
      // 重新計算總金額
      cart.total = calculateCartTotal(cart);
      
      // 更新購物車
      await updateUserCart(cart, uid);
    }
    
    return cart;
  } catch (error: unknown) {
    console.error('從購物車移除商品失敗：', error);
    throw error;
  }
};

// 更新購物車中商品數量
export const updateCartItemQuantity = async (
  productId: string,
  quantity: number,
  userId?: string
): Promise<Cart> => {
  try {
    const currentUser = getCurrentUser();
    const uid = userId || (currentUser ? currentUser.uid : null);
    
    if (!uid) {
      throw new Error('未登入的使用者無法更新購物車');
    }
    
    const cart = await getUserCart(uid);
    
    if (cart.items[productId]) {
      if (quantity <= 0) {
        // 如果數量小於等於0，移除商品
        delete cart.items[productId];
      } else {
        // 更新數量
        cart.items[productId].quantity = quantity;
      }
      
      // 重新計算總金額
      cart.total = calculateCartTotal(cart);
      
      // 更新購物車
      await updateUserCart(cart, uid);
    }
    
    return cart;
  } catch (error: unknown) {
    console.error('更新購物車商品數量失敗：', error);
    throw error;
  }
};

// 清空購物車
export const clearCart = async (userId?: string): Promise<void> => {
  try {
    const currentUser = getCurrentUser();
    const uid = userId || (currentUser ? currentUser.uid : null);
    
    if (!uid) {
      throw new Error('未登入的使用者無法清空購物車');
    }
    
    await updateUserCart(emptyCart, uid);
  } catch (error: unknown) {
    console.error('清空購物車失敗：', error);
    throw error;
  }
};

// 計算購物車總金額
export const calculateCartTotal = (cart: Cart): number => {
  return Object.values(cart.items).reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );
}; 