"use client";

import { FormEvent, useRef, useState } from "react";
import { Send, Mail, MessageSquare } from "lucide-react";

export default function ContactForm() {
  // 1. Controlled Component (受控元件) - Email
  // 特徵:資料由 React State 管理 (Single Source of Truth)
  // 優點:可以即時驗證 (Real-time Validation)
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // 2. Uncontrolled Component (非受控元件) - Message
  // 特徵:資料由 DOM 本身管理， React 只是用 Ref 去查看
  // 優點:效能較好 (打字不會觸發 Re-render)，程式碼有時較簡潔

  const messageRef = useRef<HTMLTextAreaElement>(null);

  //送出表單的處理邏輯
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 取得 uncontrolled 的值
    const messageValue = messageRef.current?.value || "";

    // 驗證邏輯
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (messageValue.length < 10) {
      setError("Message must be at a least 10 characters long.");
      return;
    }

    // 模擬送出API
    console.log("Form Submitted:", {
      email: email, // State
      message: messageValue, // Ref
    });

    alert("Message sent ! (Check Console)");

    // 清空表單
    setEmail("");
    if (messageRef.current) messageRef.current.value = "";
    setError("");
  };

  return (
    <section className="max-w-xl mx-auto my-12 p-7 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 ">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Send className="w-6 h-6 text-blue-500" />
        Get in Touch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Controlled Input (Email) */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
            <input 
              id="email"
              type="email"
              placeholder="your@mail.com"
              // 關鍵: value 綁定 state
              value={email}
              // 關鍵: onchange 更新 state
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(''); // 打字時清除錯誤訊息
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Uncontrolled Input (Message) */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
            <textarea 
              id="message"
              rows={4}
              placeholder="Tell me something..."
              // 關鍵: 使用 ref 綁定， 不使用 value 和 onChange 
              ref={messageRef}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 br-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <p className="text-xs text-gray-500 text-right">
            (Uncontrolled Component demonstration)
          </p>
        </div>

        {/* Error Message Area */}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
            ⚠️ {error}
          </p>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center pag-2"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
