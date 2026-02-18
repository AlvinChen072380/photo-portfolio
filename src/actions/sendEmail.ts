'use server';

 // 伺服器端執行的後端程式碼

export interface FormState {
  message: string;
  success: boolean | null;
  errors?: {
    email?: string[];
    message?: string[];
  };
}

// 模擬延遲 (讓 UI 顯示 Loading)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendEmail(prevState: FormState, formData: FormData): Promise<FormState>{
  // 1. 模擬網路延遲
  await sleep(1500);
  // 2. 取得欄位資料
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // 3.簡單的後端驗證 (Server-side Validation)
  // 真實專案中，通常用 Zod 來驗證
  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: "Validation Failed",
      errors: { email: ['Please enter a valid email.'] }
    };
  }

  if (!message || message.length < 5) {
    return {
      success: false,
      message: 'Validation Failed',
      errors: { message: ['Message is too short (min 5 charts).'] }
    };    
  }

  // 4.(模擬) 發送 Email 成功
  console.log(`Simulating email sent form: ${email}, content: ${message}`);

  return {
    success: true,
    message: 'Message sent successfully! We will get back to you soon.',
  }; 
}