# **# 愛心手工餅乾網站**

這是一個使用 [Next.js](https://nextjs.org) 建立的手工餅乾電商網站專案。

**## 專案需求**

**### 1. 使用者介面功能**

- ***導航列****

- Logo 展示

- 漢堡選單

- 使用者圖示

- 購物車圖示

**### 2. 首頁功能區塊**

- 開始訂購
- 線上客服
- 產品介紹
- 優惠推薦

**### 3. 會員功能**

- 會員登入/註冊介面
- 帳號密碼輸入
- 會員資料管理

**### 4. 產品展示**

- 產品分類目錄
- 產品詳細資訊頁面

- 產品圖片

- 產品描述

- 價格顯示

- 數量調整

- 加入購物車按鈕

**### 5. 購物車功能**

- 商品清單顯示
- 數量即時調整
- 金額計算系統

- 商品金額

- 運費計算

- 折扣優惠

- 總金額計算

- 結帳按鈕
- 繼續購物連結

**## 技術規格**

**### 前端技術**

- Next.js 14
- Tailwind CSS（樣式設計）
- React Context API（狀態管理）

**### 後端服務 (Firebase)**

- Firebase Authentication（會員驗證）
- Cloud firestore（資料儲存）

- 商品資料

- 訂單管理

- 會員資料

- 購物車資訊

**### 開發工具**

- TypeScript
- ESLint（程式碼品質）
- Prettier（程式碼格式化）

**## 環境設定**

**### Firebase 配置**

1. 建立 Firebase 專案

2. 啟用 Authentication 服務

- 設定電子郵件/密碼登入

- 設定 Google 登入（可選）

3. 設定 Cloud firestore

- 建立資料庫

- 設定安全規則

4. 取得 Firebase 配置資訊

```javascript

const firebaseConfig = {

apiKey: "your-api-key",

authDomain: "your-auth-domain",

databaseURL: "your-database-url",

projectId: "your-project-id",

storageBucket: "your-storage-bucket",

messagingSenderId: "your-messaging-sender-id",

appId: "your-app-id"

};

```

**### 環境變數**

建立 `.env.local` 文件並設定以下環境變數：

```

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain

NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url

NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id

NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

```

**## 開發里程碑**

**### 里程碑 1：基礎架構建置（1-2週）**

- 建立 Next.js 專案
- 設定 Tailwind CSS
- 建立基本頁面路由
- 實作響應式導航列
- 設定 Firebase 專案
- 整合 Firebase Authentication
- 整合 Realtime Database

**### 里程碑 2：會員系統（1-2週）**

- 設計會員登入/註冊頁面
- 實作 Firebase Authentication 登入流程
- 實作表單驗證
- 建立會員資料結構於 Realtime Database
- 實作會員資料 CRUD 操作

**### 里程碑 3：產品展示系統（2週）**

- 建立產品資料結構於 Realtime Database
- 實作產品資料 CRUD 操作
- 實作產品目錄頁面
- 開發產品詳細頁面
- 實作產品搜尋功能

**### 里程碑 4：購物車系統（2週）**

- 實作購物車邏輯
- 開發購物車介面
- 實作數量調整功能
- 建立金額計算系統
- 整合購物車與 Realtime Database

**### 里程碑 5：優化與測試（1週）**

- 效能優化
- 跨瀏覽器測試
- 響應式設計調整
- 使用者體驗優化
- Firebase 安全規則優化

**## 開始使用**

首先，安裝專案依賴：

```bash

npm install

npm install firebase @firebase/auth @firebase/database

```

執行開發伺服器：

```bash

npm run dev

```

在瀏覽器中打開 http://localhost:3000 查看結果。

**## 開發指南**

1. 克隆專案後，安裝依賴：

```bash

npm install

```

2. 複製 `.env.example` 到 `.env.local` 並設定 Firebase 環境變數

3. 啟動開發伺服器：

```bash

npm run dev

```

**## Firebase 資料結構**

```javascript

{

"users": {

"$uid": {

"profile": {

"name": "string",

"email": "string",

"phone": "string"

},

"orders": {

"$orderId": {

"items": [],

"total": "number",

"status": "string",

"createdAt": "timestamp"

}

}

}

},

"products": {

"$productId": {

"name": "string",

"description": "string",

"price": "number",

"image": "string",

"category": "string"

}

},

"carts": {

"$uid": {

"items": {

"$productId": {

"quantity": "number",

"price": "number"

}

},

"total": "number"

}

}

}

```

**## 部署說明**

本專案可以輕鬆部署到 Vercel 平台：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cookie-shop)

更多部署細節請參考 [Next.js 部署文檔](https://nextjs.org/docs/deployment)。