'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// 模擬產品數據
const mockProducts = [
  {
    id: '1',
    name: '橘貓花紋原味奶油餅乾',
    description: '溫柔陽光系，像午後慵懶的擼貓時光。原味奶油餅乾搭配可可斑點，香甜酥鬆，最經典的選擇。',
    price: 200,
    image: '/image/cat1.png',
    category: '貓咪餅乾',
    quantity: '8片裝'
  },
  {
    id: '2',
    name: '虎斑巧香奶油餅乾',
    description: '勇敢冒險家，野性中帶點撒嬌。可可粉拉出虎斑條紋，奶油中混入淡淡焦糖香氣，濃郁又耐吃。',
    price: 200,
    image: '/image/cat2.png',
    category: '貓咪餅乾',
    quantity: '8片裝'
  },
  {
    id: '3',
    name: '三花莓果奶油餅乾',
    description: '甜美活潑系，隨時準備給你一記撒嬌頭槌。三色花紋靈感來自莓果果粉與可可麵團交織，清甜中帶層次。',
    price: 200,
    image: '/image/cat3.png',
    category: '貓咪餅乾',
    quantity: '8片裝'
  },
  {
    id: '4',
    name: '賓士貓黑白奶油餅乾',
    description: '高冷紳士派，外表酷酷其實超黏人。經典黑白色塊對比，使用竹炭與可可粉打造帥氣花色，配奶油香超對味。',
    price: 200,
    image: '/image/cat4.png',
    category: '貓咪餅乾',
    quantity: '8片裝'
  },
  {
    id: '5',
    name: '貓咪造型餅乾禮盒',
    description: '四種可愛貓咪造型餅乾的精美組合，每種口味各2片，是送禮自用的最佳選擇。',
    price: 680,
    image: '/image/cat1.png',
    category: '禮盒組合',
    quantity: '8片裝'
  },
  {
    id: '6',
    name: '貓咪生日派對禮盒',
    description: '附有生日蠟燭與精美賀卡的貓咪餅乾組合，讓生日驚喜更加完美。',
    price: 880,
    image: '/image/cat3.png',
    category: '禮盒組合',
    quantity: '12片裝'
  }
];

// 產品列表頁面組件
export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '全部');
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // 產品分類選項
  const categories = ['全部', '貓咪餅乾', '禮盒組合'];

  // 處理分類切換
  useEffect(() => {
    if (selectedCategory === '全部') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  // 處理URL分類參數
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">全部商品</h1>
      
      {/* 分類選項 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-primary-light'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* 產品列表 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">沒有找到商品</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="card">
              <div className="h-48 bg-cream relative overflow-hidden">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description.split('。')[0] + '。'}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-primary">${product.price} <span className="text-xs font-normal">/ {product.quantity}</span></span>
                  <Link 
                    href={`/products/${product.id}`}
                    className="btn-primary"
                  >
                    查看詳情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 