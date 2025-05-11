// Firebase 配置檔案
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence, disableNetwork, enableNetwork } from 'firebase/firestore';

// Firebase 配置
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 初始化 Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// 導出 Firebase 服務
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// 啟用離線資料持久化 (僅客戶端執行)
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(firestore)
    .then(() => {
      console.log('Firestore 離線持久化已啟用');
    })
    .catch((err) => {
      console.error('Firestore 離線持久化啟用失敗:', err);
    });
}

// 檢查和管理 Firestore 連接狀態的函數
export const checkFirestoreConnection = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return true;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超時
    
    // 測試是否可以連接到 Firebase 伺服器
    const response = await fetch('https://firestore.googleapis.com/v1/projects', {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (_error) {
    // 我們不需要使用錯誤變數，用下劃線標記忽略
    return false;
  }
};

// 啟用/禁用 Firestore 網路連接
export const toggleFirestoreNetwork = async (enable: boolean): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  if (enable) {
    await enableNetwork(firestore);
  } else {
    await disableNetwork(firestore);
  }
};

export default firebaseApp; 