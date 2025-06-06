// Firebase 身份驗證功能
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
  UserCredential,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './config';

// 註冊新使用者
export const registerUser = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<UserCredential> => {
  try {
    // 使用 Firebase 創建新使用者
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 更新使用者資料
    await updateProfile(user, { displayName });
    
    // 在 Firestore 中建立使用者資料
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName,
      phone: '',
      createdAt: new Date().toISOString(),
    });
    
    return userCredential;
  } catch (error) {
    console.error('註冊使用者失敗：', error);
    throw error;
  }
};

// 登入使用者
export const loginUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('使用者登入失敗：', error);
    throw error;
  }
};

// Google 登入
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // 檢查用戶是否已存在於 Firestore
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    
    // 如果用戶不存在，則在 Firestore 中創建用戶
    if (!userDoc.exists()) {
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '會員',
        phone: '',
        createdAt: new Date().toISOString(),
      });
    }
    
    return userCredential;
  } catch (error) {
    console.error('Google 登入失敗：', error);
    throw error;
  }
};

// 登出使用者
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('使用者登出失敗：', error);
    throw error;
  }
};

// 重設密碼
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('密碼重設失敗：', error);
    throw error;
  }
};

// 取得目前使用者
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
}; 