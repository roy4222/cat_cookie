'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { CartItem } from '../../firebase/cart';
import { Product } from '../../firebase/firestore';

// 模擬產品數據
const mockProducts: Product[] = [
  {
    id: '1',
    name: '橘貓花紋原味奶油餅乾',
    description: '溫柔陽光系，像午後慵懶的擼貓時光。原味奶油餅乾搭配可可斑點，香甜酥鬆，最經典的選擇。',
    price: 200,
    image: '/image/cat1.png',
    category: '貓咪餅乾',
    quantity: '8片裝',
    ingredients: ['高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '可可粉', '香草精', '鹽'],
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
    name: '虎斑巧香奶油餅乾',
    description: '勇敢冒險家，野性中帶點撒嬌。可可粉拉出虎斑條紋，奶油中混入淡淡焦糖香氣，濃郁又耐吃。',
    price: 200,
    image: '/image/cat2.png',
    category: '貓咪餅乾',
    quantity: '8片裝',
    ingredients: ['高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '可可粉', '焦糖', '香草精', '鹽'],
    nutritionFacts: {
      calories: 160,
      fat: '8g',
      carbs: '22g',
      protein: '2g',
      sugar: '14g'
    }
  },
  {
    id: '3',
    name: '三花莓果奶油餅乾',
    description: '甜美活潑系，隨時準備給你一記撒嬌頭槌。三色花紋靈感來自莓果果粉與可可麵團交織，清甜中帶層次。',
    price: 200,
    image: '/image/cat3.png',
    category: '貓咪餅乾',
    quantity: '8片裝',
    ingredients: ['高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '草莓乾', '可可粉', '香草精', '鹽'],
    nutritionFacts: {
      calories: 145,
      fat: '7g',
      carbs: '19g',
      protein: '2g',
      sugar: '11g'
    }
  },
  {
    id: '4',
    name: '賓士貓黑白奶油餅乾',
    description: '高冷紳士派，外表酷酷其實超黏人。經典黑白色塊對比，使用竹炭與可可粉打造帥氣花色，配奶油香超對味。',
    price: 200,
    image: '/image/cat4.png',
    category: '貓咪餅乾',
    quantity: '8片裝',
    ingredients: ['高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '可可粉', '竹炭粉', '香草精', '鹽'],
    nutritionFacts: {
      calories: 155,
      fat: '7g',
      carbs: '21g',
      protein: '2g',
      sugar: '13g'
    }
  },
  {
    id: '5',
    name: '貓咪造型餅乾禮盒',
    description: '四種可愛貓咪造型餅乾的精美組合，每種口味各2片，是送禮自用的最佳選擇。',
    price: 680,
    image: '/image/cat1.png',
    category: '禮盒組合',
    quantity: '8片裝',
    ingredients: ['高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '可可粉', '香草精', '鹽'],
    nutritionFacts: {
      calories: 150,
      fat: '7g',
      carbs: '20g',
      protein: '2g',
      sugar: '12g'
    }
  },
  {
    id: '6',
    name: '貓咪生日派對禮盒',
    description: '附有生日蠟燭與精美賀卡的貓咪餅乾組合，讓生日驚喜更加完美。',
    price: 880,
    image: '/image/cat3.png',
    category: '禮盒組合',
    quantity: '12片裝',
    ingredients: ['高筋麵粉', '無鹽奶油', '砂糖', '雞蛋', '可可粉', '草莓乾', '香草精', '鹽'],
    nutritionFacts: {
      calories: 155,
      fat: '7g',
      carbs: '21g',
      protein: '2g',
      sugar: '13g'
    }
  }
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

  // 獲取相關產品 (同類別但不包含當前產品)
  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

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
        <div className="bg-cream rounded-lg overflow-hidden relative h-[400px]">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* 產品信息 */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price} <span className="text-sm font-normal">/ {product.quantity}</span></p>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {product.ingredients && (
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
          )}

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
          {product.nutritionFacts && (
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
          )}
        </div>
      </div>

      {/* 推薦商品 */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">推薦商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="card">
                <div className="h-48 bg-cream relative overflow-hidden">
                  <Image 
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{relatedProduct.name}</h3>
                  <p className="text-primary font-semibold">${relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 