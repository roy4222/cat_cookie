// Firebase Firestore 資料庫功能
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentReference,
  CollectionReference,
  DocumentData,
  QueryConstraint,
  WithFieldValue,
  onSnapshot,
  FirestoreError
} from 'firebase/firestore';
import { firestore } from './config';

// 獲取集合引用
export const getCollectionRef = (collectionPath: string): CollectionReference<DocumentData> => {
  return collection(firestore, collectionPath);
};

// 獲取文檔引用
export const getDocumentRef = (collectionPath: string, docId: string): DocumentReference<DocumentData> => {
  return doc(firestore, collectionPath, docId);
};

// 獲取單個文檔
export const getDocument = async <T>(collectionPath: string, docId: string): Promise<T | null> => {
  try {
    const docRef = getDocumentRef(collectionPath, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.error(`獲取文檔失敗 (${collectionPath}/${docId}):`, error);
    throw error;
  }
};

// 獲取集合中的所有文檔
export const getCollection = async <T>(
  collectionPath: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  try {
    const collectionRef = getCollectionRef(collectionPath);
    const q = constraints.length > 0 
      ? query(collectionRef, ...constraints) 
      : query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error: unknown) {
    console.error(`獲取集合失敗 (${collectionPath}):`, error);
    throw error;
  }
};

// 添加文檔
export const addDocument = async <T extends Record<string, unknown>>(
  collectionPath: string, 
  data: T
): Promise<string> => {
  try {
    const collectionRef = getCollectionRef(collectionPath);
    const docRef = await addDoc(collectionRef, data as WithFieldValue<DocumentData>);
    return docRef.id;
  } catch (error: unknown) {
    console.error(`添加文檔失敗 (${collectionPath}):`, error);
    throw error;
  }
};

// 更新文檔
export const updateDocument = async <T extends Record<string, unknown>>(
  collectionPath: string, 
  docId: string, 
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = getDocumentRef(collectionPath, docId);
    await updateDoc(docRef, data as DocumentData);
  } catch (error: unknown) {
    console.error(`更新文檔失敗 (${collectionPath}/${docId}):`, error);
    throw error;
  }
};

// 刪除文檔
export const deleteDocument = async (
  collectionPath: string, 
  docId: string
): Promise<void> => {
  try {
    const docRef = getDocumentRef(collectionPath, docId);
    await deleteDoc(docRef);
  } catch (error: unknown) {
    console.error(`刪除文檔失敗 (${collectionPath}/${docId}):`, error);
    throw error;
  }
};

// 實用的查詢函數
export const queryUtils = {
  where: where,
  orderBy: orderBy,
  limit: limit
}; 

// 產品資料類型定義
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: string;
  ingredients?: string[];
  nutritionFacts?: {
    calories: number;
    fat: string;
    carbs: string;
    protein: string;
    sugar: string;
  };
}

// 監聽產品資料變化的函數 (即時同步)
export const listenToProducts = (
  callback: (products: Product[]) => void,
  constraints: QueryConstraint[] = []
): (() => void) => {
  try {
    const productsRef = getCollectionRef('products');
    const q = constraints.length > 0 
      ? query(productsRef, ...constraints) 
      : query(productsRef);
    
    // 設置實時監聽
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as Product);
      
      callback(products);
    }, (error: FirestoreError) => {
      console.error('監聽產品資料失敗:', error);
    });
    
    // 返回取消監聽的函數
    return unsubscribe;
  } catch (error: unknown) {
    console.error('設置產品監聽失敗:', error);
    return () => {}; // 返回空函數作為錯誤回退
  }
};

// 獲取單個產品資料並監聽變化
export const listenToProduct = (
  productId: string,
  callback: (product: Product | null) => void
): (() => void) => {
  try {
    const productRef = getDocumentRef('products', productId);
    
    // 設置實時監聽
    const unsubscribe = onSnapshot(productRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const product = { 
          id: docSnapshot.id, 
          ...docSnapshot.data() 
        } as Product;
        
        callback(product);
      } else {
        callback(null);
      }
    }, (error: FirestoreError) => {
      console.error(`監聽產品資料失敗 (${productId}):`, error);
    });
    
    // 返回取消監聽的函數
    return unsubscribe;
  } catch (error: unknown) {
    console.error(`設置產品監聽失敗 (${productId}):`, error);
    return () => {}; // 返回空函數作為錯誤回退
  }
}; 