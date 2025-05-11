'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { CartItem } from '../../firebase/cart';

// 模擬產品數據
const mockProducts = [
  {
    id: '1',
    name: '巧克力餅乾',
    description: '濃郁的巧克力風味，香脆可口。採用高品質的可可粉和頂級巧克力豆製作，口感豐富，甜度適中。',
    price: 120,
    image: '/placeholder.jpg',
    category: '經典餅乾',
    ingredients: [
      '高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '可可粉', '巧克力豆', '香草精', '鹽'
    ],
    nutritionFacts: {
      calories: 150,
      fat: '7g',
      carbs: '20g',
      protein: '2g',
      sugar: '12g'
    }
  },
  {
    id: '2',
    name: '草莓糖霜餅乾',
    description: '新鮮草莓製成的糖霜，搭配香酥餅乾底。每一口都能品嚐到濃郁的草莓風味，配上精美的糖霜裝飾，既美味又賞心悅目。',
    price: 150,
    image: '/placeholder.jpg',
    category: '糖霜餅乾',
    ingredients: [
      '高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '草莓乾', '糖霜', '檸檬汁', '鹽'
    ],
    nutritionFacts: {
      calories: 130,
      fat: '5g',
      carbs: '18g',
      protein: '1.5g',
      sugar: '10g'
    }
  },
  // 更多產品...
];

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addCartSuccess, setAddCartSuccess] = useState(false);
  const [addCartError, setAddCartError] = useState('');
  
  const { addItem } = useCart();
  const { user } = useAuth();

  // 根據ID查找產品
  const product = mockProducts.find(p => p.id === params.id);

  // 如果找不到產品，顯示錯誤信息
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-semibold mb-6">找不到此商品</h1>
        <Link href="/products" className="btn-primary">
          返回商品列表
        </Link>
      </div>
    );
  }

  // 處理數量增減
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 處理加入購物車
  const handleAddToCart = async () => {
    // 清除之前的訊息
    setAddCartSuccess(false);
    setAddCartError('');
    
    // 如果用戶未登入，導航到登入頁面
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      const cartItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      };
      
      await addItem(cartItem);
      setAddCartSuccess(true);
      
      // 2秒後清除成功訊息
      setTimeout(() => {
        setAddCartSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('加入購物車失敗：', error);
      setAddCartError('加入購物車失敗，請稍後再試');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="container-custom py-12">
      {/* 返回按鈕 */}
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-primary hover:text-primary-dark"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回
        </button>
      </div>
      
      {/* 成功訊息 */}
      {addCartSuccess && (
        <div className="bg-success bg-opacity-20 text-success p-4 rounded-lg mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          已成功加入購物車
        </div>
      )}
      
      {/* 錯誤訊息 */}
      {addCartError && (
        <div className="bg-error bg-opacity-20 text-error p-4 rounded-lg mb-6">
          {addCartError}
        </div>
      )}

      {/* 產品詳情 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 產品圖片 */}
        <div className="bg-cream rounded-lg flex items-center justify-center h-[400px]">
          <p className="text-xl text-primary-dark font-medium">產品圖片</p>
        </div>

        {/* 產品信息 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price}</p>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">成分</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* 數量選擇 */}
          <div className="mb-6">
            <label className="block font-medium mb-2">數量</label>
            <div className="flex items-center">
              <button 
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center focus:outline-none"
              >
                -
              </button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center focus:outline-none"
              >
                +
              </button>
            </div>
          </div>

          {/* 加入購物車按鈕 */}
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full btn-primary mb-4"
          >
            {isAddingToCart ? '加入中...' : '加入購物車'}
          </button>

          {/* 營養成分 */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">營養成分</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div className="text-center">
                <div className="font-medium">熱量</div>
                <div>{product.nutritionFacts.calories}卡</div>
              </div>
              <div className="text-center">
                <div className="font-medium">脂肪</div>
                <div>{product.nutritionFacts.fat}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">碳水</div>
                <div>{product.nutritionFacts.carbs}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">蛋白質</div>
                <div>{product.nutritionFacts.protein}</div>
              </div>
              <div className="text-center">
                <div className="font-medium">糖分</div>
                <div>{product.nutritionFacts.sugar}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 推薦商品 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">推薦商品</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.filter(p => p.id !== product.id).slice(0, 4).map(relatedProduct => (
            <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="card">
              <div className="h-48 bg-cream flex items-center justify-center">
                <p className="text-xl text-primary-dark font-medium">產品圖片</p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
                <p className="text-primary font-bold">${relatedProduct.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 