'use client';

import { Suspense } from 'react';
// 從新文件中導入 ProductClientComponent
import ProductClientComponent from './ProductClientComponent';

// categories 和 mockProducts 已經移至 ProductClientComponent.tsx 或可以從共享位置導入
// 如果您決定它們只在 ProductClientComponent.tsx 中使用，則此處不需要它們

// 主要的 ProductsPage 組件
export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">全部商品</h1>
      <Suspense fallback={<div>載入中...</div>}>
        <ProductClientComponent />
      </Suspense>
    </div>
  );
} 