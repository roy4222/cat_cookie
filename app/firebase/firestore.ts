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
  WithFieldValue
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
  } catch (error) {
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
  } catch (error) {
    console.error(`獲取集合失敗 (${collectionPath}):`, error);
    throw error;
  }
};

// 添加文檔
export const addDocument = async <T extends Record<string, any>>(
  collectionPath: string, 
  data: T
): Promise<string> => {
  try {
    const collectionRef = getCollectionRef(collectionPath);
    const docRef = await addDoc(collectionRef, data as WithFieldValue<DocumentData>);
    return docRef.id;
  } catch (error) {
    console.error(`添加文檔失敗 (${collectionPath}):`, error);
    throw error;
  }
};

// 更新文檔
export const updateDocument = async <T extends Record<string, any>>(
  collectionPath: string, 
  docId: string, 
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = getDocumentRef(collectionPath, docId);
    await updateDoc(docRef, data as DocumentData);
  } catch (error) {
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
  } catch (error) {
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