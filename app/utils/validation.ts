// 表單驗證輔助函數

// 驗證電子郵件
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 驗證密碼 (至少8個字元，包含數字和字母)
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// 驗證手機號碼 (台灣格式)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(09)[0-9]{8}$/;
  return phoneRegex.test(phone);
};

// 驗證名稱 (不為空且至少2個字元)
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// 錯誤訊息
export const errorMessages = {
  emailRequired: '請輸入電子郵件',
  emailInvalid: '請輸入有效的電子郵件地址',
  passwordRequired: '請輸入密碼',
  passwordInvalid: '密碼至少需要8個字元，且包含數字和字母',
  passwordMismatch: '兩次輸入的密碼不一致',
  nameRequired: '請輸入姓名',
  nameInvalid: '姓名至少需要2個字元',
  phoneInvalid: '請輸入有效的手機號碼（09 開頭的10位數字）',
};

// 驗證表單數據
export const validateForm = (formData: Record<string, string>, rules: Record<string, string[]>): Record<string, string> => {
  const errors: Record<string, string> = {};

  // 遍歷驗證規則
  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    const value = formData[fieldName];

    // 檢查必填
    if (fieldRules.includes('required') && (!value || value.trim() === '')) {
      errors[fieldName] = errorMessages[`${fieldName}Required`] || '此欄位為必填';
      return;
    }

    // 如果有值，則檢查其他規則
    if (value) {
      if (fieldRules.includes('email') && !validateEmail(value)) {
        errors[fieldName] = errorMessages.emailInvalid;
      } else if (fieldRules.includes('password') && !validatePassword(value)) {
        errors[fieldName] = errorMessages.passwordInvalid;
      } else if (fieldRules.includes('name') && !validateName(value)) {
        errors[fieldName] = errorMessages.nameInvalid;
      } else if (fieldRules.includes('phone') && !validatePhone(value)) {
        errors[fieldName] = errorMessages.phoneInvalid;
      } else if (fieldRules.includes('passwordConfirmation') && value !== formData.password) {
        errors[fieldName] = errorMessages.passwordMismatch;
      }
    }
  });

  return errors;
}; 