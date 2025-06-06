# **# 愛心手工餅乾網站**

這是一個使用 [Next.js](https://nextjs.org) 建立的手工餅乾電商網站專案。

**## 專案需求**

**### 1. 使用者介面功能**

- ✅ ***導航列****

- ✅ Logo 展示

- ✅ 漢堡選單

- ✅ 使用者圖示

- ✅ 購物車圖示 (含商品數量顯示)

**### 2. 首頁功能區塊**

- ✅ 開始訂購
- ✅ 線上客服
- ✅ 產品介紹
- ✅ 優惠推薦
- ✅ 顧客評價

**### 3. 會員功能**

- ✅ 會員登入/註冊介面
- ✅ 帳號密碼輸入
- ✅ 會員資料管理
- ✅ 重設密碼功能
- ✅ Google 登入功能

**### 4. 產品展示**

- ✅ 產品分類目錄
- ✅ 產品詳細資訊頁面

- ✅ 產品圖片

- ✅ 產品描述

- ✅ 價格顯示

- ✅ 數量調整

- ✅ 加入購物車按鈕

**### 5. 購物車功能**

- ✅ 商品清單顯示
- ✅ 數量即時調整
- ✅ 金額計算系統

- ✅ 商品金額

- ✅ 運費計算

- ✅ 總金額計算

- ✅ 結帳按鈕
- ✅ 繼續購物連結

**### 6. 結帳功能**

- ✅ 配送資訊表單
- ✅ 付款方式選擇
- ✅ 訂單摘要
- ✅ 表單驗證
- ✅ 訂單完成頁面

**## 設計配色方案**

**### 主要配色**

- ✅ **粉色系列**：作為主要品牌色
  - ✅ 主要粉色：`#FF9FB5`（用於導航列、按鈕等主要元素）
  - ✅ 深粉色：`#F06292`（用於強調按鈕、促銷標籤）
  - ✅ 淺粉色：`#FFCDD2`（用於背景、次要元素）

- ✅ **淺黃色系列**：作為輔助色調
  - ✅ 主要淺黃：`#FFF9C4`（用於背景區塊）
  - ✅ 深黃色：`#FFE082`（用於特殊強調元素）
  - ✅ 奶油色：`#FFFDE7`（用於區塊背景、卡片元素）

- ✅ **白色系列**：作為中性色調
  - ✅ 純白色：`#FFFFFF`（主要頁面背景）
  - ✅ 象牙白：`#FFFAF0`（次要背景）
  - ✅ 灰白色：`#F5F5F5`（用於分隔區塊）

**### 功能型配色**

- ✅ 成功綠：`#A5D6A7`（表示成功訊息）
- ✅ 資訊藍：`#90CAF9`（表示資訊提示）
- ✅ 警告黃：`#FFE082`（表示警告訊息）
- ✅ 錯誤紅：`#EF9A9A`（表示錯誤訊息）

**### 配色應用原則**

- ✅ **60-30-10原則**：
  - ✅ 60%使用白色/象牙白作為背景
  - ✅ 30%使用粉色系作為主要元素
  - ✅ 10%使用淺黃色作為點綴和強調

- ✅ **可訪問性考量**：
  - ✅ 確保文字與背景對比度達到WCAG標準
  - ✅ 粉色背景搭配深色文字
  - ✅ 淺黃色背景搭配深色文字

**### UI元件庫**

- ✅ **TailwindCSS**：將在tailwind.config.js中自定義配色方案
- **DaisyUI**：作為Tailwind CSS的插件，提供預設組件（可選）
- **Headless UI**：用於無樣式組件，完全按照配色方案自定義（可選）

**## 技術規格**

**### 前端技術**

- ✅ Next.js 15
- ✅ React 19
- ✅ Tailwind CSS（樣式設計）
- ✅ React Context API（狀態管理）

**### 後端服務 (Firebase)**

- ✅ Firebase Authentication（會員驗證）
- ✅ Cloud Firestore（資料儲存）

- ✅ 商品資料

- ✅ 訂單管理

- ✅ 會員資料

- ✅ 購物車資訊

**### 開發工具**

- ✅ TypeScript
- ✅ ESLint（程式碼品質）
- ✅ Prettier（程式碼格式化）

**## 環境設定**

**### Firebase 配置**

1. ✅ 建立 Firebase 專案

2. ✅ 啟用 Authentication 服務

- ✅ 設定電子郵件/密碼登入

- ✅ 設定 Google 登入

3. ✅ 設定 Cloud Firestore

- ✅ 建立資料庫

- ✅ 設定安全規則

4. ✅ 取得 Firebase 配置資訊

```javascript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

**### 環境變數**

建立 `.env.local` 文件並設定以下環境變數：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**## 開發里程碑**

**### 里程碑 1：基礎架構建置（1-2週）** - ✅ 100% 完成

- ✅ 建立 Next.js 專案
- ✅ 設定 Tailwind CSS
- ✅ 建立基本頁面路由
- ✅ 實作響應式導航列
- ✅ 設定 Firebase 專案
- ✅ 整合 Firebase Authentication
- ✅ 整合 Cloud Firestore

**### 里程碑 2：會員系統（1-2週）** - ✅ 100% 完成

- ✅ 設計會員登入/註冊頁面
- ✅ 實作 Firebase Authentication 登入流程
- ✅ 實作表單驗證
- ✅ 建立會員資料結構於 Firestore
- ✅ 實作會員資料 CRUD 操作

**### 里程碑 3：產品展示系統（2週）** - ✅ 100% 完成

- ✅ 建立產品展示頁面
- ✅ 實作產品分類功能
- ✅ 產品卡片與列表顯示
- ✅ 開發產品詳細頁面
- ✅ 實作產品搜尋功能

**### 里程碑 4：購物車系統（2週）** - ✅ 100% 完成

- ✅ 實作購物車邏輯
- ✅ 開發購物車介面
- ✅ 實作數量調整功能
- ✅ 建立金額計算系統
- ✅ 整合購物車與 Firestore

**### 里程碑 5：結帳系統（1週）** - ✅ 100% 完成

- ✅ 開發結帳流程
- ✅ 建立表單驗證
- ✅ 實作訂單處理邏輯
- ✅ 設計訂單完成頁面
- ✅ 與 Firestore 整合訂單資料

**### 里程碑 6：優化與測試（1週）** - ⏳ 75% 完成

- ✅ 效能優化
- ✅ 響應式設計調整
- ⏳ 跨瀏覽器測試
- ✅ 使用者體驗優化
- ✅ Firebase 安全規則優化

**## 目前進度：95%**
我們已經成功實現了所有必要功能，並完善了產品資料即時同步機制，解決了資料不同步問題。網站已經具備完整的電商功能，包含會員系統、產品展示、購物車和結帳功能。剩餘工作主要集中在跨瀏覽器測試和最終上線前的檢查。

**## 開始使用**

首先，安裝專案依賴：

```bash
npm install
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
          "price": "number",
          "name": "string",
          "image": "string"
        }
      },
      "total": "number"
    }
  },
  "reviews": {
    "$reviewId": {
      "productId": "string",
      "userId": "string",
      "userName": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "timestamp"
    }
  }
}
```

**## 部署說明**

本專案可以輕鬆部署到 Vercel 平台（Next.js 開發者推薦）：

1. 在 [Vercel](https://vercel.com) 上創建帳號
2. 連接 GitHub 倉庫
3. 設定環境變數
4. 點擊部署

Vercel 會自動偵測 Next.js 專案並進行最佳化部署。
